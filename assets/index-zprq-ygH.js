(async ()=>{
    (function() {
        const e = document.createElement("link").relList;
        if (e && e.supports && e.supports("modulepreload")) return;
        for (const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);
        new MutationObserver((r)=>{
            for (const s of r)if (s.type === "childList") for (const o of s.addedNodes)o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
        }).observe(document, {
            childList: !0,
            subtree: !0
        });
        function n(r) {
            const s = {};
            return r.integrity && (s.integrity = r.integrity), r.referrerPolicy && (s.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? s.credentials = "include" : r.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
        }
        function i(r) {
            if (r.ep) return;
            r.ep = !0;
            const s = n(r);
            fetch(r.href, s);
        }
    })();
    function Gd(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    }
    var Zd = {
        exports: {}
    }, Zs = {}, Jd = {
        exports: {}
    }, z = {};
    var _r = Symbol.for("react.element"), ag = Symbol.for("react.portal"), ug = Symbol.for("react.fragment"), cg = Symbol.for("react.strict_mode"), dg = Symbol.for("react.profiler"), fg = Symbol.for("react.provider"), hg = Symbol.for("react.context"), pg = Symbol.for("react.forward_ref"), gg = Symbol.for("react.suspense"), mg = Symbol.for("react.memo"), yg = Symbol.for("react.lazy"), _u = Symbol.iterator;
    function vg(t) {
        return t === null || typeof t != "object" ? null : (t = _u && t[_u] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var qd = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }, ef = Object.assign, tf = {};
    function di(t, e, n) {
        this.props = t, this.context = e, this.refs = tf, this.updater = n || qd;
    }
    di.prototype.isReactComponent = {};
    di.prototype.setState = function(t, e) {
        if (typeof t != "object" && typeof t != "function" && t != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, t, e, "setState");
    };
    di.prototype.forceUpdate = function(t) {
        this.updater.enqueueForceUpdate(this, t, "forceUpdate");
    };
    function nf() {}
    nf.prototype = di.prototype;
    function oa(t, e, n) {
        this.props = t, this.context = e, this.refs = tf, this.updater = n || qd;
    }
    var la = oa.prototype = new nf;
    la.constructor = oa;
    ef(la, di.prototype);
    la.isPureReactComponent = !0;
    var Su = Array.isArray, rf = Object.prototype.hasOwnProperty, aa = {
        current: null
    }, sf = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function of(t, e, n) {
        var i, r = {}, s = null, o = null;
        if (e != null) for(i in e.ref !== void 0 && (o = e.ref), e.key !== void 0 && (s = "" + e.key), e)rf.call(e, i) && !sf.hasOwnProperty(i) && (r[i] = e[i]);
        var l = arguments.length - 2;
        if (l === 1) r.children = n;
        else if (1 < l) {
            for(var a = Array(l), u = 0; u < l; u++)a[u] = arguments[u + 2];
            r.children = a;
        }
        if (t && t.defaultProps) for(i in l = t.defaultProps, l)r[i] === void 0 && (r[i] = l[i]);
        return {
            $$typeof: _r,
            type: t,
            key: s,
            ref: o,
            props: r,
            _owner: aa.current
        };
    }
    function xg(t, e) {
        return {
            $$typeof: _r,
            type: t.type,
            key: e,
            ref: t.ref,
            props: t.props,
            _owner: t._owner
        };
    }
    function ua(t) {
        return typeof t == "object" && t !== null && t.$$typeof === _r;
    }
    function _g(t) {
        var e = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + t.replace(/[=:]/g, function(n) {
            return e[n];
        });
    }
    var wu = /\/+/g;
    function ko(t, e) {
        return typeof t == "object" && t !== null && t.key != null ? _g("" + t.key) : e.toString(36);
    }
    function rs(t, e, n, i, r) {
        var s = typeof t;
        (s === "undefined" || s === "boolean") && (t = null);
        var o = !1;
        if (t === null) o = !0;
        else switch(s){
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch(t.$$typeof){
                    case _r:
                    case ag:
                        o = !0;
                }
        }
        if (o) return o = t, r = r(o), t = i === "" ? "." + ko(o, 0) : i, Su(r) ? (n = "", t != null && (n = t.replace(wu, "$&/") + "/"), rs(r, e, n, "", function(u) {
            return u;
        })) : r != null && (ua(r) && (r = xg(r, n + (!r.key || o && o.key === r.key ? "" : ("" + r.key).replace(wu, "$&/") + "/") + t)), e.push(r)), 1;
        if (o = 0, i = i === "" ? "." : i + ":", Su(t)) for(var l = 0; l < t.length; l++){
            s = t[l];
            var a = i + ko(s, l);
            o += rs(s, e, n, a, r);
        }
        else if (a = vg(t), typeof a == "function") for(t = a.call(t), l = 0; !(s = t.next()).done;)s = s.value, a = i + ko(s, l++), o += rs(s, e, n, a, r);
        else if (s === "object") throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
        return o;
    }
    function Er(t, e, n) {
        if (t == null) return t;
        var i = [], r = 0;
        return rs(t, i, "", "", function(s) {
            return e.call(n, s, r++);
        }), i;
    }
    function Sg(t) {
        if (t._status === -1) {
            var e = t._result;
            e = e(), e.then(function(n) {
                (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
            }, function(n) {
                (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
            }), t._status === -1 && (t._status = 0, t._result = e);
        }
        if (t._status === 1) return t._result.default;
        throw t._result;
    }
    var Pe = {
        current: null
    }, ss = {
        transition: null
    }, wg = {
        ReactCurrentDispatcher: Pe,
        ReactCurrentBatchConfig: ss,
        ReactCurrentOwner: aa
    };
    function lf() {
        throw Error("act(...) is not supported in production builds of React.");
    }
    z.Children = {
        map: Er,
        forEach: function(t, e, n) {
            Er(t, function() {
                e.apply(this, arguments);
            }, n);
        },
        count: function(t) {
            var e = 0;
            return Er(t, function() {
                e++;
            }), e;
        },
        toArray: function(t) {
            return Er(t, function(e) {
                return e;
            }) || [];
        },
        only: function(t) {
            if (!ua(t)) throw Error("React.Children.only expected to receive a single React element child.");
            return t;
        }
    };
    z.Component = di;
    z.Fragment = ug;
    z.Profiler = dg;
    z.PureComponent = oa;
    z.StrictMode = cg;
    z.Suspense = gg;
    z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wg;
    z.act = lf;
    z.cloneElement = function(t, e, n) {
        if (t == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
        var i = ef({}, t.props), r = t.key, s = t.ref, o = t._owner;
        if (e != null) {
            if (e.ref !== void 0 && (s = e.ref, o = aa.current), e.key !== void 0 && (r = "" + e.key), t.type && t.type.defaultProps) var l = t.type.defaultProps;
            for(a in e)rf.call(e, a) && !sf.hasOwnProperty(a) && (i[a] = e[a] === void 0 && l !== void 0 ? l[a] : e[a]);
        }
        var a = arguments.length - 2;
        if (a === 1) i.children = n;
        else if (1 < a) {
            l = Array(a);
            for(var u = 0; u < a; u++)l[u] = arguments[u + 2];
            i.children = l;
        }
        return {
            $$typeof: _r,
            type: t.type,
            key: r,
            ref: s,
            props: i,
            _owner: o
        };
    };
    z.createContext = function(t) {
        return t = {
            $$typeof: hg,
            _currentValue: t,
            _currentValue2: t,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        }, t.Provider = {
            $$typeof: fg,
            _context: t
        }, t.Consumer = t;
    };
    z.createElement = of;
    z.createFactory = function(t) {
        var e = of.bind(null, t);
        return e.type = t, e;
    };
    z.createRef = function() {
        return {
            current: null
        };
    };
    z.forwardRef = function(t) {
        return {
            $$typeof: pg,
            render: t
        };
    };
    z.isValidElement = ua;
    z.lazy = function(t) {
        return {
            $$typeof: yg,
            _payload: {
                _status: -1,
                _result: t
            },
            _init: Sg
        };
    };
    z.memo = function(t, e) {
        return {
            $$typeof: mg,
            type: t,
            compare: e === void 0 ? null : e
        };
    };
    z.startTransition = function(t) {
        var e = ss.transition;
        ss.transition = {};
        try {
            t();
        } finally{
            ss.transition = e;
        }
    };
    z.unstable_act = lf;
    z.useCallback = function(t, e) {
        return Pe.current.useCallback(t, e);
    };
    z.useContext = function(t) {
        return Pe.current.useContext(t);
    };
    z.useDebugValue = function() {};
    z.useDeferredValue = function(t) {
        return Pe.current.useDeferredValue(t);
    };
    z.useEffect = function(t, e) {
        return Pe.current.useEffect(t, e);
    };
    z.useId = function() {
        return Pe.current.useId();
    };
    z.useImperativeHandle = function(t, e, n) {
        return Pe.current.useImperativeHandle(t, e, n);
    };
    z.useInsertionEffect = function(t, e) {
        return Pe.current.useInsertionEffect(t, e);
    };
    z.useLayoutEffect = function(t, e) {
        return Pe.current.useLayoutEffect(t, e);
    };
    z.useMemo = function(t, e) {
        return Pe.current.useMemo(t, e);
    };
    z.useReducer = function(t, e, n) {
        return Pe.current.useReducer(t, e, n);
    };
    z.useRef = function(t) {
        return Pe.current.useRef(t);
    };
    z.useState = function(t) {
        return Pe.current.useState(t);
    };
    z.useSyncExternalStore = function(t, e, n) {
        return Pe.current.useSyncExternalStore(t, e, n);
    };
    z.useTransition = function() {
        return Pe.current.useTransition();
    };
    z.version = "18.3.1";
    Jd.exports = z;
    var A = Jd.exports;
    const vs = Gd(A);
    var kg = A, bg = Symbol.for("react.element"), Cg = Symbol.for("react.fragment"), Mg = Object.prototype.hasOwnProperty, Eg = kg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Pg = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function af(t, e, n) {
        var i, r = {}, s = null, o = null;
        n !== void 0 && (s = "" + n), e.key !== void 0 && (s = "" + e.key), e.ref !== void 0 && (o = e.ref);
        for(i in e)Mg.call(e, i) && !Pg.hasOwnProperty(i) && (r[i] = e[i]);
        if (t && t.defaultProps) for(i in e = t.defaultProps, e)r[i] === void 0 && (r[i] = e[i]);
        return {
            $$typeof: bg,
            type: t,
            key: s,
            ref: o,
            props: r,
            _owner: Eg.current
        };
    }
    Zs.Fragment = Cg;
    Zs.jsx = af;
    Zs.jsxs = af;
    Zd.exports = Zs;
    var g = Zd.exports, sl = {}, uf = {
        exports: {}
    }, He = {}, cf = {
        exports: {}
    }, df = {};
    (function(t) {
        function e(D, O) {
            var R = D.length;
            D.push(O);
            e: for(; 0 < R;){
                var U = R - 1 >>> 1, Y = D[U];
                if (0 < r(Y, O)) D[U] = O, D[R] = Y, R = U;
                else break e;
            }
        }
        function n(D) {
            return D.length === 0 ? null : D[0];
        }
        function i(D) {
            if (D.length === 0) return null;
            var O = D[0], R = D.pop();
            if (R !== O) {
                D[0] = R;
                e: for(var U = 0, Y = D.length, at = Y >>> 1; U < at;){
                    var be = 2 * (U + 1) - 1, vt = D[be], Ce = be + 1, Mr = D[Ce];
                    if (0 > r(vt, R)) Ce < Y && 0 > r(Mr, vt) ? (D[U] = Mr, D[Ce] = R, U = Ce) : (D[U] = vt, D[be] = R, U = be);
                    else if (Ce < Y && 0 > r(Mr, R)) D[U] = Mr, D[Ce] = R, U = Ce;
                    else break e;
                }
            }
            return O;
        }
        function r(D, O) {
            var R = D.sortIndex - O.sortIndex;
            return R !== 0 ? R : D.id - O.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
            var s = performance;
            t.unstable_now = function() {
                return s.now();
            };
        } else {
            var o = Date, l = o.now();
            t.unstable_now = function() {
                return o.now() - l;
            };
        }
        var a = [], u = [], c = 1, d = null, f = 3, p = !1, y = !1, v = !1, _ = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function x(D) {
            for(var O = n(u); O !== null;){
                if (O.callback === null) i(u);
                else if (O.startTime <= D) i(u), O.sortIndex = O.expirationTime, e(a, O);
                else break;
                O = n(u);
            }
        }
        function S(D) {
            if (v = !1, x(D), !y) if (n(a) !== null) y = !0, ie(w);
            else {
                var O = n(u);
                O !== null && ye(S, O.startTime - D);
            }
        }
        function w(D, O) {
            y = !1, v && (v = !1, m(b), b = -1), p = !0;
            var R = f;
            try {
                for(x(O), d = n(a); d !== null && (!(d.expirationTime > O) || D && !j());){
                    var U = d.callback;
                    if (typeof U == "function") {
                        d.callback = null, f = d.priorityLevel;
                        var Y = U(d.expirationTime <= O);
                        O = t.unstable_now(), typeof Y == "function" ? d.callback = Y : d === n(a) && i(a), x(O);
                    } else i(a);
                    d = n(a);
                }
                if (d !== null) var at = !0;
                else {
                    var be = n(u);
                    be !== null && ye(S, be.startTime - O), at = !1;
                }
                return at;
            } finally{
                d = null, f = R, p = !1;
            }
        }
        var C = !1, k = null, b = -1, E = 5, P = -1;
        function j() {
            return !(t.unstable_now() - P < E);
        }
        function L() {
            if (k !== null) {
                var D = t.unstable_now();
                P = D;
                var O = !0;
                try {
                    O = k(!0, D);
                } finally{
                    O ? W() : (C = !1, k = null);
                }
            } else C = !1;
        }
        var W;
        if (typeof h == "function") W = function() {
            h(L);
        };
        else if (typeof MessageChannel < "u") {
            var he = new MessageChannel, Z = he.port2;
            he.port1.onmessage = L, W = function() {
                Z.postMessage(null);
            };
        } else W = function() {
            _(L, 0);
        };
        function ie(D) {
            k = D, C || (C = !0, W());
        }
        function ye(D, O) {
            b = _(function() {
                D(t.unstable_now());
            }, O);
        }
        t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(D) {
            D.callback = null;
        }, t.unstable_continueExecution = function() {
            y || p || (y = !0, ie(w));
        }, t.unstable_forceFrameRate = function(D) {
            0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < D ? Math.floor(1e3 / D) : 5;
        }, t.unstable_getCurrentPriorityLevel = function() {
            return f;
        }, t.unstable_getFirstCallbackNode = function() {
            return n(a);
        }, t.unstable_next = function(D) {
            switch(f){
                case 1:
                case 2:
                case 3:
                    var O = 3;
                    break;
                default:
                    O = f;
            }
            var R = f;
            f = O;
            try {
                return D();
            } finally{
                f = R;
            }
        }, t.unstable_pauseExecution = function() {}, t.unstable_requestPaint = function() {}, t.unstable_runWithPriority = function(D, O) {
            switch(D){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    D = 3;
            }
            var R = f;
            f = D;
            try {
                return O();
            } finally{
                f = R;
            }
        }, t.unstable_scheduleCallback = function(D, O, R) {
            var U = t.unstable_now();
            switch(typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? U + R : U) : R = U, D){
                case 1:
                    var Y = -1;
                    break;
                case 2:
                    Y = 250;
                    break;
                case 5:
                    Y = 1073741823;
                    break;
                case 4:
                    Y = 1e4;
                    break;
                default:
                    Y = 5e3;
            }
            return Y = R + Y, D = {
                id: c++,
                callback: O,
                priorityLevel: D,
                startTime: R,
                expirationTime: Y,
                sortIndex: -1
            }, R > U ? (D.sortIndex = R, e(u, D), n(a) === null && D === n(u) && (v ? (m(b), b = -1) : v = !0, ye(S, R - U))) : (D.sortIndex = Y, e(a, D), y || p || (y = !0, ie(w))), D;
        }, t.unstable_shouldYield = j, t.unstable_wrapCallback = function(D) {
            var O = f;
            return function() {
                var R = f;
                f = O;
                try {
                    return D.apply(this, arguments);
                } finally{
                    f = R;
                }
            };
        };
    })(df);
    cf.exports = df;
    var Dg = cf.exports;
    var Tg = A, Be = Dg;
    function M(t) {
        for(var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++)e += "&args[]=" + encodeURIComponent(arguments[n]);
        return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var ff = new Set, Zi = {};
    function En(t, e) {
        qn(t, e), qn(t + "Capture", e);
    }
    function qn(t, e) {
        for(Zi[t] = e, t = 0; t < e.length; t++)ff.add(e[t]);
    }
    var Pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ol = Object.prototype.hasOwnProperty, jg = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ku = {}, bu = {};
    function Og(t) {
        return ol.call(bu, t) ? !0 : ol.call(ku, t) ? !1 : jg.test(t) ? bu[t] = !0 : (ku[t] = !0, !1);
    }
    function Rg(t, e, n, i) {
        if (n !== null && n.type === 0) return !1;
        switch(typeof e){
            case "function":
            case "symbol":
                return !0;
            case "boolean":
                return i ? !1 : n !== null ? !n.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
            default:
                return !1;
        }
    }
    function Lg(t, e, n, i) {
        if (e === null || typeof e > "u" || Rg(t, e, n, i)) return !0;
        if (i) return !1;
        if (n !== null) switch(n.type){
            case 3:
                return !e;
            case 4:
                return e === !1;
            case 5:
                return isNaN(e);
            case 6:
                return isNaN(e) || 1 > e;
        }
        return !1;
    }
    function De(t, e, n, i, r, s, o) {
        this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = s, this.removeEmptyString = o;
    }
    var me = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
        me[t] = new De(t, 0, !1, t, null, !1, !1);
    });
    [
        [
            "acceptCharset",
            "accept-charset"
        ],
        [
            "className",
            "class"
        ],
        [
            "htmlFor",
            "for"
        ],
        [
            "httpEquiv",
            "http-equiv"
        ]
    ].forEach(function(t) {
        var e = t[0];
        me[e] = new De(e, 1, !1, t[1], null, !1, !1);
    });
    [
        "contentEditable",
        "draggable",
        "spellCheck",
        "value"
    ].forEach(function(t) {
        me[t] = new De(t, 2, !1, t.toLowerCase(), null, !1, !1);
    });
    [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
    ].forEach(function(t) {
        me[t] = new De(t, 2, !1, t, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
        me[t] = new De(t, 3, !1, t.toLowerCase(), null, !1, !1);
    });
    [
        "checked",
        "multiple",
        "muted",
        "selected"
    ].forEach(function(t) {
        me[t] = new De(t, 3, !0, t, null, !1, !1);
    });
    [
        "capture",
        "download"
    ].forEach(function(t) {
        me[t] = new De(t, 4, !1, t, null, !1, !1);
    });
    [
        "cols",
        "rows",
        "size",
        "span"
    ].forEach(function(t) {
        me[t] = new De(t, 6, !1, t, null, !1, !1);
    });
    [
        "rowSpan",
        "start"
    ].forEach(function(t) {
        me[t] = new De(t, 5, !1, t.toLowerCase(), null, !1, !1);
    });
    var ca = /[\-:]([a-z])/g;
    function da(t) {
        return t[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
        var e = t.replace(ca, da);
        me[e] = new De(e, 1, !1, t, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
        var e = t.replace(ca, da);
        me[e] = new De(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
    });
    [
        "xml:base",
        "xml:lang",
        "xml:space"
    ].forEach(function(t) {
        var e = t.replace(ca, da);
        me[e] = new De(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    [
        "tabIndex",
        "crossOrigin"
    ].forEach(function(t) {
        me[t] = new De(t, 1, !1, t.toLowerCase(), null, !1, !1);
    });
    me.xlinkHref = new De("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    [
        "src",
        "href",
        "action",
        "formAction"
    ].forEach(function(t) {
        me[t] = new De(t, 1, !1, t.toLowerCase(), null, !0, !0);
    });
    function fa(t, e, n, i) {
        var r = me.hasOwnProperty(e) ? me[e] : null;
        (r !== null ? r.type !== 0 : i || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (Lg(e, n, r, i) && (n = null), i || r === null ? Og(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : r.mustUseProperty ? t[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (e = r.attributeName, i = r.attributeNamespace, n === null ? t.removeAttribute(e) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n))));
    }
    var Ot = Tg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Pr = Symbol.for("react.element"), Ln = Symbol.for("react.portal"), zn = Symbol.for("react.fragment"), ha = Symbol.for("react.strict_mode"), ll = Symbol.for("react.profiler"), hf = Symbol.for("react.provider"), pf = Symbol.for("react.context"), pa = Symbol.for("react.forward_ref"), al = Symbol.for("react.suspense"), ul = Symbol.for("react.suspense_list"), ga = Symbol.for("react.memo"), zt = Symbol.for("react.lazy"), gf = Symbol.for("react.offscreen"), Cu = Symbol.iterator;
    function mi(t) {
        return t === null || typeof t != "object" ? null : (t = Cu && t[Cu] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    var ee = Object.assign, bo;
    function Di(t) {
        if (bo === void 0) try {
            throw Error();
        } catch (n) {
            var e = n.stack.trim().match(/\n( *(at )?)/);
            bo = e && e[1] || "";
        }
        return `
` + bo + t;
    }
    var Co = !1;
    function Mo(t, e) {
        if (!t || Co) return "";
        Co = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            if (e) if (e = function() {
                throw Error();
            }, Object.defineProperty(e.prototype, "props", {
                set: function() {
                    throw Error();
                }
            }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(e, []);
                } catch (u) {
                    var i = u;
                }
                Reflect.construct(t, [], e);
            } else {
                try {
                    e.call();
                } catch (u) {
                    i = u;
                }
                t.call(e.prototype);
            }
            else {
                try {
                    throw Error();
                } catch (u) {
                    i = u;
                }
                t();
            }
        } catch (u) {
            if (u && i && typeof u.stack == "string") {
                for(var r = u.stack.split(`
`), s = i.stack.split(`
`), o = r.length - 1, l = s.length - 1; 1 <= o && 0 <= l && r[o] !== s[l];)l--;
                for(; 1 <= o && 0 <= l; o--, l--)if (r[o] !== s[l]) {
                    if (o !== 1 || l !== 1) do if (o--, l--, 0 > l || r[o] !== s[l]) {
                        var a = `
` + r[o].replace(" at new ", " at ");
                        return t.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", t.displayName)), a;
                    }
                    while (1 <= o && 0 <= l);
                    break;
                }
            }
        } finally{
            Co = !1, Error.prepareStackTrace = n;
        }
        return (t = t ? t.displayName || t.name : "") ? Di(t) : "";
    }
    function zg(t) {
        switch(t.tag){
            case 5:
                return Di(t.type);
            case 16:
                return Di("Lazy");
            case 13:
                return Di("Suspense");
            case 19:
                return Di("SuspenseList");
            case 0:
            case 2:
            case 15:
                return t = Mo(t.type, !1), t;
            case 11:
                return t = Mo(t.type.render, !1), t;
            case 1:
                return t = Mo(t.type, !0), t;
            default:
                return "";
        }
    }
    function cl(t) {
        if (t == null) return null;
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
        switch(t){
            case zn:
                return "Fragment";
            case Ln:
                return "Portal";
            case ll:
                return "Profiler";
            case ha:
                return "StrictMode";
            case al:
                return "Suspense";
            case ul:
                return "SuspenseList";
        }
        if (typeof t == "object") switch(t.$$typeof){
            case pf:
                return (t.displayName || "Context") + ".Consumer";
            case hf:
                return (t._context.displayName || "Context") + ".Provider";
            case pa:
                var e = t.render;
                return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
            case ga:
                return e = t.displayName || null, e !== null ? e : cl(t.type) || "Memo";
            case zt:
                e = t._payload, t = t._init;
                try {
                    return cl(t(e));
                } catch  {}
        }
        return null;
    }
    function Ig(t) {
        var e = t.type;
        switch(t.tag){
            case 24:
                return "Cache";
            case 9:
                return (e.displayName || "Context") + ".Consumer";
            case 10:
                return (e._context.displayName || "Context") + ".Provider";
            case 18:
                return "DehydratedFragment";
            case 11:
                return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
            case 7:
                return "Fragment";
            case 5:
                return e;
            case 4:
                return "Portal";
            case 3:
                return "Root";
            case 6:
                return "Text";
            case 16:
                return cl(e);
            case 8:
                return e === ha ? "StrictMode" : "Mode";
            case 22:
                return "Offscreen";
            case 12:
                return "Profiler";
            case 21:
                return "Scope";
            case 13:
                return "Suspense";
            case 19:
                return "SuspenseList";
            case 25:
                return "TracingMarker";
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
                if (typeof e == "function") return e.displayName || e.name || null;
                if (typeof e == "string") return e;
        }
        return null;
    }
    function Jt(t) {
        switch(typeof t){
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return t;
            case "object":
                return t;
            default:
                return "";
        }
    }
    function mf(t) {
        var e = t.type;
        return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
    }
    function Ng(t) {
        var e = mf(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), i = "" + t[e];
        if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
            var r = n.get, s = n.set;
            return Object.defineProperty(t, e, {
                configurable: !0,
                get: function() {
                    return r.call(this);
                },
                set: function(o) {
                    i = "" + o, s.call(this, o);
                }
            }), Object.defineProperty(t, e, {
                enumerable: n.enumerable
            }), {
                getValue: function() {
                    return i;
                },
                setValue: function(o) {
                    i = "" + o;
                },
                stopTracking: function() {
                    t._valueTracker = null, delete t[e];
                }
            };
        }
    }
    function Dr(t) {
        t._valueTracker || (t._valueTracker = Ng(t));
    }
    function yf(t) {
        if (!t) return !1;
        var e = t._valueTracker;
        if (!e) return !0;
        var n = e.getValue(), i = "";
        return t && (i = mf(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
    }
    function xs(t) {
        if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
        try {
            return t.activeElement || t.body;
        } catch  {
            return t.body;
        }
    }
    function dl(t, e) {
        var n = e.checked;
        return ee({}, e, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: n ?? t._wrapperState.initialChecked
        });
    }
    function Mu(t, e) {
        var n = e.defaultValue == null ? "" : e.defaultValue, i = e.checked != null ? e.checked : e.defaultChecked;
        n = Jt(e.value != null ? e.value : n), t._wrapperState = {
            initialChecked: i,
            initialValue: n,
            controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null
        };
    }
    function vf(t, e) {
        e = e.checked, e != null && fa(t, "checked", e, !1);
    }
    function fl(t, e) {
        vf(t, e);
        var n = Jt(e.value), i = e.type;
        if (n != null) i === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
        else if (i === "submit" || i === "reset") {
            t.removeAttribute("value");
            return;
        }
        e.hasOwnProperty("value") ? hl(t, e.type, n) : e.hasOwnProperty("defaultValue") && hl(t, e.type, Jt(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
    }
    function Eu(t, e, n) {
        if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
            var i = e.type;
            if (!(i !== "submit" && i !== "reset" || e.value !== void 0 && e.value !== null)) return;
            e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
        }
        n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
    }
    function hl(t, e, n) {
        (e !== "number" || xs(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
    }
    var Ti = Array.isArray;
    function Yn(t, e, n, i) {
        if (t = t.options, e) {
            e = {};
            for(var r = 0; r < n.length; r++)e["$" + n[r]] = !0;
            for(n = 0; n < t.length; n++)r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && i && (t[n].defaultSelected = !0);
        } else {
            for(n = "" + Jt(n), e = null, r = 0; r < t.length; r++){
                if (t[r].value === n) {
                    t[r].selected = !0, i && (t[r].defaultSelected = !0);
                    return;
                }
                e !== null || t[r].disabled || (e = t[r]);
            }
            e !== null && (e.selected = !0);
        }
    }
    function pl(t, e) {
        if (e.dangerouslySetInnerHTML != null) throw Error(M(91));
        return ee({}, e, {
            value: void 0,
            defaultValue: void 0,
            children: "" + t._wrapperState.initialValue
        });
    }
    function Pu(t, e) {
        var n = e.value;
        if (n == null) {
            if (n = e.children, e = e.defaultValue, n != null) {
                if (e != null) throw Error(M(92));
                if (Ti(n)) {
                    if (1 < n.length) throw Error(M(93));
                    n = n[0];
                }
                e = n;
            }
            e == null && (e = ""), n = e;
        }
        t._wrapperState = {
            initialValue: Jt(n)
        };
    }
    function xf(t, e) {
        var n = Jt(e.value), i = Jt(e.defaultValue);
        n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), i != null && (t.defaultValue = "" + i);
    }
    function Du(t) {
        var e = t.textContent;
        e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
    }
    function _f(t) {
        switch(t){
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml";
        }
    }
    function gl(t, e) {
        return t == null || t === "http://www.w3.org/1999/xhtml" ? _f(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
    }
    var Tr, Sf = function(t) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, i, r) {
            MSApp.execUnsafeLocalFunction(function() {
                return t(e, n, i, r);
            });
        } : t;
    }(function(t, e) {
        if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = e;
        else {
            for(Tr = Tr || document.createElement("div"), Tr.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = Tr.firstChild; t.firstChild;)t.removeChild(t.firstChild);
            for(; e.firstChild;)t.appendChild(e.firstChild);
        }
    });
    function Ji(t, e) {
        if (e) {
            var n = t.firstChild;
            if (n && n === t.lastChild && n.nodeType === 3) {
                n.nodeValue = e;
                return;
            }
        }
        t.textContent = e;
    }
    var Ni = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }, Fg = [
        "Webkit",
        "ms",
        "Moz",
        "O"
    ];
    Object.keys(Ni).forEach(function(t) {
        Fg.forEach(function(e) {
            e = e + t.charAt(0).toUpperCase() + t.substring(1), Ni[e] = Ni[t];
        });
    });
    function wf(t, e, n) {
        return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || Ni.hasOwnProperty(t) && Ni[t] ? ("" + e).trim() : e + "px";
    }
    function kf(t, e) {
        t = t.style;
        for(var n in e)if (e.hasOwnProperty(n)) {
            var i = n.indexOf("--") === 0, r = wf(n, e[n], i);
            n === "float" && (n = "cssFloat"), i ? t.setProperty(n, r) : t[n] = r;
        }
    }
    var Ag = ee({
        menuitem: !0
    }, {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    });
    function ml(t, e) {
        if (e) {
            if (Ag[t] && (e.children != null || e.dangerouslySetInnerHTML != null)) throw Error(M(137, t));
            if (e.dangerouslySetInnerHTML != null) {
                if (e.children != null) throw Error(M(60));
                if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML)) throw Error(M(61));
            }
            if (e.style != null && typeof e.style != "object") throw Error(M(62));
        }
    }
    function yl(t, e) {
        if (t.indexOf("-") === -1) return typeof e.is == "string";
        switch(t){
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0;
        }
    }
    var vl = null;
    function ma(t) {
        return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
    }
    var xl = null, Xn = null, Qn = null;
    function Tu(t) {
        if (t = kr(t)) {
            if (typeof xl != "function") throw Error(M(280));
            var e = t.stateNode;
            e && (e = no(e), xl(t.stateNode, t.type, e));
        }
    }
    function bf(t) {
        Xn ? Qn ? Qn.push(t) : Qn = [
            t
        ] : Xn = t;
    }
    function Cf() {
        if (Xn) {
            var t = Xn, e = Qn;
            if (Qn = Xn = null, Tu(t), e) for(t = 0; t < e.length; t++)Tu(e[t]);
        }
    }
    function Mf(t, e) {
        return t(e);
    }
    function Ef() {}
    var Eo = !1;
    function Pf(t, e, n) {
        if (Eo) return t(e, n);
        Eo = !0;
        try {
            return Mf(t, e, n);
        } finally{
            Eo = !1, (Xn !== null || Qn !== null) && (Ef(), Cf());
        }
    }
    function qi(t, e) {
        var n = t.stateNode;
        if (n === null) return null;
        var i = no(n);
        if (i === null) return null;
        n = i[e];
        e: switch(e){
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
                break e;
            default:
                t = !1;
        }
        if (t) return null;
        if (n && typeof n != "function") throw Error(M(231, e, typeof n));
        return n;
    }
    var _l = !1;
    if (Pt) try {
        var yi = {};
        Object.defineProperty(yi, "passive", {
            get: function() {
                _l = !0;
            }
        }), window.addEventListener("test", yi, yi), window.removeEventListener("test", yi, yi);
    } catch  {
        _l = !1;
    }
    function Bg(t, e, n, i, r, s, o, l, a) {
        var u = Array.prototype.slice.call(arguments, 3);
        try {
            e.apply(n, u);
        } catch (c) {
            this.onError(c);
        }
    }
    var Fi = !1, _s = null, Ss = !1, Sl = null, Hg = {
        onError: function(t) {
            Fi = !0, _s = t;
        }
    };
    function Wg(t, e, n, i, r, s, o, l, a) {
        Fi = !1, _s = null, Bg.apply(Hg, arguments);
    }
    function Vg(t, e, n, i, r, s, o, l, a) {
        if (Wg.apply(this, arguments), Fi) {
            if (Fi) {
                var u = _s;
                Fi = !1, _s = null;
            } else throw Error(M(198));
            Ss || (Ss = !0, Sl = u);
        }
    }
    function Pn(t) {
        var e = t, n = t;
        if (t.alternate) for(; e.return;)e = e.return;
        else {
            t = e;
            do e = t, e.flags & 4098 && (n = e.return), t = e.return;
            while (t);
        }
        return e.tag === 3 ? n : null;
    }
    function Df(t) {
        if (t.tag === 13) {
            var e = t.memoizedState;
            if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
        }
        return null;
    }
    function ju(t) {
        if (Pn(t) !== t) throw Error(M(188));
    }
    function Ug(t) {
        var e = t.alternate;
        if (!e) {
            if (e = Pn(t), e === null) throw Error(M(188));
            return e !== t ? null : t;
        }
        for(var n = t, i = e;;){
            var r = n.return;
            if (r === null) break;
            var s = r.alternate;
            if (s === null) {
                if (i = r.return, i !== null) {
                    n = i;
                    continue;
                }
                break;
            }
            if (r.child === s.child) {
                for(s = r.child; s;){
                    if (s === n) return ju(r), t;
                    if (s === i) return ju(r), e;
                    s = s.sibling;
                }
                throw Error(M(188));
            }
            if (n.return !== i.return) n = r, i = s;
            else {
                for(var o = !1, l = r.child; l;){
                    if (l === n) {
                        o = !0, n = r, i = s;
                        break;
                    }
                    if (l === i) {
                        o = !0, i = r, n = s;
                        break;
                    }
                    l = l.sibling;
                }
                if (!o) {
                    for(l = s.child; l;){
                        if (l === n) {
                            o = !0, n = s, i = r;
                            break;
                        }
                        if (l === i) {
                            o = !0, i = s, n = r;
                            break;
                        }
                        l = l.sibling;
                    }
                    if (!o) throw Error(M(189));
                }
            }
            if (n.alternate !== i) throw Error(M(190));
        }
        if (n.tag !== 3) throw Error(M(188));
        return n.stateNode.current === n ? t : e;
    }
    function Tf(t) {
        return t = Ug(t), t !== null ? jf(t) : null;
    }
    function jf(t) {
        if (t.tag === 5 || t.tag === 6) return t;
        for(t = t.child; t !== null;){
            var e = jf(t);
            if (e !== null) return e;
            t = t.sibling;
        }
        return null;
    }
    var Of = Be.unstable_scheduleCallback, Ou = Be.unstable_cancelCallback, $g = Be.unstable_shouldYield, Yg = Be.unstable_requestPaint, re = Be.unstable_now, Xg = Be.unstable_getCurrentPriorityLevel, ya = Be.unstable_ImmediatePriority, Rf = Be.unstable_UserBlockingPriority, ws = Be.unstable_NormalPriority, Qg = Be.unstable_LowPriority, Lf = Be.unstable_IdlePriority, Js = null, gt = null;
    function Kg(t) {
        if (gt && typeof gt.onCommitFiberRoot == "function") try {
            gt.onCommitFiberRoot(Js, t, void 0, (t.current.flags & 128) === 128);
        } catch  {}
    }
    var st = Math.clz32 ? Math.clz32 : Jg, Gg = Math.log, Zg = Math.LN2;
    function Jg(t) {
        return t >>>= 0, t === 0 ? 32 : 31 - (Gg(t) / Zg | 0) | 0;
    }
    var jr = 64, Or = 4194304;
    function ji(t) {
        switch(t & -t){
            case 1:
                return 1;
            case 2:
                return 2;
            case 4:
                return 4;
            case 8:
                return 8;
            case 16:
                return 16;
            case 32:
                return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return t & 4194240;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                return t & 130023424;
            case 134217728:
                return 134217728;
            case 268435456:
                return 268435456;
            case 536870912:
                return 536870912;
            case 1073741824:
                return 1073741824;
            default:
                return t;
        }
    }
    function ks(t, e) {
        var n = t.pendingLanes;
        if (n === 0) return 0;
        var i = 0, r = t.suspendedLanes, s = t.pingedLanes, o = n & 268435455;
        if (o !== 0) {
            var l = o & ~r;
            l !== 0 ? i = ji(l) : (s &= o, s !== 0 && (i = ji(s)));
        } else o = n & ~r, o !== 0 ? i = ji(o) : s !== 0 && (i = ji(s));
        if (i === 0) return 0;
        if (e !== 0 && e !== i && !(e & r) && (r = i & -i, s = e & -e, r >= s || r === 16 && (s & 4194240) !== 0)) return e;
        if (i & 4 && (i |= n & 16), e = t.entangledLanes, e !== 0) for(t = t.entanglements, e &= i; 0 < e;)n = 31 - st(e), r = 1 << n, i |= t[n], e &= ~r;
        return i;
    }
    function qg(t, e) {
        switch(t){
            case 1:
            case 2:
            case 4:
                return e + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return e + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                return -1;
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
                return -1;
            default:
                return -1;
        }
    }
    function em(t, e) {
        for(var n = t.suspendedLanes, i = t.pingedLanes, r = t.expirationTimes, s = t.pendingLanes; 0 < s;){
            var o = 31 - st(s), l = 1 << o, a = r[o];
            a === -1 ? (!(l & n) || l & i) && (r[o] = qg(l, e)) : a <= e && (t.expiredLanes |= l), s &= ~l;
        }
    }
    function wl(t) {
        return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
    }
    function zf() {
        var t = jr;
        return jr <<= 1, !(jr & 4194240) && (jr = 64), t;
    }
    function Po(t) {
        for(var e = [], n = 0; 31 > n; n++)e.push(t);
        return e;
    }
    function Sr(t, e, n) {
        t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - st(e), t[e] = n;
    }
    function tm(t, e) {
        var n = t.pendingLanes & ~e;
        t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
        var i = t.eventTimes;
        for(t = t.expirationTimes; 0 < n;){
            var r = 31 - st(n), s = 1 << r;
            e[r] = 0, i[r] = -1, t[r] = -1, n &= ~s;
        }
    }
    function va(t, e) {
        var n = t.entangledLanes |= e;
        for(t = t.entanglements; n;){
            var i = 31 - st(n), r = 1 << i;
            r & e | t[i] & e && (t[i] |= e), n &= ~r;
        }
    }
    var H = 0;
    function If(t) {
        return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var Nf, xa, Ff, Af, Bf, kl = !1, Rr = [], Vt = null, Ut = null, $t = null, er = new Map, tr = new Map, Nt = [], nm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Ru(t, e) {
        switch(t){
            case "focusin":
            case "focusout":
                Vt = null;
                break;
            case "dragenter":
            case "dragleave":
                Ut = null;
                break;
            case "mouseover":
            case "mouseout":
                $t = null;
                break;
            case "pointerover":
            case "pointerout":
                er.delete(e.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                tr.delete(e.pointerId);
        }
    }
    function vi(t, e, n, i, r, s) {
        return t === null || t.nativeEvent !== s ? (t = {
            blockedOn: e,
            domEventName: n,
            eventSystemFlags: i,
            nativeEvent: s,
            targetContainers: [
                r
            ]
        }, e !== null && (e = kr(e), e !== null && xa(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
    }
    function im(t, e, n, i, r) {
        switch(e){
            case "focusin":
                return Vt = vi(Vt, t, e, n, i, r), !0;
            case "dragenter":
                return Ut = vi(Ut, t, e, n, i, r), !0;
            case "mouseover":
                return $t = vi($t, t, e, n, i, r), !0;
            case "pointerover":
                var s = r.pointerId;
                return er.set(s, vi(er.get(s) || null, t, e, n, i, r)), !0;
            case "gotpointercapture":
                return s = r.pointerId, tr.set(s, vi(tr.get(s) || null, t, e, n, i, r)), !0;
        }
        return !1;
    }
    function Hf(t) {
        var e = hn(t.target);
        if (e !== null) {
            var n = Pn(e);
            if (n !== null) {
                if (e = n.tag, e === 13) {
                    if (e = Df(n), e !== null) {
                        t.blockedOn = e, Bf(t.priority, function() {
                            Ff(n);
                        });
                        return;
                    }
                } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                    t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                    return;
                }
            }
        }
        t.blockedOn = null;
    }
    function os(t) {
        if (t.blockedOn !== null) return !1;
        for(var e = t.targetContainers; 0 < e.length;){
            var n = bl(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
            if (n === null) {
                n = t.nativeEvent;
                var i = new n.constructor(n.type, n);
                vl = i, n.target.dispatchEvent(i), vl = null;
            } else return e = kr(n), e !== null && xa(e), t.blockedOn = n, !1;
            e.shift();
        }
        return !0;
    }
    function Lu(t, e, n) {
        os(t) && n.delete(e);
    }
    function rm() {
        kl = !1, Vt !== null && os(Vt) && (Vt = null), Ut !== null && os(Ut) && (Ut = null), $t !== null && os($t) && ($t = null), er.forEach(Lu), tr.forEach(Lu);
    }
    function xi(t, e) {
        t.blockedOn === e && (t.blockedOn = null, kl || (kl = !0, Be.unstable_scheduleCallback(Be.unstable_NormalPriority, rm)));
    }
    function nr(t) {
        function e(r) {
            return xi(r, t);
        }
        if (0 < Rr.length) {
            xi(Rr[0], t);
            for(var n = 1; n < Rr.length; n++){
                var i = Rr[n];
                i.blockedOn === t && (i.blockedOn = null);
            }
        }
        for(Vt !== null && xi(Vt, t), Ut !== null && xi(Ut, t), $t !== null && xi($t, t), er.forEach(e), tr.forEach(e), n = 0; n < Nt.length; n++)i = Nt[n], i.blockedOn === t && (i.blockedOn = null);
        for(; 0 < Nt.length && (n = Nt[0], n.blockedOn === null);)Hf(n), n.blockedOn === null && Nt.shift();
    }
    var Kn = Ot.ReactCurrentBatchConfig, bs = !0;
    function sm(t, e, n, i) {
        var r = H, s = Kn.transition;
        Kn.transition = null;
        try {
            H = 1, _a(t, e, n, i);
        } finally{
            H = r, Kn.transition = s;
        }
    }
    function om(t, e, n, i) {
        var r = H, s = Kn.transition;
        Kn.transition = null;
        try {
            H = 4, _a(t, e, n, i);
        } finally{
            H = r, Kn.transition = s;
        }
    }
    function _a(t, e, n, i) {
        if (bs) {
            var r = bl(t, e, n, i);
            if (r === null) Fo(t, e, i, Cs, n), Ru(t, i);
            else if (im(r, t, e, n, i)) i.stopPropagation();
            else if (Ru(t, i), e & 4 && -1 < nm.indexOf(t)) {
                for(; r !== null;){
                    var s = kr(r);
                    if (s !== null && Nf(s), s = bl(t, e, n, i), s === null && Fo(t, e, i, Cs, n), s === r) break;
                    r = s;
                }
                r !== null && i.stopPropagation();
            } else Fo(t, e, i, null, n);
        }
    }
    var Cs = null;
    function bl(t, e, n, i) {
        if (Cs = null, t = ma(i), t = hn(t), t !== null) if (e = Pn(t), e === null) t = null;
        else if (n = e.tag, n === 13) {
            if (t = Df(e), t !== null) return t;
            t = null;
        } else if (n === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
        } else e !== t && (t = null);
        return Cs = t, null;
    }
    function Wf(t) {
        switch(t){
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
                return 1;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "toggle":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
                return 4;
            case "message":
                switch(Xg()){
                    case ya:
                        return 1;
                    case Rf:
                        return 4;
                    case ws:
                    case Qg:
                        return 16;
                    case Lf:
                        return 536870912;
                    default:
                        return 16;
                }
            default:
                return 16;
        }
    }
    var At = null, Sa = null, ls = null;
    function Vf() {
        if (ls) return ls;
        var t, e = Sa, n = e.length, i, r = "value" in At ? At.value : At.textContent, s = r.length;
        for(t = 0; t < n && e[t] === r[t]; t++);
        var o = n - t;
        for(i = 1; i <= o && e[n - i] === r[s - i]; i++);
        return ls = r.slice(t, 1 < i ? 1 - i : void 0);
    }
    function as(t) {
        var e = t.keyCode;
        return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function Lr() {
        return !0;
    }
    function zu() {
        return !1;
    }
    function We(t) {
        function e(n, i, r, s, o) {
            this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = s, this.target = o, this.currentTarget = null;
            for(var l in t)t.hasOwnProperty(l) && (n = t[l], this[l] = n ? n(s) : s[l]);
            return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Lr : zu, this.isPropagationStopped = zu, this;
        }
        return ee(e.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Lr);
            },
            stopPropagation: function() {
                var n = this.nativeEvent;
                n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Lr);
            },
            persist: function() {},
            isPersistent: Lr
        }), e;
    }
    var fi = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(t) {
            return t.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, wa = We(fi), wr = ee({}, fi, {
        view: 0,
        detail: 0
    }), lm = We(wr), Do, To, _i, qs = ee({}, wr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ka,
        button: 0,
        buttons: 0,
        relatedTarget: function(t) {
            return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
        },
        movementX: function(t) {
            return "movementX" in t ? t.movementX : (t !== _i && (_i && t.type === "mousemove" ? (Do = t.screenX - _i.screenX, To = t.screenY - _i.screenY) : To = Do = 0, _i = t), Do);
        },
        movementY: function(t) {
            return "movementY" in t ? t.movementY : To;
        }
    }), Iu = We(qs), am = ee({}, qs, {
        dataTransfer: 0
    }), um = We(am), cm = ee({}, wr, {
        relatedTarget: 0
    }), jo = We(cm), dm = ee({}, fi, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), fm = We(dm), hm = ee({}, fi, {
        clipboardData: function(t) {
            return "clipboardData" in t ? t.clipboardData : window.clipboardData;
        }
    }), pm = We(hm), gm = ee({}, fi, {
        data: 0
    }), Nu = We(gm), mm = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, ym = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, vm = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function xm(t) {
        var e = this.nativeEvent;
        return e.getModifierState ? e.getModifierState(t) : (t = vm[t]) ? !!e[t] : !1;
    }
    function ka() {
        return xm;
    }
    var _m = ee({}, wr, {
        key: function(t) {
            if (t.key) {
                var e = mm[t.key] || t.key;
                if (e !== "Unidentified") return e;
            }
            return t.type === "keypress" ? (t = as(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? ym[t.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ka,
        charCode: function(t) {
            return t.type === "keypress" ? as(t) : 0;
        },
        keyCode: function(t) {
            return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
        },
        which: function(t) {
            return t.type === "keypress" ? as(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
        }
    }), Sm = We(_m), wm = ee({}, qs, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }), Fu = We(wm), km = ee({}, wr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ka
    }), bm = We(km), Cm = ee({}, fi, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), Mm = We(Cm), Em = ee({}, qs, {
        deltaX: function(t) {
            return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
        },
        deltaY: function(t) {
            return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
    }), Pm = We(Em), Dm = [
        9,
        13,
        27,
        32
    ], ba = Pt && "CompositionEvent" in window, Ai = null;
    Pt && "documentMode" in document && (Ai = document.documentMode);
    var Tm = Pt && "TextEvent" in window && !Ai, Uf = Pt && (!ba || Ai && 8 < Ai && 11 >= Ai), Au = " ", Bu = !1;
    function $f(t, e) {
        switch(t){
            case "keyup":
                return Dm.indexOf(e.keyCode) !== -1;
            case "keydown":
                return e.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1;
        }
    }
    function Yf(t) {
        return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
    }
    var In = !1;
    function jm(t, e) {
        switch(t){
            case "compositionend":
                return Yf(e);
            case "keypress":
                return e.which !== 32 ? null : (Bu = !0, Au);
            case "textInput":
                return t = e.data, t === Au && Bu ? null : t;
            default:
                return null;
        }
    }
    function Om(t, e) {
        if (In) return t === "compositionend" || !ba && $f(t, e) ? (t = Vf(), ls = Sa = At = null, In = !1, t) : null;
        switch(t){
            case "paste":
                return null;
            case "keypress":
                if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
                    if (e.char && 1 < e.char.length) return e.char;
                    if (e.which) return String.fromCharCode(e.which);
                }
                return null;
            case "compositionend":
                return Uf && e.locale !== "ko" ? null : e.data;
            default:
                return null;
        }
    }
    var Rm = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function Hu(t) {
        var e = t && t.nodeName && t.nodeName.toLowerCase();
        return e === "input" ? !!Rm[t.type] : e === "textarea";
    }
    function Xf(t, e, n, i) {
        bf(i), e = Ms(e, "onChange"), 0 < e.length && (n = new wa("onChange", "change", null, n, i), t.push({
            event: n,
            listeners: e
        }));
    }
    var Bi = null, ir = null;
    function Lm(t) {
        rh(t, 0);
    }
    function eo(t) {
        var e = An(t);
        if (yf(e)) return t;
    }
    function zm(t, e) {
        if (t === "change") return e;
    }
    var Qf = !1;
    if (Pt) {
        var Oo;
        if (Pt) {
            var Ro = "oninput" in document;
            if (!Ro) {
                var Wu = document.createElement("div");
                Wu.setAttribute("oninput", "return;"), Ro = typeof Wu.oninput == "function";
            }
            Oo = Ro;
        } else Oo = !1;
        Qf = Oo && (!document.documentMode || 9 < document.documentMode);
    }
    function Vu() {
        Bi && (Bi.detachEvent("onpropertychange", Kf), ir = Bi = null);
    }
    function Kf(t) {
        if (t.propertyName === "value" && eo(ir)) {
            var e = [];
            Xf(e, ir, t, ma(t)), Pf(Lm, e);
        }
    }
    function Im(t, e, n) {
        t === "focusin" ? (Vu(), Bi = e, ir = n, Bi.attachEvent("onpropertychange", Kf)) : t === "focusout" && Vu();
    }
    function Nm(t) {
        if (t === "selectionchange" || t === "keyup" || t === "keydown") return eo(ir);
    }
    function Fm(t, e) {
        if (t === "click") return eo(e);
    }
    function Am(t, e) {
        if (t === "input" || t === "change") return eo(e);
    }
    function Bm(t, e) {
        return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    var lt = typeof Object.is == "function" ? Object.is : Bm;
    function rr(t, e) {
        if (lt(t, e)) return !0;
        if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
        var n = Object.keys(t), i = Object.keys(e);
        if (n.length !== i.length) return !1;
        for(i = 0; i < n.length; i++){
            var r = n[i];
            if (!ol.call(e, r) || !lt(t[r], e[r])) return !1;
        }
        return !0;
    }
    function Uu(t) {
        for(; t && t.firstChild;)t = t.firstChild;
        return t;
    }
    function $u(t, e) {
        var n = Uu(t);
        t = 0;
        for(var i; n;){
            if (n.nodeType === 3) {
                if (i = t + n.textContent.length, t <= e && i >= e) return {
                    node: n,
                    offset: e - t
                };
                t = i;
            }
            e: {
                for(; n;){
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e;
                    }
                    n = n.parentNode;
                }
                n = void 0;
            }
            n = Uu(n);
        }
    }
    function Gf(t, e) {
        return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Gf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
    }
    function Zf() {
        for(var t = window, e = xs(); e instanceof t.HTMLIFrameElement;){
            try {
                var n = typeof e.contentWindow.location.href == "string";
            } catch  {
                n = !1;
            }
            if (n) t = e.contentWindow;
            else break;
            e = xs(t.document);
        }
        return e;
    }
    function Ca(t) {
        var e = t && t.nodeName && t.nodeName.toLowerCase();
        return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
    }
    function Hm(t) {
        var e = Zf(), n = t.focusedElem, i = t.selectionRange;
        if (e !== n && n && n.ownerDocument && Gf(n.ownerDocument.documentElement, n)) {
            if (i !== null && Ca(n)) {
                if (e = i.start, t = i.end, t === void 0 && (t = e), "selectionStart" in n) n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
                else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
                    t = t.getSelection();
                    var r = n.textContent.length, s = Math.min(i.start, r);
                    i = i.end === void 0 ? s : Math.min(i.end, r), !t.extend && s > i && (r = i, i = s, s = r), r = $u(n, s);
                    var o = $u(n, i);
                    r && o && (t.rangeCount !== 1 || t.anchorNode !== r.node || t.anchorOffset !== r.offset || t.focusNode !== o.node || t.focusOffset !== o.offset) && (e = e.createRange(), e.setStart(r.node, r.offset), t.removeAllRanges(), s > i ? (t.addRange(e), t.extend(o.node, o.offset)) : (e.setEnd(o.node, o.offset), t.addRange(e)));
                }
            }
            for(e = [], t = n; t = t.parentNode;)t.nodeType === 1 && e.push({
                element: t,
                left: t.scrollLeft,
                top: t.scrollTop
            });
            for(typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++)t = e[n], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
        }
    }
    var Wm = Pt && "documentMode" in document && 11 >= document.documentMode, Nn = null, Cl = null, Hi = null, Ml = !1;
    function Yu(t, e, n) {
        var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        Ml || Nn == null || Nn !== xs(i) || (i = Nn, "selectionStart" in i && Ca(i) ? i = {
            start: i.selectionStart,
            end: i.selectionEnd
        } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset
        }), Hi && rr(Hi, i) || (Hi = i, i = Ms(Cl, "onSelect"), 0 < i.length && (e = new wa("onSelect", "select", null, e, n), t.push({
            event: e,
            listeners: i
        }), e.target = Nn)));
    }
    function zr(t, e) {
        var n = {};
        return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
    }
    var Fn = {
        animationend: zr("Animation", "AnimationEnd"),
        animationiteration: zr("Animation", "AnimationIteration"),
        animationstart: zr("Animation", "AnimationStart"),
        transitionend: zr("Transition", "TransitionEnd")
    }, Lo = {}, Jf = {};
    Pt && (Jf = document.createElement("div").style, "AnimationEvent" in window || (delete Fn.animationend.animation, delete Fn.animationiteration.animation, delete Fn.animationstart.animation), "TransitionEvent" in window || delete Fn.transitionend.transition);
    function to(t) {
        if (Lo[t]) return Lo[t];
        if (!Fn[t]) return t;
        var e = Fn[t], n;
        for(n in e)if (e.hasOwnProperty(n) && n in Jf) return Lo[t] = e[n];
        return t;
    }
    var qf = to("animationend"), eh = to("animationiteration"), th = to("animationstart"), nh = to("transitionend"), ih = new Map, Xu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function tn(t, e) {
        ih.set(t, e), En(e, [
            t
        ]);
    }
    for(var zo = 0; zo < Xu.length; zo++){
        var Io = Xu[zo], Vm = Io.toLowerCase(), Um = Io[0].toUpperCase() + Io.slice(1);
        tn(Vm, "on" + Um);
    }
    tn(qf, "onAnimationEnd");
    tn(eh, "onAnimationIteration");
    tn(th, "onAnimationStart");
    tn("dblclick", "onDoubleClick");
    tn("focusin", "onFocus");
    tn("focusout", "onBlur");
    tn(nh, "onTransitionEnd");
    qn("onMouseEnter", [
        "mouseout",
        "mouseover"
    ]);
    qn("onMouseLeave", [
        "mouseout",
        "mouseover"
    ]);
    qn("onPointerEnter", [
        "pointerout",
        "pointerover"
    ]);
    qn("onPointerLeave", [
        "pointerout",
        "pointerover"
    ]);
    En("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    En("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    En("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
    ]);
    En("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    En("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    En("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Oi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $m = new Set("cancel close invalid load scroll toggle".split(" ").concat(Oi));
    function Qu(t, e, n) {
        var i = t.type || "unknown-event";
        t.currentTarget = n, Vg(i, e, void 0, t), t.currentTarget = null;
    }
    function rh(t, e) {
        e = (e & 4) !== 0;
        for(var n = 0; n < t.length; n++){
            var i = t[n], r = i.event;
            i = i.listeners;
            e: {
                var s = void 0;
                if (e) for(var o = i.length - 1; 0 <= o; o--){
                    var l = i[o], a = l.instance, u = l.currentTarget;
                    if (l = l.listener, a !== s && r.isPropagationStopped()) break e;
                    Qu(r, l, u), s = a;
                }
                else for(o = 0; o < i.length; o++){
                    if (l = i[o], a = l.instance, u = l.currentTarget, l = l.listener, a !== s && r.isPropagationStopped()) break e;
                    Qu(r, l, u), s = a;
                }
            }
        }
        if (Ss) throw t = Sl, Ss = !1, Sl = null, t;
    }
    function X(t, e) {
        var n = e[jl];
        n === void 0 && (n = e[jl] = new Set);
        var i = t + "__bubble";
        n.has(i) || (sh(e, t, 2, !1), n.add(i));
    }
    function No(t, e, n) {
        var i = 0;
        e && (i |= 4), sh(n, t, i, e);
    }
    var Ir = "_reactListening" + Math.random().toString(36).slice(2);
    function sr(t) {
        if (!t[Ir]) {
            t[Ir] = !0, ff.forEach(function(n) {
                n !== "selectionchange" && ($m.has(n) || No(n, !1, t), No(n, !0, t));
            });
            var e = t.nodeType === 9 ? t : t.ownerDocument;
            e === null || e[Ir] || (e[Ir] = !0, No("selectionchange", !1, e));
        }
    }
    function sh(t, e, n, i) {
        switch(Wf(e)){
            case 1:
                var r = sm;
                break;
            case 4:
                r = om;
                break;
            default:
                r = _a;
        }
        n = r.bind(null, e, n, t), r = void 0, !_l || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), i ? r !== void 0 ? t.addEventListener(e, n, {
            capture: !0,
            passive: r
        }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, {
            passive: r
        }) : t.addEventListener(e, n, !1);
    }
    function Fo(t, e, n, i, r) {
        var s = i;
        if (!(e & 1) && !(e & 2) && i !== null) e: for(;;){
            if (i === null) return;
            var o = i.tag;
            if (o === 3 || o === 4) {
                var l = i.stateNode.containerInfo;
                if (l === r || l.nodeType === 8 && l.parentNode === r) break;
                if (o === 4) for(o = i.return; o !== null;){
                    var a = o.tag;
                    if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === r || a.nodeType === 8 && a.parentNode === r)) return;
                    o = o.return;
                }
                for(; l !== null;){
                    if (o = hn(l), o === null) return;
                    if (a = o.tag, a === 5 || a === 6) {
                        i = s = o;
                        continue e;
                    }
                    l = l.parentNode;
                }
            }
            i = i.return;
        }
        Pf(function() {
            var u = s, c = ma(n), d = [];
            e: {
                var f = ih.get(t);
                if (f !== void 0) {
                    var p = wa, y = t;
                    switch(t){
                        case "keypress":
                            if (as(n) === 0) break e;
                        case "keydown":
                        case "keyup":
                            p = Sm;
                            break;
                        case "focusin":
                            y = "focus", p = jo;
                            break;
                        case "focusout":
                            y = "blur", p = jo;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            p = jo;
                            break;
                        case "click":
                            if (n.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            p = Iu;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            p = um;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            p = bm;
                            break;
                        case qf:
                        case eh:
                        case th:
                            p = fm;
                            break;
                        case nh:
                            p = Mm;
                            break;
                        case "scroll":
                            p = lm;
                            break;
                        case "wheel":
                            p = Pm;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            p = pm;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            p = Fu;
                    }
                    var v = (e & 4) !== 0, _ = !v && t === "scroll", m = v ? f !== null ? f + "Capture" : null : f;
                    v = [];
                    for(var h = u, x; h !== null;){
                        x = h;
                        var S = x.stateNode;
                        if (x.tag === 5 && S !== null && (x = S, m !== null && (S = qi(h, m), S != null && v.push(or(h, S, x)))), _) break;
                        h = h.return;
                    }
                    0 < v.length && (f = new p(f, y, null, n, c), d.push({
                        event: f,
                        listeners: v
                    }));
                }
            }
            if (!(e & 7)) {
                e: {
                    if (f = t === "mouseover" || t === "pointerover", p = t === "mouseout" || t === "pointerout", f && n !== vl && (y = n.relatedTarget || n.fromElement) && (hn(y) || y[Dt])) break e;
                    if ((p || f) && (f = c.window === c ? c : (f = c.ownerDocument) ? f.defaultView || f.parentWindow : window, p ? (y = n.relatedTarget || n.toElement, p = u, y = y ? hn(y) : null, y !== null && (_ = Pn(y), y !== _ || y.tag !== 5 && y.tag !== 6) && (y = null)) : (p = null, y = u), p !== y)) {
                        if (v = Iu, S = "onMouseLeave", m = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && (v = Fu, S = "onPointerLeave", m = "onPointerEnter", h = "pointer"), _ = p == null ? f : An(p), x = y == null ? f : An(y), f = new v(S, h + "leave", p, n, c), f.target = _, f.relatedTarget = x, S = null, hn(c) === u && (v = new v(m, h + "enter", y, n, c), v.target = x, v.relatedTarget = _, S = v), _ = S, p && y) t: {
                            for(v = p, m = y, h = 0, x = v; x; x = On(x))h++;
                            for(x = 0, S = m; S; S = On(S))x++;
                            for(; 0 < h - x;)v = On(v), h--;
                            for(; 0 < x - h;)m = On(m), x--;
                            for(; h--;){
                                if (v === m || m !== null && v === m.alternate) break t;
                                v = On(v), m = On(m);
                            }
                            v = null;
                        }
                        else v = null;
                        p !== null && Ku(d, f, p, v, !1), y !== null && _ !== null && Ku(d, _, y, v, !0);
                    }
                }
                e: {
                    if (f = u ? An(u) : window, p = f.nodeName && f.nodeName.toLowerCase(), p === "select" || p === "input" && f.type === "file") var w = zm;
                    else if (Hu(f)) if (Qf) w = Am;
                    else {
                        w = Nm;
                        var C = Im;
                    }
                    else (p = f.nodeName) && p.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (w = Fm);
                    if (w && (w = w(t, u))) {
                        Xf(d, w, n, c);
                        break e;
                    }
                    C && C(t, f, u), t === "focusout" && (C = f._wrapperState) && C.controlled && f.type === "number" && hl(f, "number", f.value);
                }
                switch(C = u ? An(u) : window, t){
                    case "focusin":
                        (Hu(C) || C.contentEditable === "true") && (Nn = C, Cl = u, Hi = null);
                        break;
                    case "focusout":
                        Hi = Cl = Nn = null;
                        break;
                    case "mousedown":
                        Ml = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        Ml = !1, Yu(d, n, c);
                        break;
                    case "selectionchange":
                        if (Wm) break;
                    case "keydown":
                    case "keyup":
                        Yu(d, n, c);
                }
                var k;
                if (ba) e: {
                    switch(t){
                        case "compositionstart":
                            var b = "onCompositionStart";
                            break e;
                        case "compositionend":
                            b = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            b = "onCompositionUpdate";
                            break e;
                    }
                    b = void 0;
                }
                else In ? $f(t, n) && (b = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
                b && (Uf && n.locale !== "ko" && (In || b !== "onCompositionStart" ? b === "onCompositionEnd" && In && (k = Vf()) : (At = c, Sa = "value" in At ? At.value : At.textContent, In = !0)), C = Ms(u, b), 0 < C.length && (b = new Nu(b, t, null, n, c), d.push({
                    event: b,
                    listeners: C
                }), k ? b.data = k : (k = Yf(n), k !== null && (b.data = k)))), (k = Tm ? jm(t, n) : Om(t, n)) && (u = Ms(u, "onBeforeInput"), 0 < u.length && (c = new Nu("onBeforeInput", "beforeinput", null, n, c), d.push({
                    event: c,
                    listeners: u
                }), c.data = k));
            }
            rh(d, e);
        });
    }
    function or(t, e, n) {
        return {
            instance: t,
            listener: e,
            currentTarget: n
        };
    }
    function Ms(t, e) {
        for(var n = e + "Capture", i = []; t !== null;){
            var r = t, s = r.stateNode;
            r.tag === 5 && s !== null && (r = s, s = qi(t, n), s != null && i.unshift(or(t, s, r)), s = qi(t, e), s != null && i.push(or(t, s, r))), t = t.return;
        }
        return i;
    }
    function On(t) {
        if (t === null) return null;
        do t = t.return;
        while (t && t.tag !== 5);
        return t || null;
    }
    function Ku(t, e, n, i, r) {
        for(var s = e._reactName, o = []; n !== null && n !== i;){
            var l = n, a = l.alternate, u = l.stateNode;
            if (a !== null && a === i) break;
            l.tag === 5 && u !== null && (l = u, r ? (a = qi(n, s), a != null && o.unshift(or(n, a, l))) : r || (a = qi(n, s), a != null && o.push(or(n, a, l)))), n = n.return;
        }
        o.length !== 0 && t.push({
            event: e,
            listeners: o
        });
    }
    var Ym = /\r\n?/g, Xm = /\u0000|\uFFFD/g;
    function Gu(t) {
        return (typeof t == "string" ? t : "" + t).replace(Ym, `
`).replace(Xm, "");
    }
    function Nr(t, e, n) {
        if (e = Gu(e), Gu(t) !== e && n) throw Error(M(425));
    }
    function Es() {}
    var El = null, Pl = null;
    function Dl(t, e) {
        return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
    }
    var Tl = typeof setTimeout == "function" ? setTimeout : void 0, Qm = typeof clearTimeout == "function" ? clearTimeout : void 0, Zu = typeof Promise == "function" ? Promise : void 0, Km = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zu < "u" ? function(t) {
        return Zu.resolve(null).then(t).catch(Gm);
    } : Tl;
    function Gm(t) {
        setTimeout(function() {
            throw t;
        });
    }
    function Ao(t, e) {
        var n = e, i = 0;
        do {
            var r = n.nextSibling;
            if (t.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
                if (i === 0) {
                    t.removeChild(r), nr(e);
                    return;
                }
                i--;
            } else n !== "$" && n !== "$?" && n !== "$!" || i++;
            n = r;
        }while (n);
        nr(e);
    }
    function Yt(t) {
        for(; t != null; t = t.nextSibling){
            var e = t.nodeType;
            if (e === 1 || e === 3) break;
            if (e === 8) {
                if (e = t.data, e === "$" || e === "$!" || e === "$?") break;
                if (e === "/$") return null;
            }
        }
        return t;
    }
    function Ju(t) {
        t = t.previousSibling;
        for(var e = 0; t;){
            if (t.nodeType === 8) {
                var n = t.data;
                if (n === "$" || n === "$!" || n === "$?") {
                    if (e === 0) return t;
                    e--;
                } else n === "/$" && e++;
            }
            t = t.previousSibling;
        }
        return null;
    }
    var hi = Math.random().toString(36).slice(2), pt = "__reactFiber$" + hi, lr = "__reactProps$" + hi, Dt = "__reactContainer$" + hi, jl = "__reactEvents$" + hi, Zm = "__reactListeners$" + hi, Jm = "__reactHandles$" + hi;
    function hn(t) {
        var e = t[pt];
        if (e) return e;
        for(var n = t.parentNode; n;){
            if (e = n[Dt] || n[pt]) {
                if (n = e.alternate, e.child !== null || n !== null && n.child !== null) for(t = Ju(t); t !== null;){
                    if (n = t[pt]) return n;
                    t = Ju(t);
                }
                return e;
            }
            t = n, n = t.parentNode;
        }
        return null;
    }
    function kr(t) {
        return t = t[pt] || t[Dt], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
    }
    function An(t) {
        if (t.tag === 5 || t.tag === 6) return t.stateNode;
        throw Error(M(33));
    }
    function no(t) {
        return t[lr] || null;
    }
    var Ol = [], Bn = -1;
    function nn(t) {
        return {
            current: t
        };
    }
    function K(t) {
        0 > Bn || (t.current = Ol[Bn], Ol[Bn] = null, Bn--);
    }
    function $(t, e) {
        Bn++, Ol[Bn] = t.current, t.current = e;
    }
    var qt = {}, ke = nn(qt), Le = nn(!1), Sn = qt;
    function ei(t, e) {
        var n = t.type.contextTypes;
        if (!n) return qt;
        var i = t.stateNode;
        if (i && i.__reactInternalMemoizedUnmaskedChildContext === e) return i.__reactInternalMemoizedMaskedChildContext;
        var r = {}, s;
        for(s in n)r[s] = e[s];
        return i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = r), r;
    }
    function ze(t) {
        return t = t.childContextTypes, t != null;
    }
    function Ps() {
        K(Le), K(ke);
    }
    function qu(t, e, n) {
        if (ke.current !== qt) throw Error(M(168));
        $(ke, e), $(Le, n);
    }
    function oh(t, e, n) {
        var i = t.stateNode;
        if (e = e.childContextTypes, typeof i.getChildContext != "function") return n;
        i = i.getChildContext();
        for(var r in i)if (!(r in e)) throw Error(M(108, Ig(t) || "Unknown", r));
        return ee({}, n, i);
    }
    function Ds(t) {
        return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || qt, Sn = ke.current, $(ke, t), $(Le, Le.current), !0;
    }
    function ec(t, e, n) {
        var i = t.stateNode;
        if (!i) throw Error(M(169));
        n ? (t = oh(t, e, Sn), i.__reactInternalMemoizedMergedChildContext = t, K(Le), K(ke), $(ke, t)) : K(Le), $(Le, n);
    }
    var kt = null, io = !1, Bo = !1;
    function lh(t) {
        kt === null ? kt = [
            t
        ] : kt.push(t);
    }
    function qm(t) {
        io = !0, lh(t);
    }
    function rn() {
        if (!Bo && kt !== null) {
            Bo = !0;
            var t = 0, e = H;
            try {
                var n = kt;
                for(H = 1; t < n.length; t++){
                    var i = n[t];
                    do i = i(!0);
                    while (i !== null);
                }
                kt = null, io = !1;
            } catch (r) {
                throw kt !== null && (kt = kt.slice(t + 1)), Of(ya, rn), r;
            } finally{
                H = e, Bo = !1;
            }
        }
        return null;
    }
    var Hn = [], Wn = 0, Ts = null, js = 0, Ue = [], $e = 0, wn = null, Ct = 1, Mt = "";
    function an(t, e) {
        Hn[Wn++] = js, Hn[Wn++] = Ts, Ts = t, js = e;
    }
    function ah(t, e, n) {
        Ue[$e++] = Ct, Ue[$e++] = Mt, Ue[$e++] = wn, wn = t;
        var i = Ct;
        t = Mt;
        var r = 32 - st(i) - 1;
        i &= ~(1 << r), n += 1;
        var s = 32 - st(e) + r;
        if (30 < s) {
            var o = r - r % 5;
            s = (i & (1 << o) - 1).toString(32), i >>= o, r -= o, Ct = 1 << 32 - st(e) + r | n << r | i, Mt = s + t;
        } else Ct = 1 << s | n << r | i, Mt = t;
    }
    function Ma(t) {
        t.return !== null && (an(t, 1), ah(t, 1, 0));
    }
    function Ea(t) {
        for(; t === Ts;)Ts = Hn[--Wn], Hn[Wn] = null, js = Hn[--Wn], Hn[Wn] = null;
        for(; t === wn;)wn = Ue[--$e], Ue[$e] = null, Mt = Ue[--$e], Ue[$e] = null, Ct = Ue[--$e], Ue[$e] = null;
    }
    var Ae = null, Fe = null, G = !1, it = null;
    function uh(t, e) {
        var n = Ye(5, null, null, 0);
        n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [
            n
        ], t.flags |= 16) : e.push(n);
    }
    function tc(t, e) {
        switch(t.tag){
            case 5:
                var n = t.type;
                return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, Ae = t, Fe = Yt(e.firstChild), !0) : !1;
            case 6:
                return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, Ae = t, Fe = null, !0) : !1;
            case 13:
                return e = e.nodeType !== 8 ? null : e, e !== null ? (n = wn !== null ? {
                    id: Ct,
                    overflow: Mt
                } : null, t.memoizedState = {
                    dehydrated: e,
                    treeContext: n,
                    retryLane: 1073741824
                }, n = Ye(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, Ae = t, Fe = null, !0) : !1;
            default:
                return !1;
        }
    }
    function Rl(t) {
        return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
    }
    function Ll(t) {
        if (G) {
            var e = Fe;
            if (e) {
                var n = e;
                if (!tc(t, e)) {
                    if (Rl(t)) throw Error(M(418));
                    e = Yt(n.nextSibling);
                    var i = Ae;
                    e && tc(t, e) ? uh(i, n) : (t.flags = t.flags & -4097 | 2, G = !1, Ae = t);
                }
            } else {
                if (Rl(t)) throw Error(M(418));
                t.flags = t.flags & -4097 | 2, G = !1, Ae = t;
            }
        }
    }
    function nc(t) {
        for(t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;)t = t.return;
        Ae = t;
    }
    function Fr(t) {
        if (t !== Ae) return !1;
        if (!G) return nc(t), G = !0, !1;
        var e;
        if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !Dl(t.type, t.memoizedProps)), e && (e = Fe)) {
            if (Rl(t)) throw ch(), Error(M(418));
            for(; e;)uh(t, e), e = Yt(e.nextSibling);
        }
        if (nc(t), t.tag === 13) {
            if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(M(317));
            e: {
                for(t = t.nextSibling, e = 0; t;){
                    if (t.nodeType === 8) {
                        var n = t.data;
                        if (n === "/$") {
                            if (e === 0) {
                                Fe = Yt(t.nextSibling);
                                break e;
                            }
                            e--;
                        } else n !== "$" && n !== "$!" && n !== "$?" || e++;
                    }
                    t = t.nextSibling;
                }
                Fe = null;
            }
        } else Fe = Ae ? Yt(t.stateNode.nextSibling) : null;
        return !0;
    }
    function ch() {
        for(var t = Fe; t;)t = Yt(t.nextSibling);
    }
    function ti() {
        Fe = Ae = null, G = !1;
    }
    function Pa(t) {
        it === null ? it = [
            t
        ] : it.push(t);
    }
    var ey = Ot.ReactCurrentBatchConfig;
    function Si(t, e, n) {
        if (t = n.ref, t !== null && typeof t != "function" && typeof t != "object") {
            if (n._owner) {
                if (n = n._owner, n) {
                    if (n.tag !== 1) throw Error(M(309));
                    var i = n.stateNode;
                }
                if (!i) throw Error(M(147, t));
                var r = i, s = "" + t;
                return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === s ? e.ref : (e = function(o) {
                    var l = r.refs;
                    o === null ? delete l[s] : l[s] = o;
                }, e._stringRef = s, e);
            }
            if (typeof t != "string") throw Error(M(284));
            if (!n._owner) throw Error(M(290, t));
        }
        return t;
    }
    function Ar(t, e) {
        throw t = Object.prototype.toString.call(e), Error(M(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
    }
    function ic(t) {
        var e = t._init;
        return e(t._payload);
    }
    function dh(t) {
        function e(m, h) {
            if (t) {
                var x = m.deletions;
                x === null ? (m.deletions = [
                    h
                ], m.flags |= 16) : x.push(h);
            }
        }
        function n(m, h) {
            if (!t) return null;
            for(; h !== null;)e(m, h), h = h.sibling;
            return null;
        }
        function i(m, h) {
            for(m = new Map; h !== null;)h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
            return m;
        }
        function r(m, h) {
            return m = Gt(m, h), m.index = 0, m.sibling = null, m;
        }
        function s(m, h, x) {
            return m.index = x, t ? (x = m.alternate, x !== null ? (x = x.index, x < h ? (m.flags |= 2, h) : x) : (m.flags |= 2, h)) : (m.flags |= 1048576, h);
        }
        function o(m) {
            return t && m.alternate === null && (m.flags |= 2), m;
        }
        function l(m, h, x, S) {
            return h === null || h.tag !== 6 ? (h = Xo(x, m.mode, S), h.return = m, h) : (h = r(h, x), h.return = m, h);
        }
        function a(m, h, x, S) {
            var w = x.type;
            return w === zn ? c(m, h, x.props.children, S, x.key) : h !== null && (h.elementType === w || typeof w == "object" && w !== null && w.$$typeof === zt && ic(w) === h.type) ? (S = r(h, x.props), S.ref = Si(m, h, x), S.return = m, S) : (S = gs(x.type, x.key, x.props, null, m.mode, S), S.ref = Si(m, h, x), S.return = m, S);
        }
        function u(m, h, x, S) {
            return h === null || h.tag !== 4 || h.stateNode.containerInfo !== x.containerInfo || h.stateNode.implementation !== x.implementation ? (h = Qo(x, m.mode, S), h.return = m, h) : (h = r(h, x.children || []), h.return = m, h);
        }
        function c(m, h, x, S, w) {
            return h === null || h.tag !== 7 ? (h = xn(x, m.mode, S, w), h.return = m, h) : (h = r(h, x), h.return = m, h);
        }
        function d(m, h, x) {
            if (typeof h == "string" && h !== "" || typeof h == "number") return h = Xo("" + h, m.mode, x), h.return = m, h;
            if (typeof h == "object" && h !== null) {
                switch(h.$$typeof){
                    case Pr:
                        return x = gs(h.type, h.key, h.props, null, m.mode, x), x.ref = Si(m, null, h), x.return = m, x;
                    case Ln:
                        return h = Qo(h, m.mode, x), h.return = m, h;
                    case zt:
                        var S = h._init;
                        return d(m, S(h._payload), x);
                }
                if (Ti(h) || mi(h)) return h = xn(h, m.mode, x, null), h.return = m, h;
                Ar(m, h);
            }
            return null;
        }
        function f(m, h, x, S) {
            var w = h !== null ? h.key : null;
            if (typeof x == "string" && x !== "" || typeof x == "number") return w !== null ? null : l(m, h, "" + x, S);
            if (typeof x == "object" && x !== null) {
                switch(x.$$typeof){
                    case Pr:
                        return x.key === w ? a(m, h, x, S) : null;
                    case Ln:
                        return x.key === w ? u(m, h, x, S) : null;
                    case zt:
                        return w = x._init, f(m, h, w(x._payload), S);
                }
                if (Ti(x) || mi(x)) return w !== null ? null : c(m, h, x, S, null);
                Ar(m, x);
            }
            return null;
        }
        function p(m, h, x, S, w) {
            if (typeof S == "string" && S !== "" || typeof S == "number") return m = m.get(x) || null, l(h, m, "" + S, w);
            if (typeof S == "object" && S !== null) {
                switch(S.$$typeof){
                    case Pr:
                        return m = m.get(S.key === null ? x : S.key) || null, a(h, m, S, w);
                    case Ln:
                        return m = m.get(S.key === null ? x : S.key) || null, u(h, m, S, w);
                    case zt:
                        var C = S._init;
                        return p(m, h, x, C(S._payload), w);
                }
                if (Ti(S) || mi(S)) return m = m.get(x) || null, c(h, m, S, w, null);
                Ar(h, S);
            }
            return null;
        }
        function y(m, h, x, S) {
            for(var w = null, C = null, k = h, b = h = 0, E = null; k !== null && b < x.length; b++){
                k.index > b ? (E = k, k = null) : E = k.sibling;
                var P = f(m, k, x[b], S);
                if (P === null) {
                    k === null && (k = E);
                    break;
                }
                t && k && P.alternate === null && e(m, k), h = s(P, h, b), C === null ? w = P : C.sibling = P, C = P, k = E;
            }
            if (b === x.length) return n(m, k), G && an(m, b), w;
            if (k === null) {
                for(; b < x.length; b++)k = d(m, x[b], S), k !== null && (h = s(k, h, b), C === null ? w = k : C.sibling = k, C = k);
                return G && an(m, b), w;
            }
            for(k = i(m, k); b < x.length; b++)E = p(k, m, b, x[b], S), E !== null && (t && E.alternate !== null && k.delete(E.key === null ? b : E.key), h = s(E, h, b), C === null ? w = E : C.sibling = E, C = E);
            return t && k.forEach(function(j) {
                return e(m, j);
            }), G && an(m, b), w;
        }
        function v(m, h, x, S) {
            var w = mi(x);
            if (typeof w != "function") throw Error(M(150));
            if (x = w.call(x), x == null) throw Error(M(151));
            for(var C = w = null, k = h, b = h = 0, E = null, P = x.next(); k !== null && !P.done; b++, P = x.next()){
                k.index > b ? (E = k, k = null) : E = k.sibling;
                var j = f(m, k, P.value, S);
                if (j === null) {
                    k === null && (k = E);
                    break;
                }
                t && k && j.alternate === null && e(m, k), h = s(j, h, b), C === null ? w = j : C.sibling = j, C = j, k = E;
            }
            if (P.done) return n(m, k), G && an(m, b), w;
            if (k === null) {
                for(; !P.done; b++, P = x.next())P = d(m, P.value, S), P !== null && (h = s(P, h, b), C === null ? w = P : C.sibling = P, C = P);
                return G && an(m, b), w;
            }
            for(k = i(m, k); !P.done; b++, P = x.next())P = p(k, m, b, P.value, S), P !== null && (t && P.alternate !== null && k.delete(P.key === null ? b : P.key), h = s(P, h, b), C === null ? w = P : C.sibling = P, C = P);
            return t && k.forEach(function(L) {
                return e(m, L);
            }), G && an(m, b), w;
        }
        function _(m, h, x, S) {
            if (typeof x == "object" && x !== null && x.type === zn && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
                switch(x.$$typeof){
                    case Pr:
                        e: {
                            for(var w = x.key, C = h; C !== null;){
                                if (C.key === w) {
                                    if (w = x.type, w === zn) {
                                        if (C.tag === 7) {
                                            n(m, C.sibling), h = r(C, x.props.children), h.return = m, m = h;
                                            break e;
                                        }
                                    } else if (C.elementType === w || typeof w == "object" && w !== null && w.$$typeof === zt && ic(w) === C.type) {
                                        n(m, C.sibling), h = r(C, x.props), h.ref = Si(m, C, x), h.return = m, m = h;
                                        break e;
                                    }
                                    n(m, C);
                                    break;
                                } else e(m, C);
                                C = C.sibling;
                            }
                            x.type === zn ? (h = xn(x.props.children, m.mode, S, x.key), h.return = m, m = h) : (S = gs(x.type, x.key, x.props, null, m.mode, S), S.ref = Si(m, h, x), S.return = m, m = S);
                        }
                        return o(m);
                    case Ln:
                        e: {
                            for(C = x.key; h !== null;){
                                if (h.key === C) if (h.tag === 4 && h.stateNode.containerInfo === x.containerInfo && h.stateNode.implementation === x.implementation) {
                                    n(m, h.sibling), h = r(h, x.children || []), h.return = m, m = h;
                                    break e;
                                } else {
                                    n(m, h);
                                    break;
                                }
                                else e(m, h);
                                h = h.sibling;
                            }
                            h = Qo(x, m.mode, S), h.return = m, m = h;
                        }
                        return o(m);
                    case zt:
                        return C = x._init, _(m, h, C(x._payload), S);
                }
                if (Ti(x)) return y(m, h, x, S);
                if (mi(x)) return v(m, h, x, S);
                Ar(m, x);
            }
            return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, h !== null && h.tag === 6 ? (n(m, h.sibling), h = r(h, x), h.return = m, m = h) : (n(m, h), h = Xo(x, m.mode, S), h.return = m, m = h), o(m)) : n(m, h);
        }
        return _;
    }
    var ni = dh(!0), fh = dh(!1), Os = nn(null), Rs = null, Vn = null, Da = null;
    function Ta() {
        Da = Vn = Rs = null;
    }
    function ja(t) {
        var e = Os.current;
        K(Os), t._currentValue = e;
    }
    function zl(t, e, n) {
        for(; t !== null;){
            var i = t.alternate;
            if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
            t = t.return;
        }
    }
    function Gn(t, e) {
        Rs = t, Da = Vn = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (Re = !0), t.firstContext = null);
    }
    function Ge(t) {
        var e = t._currentValue;
        if (Da !== t) if (t = {
            context: t,
            memoizedValue: e,
            next: null
        }, Vn === null) {
            if (Rs === null) throw Error(M(308));
            Vn = t, Rs.dependencies = {
                lanes: 0,
                firstContext: t
            };
        } else Vn = Vn.next = t;
        return e;
    }
    var pn = null;
    function Oa(t) {
        pn === null ? pn = [
            t
        ] : pn.push(t);
    }
    function hh(t, e, n, i) {
        var r = e.interleaved;
        return r === null ? (n.next = n, Oa(e)) : (n.next = r.next, r.next = n), e.interleaved = n, Tt(t, i);
    }
    function Tt(t, e) {
        t.lanes |= e;
        var n = t.alternate;
        for(n !== null && (n.lanes |= e), n = t, t = t.return; t !== null;)t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
        return n.tag === 3 ? n.stateNode : null;
    }
    var It = !1;
    function Ra(t) {
        t.updateQueue = {
            baseState: t.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                interleaved: null,
                lanes: 0
            },
            effects: null
        };
    }
    function ph(t, e) {
        t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
            baseState: t.baseState,
            firstBaseUpdate: t.firstBaseUpdate,
            lastBaseUpdate: t.lastBaseUpdate,
            shared: t.shared,
            effects: t.effects
        });
    }
    function Et(t, e) {
        return {
            eventTime: t,
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        };
    }
    function Xt(t, e, n) {
        var i = t.updateQueue;
        if (i === null) return null;
        if (i = i.shared, N & 2) {
            var r = i.pending;
            return r === null ? e.next = e : (e.next = r.next, r.next = e), i.pending = e, Tt(t, n);
        }
        return r = i.interleaved, r === null ? (e.next = e, Oa(i)) : (e.next = r.next, r.next = e), i.interleaved = e, Tt(t, n);
    }
    function us(t, e, n) {
        if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
            var i = e.lanes;
            i &= t.pendingLanes, n |= i, e.lanes = n, va(t, n);
        }
    }
    function rc(t, e) {
        var n = t.updateQueue, i = t.alternate;
        if (i !== null && (i = i.updateQueue, n === i)) {
            var r = null, s = null;
            if (n = n.firstBaseUpdate, n !== null) {
                do {
                    var o = {
                        eventTime: n.eventTime,
                        lane: n.lane,
                        tag: n.tag,
                        payload: n.payload,
                        callback: n.callback,
                        next: null
                    };
                    s === null ? r = s = o : s = s.next = o, n = n.next;
                }while (n !== null);
                s === null ? r = s = e : s = s.next = e;
            } else r = s = e;
            n = {
                baseState: i.baseState,
                firstBaseUpdate: r,
                lastBaseUpdate: s,
                shared: i.shared,
                effects: i.effects
            }, t.updateQueue = n;
            return;
        }
        t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
    }
    function Ls(t, e, n, i) {
        var r = t.updateQueue;
        It = !1;
        var s = r.firstBaseUpdate, o = r.lastBaseUpdate, l = r.shared.pending;
        if (l !== null) {
            r.shared.pending = null;
            var a = l, u = a.next;
            a.next = null, o === null ? s = u : o.next = u, o = a;
            var c = t.alternate;
            c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== o && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = a));
        }
        if (s !== null) {
            var d = r.baseState;
            o = 0, c = u = a = null, l = s;
            do {
                var f = l.lane, p = l.eventTime;
                if ((i & f) === f) {
                    c !== null && (c = c.next = {
                        eventTime: p,
                        lane: 0,
                        tag: l.tag,
                        payload: l.payload,
                        callback: l.callback,
                        next: null
                    });
                    e: {
                        var y = t, v = l;
                        switch(f = e, p = n, v.tag){
                            case 1:
                                if (y = v.payload, typeof y == "function") {
                                    d = y.call(p, d, f);
                                    break e;
                                }
                                d = y;
                                break e;
                            case 3:
                                y.flags = y.flags & -65537 | 128;
                            case 0:
                                if (y = v.payload, f = typeof y == "function" ? y.call(p, d, f) : y, f == null) break e;
                                d = ee({}, d, f);
                                break e;
                            case 2:
                                It = !0;
                        }
                    }
                    l.callback !== null && l.lane !== 0 && (t.flags |= 64, f = r.effects, f === null ? r.effects = [
                        l
                    ] : f.push(l));
                } else p = {
                    eventTime: p,
                    lane: f,
                    tag: l.tag,
                    payload: l.payload,
                    callback: l.callback,
                    next: null
                }, c === null ? (u = c = p, a = d) : c = c.next = p, o |= f;
                if (l = l.next, l === null) {
                    if (l = r.shared.pending, l === null) break;
                    f = l, l = f.next, f.next = null, r.lastBaseUpdate = f, r.shared.pending = null;
                }
            }while (!0);
            if (c === null && (a = d), r.baseState = a, r.firstBaseUpdate = u, r.lastBaseUpdate = c, e = r.shared.interleaved, e !== null) {
                r = e;
                do o |= r.lane, r = r.next;
                while (r !== e);
            } else s === null && (r.shared.lanes = 0);
            bn |= o, t.lanes = o, t.memoizedState = d;
        }
    }
    function sc(t, e, n) {
        if (t = e.effects, e.effects = null, t !== null) for(e = 0; e < t.length; e++){
            var i = t[e], r = i.callback;
            if (r !== null) {
                if (i.callback = null, i = n, typeof r != "function") throw Error(M(191, r));
                r.call(i);
            }
        }
    }
    var br = {}, mt = nn(br), ar = nn(br), ur = nn(br);
    function gn(t) {
        if (t === br) throw Error(M(174));
        return t;
    }
    function La(t, e) {
        switch($(ur, e), $(ar, t), $(mt, br), t = e.nodeType, t){
            case 9:
            case 11:
                e = (e = e.documentElement) ? e.namespaceURI : gl(null, "");
                break;
            default:
                t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = gl(e, t);
        }
        K(mt), $(mt, e);
    }
    function ii() {
        K(mt), K(ar), K(ur);
    }
    function gh(t) {
        gn(ur.current);
        var e = gn(mt.current), n = gl(e, t.type);
        e !== n && ($(ar, t), $(mt, n));
    }
    function za(t) {
        ar.current === t && (K(mt), K(ar));
    }
    var J = nn(0);
    function zs(t) {
        for(var e = t; e !== null;){
            if (e.tag === 13) {
                var n = e.memoizedState;
                if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return e;
            } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
                if (e.flags & 128) return e;
            } else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue;
            }
            if (e === t) break;
            for(; e.sibling === null;){
                if (e.return === null || e.return === t) return null;
                e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
        }
        return null;
    }
    var Ho = [];
    function Ia() {
        for(var t = 0; t < Ho.length; t++)Ho[t]._workInProgressVersionPrimary = null;
        Ho.length = 0;
    }
    var cs = Ot.ReactCurrentDispatcher, Wo = Ot.ReactCurrentBatchConfig, kn = 0, q = null, le = null, ue = null, Is = !1, Wi = !1, cr = 0, ty = 0;
    function ve() {
        throw Error(M(321));
    }
    function Na(t, e) {
        if (e === null) return !1;
        for(var n = 0; n < e.length && n < t.length; n++)if (!lt(t[n], e[n])) return !1;
        return !0;
    }
    function Fa(t, e, n, i, r, s) {
        if (kn = s, q = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, cs.current = t === null || t.memoizedState === null ? sy : oy, t = n(i, r), Wi) {
            s = 0;
            do {
                if (Wi = !1, cr = 0, 25 <= s) throw Error(M(301));
                s += 1, ue = le = null, e.updateQueue = null, cs.current = ly, t = n(i, r);
            }while (Wi);
        }
        if (cs.current = Ns, e = le !== null && le.next !== null, kn = 0, ue = le = q = null, Is = !1, e) throw Error(M(300));
        return t;
    }
    function Aa() {
        var t = cr !== 0;
        return cr = 0, t;
    }
    function ft() {
        var t = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return ue === null ? q.memoizedState = ue = t : ue = ue.next = t, ue;
    }
    function Ze() {
        if (le === null) {
            var t = q.alternate;
            t = t !== null ? t.memoizedState : null;
        } else t = le.next;
        var e = ue === null ? q.memoizedState : ue.next;
        if (e !== null) ue = e, le = t;
        else {
            if (t === null) throw Error(M(310));
            le = t, t = {
                memoizedState: le.memoizedState,
                baseState: le.baseState,
                baseQueue: le.baseQueue,
                queue: le.queue,
                next: null
            }, ue === null ? q.memoizedState = ue = t : ue = ue.next = t;
        }
        return ue;
    }
    function dr(t, e) {
        return typeof e == "function" ? e(t) : e;
    }
    function Vo(t) {
        var e = Ze(), n = e.queue;
        if (n === null) throw Error(M(311));
        n.lastRenderedReducer = t;
        var i = le, r = i.baseQueue, s = n.pending;
        if (s !== null) {
            if (r !== null) {
                var o = r.next;
                r.next = s.next, s.next = o;
            }
            i.baseQueue = r = s, n.pending = null;
        }
        if (r !== null) {
            s = r.next, i = i.baseState;
            var l = o = null, a = null, u = s;
            do {
                var c = u.lane;
                if ((kn & c) === c) a !== null && (a = a.next = {
                    lane: 0,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                }), i = u.hasEagerState ? u.eagerState : t(i, u.action);
                else {
                    var d = {
                        lane: c,
                        action: u.action,
                        hasEagerState: u.hasEagerState,
                        eagerState: u.eagerState,
                        next: null
                    };
                    a === null ? (l = a = d, o = i) : a = a.next = d, q.lanes |= c, bn |= c;
                }
                u = u.next;
            }while (u !== null && u !== s);
            a === null ? o = i : a.next = l, lt(i, e.memoizedState) || (Re = !0), e.memoizedState = i, e.baseState = o, e.baseQueue = a, n.lastRenderedState = i;
        }
        if (t = n.interleaved, t !== null) {
            r = t;
            do s = r.lane, q.lanes |= s, bn |= s, r = r.next;
            while (r !== t);
        } else r === null && (n.lanes = 0);
        return [
            e.memoizedState,
            n.dispatch
        ];
    }
    function Uo(t) {
        var e = Ze(), n = e.queue;
        if (n === null) throw Error(M(311));
        n.lastRenderedReducer = t;
        var i = n.dispatch, r = n.pending, s = e.memoizedState;
        if (r !== null) {
            n.pending = null;
            var o = r = r.next;
            do s = t(s, o.action), o = o.next;
            while (o !== r);
            lt(s, e.memoizedState) || (Re = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
        }
        return [
            s,
            i
        ];
    }
    function mh() {}
    function yh(t, e) {
        var n = q, i = Ze(), r = e(), s = !lt(i.memoizedState, r);
        if (s && (i.memoizedState = r, Re = !0), i = i.queue, Ba(_h.bind(null, n, i, t), [
            t
        ]), i.getSnapshot !== e || s || ue !== null && ue.memoizedState.tag & 1) {
            if (n.flags |= 2048, fr(9, xh.bind(null, n, i, r, e), void 0, null), de === null) throw Error(M(349));
            kn & 30 || vh(n, e, r);
        }
        return r;
    }
    function vh(t, e, n) {
        t.flags |= 16384, t = {
            getSnapshot: e,
            value: n
        }, e = q.updateQueue, e === null ? (e = {
            lastEffect: null,
            stores: null
        }, q.updateQueue = e, e.stores = [
            t
        ]) : (n = e.stores, n === null ? e.stores = [
            t
        ] : n.push(t));
    }
    function xh(t, e, n, i) {
        e.value = n, e.getSnapshot = i, Sh(e) && wh(t);
    }
    function _h(t, e, n) {
        return n(function() {
            Sh(e) && wh(t);
        });
    }
    function Sh(t) {
        var e = t.getSnapshot;
        t = t.value;
        try {
            var n = e();
            return !lt(t, n);
        } catch  {
            return !0;
        }
    }
    function wh(t) {
        var e = Tt(t, 1);
        e !== null && ot(e, t, 1, -1);
    }
    function oc(t) {
        var e = ft();
        return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: dr,
            lastRenderedState: t
        }, e.queue = t, t = t.dispatch = ry.bind(null, q, t), [
            e.memoizedState,
            t
        ];
    }
    function fr(t, e, n, i) {
        return t = {
            tag: t,
            create: e,
            destroy: n,
            deps: i,
            next: null
        }, e = q.updateQueue, e === null ? (e = {
            lastEffect: null,
            stores: null
        }, q.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t)), t;
    }
    function kh() {
        return Ze().memoizedState;
    }
    function ds(t, e, n, i) {
        var r = ft();
        q.flags |= t, r.memoizedState = fr(1 | e, n, void 0, i === void 0 ? null : i);
    }
    function ro(t, e, n, i) {
        var r = Ze();
        i = i === void 0 ? null : i;
        var s = void 0;
        if (le !== null) {
            var o = le.memoizedState;
            if (s = o.destroy, i !== null && Na(i, o.deps)) {
                r.memoizedState = fr(e, n, s, i);
                return;
            }
        }
        q.flags |= t, r.memoizedState = fr(1 | e, n, s, i);
    }
    function lc(t, e) {
        return ds(8390656, 8, t, e);
    }
    function Ba(t, e) {
        return ro(2048, 8, t, e);
    }
    function bh(t, e) {
        return ro(4, 2, t, e);
    }
    function Ch(t, e) {
        return ro(4, 4, t, e);
    }
    function Mh(t, e) {
        if (typeof e == "function") return t = t(), e(t), function() {
            e(null);
        };
        if (e != null) return t = t(), e.current = t, function() {
            e.current = null;
        };
    }
    function Eh(t, e, n) {
        return n = n != null ? n.concat([
            t
        ]) : null, ro(4, 4, Mh.bind(null, e, t), n);
    }
    function Ha() {}
    function Ph(t, e) {
        var n = Ze();
        e = e === void 0 ? null : e;
        var i = n.memoizedState;
        return i !== null && e !== null && Na(e, i[1]) ? i[0] : (n.memoizedState = [
            t,
            e
        ], t);
    }
    function Dh(t, e) {
        var n = Ze();
        e = e === void 0 ? null : e;
        var i = n.memoizedState;
        return i !== null && e !== null && Na(e, i[1]) ? i[0] : (t = t(), n.memoizedState = [
            t,
            e
        ], t);
    }
    function Th(t, e, n) {
        return kn & 21 ? (lt(n, e) || (n = zf(), q.lanes |= n, bn |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, Re = !0), t.memoizedState = n);
    }
    function ny(t, e) {
        var n = H;
        H = n !== 0 && 4 > n ? n : 4, t(!0);
        var i = Wo.transition;
        Wo.transition = {};
        try {
            t(!1), e();
        } finally{
            H = n, Wo.transition = i;
        }
    }
    function jh() {
        return Ze().memoizedState;
    }
    function iy(t, e, n) {
        var i = Kt(t);
        if (n = {
            lane: i,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, Oh(t)) Rh(e, n);
        else if (n = hh(t, e, n, i), n !== null) {
            var r = Ee();
            ot(n, t, i, r), Lh(n, e, i);
        }
    }
    function ry(t, e, n) {
        var i = Kt(t), r = {
            lane: i,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (Oh(t)) Rh(e, r);
        else {
            var s = t.alternate;
            if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null)) try {
                var o = e.lastRenderedState, l = s(o, n);
                if (r.hasEagerState = !0, r.eagerState = l, lt(l, o)) {
                    var a = e.interleaved;
                    a === null ? (r.next = r, Oa(e)) : (r.next = a.next, a.next = r), e.interleaved = r;
                    return;
                }
            } catch  {} finally{}
            n = hh(t, e, r, i), n !== null && (r = Ee(), ot(n, t, i, r), Lh(n, e, i));
        }
    }
    function Oh(t) {
        var e = t.alternate;
        return t === q || e !== null && e === q;
    }
    function Rh(t, e) {
        Wi = Is = !0;
        var n = t.pending;
        n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
    }
    function Lh(t, e, n) {
        if (n & 4194240) {
            var i = e.lanes;
            i &= t.pendingLanes, n |= i, e.lanes = n, va(t, n);
        }
    }
    var Ns = {
        readContext: Ge,
        useCallback: ve,
        useContext: ve,
        useEffect: ve,
        useImperativeHandle: ve,
        useInsertionEffect: ve,
        useLayoutEffect: ve,
        useMemo: ve,
        useReducer: ve,
        useRef: ve,
        useState: ve,
        useDebugValue: ve,
        useDeferredValue: ve,
        useTransition: ve,
        useMutableSource: ve,
        useSyncExternalStore: ve,
        useId: ve,
        unstable_isNewReconciler: !1
    }, sy = {
        readContext: Ge,
        useCallback: function(t, e) {
            return ft().memoizedState = [
                t,
                e === void 0 ? null : e
            ], t;
        },
        useContext: Ge,
        useEffect: lc,
        useImperativeHandle: function(t, e, n) {
            return n = n != null ? n.concat([
                t
            ]) : null, ds(4194308, 4, Mh.bind(null, e, t), n);
        },
        useLayoutEffect: function(t, e) {
            return ds(4194308, 4, t, e);
        },
        useInsertionEffect: function(t, e) {
            return ds(4, 2, t, e);
        },
        useMemo: function(t, e) {
            var n = ft();
            return e = e === void 0 ? null : e, t = t(), n.memoizedState = [
                t,
                e
            ], t;
        },
        useReducer: function(t, e, n) {
            var i = ft();
            return e = n !== void 0 ? n(e) : e, i.memoizedState = i.baseState = e, t = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: t,
                lastRenderedState: e
            }, i.queue = t, t = t.dispatch = iy.bind(null, q, t), [
                i.memoizedState,
                t
            ];
        },
        useRef: function(t) {
            var e = ft();
            return t = {
                current: t
            }, e.memoizedState = t;
        },
        useState: oc,
        useDebugValue: Ha,
        useDeferredValue: function(t) {
            return ft().memoizedState = t;
        },
        useTransition: function() {
            var t = oc(!1), e = t[0];
            return t = ny.bind(null, t[1]), ft().memoizedState = t, [
                e,
                t
            ];
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(t, e, n) {
            var i = q, r = ft();
            if (G) {
                if (n === void 0) throw Error(M(407));
                n = n();
            } else {
                if (n = e(), de === null) throw Error(M(349));
                kn & 30 || vh(i, e, n);
            }
            r.memoizedState = n;
            var s = {
                value: n,
                getSnapshot: e
            };
            return r.queue = s, lc(_h.bind(null, i, s, t), [
                t
            ]), i.flags |= 2048, fr(9, xh.bind(null, i, s, n, e), void 0, null), n;
        },
        useId: function() {
            var t = ft(), e = de.identifierPrefix;
            if (G) {
                var n = Mt, i = Ct;
                n = (i & ~(1 << 32 - st(i) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = cr++, 0 < n && (e += "H" + n.toString(32)), e += ":";
            } else n = ty++, e = ":" + e + "r" + n.toString(32) + ":";
            return t.memoizedState = e;
        },
        unstable_isNewReconciler: !1
    }, oy = {
        readContext: Ge,
        useCallback: Ph,
        useContext: Ge,
        useEffect: Ba,
        useImperativeHandle: Eh,
        useInsertionEffect: bh,
        useLayoutEffect: Ch,
        useMemo: Dh,
        useReducer: Vo,
        useRef: kh,
        useState: function() {
            return Vo(dr);
        },
        useDebugValue: Ha,
        useDeferredValue: function(t) {
            var e = Ze();
            return Th(e, le.memoizedState, t);
        },
        useTransition: function() {
            var t = Vo(dr)[0], e = Ze().memoizedState;
            return [
                t,
                e
            ];
        },
        useMutableSource: mh,
        useSyncExternalStore: yh,
        useId: jh,
        unstable_isNewReconciler: !1
    }, ly = {
        readContext: Ge,
        useCallback: Ph,
        useContext: Ge,
        useEffect: Ba,
        useImperativeHandle: Eh,
        useInsertionEffect: bh,
        useLayoutEffect: Ch,
        useMemo: Dh,
        useReducer: Uo,
        useRef: kh,
        useState: function() {
            return Uo(dr);
        },
        useDebugValue: Ha,
        useDeferredValue: function(t) {
            var e = Ze();
            return le === null ? e.memoizedState = t : Th(e, le.memoizedState, t);
        },
        useTransition: function() {
            var t = Uo(dr)[0], e = Ze().memoizedState;
            return [
                t,
                e
            ];
        },
        useMutableSource: mh,
        useSyncExternalStore: yh,
        useId: jh,
        unstable_isNewReconciler: !1
    };
    function tt(t, e) {
        if (t && t.defaultProps) {
            e = ee({}, e), t = t.defaultProps;
            for(var n in t)e[n] === void 0 && (e[n] = t[n]);
            return e;
        }
        return e;
    }
    function Il(t, e, n, i) {
        e = t.memoizedState, n = n(i, e), n = n == null ? e : ee({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
    }
    var so = {
        isMounted: function(t) {
            return (t = t._reactInternals) ? Pn(t) === t : !1;
        },
        enqueueSetState: function(t, e, n) {
            t = t._reactInternals;
            var i = Ee(), r = Kt(t), s = Et(i, r);
            s.payload = e, n != null && (s.callback = n), e = Xt(t, s, r), e !== null && (ot(e, t, r, i), us(e, t, r));
        },
        enqueueReplaceState: function(t, e, n) {
            t = t._reactInternals;
            var i = Ee(), r = Kt(t), s = Et(i, r);
            s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Xt(t, s, r), e !== null && (ot(e, t, r, i), us(e, t, r));
        },
        enqueueForceUpdate: function(t, e) {
            t = t._reactInternals;
            var n = Ee(), i = Kt(t), r = Et(n, i);
            r.tag = 2, e != null && (r.callback = e), e = Xt(t, r, i), e !== null && (ot(e, t, i, n), us(e, t, i));
        }
    };
    function ac(t, e, n, i, r, s, o) {
        return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, o) : e.prototype && e.prototype.isPureReactComponent ? !rr(n, i) || !rr(r, s) : !0;
    }
    function zh(t, e, n) {
        var i = !1, r = qt, s = e.contextType;
        return typeof s == "object" && s !== null ? s = Ge(s) : (r = ze(e) ? Sn : ke.current, i = e.contextTypes, s = (i = i != null) ? ei(t, r) : qt), e = new e(n, s), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = so, t.stateNode = e, e._reactInternals = t, i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = r, t.__reactInternalMemoizedMaskedChildContext = s), e;
    }
    function uc(t, e, n, i) {
        t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && so.enqueueReplaceState(e, e.state, null);
    }
    function Nl(t, e, n, i) {
        var r = t.stateNode;
        r.props = n, r.state = t.memoizedState, r.refs = {}, Ra(t);
        var s = e.contextType;
        typeof s == "object" && s !== null ? r.context = Ge(s) : (s = ze(e) ? Sn : ke.current, r.context = ei(t, s)), r.state = t.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (Il(t, e, s, n), r.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (e = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), e !== r.state && so.enqueueReplaceState(r, r.state, null), Ls(t, n, r, i), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308);
    }
    function ri(t, e) {
        try {
            var n = "", i = e;
            do n += zg(i), i = i.return;
            while (i);
            var r = n;
        } catch (s) {
            r = `
Error generating stack: ` + s.message + `
` + s.stack;
        }
        return {
            value: t,
            source: e,
            stack: r,
            digest: null
        };
    }
    function $o(t, e, n) {
        return {
            value: t,
            source: null,
            stack: n ?? null,
            digest: e ?? null
        };
    }
    function Fl(t, e) {
        try {
            console.error(e.value);
        } catch (n) {
            setTimeout(function() {
                throw n;
            });
        }
    }
    var ay = typeof WeakMap == "function" ? WeakMap : Map;
    function Ih(t, e, n) {
        n = Et(-1, n), n.tag = 3, n.payload = {
            element: null
        };
        var i = e.value;
        return n.callback = function() {
            As || (As = !0, Ql = i), Fl(t, e);
        }, n;
    }
    function Nh(t, e, n) {
        n = Et(-1, n), n.tag = 3;
        var i = t.type.getDerivedStateFromError;
        if (typeof i == "function") {
            var r = e.value;
            n.payload = function() {
                return i(r);
            }, n.callback = function() {
                Fl(t, e);
            };
        }
        var s = t.stateNode;
        return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
            Fl(t, e), typeof i != "function" && (Qt === null ? Qt = new Set([
                this
            ]) : Qt.add(this));
            var o = e.stack;
            this.componentDidCatch(e.value, {
                componentStack: o !== null ? o : ""
            });
        }), n;
    }
    function cc(t, e, n) {
        var i = t.pingCache;
        if (i === null) {
            i = t.pingCache = new ay;
            var r = new Set;
            i.set(e, r);
        } else r = i.get(e), r === void 0 && (r = new Set, i.set(e, r));
        r.has(n) || (r.add(n), t = wy.bind(null, t, e, n), e.then(t, t));
    }
    function dc(t) {
        do {
            var e;
            if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e) return t;
            t = t.return;
        }while (t !== null);
        return null;
    }
    function fc(t, e, n, i, r) {
        return t.mode & 1 ? (t.flags |= 65536, t.lanes = r, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = Et(-1, 1), e.tag = 2, Xt(n, e, 1))), n.lanes |= 1), t);
    }
    var uy = Ot.ReactCurrentOwner, Re = !1;
    function Me(t, e, n, i) {
        e.child = t === null ? fh(e, null, n, i) : ni(e, t.child, n, i);
    }
    function hc(t, e, n, i, r) {
        n = n.render;
        var s = e.ref;
        return Gn(e, r), i = Fa(t, e, n, i, s, r), n = Aa(), t !== null && !Re ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, jt(t, e, r)) : (G && n && Ma(e), e.flags |= 1, Me(t, e, i, r), e.child);
    }
    function pc(t, e, n, i, r) {
        if (t === null) {
            var s = n.type;
            return typeof s == "function" && !Ka(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = s, Fh(t, e, s, i, r)) : (t = gs(n.type, null, i, e, e.mode, r), t.ref = e.ref, t.return = e, e.child = t);
        }
        if (s = t.child, !(t.lanes & r)) {
            var o = s.memoizedProps;
            if (n = n.compare, n = n !== null ? n : rr, n(o, i) && t.ref === e.ref) return jt(t, e, r);
        }
        return e.flags |= 1, t = Gt(s, i), t.ref = e.ref, t.return = e, e.child = t;
    }
    function Fh(t, e, n, i, r) {
        if (t !== null) {
            var s = t.memoizedProps;
            if (rr(s, i) && t.ref === e.ref) if (Re = !1, e.pendingProps = i = s, (t.lanes & r) !== 0) t.flags & 131072 && (Re = !0);
            else return e.lanes = t.lanes, jt(t, e, r);
        }
        return Al(t, e, n, i, r);
    }
    function Ah(t, e, n) {
        var i = e.pendingProps, r = i.children, s = t !== null ? t.memoizedState : null;
        if (i.mode === "hidden") if (!(e.mode & 1)) e.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, $($n, Ne), Ne |= n;
        else {
            if (!(n & 1073741824)) return t = s !== null ? s.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = {
                baseLanes: t,
                cachePool: null,
                transitions: null
            }, e.updateQueue = null, $($n, Ne), Ne |= t, null;
            e.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, i = s !== null ? s.baseLanes : n, $($n, Ne), Ne |= i;
        }
        else s !== null ? (i = s.baseLanes | n, e.memoizedState = null) : i = n, $($n, Ne), Ne |= i;
        return Me(t, e, r, n), e.child;
    }
    function Bh(t, e) {
        var n = e.ref;
        (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
    }
    function Al(t, e, n, i, r) {
        var s = ze(n) ? Sn : ke.current;
        return s = ei(e, s), Gn(e, r), n = Fa(t, e, n, i, s, r), i = Aa(), t !== null && !Re ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, jt(t, e, r)) : (G && i && Ma(e), e.flags |= 1, Me(t, e, n, r), e.child);
    }
    function gc(t, e, n, i, r) {
        if (ze(n)) {
            var s = !0;
            Ds(e);
        } else s = !1;
        if (Gn(e, r), e.stateNode === null) fs(t, e), zh(e, n, i), Nl(e, n, i, r), i = !0;
        else if (t === null) {
            var o = e.stateNode, l = e.memoizedProps;
            o.props = l;
            var a = o.context, u = n.contextType;
            typeof u == "object" && u !== null ? u = Ge(u) : (u = ze(n) ? Sn : ke.current, u = ei(e, u));
            var c = n.getDerivedStateFromProps, d = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
            d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== i || a !== u) && uc(e, o, i, u), It = !1;
            var f = e.memoizedState;
            o.state = f, Ls(e, i, o, r), a = e.memoizedState, l !== i || f !== a || Le.current || It ? (typeof c == "function" && (Il(e, n, c, i), a = e.memoizedState), (l = It || ac(e, n, l, i, f, a, u)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = a), o.props = i, o.state = a, o.context = u, i = l) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
        } else {
            o = e.stateNode, ph(t, e), l = e.memoizedProps, u = e.type === e.elementType ? l : tt(e.type, l), o.props = u, d = e.pendingProps, f = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = Ge(a) : (a = ze(n) ? Sn : ke.current, a = ei(e, a));
            var p = n.getDerivedStateFromProps;
            (c = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== d || f !== a) && uc(e, o, i, a), It = !1, f = e.memoizedState, o.state = f, Ls(e, i, o, r);
            var y = e.memoizedState;
            l !== d || f !== y || Le.current || It ? (typeof p == "function" && (Il(e, n, p, i), y = e.memoizedState), (u = It || ac(e, n, u, i, f, y, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, y, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(i, y, a)), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || l === t.memoizedProps && f === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === t.memoizedProps && f === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = y), o.props = i, o.state = y, o.context = a, i = u) : (typeof o.componentDidUpdate != "function" || l === t.memoizedProps && f === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === t.memoizedProps && f === t.memoizedState || (e.flags |= 1024), i = !1);
        }
        return Bl(t, e, n, i, s, r);
    }
    function Bl(t, e, n, i, r, s) {
        Bh(t, e);
        var o = (e.flags & 128) !== 0;
        if (!i && !o) return r && ec(e, n, !1), jt(t, e, s);
        i = e.stateNode, uy.current = e;
        var l = o && typeof n.getDerivedStateFromError != "function" ? null : i.render();
        return e.flags |= 1, t !== null && o ? (e.child = ni(e, t.child, null, s), e.child = ni(e, null, l, s)) : Me(t, e, l, s), e.memoizedState = i.state, r && ec(e, n, !0), e.child;
    }
    function Hh(t) {
        var e = t.stateNode;
        e.pendingContext ? qu(t, e.pendingContext, e.pendingContext !== e.context) : e.context && qu(t, e.context, !1), La(t, e.containerInfo);
    }
    function mc(t, e, n, i, r) {
        return ti(), Pa(r), e.flags |= 256, Me(t, e, n, i), e.child;
    }
    var Hl = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0
    };
    function Wl(t) {
        return {
            baseLanes: t,
            cachePool: null,
            transitions: null
        };
    }
    function Wh(t, e, n) {
        var i = e.pendingProps, r = J.current, s = !1, o = (e.flags & 128) !== 0, l;
        if ((l = o) || (l = t !== null && t.memoizedState === null ? !1 : (r & 2) !== 0), l ? (s = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (r |= 1), $(J, r & 1), t === null) return Ll(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (o = i.children, t = i.fallback, s ? (i = e.mode, s = e.child, o = {
            mode: "hidden",
            children: o
        }, !(i & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = ao(o, i, 0, null), t = xn(t, i, n, null), s.return = e, t.return = e, s.sibling = t, e.child = s, e.child.memoizedState = Wl(n), e.memoizedState = Hl, t) : Wa(e, o));
        if (r = t.memoizedState, r !== null && (l = r.dehydrated, l !== null)) return cy(t, e, o, i, l, r, n);
        if (s) {
            s = i.fallback, o = e.mode, r = t.child, l = r.sibling;
            var a = {
                mode: "hidden",
                children: i.children
            };
            return !(o & 1) && e.child !== r ? (i = e.child, i.childLanes = 0, i.pendingProps = a, e.deletions = null) : (i = Gt(r, a), i.subtreeFlags = r.subtreeFlags & 14680064), l !== null ? s = Gt(l, s) : (s = xn(s, o, n, null), s.flags |= 2), s.return = e, i.return = e, i.sibling = s, e.child = i, i = s, s = e.child, o = t.child.memoizedState, o = o === null ? Wl(n) : {
                baseLanes: o.baseLanes | n,
                cachePool: null,
                transitions: o.transitions
            }, s.memoizedState = o, s.childLanes = t.childLanes & ~n, e.memoizedState = Hl, i;
        }
        return s = t.child, t = s.sibling, i = Gt(s, {
            mode: "visible",
            children: i.children
        }), !(e.mode & 1) && (i.lanes = n), i.return = e, i.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [
            t
        ], e.flags |= 16) : n.push(t)), e.child = i, e.memoizedState = null, i;
    }
    function Wa(t, e) {
        return e = ao({
            mode: "visible",
            children: e
        }, t.mode, 0, null), e.return = t, t.child = e;
    }
    function Br(t, e, n, i) {
        return i !== null && Pa(i), ni(e, t.child, null, n), t = Wa(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
    }
    function cy(t, e, n, i, r, s, o) {
        if (n) return e.flags & 256 ? (e.flags &= -257, i = $o(Error(M(422))), Br(t, e, o, i)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (s = i.fallback, r = e.mode, i = ao({
            mode: "visible",
            children: i.children
        }, r, 0, null), s = xn(s, r, o, null), s.flags |= 2, i.return = e, s.return = e, i.sibling = s, e.child = i, e.mode & 1 && ni(e, t.child, null, o), e.child.memoizedState = Wl(o), e.memoizedState = Hl, s);
        if (!(e.mode & 1)) return Br(t, e, o, null);
        if (r.data === "$!") {
            if (i = r.nextSibling && r.nextSibling.dataset, i) var l = i.dgst;
            return i = l, s = Error(M(419)), i = $o(s, i, void 0), Br(t, e, o, i);
        }
        if (l = (o & t.childLanes) !== 0, Re || l) {
            if (i = de, i !== null) {
                switch(o & -o){
                    case 4:
                        r = 2;
                        break;
                    case 16:
                        r = 8;
                        break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                        r = 32;
                        break;
                    case 536870912:
                        r = 268435456;
                        break;
                    default:
                        r = 0;
                }
                r = r & (i.suspendedLanes | o) ? 0 : r, r !== 0 && r !== s.retryLane && (s.retryLane = r, Tt(t, r), ot(i, t, r, -1));
            }
            return Qa(), i = $o(Error(M(421))), Br(t, e, o, i);
        }
        return r.data === "$?" ? (e.flags |= 128, e.child = t.child, e = ky.bind(null, t), r._reactRetry = e, null) : (t = s.treeContext, Fe = Yt(r.nextSibling), Ae = e, G = !0, it = null, t !== null && (Ue[$e++] = Ct, Ue[$e++] = Mt, Ue[$e++] = wn, Ct = t.id, Mt = t.overflow, wn = e), e = Wa(e, i.children), e.flags |= 4096, e);
    }
    function yc(t, e, n) {
        t.lanes |= e;
        var i = t.alternate;
        i !== null && (i.lanes |= e), zl(t.return, e, n);
    }
    function Yo(t, e, n, i, r) {
        var s = t.memoizedState;
        s === null ? t.memoizedState = {
            isBackwards: e,
            rendering: null,
            renderingStartTime: 0,
            last: i,
            tail: n,
            tailMode: r
        } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = n, s.tailMode = r);
    }
    function Vh(t, e, n) {
        var i = e.pendingProps, r = i.revealOrder, s = i.tail;
        if (Me(t, e, i.children, n), i = J.current, i & 2) i = i & 1 | 2, e.flags |= 128;
        else {
            if (t !== null && t.flags & 128) e: for(t = e.child; t !== null;){
                if (t.tag === 13) t.memoizedState !== null && yc(t, n, e);
                else if (t.tag === 19) yc(t, n, e);
                else if (t.child !== null) {
                    t.child.return = t, t = t.child;
                    continue;
                }
                if (t === e) break e;
                for(; t.sibling === null;){
                    if (t.return === null || t.return === e) break e;
                    t = t.return;
                }
                t.sibling.return = t.return, t = t.sibling;
            }
            i &= 1;
        }
        if ($(J, i), !(e.mode & 1)) e.memoizedState = null;
        else switch(r){
            case "forwards":
                for(n = e.child, r = null; n !== null;)t = n.alternate, t !== null && zs(t) === null && (r = n), n = n.sibling;
                n = r, n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), Yo(e, !1, r, n, s);
                break;
            case "backwards":
                for(n = null, r = e.child, e.child = null; r !== null;){
                    if (t = r.alternate, t !== null && zs(t) === null) {
                        e.child = r;
                        break;
                    }
                    t = r.sibling, r.sibling = n, n = r, r = t;
                }
                Yo(e, !0, n, null, s);
                break;
            case "together":
                Yo(e, !1, null, null, void 0);
                break;
            default:
                e.memoizedState = null;
        }
        return e.child;
    }
    function fs(t, e) {
        !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
    }
    function jt(t, e, n) {
        if (t !== null && (e.dependencies = t.dependencies), bn |= e.lanes, !(n & e.childLanes)) return null;
        if (t !== null && e.child !== t.child) throw Error(M(153));
        if (e.child !== null) {
            for(t = e.child, n = Gt(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null;)t = t.sibling, n = n.sibling = Gt(t, t.pendingProps), n.return = e;
            n.sibling = null;
        }
        return e.child;
    }
    function dy(t, e, n) {
        switch(e.tag){
            case 3:
                Hh(e), ti();
                break;
            case 5:
                gh(e);
                break;
            case 1:
                ze(e.type) && Ds(e);
                break;
            case 4:
                La(e, e.stateNode.containerInfo);
                break;
            case 10:
                var i = e.type._context, r = e.memoizedProps.value;
                $(Os, i._currentValue), i._currentValue = r;
                break;
            case 13:
                if (i = e.memoizedState, i !== null) return i.dehydrated !== null ? ($(J, J.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? Wh(t, e, n) : ($(J, J.current & 1), t = jt(t, e, n), t !== null ? t.sibling : null);
                $(J, J.current & 1);
                break;
            case 19:
                if (i = (n & e.childLanes) !== 0, t.flags & 128) {
                    if (i) return Vh(t, e, n);
                    e.flags |= 128;
                }
                if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), $(J, J.current), i) break;
                return null;
            case 22:
            case 23:
                return e.lanes = 0, Ah(t, e, n);
        }
        return jt(t, e, n);
    }
    var Uh, Vl, $h, Yh;
    Uh = function(t, e) {
        for(var n = e.child; n !== null;){
            if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
            }
            if (n === e) break;
            for(; n.sibling === null;){
                if (n.return === null || n.return === e) return;
                n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
        }
    };
    Vl = function() {};
    $h = function(t, e, n, i) {
        var r = t.memoizedProps;
        if (r !== i) {
            t = e.stateNode, gn(mt.current);
            var s = null;
            switch(n){
                case "input":
                    r = dl(t, r), i = dl(t, i), s = [];
                    break;
                case "select":
                    r = ee({}, r, {
                        value: void 0
                    }), i = ee({}, i, {
                        value: void 0
                    }), s = [];
                    break;
                case "textarea":
                    r = pl(t, r), i = pl(t, i), s = [];
                    break;
                default:
                    typeof r.onClick != "function" && typeof i.onClick == "function" && (t.onclick = Es);
            }
            ml(n, i);
            var o;
            n = null;
            for(u in r)if (!i.hasOwnProperty(u) && r.hasOwnProperty(u) && r[u] != null) if (u === "style") {
                var l = r[u];
                for(o in l)l.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
            } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Zi.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
            for(u in i){
                var a = i[u];
                if (l = r?.[u], i.hasOwnProperty(u) && a !== l && (a != null || l != null)) if (u === "style") if (l) {
                    for(o in l)!l.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
                    for(o in a)a.hasOwnProperty(o) && l[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
                } else n || (s || (s = []), s.push(u, n)), n = a;
                else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (s = s || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (s = s || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Zi.hasOwnProperty(u) ? (a != null && u === "onScroll" && X("scroll", t), s || l === a || (s = [])) : (s = s || []).push(u, a));
            }
            n && (s = s || []).push("style", n);
            var u = s;
            (e.updateQueue = u) && (e.flags |= 4);
        }
    };
    Yh = function(t, e, n, i) {
        n !== i && (e.flags |= 4);
    };
    function wi(t, e) {
        if (!G) switch(t.tailMode){
            case "hidden":
                e = t.tail;
                for(var n = null; e !== null;)e.alternate !== null && (n = e), e = e.sibling;
                n === null ? t.tail = null : n.sibling = null;
                break;
            case "collapsed":
                n = t.tail;
                for(var i = null; n !== null;)n.alternate !== null && (i = n), n = n.sibling;
                i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
        }
    }
    function xe(t) {
        var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
        if (e) for(var r = t.child; r !== null;)n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = t, r = r.sibling;
        else for(r = t.child; r !== null;)n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = t, r = r.sibling;
        return t.subtreeFlags |= i, t.childLanes = n, e;
    }
    function fy(t, e, n) {
        var i = e.pendingProps;
        switch(Ea(e), e.tag){
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return xe(e), null;
            case 1:
                return ze(e.type) && Ps(), xe(e), null;
            case 3:
                return i = e.stateNode, ii(), K(Le), K(ke), Ia(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Fr(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, it !== null && (Zl(it), it = null))), Vl(t, e), xe(e), null;
            case 5:
                za(e);
                var r = gn(ur.current);
                if (n = e.type, t !== null && e.stateNode != null) $h(t, e, n, i, r), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
                else {
                    if (!i) {
                        if (e.stateNode === null) throw Error(M(166));
                        return xe(e), null;
                    }
                    if (t = gn(mt.current), Fr(e)) {
                        i = e.stateNode, n = e.type;
                        var s = e.memoizedProps;
                        switch(i[pt] = e, i[lr] = s, t = (e.mode & 1) !== 0, n){
                            case "dialog":
                                X("cancel", i), X("close", i);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                X("load", i);
                                break;
                            case "video":
                            case "audio":
                                for(r = 0; r < Oi.length; r++)X(Oi[r], i);
                                break;
                            case "source":
                                X("error", i);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                X("error", i), X("load", i);
                                break;
                            case "details":
                                X("toggle", i);
                                break;
                            case "input":
                                Mu(i, s), X("invalid", i);
                                break;
                            case "select":
                                i._wrapperState = {
                                    wasMultiple: !!s.multiple
                                }, X("invalid", i);
                                break;
                            case "textarea":
                                Pu(i, s), X("invalid", i);
                        }
                        ml(n, s), r = null;
                        for(var o in s)if (s.hasOwnProperty(o)) {
                            var l = s[o];
                            o === "children" ? typeof l == "string" ? i.textContent !== l && (s.suppressHydrationWarning !== !0 && Nr(i.textContent, l, t), r = [
                                "children",
                                l
                            ]) : typeof l == "number" && i.textContent !== "" + l && (s.suppressHydrationWarning !== !0 && Nr(i.textContent, l, t), r = [
                                "children",
                                "" + l
                            ]) : Zi.hasOwnProperty(o) && l != null && o === "onScroll" && X("scroll", i);
                        }
                        switch(n){
                            case "input":
                                Dr(i), Eu(i, s, !0);
                                break;
                            case "textarea":
                                Dr(i), Du(i);
                                break;
                            case "select":
                            case "option":
                                break;
                            default:
                                typeof s.onClick == "function" && (i.onclick = Es);
                        }
                        i = r, e.updateQueue = i, i !== null && (e.flags |= 4);
                    } else {
                        o = r.nodeType === 9 ? r : r.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = _f(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = o.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof i.is == "string" ? t = o.createElement(n, {
                            is: i.is
                        }) : (t = o.createElement(n), n === "select" && (o = t, i.multiple ? o.multiple = !0 : i.size && (o.size = i.size))) : t = o.createElementNS(t, n), t[pt] = e, t[lr] = i, Uh(t, e, !1, !1), e.stateNode = t;
                        e: {
                            switch(o = yl(n, i), n){
                                case "dialog":
                                    X("cancel", t), X("close", t), r = i;
                                    break;
                                case "iframe":
                                case "object":
                                case "embed":
                                    X("load", t), r = i;
                                    break;
                                case "video":
                                case "audio":
                                    for(r = 0; r < Oi.length; r++)X(Oi[r], t);
                                    r = i;
                                    break;
                                case "source":
                                    X("error", t), r = i;
                                    break;
                                case "img":
                                case "image":
                                case "link":
                                    X("error", t), X("load", t), r = i;
                                    break;
                                case "details":
                                    X("toggle", t), r = i;
                                    break;
                                case "input":
                                    Mu(t, i), r = dl(t, i), X("invalid", t);
                                    break;
                                case "option":
                                    r = i;
                                    break;
                                case "select":
                                    t._wrapperState = {
                                        wasMultiple: !!i.multiple
                                    }, r = ee({}, i, {
                                        value: void 0
                                    }), X("invalid", t);
                                    break;
                                case "textarea":
                                    Pu(t, i), r = pl(t, i), X("invalid", t);
                                    break;
                                default:
                                    r = i;
                            }
                            ml(n, r), l = r;
                            for(s in l)if (l.hasOwnProperty(s)) {
                                var a = l[s];
                                s === "style" ? kf(t, a) : s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Sf(t, a)) : s === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Ji(t, a) : typeof a == "number" && Ji(t, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (Zi.hasOwnProperty(s) ? a != null && s === "onScroll" && X("scroll", t) : a != null && fa(t, s, a, o));
                            }
                            switch(n){
                                case "input":
                                    Dr(t), Eu(t, i, !1);
                                    break;
                                case "textarea":
                                    Dr(t), Du(t);
                                    break;
                                case "option":
                                    i.value != null && t.setAttribute("value", "" + Jt(i.value));
                                    break;
                                case "select":
                                    t.multiple = !!i.multiple, s = i.value, s != null ? Yn(t, !!i.multiple, s, !1) : i.defaultValue != null && Yn(t, !!i.multiple, i.defaultValue, !0);
                                    break;
                                default:
                                    typeof r.onClick == "function" && (t.onclick = Es);
                            }
                            switch(n){
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    i = !!i.autoFocus;
                                    break e;
                                case "img":
                                    i = !0;
                                    break e;
                                default:
                                    i = !1;
                            }
                        }
                        i && (e.flags |= 4);
                    }
                    e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
                }
                return xe(e), null;
            case 6:
                if (t && e.stateNode != null) Yh(t, e, t.memoizedProps, i);
                else {
                    if (typeof i != "string" && e.stateNode === null) throw Error(M(166));
                    if (n = gn(ur.current), gn(mt.current), Fr(e)) {
                        if (i = e.stateNode, n = e.memoizedProps, i[pt] = e, (s = i.nodeValue !== n) && (t = Ae, t !== null)) switch(t.tag){
                            case 3:
                                Nr(i.nodeValue, n, (t.mode & 1) !== 0);
                                break;
                            case 5:
                                t.memoizedProps.suppressHydrationWarning !== !0 && Nr(i.nodeValue, n, (t.mode & 1) !== 0);
                        }
                        s && (e.flags |= 4);
                    } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[pt] = e, e.stateNode = i;
                }
                return xe(e), null;
            case 13:
                if (K(J), i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
                    if (G && Fe !== null && e.mode & 1 && !(e.flags & 128)) ch(), ti(), e.flags |= 98560, s = !1;
                    else if (s = Fr(e), i !== null && i.dehydrated !== null) {
                        if (t === null) {
                            if (!s) throw Error(M(318));
                            if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(M(317));
                            s[pt] = e;
                        } else ti(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
                        xe(e), s = !1;
                    } else it !== null && (Zl(it), it = null), s = !0;
                    if (!s) return e.flags & 65536 ? e : null;
                }
                return e.flags & 128 ? (e.lanes = n, e) : (i = i !== null, i !== (t !== null && t.memoizedState !== null) && i && (e.child.flags |= 8192, e.mode & 1 && (t === null || J.current & 1 ? ae === 0 && (ae = 3) : Qa())), e.updateQueue !== null && (e.flags |= 4), xe(e), null);
            case 4:
                return ii(), Vl(t, e), t === null && sr(e.stateNode.containerInfo), xe(e), null;
            case 10:
                return ja(e.type._context), xe(e), null;
            case 17:
                return ze(e.type) && Ps(), xe(e), null;
            case 19:
                if (K(J), s = e.memoizedState, s === null) return xe(e), null;
                if (i = (e.flags & 128) !== 0, o = s.rendering, o === null) if (i) wi(s, !1);
                else {
                    if (ae !== 0 || t !== null && t.flags & 128) for(t = e.child; t !== null;){
                        if (o = zs(t), o !== null) {
                            for(e.flags |= 128, wi(s, !1), i = o.updateQueue, i !== null && (e.updateQueue = i, e.flags |= 4), e.subtreeFlags = 0, i = n, n = e.child; n !== null;)s = n, t = i, s.flags &= 14680066, o = s.alternate, o === null ? (s.childLanes = 0, s.lanes = t, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o.memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, t = o.dependencies, s.dependencies = t === null ? null : {
                                lanes: t.lanes,
                                firstContext: t.firstContext
                            }), n = n.sibling;
                            return $(J, J.current & 1 | 2), e.child;
                        }
                        t = t.sibling;
                    }
                    s.tail !== null && re() > si && (e.flags |= 128, i = !0, wi(s, !1), e.lanes = 4194304);
                }
                else {
                    if (!i) if (t = zs(o), t !== null) {
                        if (e.flags |= 128, i = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), wi(s, !0), s.tail === null && s.tailMode === "hidden" && !o.alternate && !G) return xe(e), null;
                    } else 2 * re() - s.renderingStartTime > si && n !== 1073741824 && (e.flags |= 128, i = !0, wi(s, !1), e.lanes = 4194304);
                    s.isBackwards ? (o.sibling = e.child, e.child = o) : (n = s.last, n !== null ? n.sibling = o : e.child = o, s.last = o);
                }
                return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = re(), e.sibling = null, n = J.current, $(J, i ? n & 1 | 2 : n & 1), e) : (xe(e), null);
            case 22:
            case 23:
                return Xa(), i = e.memoizedState !== null, t !== null && t.memoizedState !== null !== i && (e.flags |= 8192), i && e.mode & 1 ? Ne & 1073741824 && (xe(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : xe(e), null;
            case 24:
                return null;
            case 25:
                return null;
        }
        throw Error(M(156, e.tag));
    }
    function hy(t, e) {
        switch(Ea(e), e.tag){
            case 1:
                return ze(e.type) && Ps(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
            case 3:
                return ii(), K(Le), K(ke), Ia(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
            case 5:
                return za(e), null;
            case 13:
                if (K(J), t = e.memoizedState, t !== null && t.dehydrated !== null) {
                    if (e.alternate === null) throw Error(M(340));
                    ti();
                }
                return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
            case 19:
                return K(J), null;
            case 4:
                return ii(), null;
            case 10:
                return ja(e.type._context), null;
            case 22:
            case 23:
                return Xa(), null;
            case 24:
                return null;
            default:
                return null;
        }
    }
    var Hr = !1, Se = !1, py = typeof WeakSet == "function" ? WeakSet : Set, T = null;
    function Un(t, e) {
        var n = t.ref;
        if (n !== null) if (typeof n == "function") try {
            n(null);
        } catch (i) {
            ne(t, e, i);
        }
        else n.current = null;
    }
    function Ul(t, e, n) {
        try {
            n();
        } catch (i) {
            ne(t, e, i);
        }
    }
    var vc = !1;
    function gy(t, e) {
        if (El = bs, t = Zf(), Ca(t)) {
            if ("selectionStart" in t) var n = {
                start: t.selectionStart,
                end: t.selectionEnd
            };
            else e: {
                n = (n = t.ownerDocument) && n.defaultView || window;
                var i = n.getSelection && n.getSelection();
                if (i && i.rangeCount !== 0) {
                    n = i.anchorNode;
                    var r = i.anchorOffset, s = i.focusNode;
                    i = i.focusOffset;
                    try {
                        n.nodeType, s.nodeType;
                    } catch  {
                        n = null;
                        break e;
                    }
                    var o = 0, l = -1, a = -1, u = 0, c = 0, d = t, f = null;
                    t: for(;;){
                        for(var p; d !== n || r !== 0 && d.nodeType !== 3 || (l = o + r), d !== s || i !== 0 && d.nodeType !== 3 || (a = o + i), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;)f = d, d = p;
                        for(;;){
                            if (d === t) break t;
                            if (f === n && ++u === r && (l = o), f === s && ++c === i && (a = o), (p = d.nextSibling) !== null) break;
                            d = f, f = d.parentNode;
                        }
                        d = p;
                    }
                    n = l === -1 || a === -1 ? null : {
                        start: l,
                        end: a
                    };
                } else n = null;
            }
            n = n || {
                start: 0,
                end: 0
            };
        } else n = null;
        for(Pl = {
            focusedElem: t,
            selectionRange: n
        }, bs = !1, T = e; T !== null;)if (e = T, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, T = t;
        else for(; T !== null;){
            e = T;
            try {
                var y = e.alternate;
                if (e.flags & 1024) switch(e.tag){
                    case 0:
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if (y !== null) {
                            var v = y.memoizedProps, _ = y.memoizedState, m = e.stateNode, h = m.getSnapshotBeforeUpdate(e.elementType === e.type ? v : tt(e.type, v), _);
                            m.__reactInternalSnapshotBeforeUpdate = h;
                        }
                        break;
                    case 3:
                        var x = e.stateNode.containerInfo;
                        x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
                        break;
                    case 5:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        throw Error(M(163));
                }
            } catch (S) {
                ne(e, e.return, S);
            }
            if (t = e.sibling, t !== null) {
                t.return = e.return, T = t;
                break;
            }
            T = e.return;
        }
        return y = vc, vc = !1, y;
    }
    function Vi(t, e, n) {
        var i = e.updateQueue;
        if (i = i !== null ? i.lastEffect : null, i !== null) {
            var r = i = i.next;
            do {
                if ((r.tag & t) === t) {
                    var s = r.destroy;
                    r.destroy = void 0, s !== void 0 && Ul(e, n, s);
                }
                r = r.next;
            }while (r !== i);
        }
    }
    function oo(t, e) {
        if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
            var n = e = e.next;
            do {
                if ((n.tag & t) === t) {
                    var i = n.create;
                    n.destroy = i();
                }
                n = n.next;
            }while (n !== e);
        }
    }
    function $l(t) {
        var e = t.ref;
        if (e !== null) {
            var n = t.stateNode;
            switch(t.tag){
                case 5:
                    t = n;
                    break;
                default:
                    t = n;
            }
            typeof e == "function" ? e(t) : e.current = t;
        }
    }
    function Xh(t) {
        var e = t.alternate;
        e !== null && (t.alternate = null, Xh(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[pt], delete e[lr], delete e[jl], delete e[Zm], delete e[Jm])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    }
    function Qh(t) {
        return t.tag === 5 || t.tag === 3 || t.tag === 4;
    }
    function xc(t) {
        e: for(;;){
            for(; t.sibling === null;){
                if (t.return === null || Qh(t.return)) return null;
                t = t.return;
            }
            for(t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;){
                if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
                t.child.return = t, t = t.child;
            }
            if (!(t.flags & 2)) return t.stateNode;
        }
    }
    function Yl(t, e, n) {
        var i = t.tag;
        if (i === 5 || i === 6) t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Es));
        else if (i !== 4 && (t = t.child, t !== null)) for(Yl(t, e, n), t = t.sibling; t !== null;)Yl(t, e, n), t = t.sibling;
    }
    function Xl(t, e, n) {
        var i = t.tag;
        if (i === 5 || i === 6) t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
        else if (i !== 4 && (t = t.child, t !== null)) for(Xl(t, e, n), t = t.sibling; t !== null;)Xl(t, e, n), t = t.sibling;
    }
    var pe = null, nt = !1;
    function Rt(t, e, n) {
        for(n = n.child; n !== null;)Kh(t, e, n), n = n.sibling;
    }
    function Kh(t, e, n) {
        if (gt && typeof gt.onCommitFiberUnmount == "function") try {
            gt.onCommitFiberUnmount(Js, n);
        } catch  {}
        switch(n.tag){
            case 5:
                Se || Un(n, e);
            case 6:
                var i = pe, r = nt;
                pe = null, Rt(t, e, n), pe = i, nt = r, pe !== null && (nt ? (t = pe, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : pe.removeChild(n.stateNode));
                break;
            case 18:
                pe !== null && (nt ? (t = pe, n = n.stateNode, t.nodeType === 8 ? Ao(t.parentNode, n) : t.nodeType === 1 && Ao(t, n), nr(t)) : Ao(pe, n.stateNode));
                break;
            case 4:
                i = pe, r = nt, pe = n.stateNode.containerInfo, nt = !0, Rt(t, e, n), pe = i, nt = r;
                break;
            case 0:
            case 11:
            case 14:
            case 15:
                if (!Se && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
                    r = i = i.next;
                    do {
                        var s = r, o = s.destroy;
                        s = s.tag, o !== void 0 && (s & 2 || s & 4) && Ul(n, e, o), r = r.next;
                    }while (r !== i);
                }
                Rt(t, e, n);
                break;
            case 1:
                if (!Se && (Un(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
                    i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
                } catch (l) {
                    ne(n, e, l);
                }
                Rt(t, e, n);
                break;
            case 21:
                Rt(t, e, n);
                break;
            case 22:
                n.mode & 1 ? (Se = (i = Se) || n.memoizedState !== null, Rt(t, e, n), Se = i) : Rt(t, e, n);
                break;
            default:
                Rt(t, e, n);
        }
    }
    function _c(t) {
        var e = t.updateQueue;
        if (e !== null) {
            t.updateQueue = null;
            var n = t.stateNode;
            n === null && (n = t.stateNode = new py), e.forEach(function(i) {
                var r = by.bind(null, t, i);
                n.has(i) || (n.add(i), i.then(r, r));
            });
        }
    }
    function et(t, e) {
        var n = e.deletions;
        if (n !== null) for(var i = 0; i < n.length; i++){
            var r = n[i];
            try {
                var s = t, o = e, l = o;
                e: for(; l !== null;){
                    switch(l.tag){
                        case 5:
                            pe = l.stateNode, nt = !1;
                            break e;
                        case 3:
                            pe = l.stateNode.containerInfo, nt = !0;
                            break e;
                        case 4:
                            pe = l.stateNode.containerInfo, nt = !0;
                            break e;
                    }
                    l = l.return;
                }
                if (pe === null) throw Error(M(160));
                Kh(s, o, r), pe = null, nt = !1;
                var a = r.alternate;
                a !== null && (a.return = null), r.return = null;
            } catch (u) {
                ne(r, e, u);
            }
        }
        if (e.subtreeFlags & 12854) for(e = e.child; e !== null;)Gh(e, t), e = e.sibling;
    }
    function Gh(t, e) {
        var n = t.alternate, i = t.flags;
        switch(t.tag){
            case 0:
            case 11:
            case 14:
            case 15:
                if (et(e, t), ut(t), i & 4) {
                    try {
                        Vi(3, t, t.return), oo(3, t);
                    } catch (v) {
                        ne(t, t.return, v);
                    }
                    try {
                        Vi(5, t, t.return);
                    } catch (v) {
                        ne(t, t.return, v);
                    }
                }
                break;
            case 1:
                et(e, t), ut(t), i & 512 && n !== null && Un(n, n.return);
                break;
            case 5:
                if (et(e, t), ut(t), i & 512 && n !== null && Un(n, n.return), t.flags & 32) {
                    var r = t.stateNode;
                    try {
                        Ji(r, "");
                    } catch (v) {
                        ne(t, t.return, v);
                    }
                }
                if (i & 4 && (r = t.stateNode, r != null)) {
                    var s = t.memoizedProps, o = n !== null ? n.memoizedProps : s, l = t.type, a = t.updateQueue;
                    if (t.updateQueue = null, a !== null) try {
                        l === "input" && s.type === "radio" && s.name != null && vf(r, s), yl(l, o);
                        var u = yl(l, s);
                        for(o = 0; o < a.length; o += 2){
                            var c = a[o], d = a[o + 1];
                            c === "style" ? kf(r, d) : c === "dangerouslySetInnerHTML" ? Sf(r, d) : c === "children" ? Ji(r, d) : fa(r, c, d, u);
                        }
                        switch(l){
                            case "input":
                                fl(r, s);
                                break;
                            case "textarea":
                                xf(r, s);
                                break;
                            case "select":
                                var f = r._wrapperState.wasMultiple;
                                r._wrapperState.wasMultiple = !!s.multiple;
                                var p = s.value;
                                p != null ? Yn(r, !!s.multiple, p, !1) : f !== !!s.multiple && (s.defaultValue != null ? Yn(r, !!s.multiple, s.defaultValue, !0) : Yn(r, !!s.multiple, s.multiple ? [] : "", !1));
                        }
                        r[lr] = s;
                    } catch (v) {
                        ne(t, t.return, v);
                    }
                }
                break;
            case 6:
                if (et(e, t), ut(t), i & 4) {
                    if (t.stateNode === null) throw Error(M(162));
                    r = t.stateNode, s = t.memoizedProps;
                    try {
                        r.nodeValue = s;
                    } catch (v) {
                        ne(t, t.return, v);
                    }
                }
                break;
            case 3:
                if (et(e, t), ut(t), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
                    nr(e.containerInfo);
                } catch (v) {
                    ne(t, t.return, v);
                }
                break;
            case 4:
                et(e, t), ut(t);
                break;
            case 13:
                et(e, t), ut(t), r = t.child, r.flags & 8192 && (s = r.memoizedState !== null, r.stateNode.isHidden = s, !s || r.alternate !== null && r.alternate.memoizedState !== null || ($a = re())), i & 4 && _c(t);
                break;
            case 22:
                if (c = n !== null && n.memoizedState !== null, t.mode & 1 ? (Se = (u = Se) || c, et(e, t), Se = u) : et(e, t), ut(t), i & 8192) {
                    if (u = t.memoizedState !== null, (t.stateNode.isHidden = u) && !c && t.mode & 1) for(T = t, c = t.child; c !== null;){
                        for(d = T = c; T !== null;){
                            switch(f = T, p = f.child, f.tag){
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Vi(4, f, f.return);
                                    break;
                                case 1:
                                    Un(f, f.return);
                                    var y = f.stateNode;
                                    if (typeof y.componentWillUnmount == "function") {
                                        i = f, n = f.return;
                                        try {
                                            e = i, y.props = e.memoizedProps, y.state = e.memoizedState, y.componentWillUnmount();
                                        } catch (v) {
                                            ne(i, n, v);
                                        }
                                    }
                                    break;
                                case 5:
                                    Un(f, f.return);
                                    break;
                                case 22:
                                    if (f.memoizedState !== null) {
                                        wc(d);
                                        continue;
                                    }
                            }
                            p !== null ? (p.return = f, T = p) : wc(d);
                        }
                        c = c.sibling;
                    }
                    e: for(c = null, d = t;;){
                        if (d.tag === 5) {
                            if (c === null) {
                                c = d;
                                try {
                                    r = d.stateNode, u ? (s = r.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (l = d.stateNode, a = d.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = wf("display", o));
                                } catch (v) {
                                    ne(t, t.return, v);
                                }
                            }
                        } else if (d.tag === 6) {
                            if (c === null) try {
                                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
                            } catch (v) {
                                ne(t, t.return, v);
                            }
                        } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === t) && d.child !== null) {
                            d.child.return = d, d = d.child;
                            continue;
                        }
                        if (d === t) break e;
                        for(; d.sibling === null;){
                            if (d.return === null || d.return === t) break e;
                            c === d && (c = null), d = d.return;
                        }
                        c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
                    }
                }
                break;
            case 19:
                et(e, t), ut(t), i & 4 && _c(t);
                break;
            case 21:
                break;
            default:
                et(e, t), ut(t);
        }
    }
    function ut(t) {
        var e = t.flags;
        if (e & 2) {
            try {
                e: {
                    for(var n = t.return; n !== null;){
                        if (Qh(n)) {
                            var i = n;
                            break e;
                        }
                        n = n.return;
                    }
                    throw Error(M(160));
                }
                switch(i.tag){
                    case 5:
                        var r = i.stateNode;
                        i.flags & 32 && (Ji(r, ""), i.flags &= -33);
                        var s = xc(t);
                        Xl(t, s, r);
                        break;
                    case 3:
                    case 4:
                        var o = i.stateNode.containerInfo, l = xc(t);
                        Yl(t, l, o);
                        break;
                    default:
                        throw Error(M(161));
                }
            } catch (a) {
                ne(t, t.return, a);
            }
            t.flags &= -3;
        }
        e & 4096 && (t.flags &= -4097);
    }
    function my(t, e, n) {
        T = t, Zh(t);
    }
    function Zh(t, e, n) {
        for(var i = (t.mode & 1) !== 0; T !== null;){
            var r = T, s = r.child;
            if (r.tag === 22 && i) {
                var o = r.memoizedState !== null || Hr;
                if (!o) {
                    var l = r.alternate, a = l !== null && l.memoizedState !== null || Se;
                    l = Hr;
                    var u = Se;
                    if (Hr = o, (Se = a) && !u) for(T = r; T !== null;)o = T, a = o.child, o.tag === 22 && o.memoizedState !== null ? kc(r) : a !== null ? (a.return = o, T = a) : kc(r);
                    for(; s !== null;)T = s, Zh(s), s = s.sibling;
                    T = r, Hr = l, Se = u;
                }
                Sc(t);
            } else r.subtreeFlags & 8772 && s !== null ? (s.return = r, T = s) : Sc(t);
        }
    }
    function Sc(t) {
        for(; T !== null;){
            var e = T;
            if (e.flags & 8772) {
                var n = e.alternate;
                try {
                    if (e.flags & 8772) switch(e.tag){
                        case 0:
                        case 11:
                        case 15:
                            Se || oo(5, e);
                            break;
                        case 1:
                            var i = e.stateNode;
                            if (e.flags & 4 && !Se) if (n === null) i.componentDidMount();
                            else {
                                var r = e.elementType === e.type ? n.memoizedProps : tt(e.type, n.memoizedProps);
                                i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
                            }
                            var s = e.updateQueue;
                            s !== null && sc(e, s, i);
                            break;
                        case 3:
                            var o = e.updateQueue;
                            if (o !== null) {
                                if (n = null, e.child !== null) switch(e.child.tag){
                                    case 5:
                                        n = e.child.stateNode;
                                        break;
                                    case 1:
                                        n = e.child.stateNode;
                                }
                                sc(e, o, n);
                            }
                            break;
                        case 5:
                            var l = e.stateNode;
                            if (n === null && e.flags & 4) {
                                n = l;
                                var a = e.memoizedProps;
                                switch(e.type){
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        a.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        a.src && (n.src = a.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (e.memoizedState === null) {
                                var u = e.alternate;
                                if (u !== null) {
                                    var c = u.memoizedState;
                                    if (c !== null) {
                                        var d = c.dehydrated;
                                        d !== null && nr(d);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(M(163));
                    }
                    Se || e.flags & 512 && $l(e);
                } catch (f) {
                    ne(e, e.return, f);
                }
            }
            if (e === t) {
                T = null;
                break;
            }
            if (n = e.sibling, n !== null) {
                n.return = e.return, T = n;
                break;
            }
            T = e.return;
        }
    }
    function wc(t) {
        for(; T !== null;){
            var e = T;
            if (e === t) {
                T = null;
                break;
            }
            var n = e.sibling;
            if (n !== null) {
                n.return = e.return, T = n;
                break;
            }
            T = e.return;
        }
    }
    function kc(t) {
        for(; T !== null;){
            var e = T;
            try {
                switch(e.tag){
                    case 0:
                    case 11:
                    case 15:
                        var n = e.return;
                        try {
                            oo(4, e);
                        } catch (a) {
                            ne(e, n, a);
                        }
                        break;
                    case 1:
                        var i = e.stateNode;
                        if (typeof i.componentDidMount == "function") {
                            var r = e.return;
                            try {
                                i.componentDidMount();
                            } catch (a) {
                                ne(e, r, a);
                            }
                        }
                        var s = e.return;
                        try {
                            $l(e);
                        } catch (a) {
                            ne(e, s, a);
                        }
                        break;
                    case 5:
                        var o = e.return;
                        try {
                            $l(e);
                        } catch (a) {
                            ne(e, o, a);
                        }
                }
            } catch (a) {
                ne(e, e.return, a);
            }
            if (e === t) {
                T = null;
                break;
            }
            var l = e.sibling;
            if (l !== null) {
                l.return = e.return, T = l;
                break;
            }
            T = e.return;
        }
    }
    var yy = Math.ceil, Fs = Ot.ReactCurrentDispatcher, Va = Ot.ReactCurrentOwner, Ke = Ot.ReactCurrentBatchConfig, N = 0, de = null, oe = null, ge = 0, Ne = 0, $n = nn(0), ae = 0, hr = null, bn = 0, lo = 0, Ua = 0, Ui = null, je = null, $a = 0, si = 1 / 0, wt = null, As = !1, Ql = null, Qt = null, Wr = !1, Bt = null, Bs = 0, $i = 0, Kl = null, hs = -1, ps = 0;
    function Ee() {
        return N & 6 ? re() : hs !== -1 ? hs : hs = re();
    }
    function Kt(t) {
        return t.mode & 1 ? N & 2 && ge !== 0 ? ge & -ge : ey.transition !== null ? (ps === 0 && (ps = zf()), ps) : (t = H, t !== 0 || (t = window.event, t = t === void 0 ? 16 : Wf(t.type)), t) : 1;
    }
    function ot(t, e, n, i) {
        if (50 < $i) throw $i = 0, Kl = null, Error(M(185));
        Sr(t, n, i), (!(N & 2) || t !== de) && (t === de && (!(N & 2) && (lo |= n), ae === 4 && Ft(t, ge)), Ie(t, i), n === 1 && N === 0 && !(e.mode & 1) && (si = re() + 500, io && rn()));
    }
    function Ie(t, e) {
        var n = t.callbackNode;
        em(t, e);
        var i = ks(t, t === de ? ge : 0);
        if (i === 0) n !== null && Ou(n), t.callbackNode = null, t.callbackPriority = 0;
        else if (e = i & -i, t.callbackPriority !== e) {
            if (n != null && Ou(n), e === 1) t.tag === 0 ? qm(bc.bind(null, t)) : lh(bc.bind(null, t)), Km(function() {
                !(N & 6) && rn();
            }), n = null;
            else {
                switch(If(i)){
                    case 1:
                        n = ya;
                        break;
                    case 4:
                        n = Rf;
                        break;
                    case 16:
                        n = ws;
                        break;
                    case 536870912:
                        n = Lf;
                        break;
                    default:
                        n = ws;
                }
                n = sp(n, Jh.bind(null, t));
            }
            t.callbackPriority = e, t.callbackNode = n;
        }
    }
    function Jh(t, e) {
        if (hs = -1, ps = 0, N & 6) throw Error(M(327));
        var n = t.callbackNode;
        if (Zn() && t.callbackNode !== n) return null;
        var i = ks(t, t === de ? ge : 0);
        if (i === 0) return null;
        if (i & 30 || i & t.expiredLanes || e) e = Hs(t, i);
        else {
            e = i;
            var r = N;
            N |= 2;
            var s = ep();
            (de !== t || ge !== e) && (wt = null, si = re() + 500, vn(t, e));
            do try {
                _y();
                break;
            } catch (l) {
                qh(t, l);
            }
            while (!0);
            Ta(), Fs.current = s, N = r, oe !== null ? e = 0 : (de = null, ge = 0, e = ae);
        }
        if (e !== 0) {
            if (e === 2 && (r = wl(t), r !== 0 && (i = r, e = Gl(t, r))), e === 1) throw n = hr, vn(t, 0), Ft(t, i), Ie(t, re()), n;
            if (e === 6) Ft(t, i);
            else {
                if (r = t.current.alternate, !(i & 30) && !vy(r) && (e = Hs(t, i), e === 2 && (s = wl(t), s !== 0 && (i = s, e = Gl(t, s))), e === 1)) throw n = hr, vn(t, 0), Ft(t, i), Ie(t, re()), n;
                switch(t.finishedWork = r, t.finishedLanes = i, e){
                    case 0:
                    case 1:
                        throw Error(M(345));
                    case 2:
                        un(t, je, wt);
                        break;
                    case 3:
                        if (Ft(t, i), (i & 130023424) === i && (e = $a + 500 - re(), 10 < e)) {
                            if (ks(t, 0) !== 0) break;
                            if (r = t.suspendedLanes, (r & i) !== i) {
                                Ee(), t.pingedLanes |= t.suspendedLanes & r;
                                break;
                            }
                            t.timeoutHandle = Tl(un.bind(null, t, je, wt), e);
                            break;
                        }
                        un(t, je, wt);
                        break;
                    case 4:
                        if (Ft(t, i), (i & 4194240) === i) break;
                        for(e = t.eventTimes, r = -1; 0 < i;){
                            var o = 31 - st(i);
                            s = 1 << o, o = e[o], o > r && (r = o), i &= ~s;
                        }
                        if (i = r, i = re() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * yy(i / 1960)) - i, 10 < i) {
                            t.timeoutHandle = Tl(un.bind(null, t, je, wt), i);
                            break;
                        }
                        un(t, je, wt);
                        break;
                    case 5:
                        un(t, je, wt);
                        break;
                    default:
                        throw Error(M(329));
                }
            }
        }
        return Ie(t, re()), t.callbackNode === n ? Jh.bind(null, t) : null;
    }
    function Gl(t, e) {
        var n = Ui;
        return t.current.memoizedState.isDehydrated && (vn(t, e).flags |= 256), t = Hs(t, e), t !== 2 && (e = je, je = n, e !== null && Zl(e)), t;
    }
    function Zl(t) {
        je === null ? je = t : je.push.apply(je, t);
    }
    function vy(t) {
        for(var e = t;;){
            if (e.flags & 16384) {
                var n = e.updateQueue;
                if (n !== null && (n = n.stores, n !== null)) for(var i = 0; i < n.length; i++){
                    var r = n[i], s = r.getSnapshot;
                    r = r.value;
                    try {
                        if (!lt(s(), r)) return !1;
                    } catch  {
                        return !1;
                    }
                }
            }
            if (n = e.child, e.subtreeFlags & 16384 && n !== null) n.return = e, e = n;
            else {
                if (e === t) break;
                for(; e.sibling === null;){
                    if (e.return === null || e.return === t) return !0;
                    e = e.return;
                }
                e.sibling.return = e.return, e = e.sibling;
            }
        }
        return !0;
    }
    function Ft(t, e) {
        for(e &= ~Ua, e &= ~lo, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e;){
            var n = 31 - st(e), i = 1 << n;
            t[n] = -1, e &= ~i;
        }
    }
    function bc(t) {
        if (N & 6) throw Error(M(327));
        Zn();
        var e = ks(t, 0);
        if (!(e & 1)) return Ie(t, re()), null;
        var n = Hs(t, e);
        if (t.tag !== 0 && n === 2) {
            var i = wl(t);
            i !== 0 && (e = i, n = Gl(t, i));
        }
        if (n === 1) throw n = hr, vn(t, 0), Ft(t, e), Ie(t, re()), n;
        if (n === 6) throw Error(M(345));
        return t.finishedWork = t.current.alternate, t.finishedLanes = e, un(t, je, wt), Ie(t, re()), null;
    }
    function Ya(t, e) {
        var n = N;
        N |= 1;
        try {
            return t(e);
        } finally{
            N = n, N === 0 && (si = re() + 500, io && rn());
        }
    }
    function Cn(t) {
        Bt !== null && Bt.tag === 0 && !(N & 6) && Zn();
        var e = N;
        N |= 1;
        var n = Ke.transition, i = H;
        try {
            if (Ke.transition = null, H = 1, t) return t();
        } finally{
            H = i, Ke.transition = n, N = e, !(N & 6) && rn();
        }
    }
    function Xa() {
        Ne = $n.current, K($n);
    }
    function vn(t, e) {
        t.finishedWork = null, t.finishedLanes = 0;
        var n = t.timeoutHandle;
        if (n !== -1 && (t.timeoutHandle = -1, Qm(n)), oe !== null) for(n = oe.return; n !== null;){
            var i = n;
            switch(Ea(i), i.tag){
                case 1:
                    i = i.type.childContextTypes, i != null && Ps();
                    break;
                case 3:
                    ii(), K(Le), K(ke), Ia();
                    break;
                case 5:
                    za(i);
                    break;
                case 4:
                    ii();
                    break;
                case 13:
                    K(J);
                    break;
                case 19:
                    K(J);
                    break;
                case 10:
                    ja(i.type._context);
                    break;
                case 22:
                case 23:
                    Xa();
            }
            n = n.return;
        }
        if (de = t, oe = t = Gt(t.current, null), ge = Ne = e, ae = 0, hr = null, Ua = lo = bn = 0, je = Ui = null, pn !== null) {
            for(e = 0; e < pn.length; e++)if (n = pn[e], i = n.interleaved, i !== null) {
                n.interleaved = null;
                var r = i.next, s = n.pending;
                if (s !== null) {
                    var o = s.next;
                    s.next = r, i.next = o;
                }
                n.pending = i;
            }
            pn = null;
        }
        return t;
    }
    function qh(t, e) {
        do {
            var n = oe;
            try {
                if (Ta(), cs.current = Ns, Is) {
                    for(var i = q.memoizedState; i !== null;){
                        var r = i.queue;
                        r !== null && (r.pending = null), i = i.next;
                    }
                    Is = !1;
                }
                if (kn = 0, ue = le = q = null, Wi = !1, cr = 0, Va.current = null, n === null || n.return === null) {
                    ae = 1, hr = e, oe = null;
                    break;
                }
                e: {
                    var s = t, o = n.return, l = n, a = e;
                    if (e = ge, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
                        var u = a, c = l, d = c.tag;
                        if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
                            var f = c.alternate;
                            f ? (c.updateQueue = f.updateQueue, c.memoizedState = f.memoizedState, c.lanes = f.lanes) : (c.updateQueue = null, c.memoizedState = null);
                        }
                        var p = dc(o);
                        if (p !== null) {
                            p.flags &= -257, fc(p, o, l, s, e), p.mode & 1 && cc(s, u, e), e = p, a = u;
                            var y = e.updateQueue;
                            if (y === null) {
                                var v = new Set;
                                v.add(a), e.updateQueue = v;
                            } else y.add(a);
                            break e;
                        } else {
                            if (!(e & 1)) {
                                cc(s, u, e), Qa();
                                break e;
                            }
                            a = Error(M(426));
                        }
                    } else if (G && l.mode & 1) {
                        var _ = dc(o);
                        if (_ !== null) {
                            !(_.flags & 65536) && (_.flags |= 256), fc(_, o, l, s, e), Pa(ri(a, l));
                            break e;
                        }
                    }
                    s = a = ri(a, l), ae !== 4 && (ae = 2), Ui === null ? Ui = [
                        s
                    ] : Ui.push(s), s = o;
                    do {
                        switch(s.tag){
                            case 3:
                                s.flags |= 65536, e &= -e, s.lanes |= e;
                                var m = Ih(s, a, e);
                                rc(s, m);
                                break e;
                            case 1:
                                l = a;
                                var h = s.type, x = s.stateNode;
                                if (!(s.flags & 128) && (typeof h.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (Qt === null || !Qt.has(x)))) {
                                    s.flags |= 65536, e &= -e, s.lanes |= e;
                                    var S = Nh(s, l, e);
                                    rc(s, S);
                                    break e;
                                }
                        }
                        s = s.return;
                    }while (s !== null);
                }
                np(n);
            } catch (w) {
                e = w, oe === n && n !== null && (oe = n = n.return);
                continue;
            }
            break;
        }while (!0);
    }
    function ep() {
        var t = Fs.current;
        return Fs.current = Ns, t === null ? Ns : t;
    }
    function Qa() {
        (ae === 0 || ae === 3 || ae === 2) && (ae = 4), de === null || !(bn & 268435455) && !(lo & 268435455) || Ft(de, ge);
    }
    function Hs(t, e) {
        var n = N;
        N |= 2;
        var i = ep();
        (de !== t || ge !== e) && (wt = null, vn(t, e));
        do try {
            xy();
            break;
        } catch (r) {
            qh(t, r);
        }
        while (!0);
        if (Ta(), N = n, Fs.current = i, oe !== null) throw Error(M(261));
        return de = null, ge = 0, ae;
    }
    function xy() {
        for(; oe !== null;)tp(oe);
    }
    function _y() {
        for(; oe !== null && !$g();)tp(oe);
    }
    function tp(t) {
        var e = rp(t.alternate, t, Ne);
        t.memoizedProps = t.pendingProps, e === null ? np(t) : oe = e, Va.current = null;
    }
    function np(t) {
        var e = t;
        do {
            var n = e.alternate;
            if (t = e.return, e.flags & 32768) {
                if (n = hy(n, e), n !== null) {
                    n.flags &= 32767, oe = n;
                    return;
                }
                if (t !== null) t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
                else {
                    ae = 6, oe = null;
                    return;
                }
            } else if (n = fy(n, e, Ne), n !== null) {
                oe = n;
                return;
            }
            if (e = e.sibling, e !== null) {
                oe = e;
                return;
            }
            oe = e = t;
        }while (e !== null);
        ae === 0 && (ae = 5);
    }
    function un(t, e, n) {
        var i = H, r = Ke.transition;
        try {
            Ke.transition = null, H = 1, Sy(t, e, n, i);
        } finally{
            Ke.transition = r, H = i;
        }
        return null;
    }
    function Sy(t, e, n, i) {
        do Zn();
        while (Bt !== null);
        if (N & 6) throw Error(M(327));
        n = t.finishedWork;
        var r = t.finishedLanes;
        if (n === null) return null;
        if (t.finishedWork = null, t.finishedLanes = 0, n === t.current) throw Error(M(177));
        t.callbackNode = null, t.callbackPriority = 0;
        var s = n.lanes | n.childLanes;
        if (tm(t, s), t === de && (oe = de = null, ge = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Wr || (Wr = !0, sp(ws, function() {
            return Zn(), null;
        })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
            s = Ke.transition, Ke.transition = null;
            var o = H;
            H = 1;
            var l = N;
            N |= 4, Va.current = null, gy(t, n), Gh(n, t), Hm(Pl), bs = !!El, Pl = El = null, t.current = n, my(n), Yg(), N = l, H = o, Ke.transition = s;
        } else t.current = n;
        if (Wr && (Wr = !1, Bt = t, Bs = r), s = t.pendingLanes, s === 0 && (Qt = null), Kg(n.stateNode), Ie(t, re()), e !== null) for(i = t.onRecoverableError, n = 0; n < e.length; n++)r = e[n], i(r.value, {
            componentStack: r.stack,
            digest: r.digest
        });
        if (As) throw As = !1, t = Ql, Ql = null, t;
        return Bs & 1 && t.tag !== 0 && Zn(), s = t.pendingLanes, s & 1 ? t === Kl ? $i++ : ($i = 0, Kl = t) : $i = 0, rn(), null;
    }
    function Zn() {
        if (Bt !== null) {
            var t = If(Bs), e = Ke.transition, n = H;
            try {
                if (Ke.transition = null, H = 16 > t ? 16 : t, Bt === null) var i = !1;
                else {
                    if (t = Bt, Bt = null, Bs = 0, N & 6) throw Error(M(331));
                    var r = N;
                    for(N |= 4, T = t.current; T !== null;){
                        var s = T, o = s.child;
                        if (T.flags & 16) {
                            var l = s.deletions;
                            if (l !== null) {
                                for(var a = 0; a < l.length; a++){
                                    var u = l[a];
                                    for(T = u; T !== null;){
                                        var c = T;
                                        switch(c.tag){
                                            case 0:
                                            case 11:
                                            case 15:
                                                Vi(8, c, s);
                                        }
                                        var d = c.child;
                                        if (d !== null) d.return = c, T = d;
                                        else for(; T !== null;){
                                            c = T;
                                            var f = c.sibling, p = c.return;
                                            if (Xh(c), c === u) {
                                                T = null;
                                                break;
                                            }
                                            if (f !== null) {
                                                f.return = p, T = f;
                                                break;
                                            }
                                            T = p;
                                        }
                                    }
                                }
                                var y = s.alternate;
                                if (y !== null) {
                                    var v = y.child;
                                    if (v !== null) {
                                        y.child = null;
                                        do {
                                            var _ = v.sibling;
                                            v.sibling = null, v = _;
                                        }while (v !== null);
                                    }
                                }
                                T = s;
                            }
                        }
                        if (s.subtreeFlags & 2064 && o !== null) o.return = s, T = o;
                        else e: for(; T !== null;){
                            if (s = T, s.flags & 2048) switch(s.tag){
                                case 0:
                                case 11:
                                case 15:
                                    Vi(9, s, s.return);
                            }
                            var m = s.sibling;
                            if (m !== null) {
                                m.return = s.return, T = m;
                                break e;
                            }
                            T = s.return;
                        }
                    }
                    var h = t.current;
                    for(T = h; T !== null;){
                        o = T;
                        var x = o.child;
                        if (o.subtreeFlags & 2064 && x !== null) x.return = o, T = x;
                        else e: for(o = h; T !== null;){
                            if (l = T, l.flags & 2048) try {
                                switch(l.tag){
                                    case 0:
                                    case 11:
                                    case 15:
                                        oo(9, l);
                                }
                            } catch (w) {
                                ne(l, l.return, w);
                            }
                            if (l === o) {
                                T = null;
                                break e;
                            }
                            var S = l.sibling;
                            if (S !== null) {
                                S.return = l.return, T = S;
                                break e;
                            }
                            T = l.return;
                        }
                    }
                    if (N = r, rn(), gt && typeof gt.onPostCommitFiberRoot == "function") try {
                        gt.onPostCommitFiberRoot(Js, t);
                    } catch  {}
                    i = !0;
                }
                return i;
            } finally{
                H = n, Ke.transition = e;
            }
        }
        return !1;
    }
    function Cc(t, e, n) {
        e = ri(n, e), e = Ih(t, e, 1), t = Xt(t, e, 1), e = Ee(), t !== null && (Sr(t, 1, e), Ie(t, e));
    }
    function ne(t, e, n) {
        if (t.tag === 3) Cc(t, t, n);
        else for(; e !== null;){
            if (e.tag === 3) {
                Cc(e, t, n);
                break;
            } else if (e.tag === 1) {
                var i = e.stateNode;
                if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Qt === null || !Qt.has(i))) {
                    t = ri(n, t), t = Nh(e, t, 1), e = Xt(e, t, 1), t = Ee(), e !== null && (Sr(e, 1, t), Ie(e, t));
                    break;
                }
            }
            e = e.return;
        }
    }
    function wy(t, e, n) {
        var i = t.pingCache;
        i !== null && i.delete(e), e = Ee(), t.pingedLanes |= t.suspendedLanes & n, de === t && (ge & n) === n && (ae === 4 || ae === 3 && (ge & 130023424) === ge && 500 > re() - $a ? vn(t, 0) : Ua |= n), Ie(t, e);
    }
    function ip(t, e) {
        e === 0 && (t.mode & 1 ? (e = Or, Or <<= 1, !(Or & 130023424) && (Or = 4194304)) : e = 1);
        var n = Ee();
        t = Tt(t, e), t !== null && (Sr(t, e, n), Ie(t, n));
    }
    function ky(t) {
        var e = t.memoizedState, n = 0;
        e !== null && (n = e.retryLane), ip(t, n);
    }
    function by(t, e) {
        var n = 0;
        switch(t.tag){
            case 13:
                var i = t.stateNode, r = t.memoizedState;
                r !== null && (n = r.retryLane);
                break;
            case 19:
                i = t.stateNode;
                break;
            default:
                throw Error(M(314));
        }
        i !== null && i.delete(e), ip(t, n);
    }
    var rp;
    rp = function(t, e, n) {
        if (t !== null) if (t.memoizedProps !== e.pendingProps || Le.current) Re = !0;
        else {
            if (!(t.lanes & n) && !(e.flags & 128)) return Re = !1, dy(t, e, n);
            Re = !!(t.flags & 131072);
        }
        else Re = !1, G && e.flags & 1048576 && ah(e, js, e.index);
        switch(e.lanes = 0, e.tag){
            case 2:
                var i = e.type;
                fs(t, e), t = e.pendingProps;
                var r = ei(e, ke.current);
                Gn(e, n), r = Fa(null, e, i, t, r, n);
                var s = Aa();
                return e.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, ze(i) ? (s = !0, Ds(e)) : s = !1, e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, Ra(e), r.updater = so, e.stateNode = r, r._reactInternals = e, Nl(e, i, t, n), e = Bl(null, e, i, !0, s, n)) : (e.tag = 0, G && s && Ma(e), Me(null, e, r, n), e = e.child), e;
            case 16:
                i = e.elementType;
                e: {
                    switch(fs(t, e), t = e.pendingProps, r = i._init, i = r(i._payload), e.type = i, r = e.tag = My(i), t = tt(i, t), r){
                        case 0:
                            e = Al(null, e, i, t, n);
                            break e;
                        case 1:
                            e = gc(null, e, i, t, n);
                            break e;
                        case 11:
                            e = hc(null, e, i, t, n);
                            break e;
                        case 14:
                            e = pc(null, e, i, tt(i.type, t), n);
                            break e;
                    }
                    throw Error(M(306, i, ""));
                }
                return e;
            case 0:
                return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : tt(i, r), Al(t, e, i, r, n);
            case 1:
                return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : tt(i, r), gc(t, e, i, r, n);
            case 3:
                e: {
                    if (Hh(e), t === null) throw Error(M(387));
                    i = e.pendingProps, s = e.memoizedState, r = s.element, ph(t, e), Ls(e, i, null, n);
                    var o = e.memoizedState;
                    if (i = o.element, s.isDehydrated) if (s = {
                        element: i,
                        isDehydrated: !1,
                        cache: o.cache,
                        pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                        transitions: o.transitions
                    }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
                        r = ri(Error(M(423)), e), e = mc(t, e, i, n, r);
                        break e;
                    } else if (i !== r) {
                        r = ri(Error(M(424)), e), e = mc(t, e, i, n, r);
                        break e;
                    } else for(Fe = Yt(e.stateNode.containerInfo.firstChild), Ae = e, G = !0, it = null, n = fh(e, null, i, n), e.child = n; n;)n.flags = n.flags & -3 | 4096, n = n.sibling;
                    else {
                        if (ti(), i === r) {
                            e = jt(t, e, n);
                            break e;
                        }
                        Me(t, e, i, n);
                    }
                    e = e.child;
                }
                return e;
            case 5:
                return gh(e), t === null && Ll(e), i = e.type, r = e.pendingProps, s = t !== null ? t.memoizedProps : null, o = r.children, Dl(i, r) ? o = null : s !== null && Dl(i, s) && (e.flags |= 32), Bh(t, e), Me(t, e, o, n), e.child;
            case 6:
                return t === null && Ll(e), null;
            case 13:
                return Wh(t, e, n);
            case 4:
                return La(e, e.stateNode.containerInfo), i = e.pendingProps, t === null ? e.child = ni(e, null, i, n) : Me(t, e, i, n), e.child;
            case 11:
                return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : tt(i, r), hc(t, e, i, r, n);
            case 7:
                return Me(t, e, e.pendingProps, n), e.child;
            case 8:
                return Me(t, e, e.pendingProps.children, n), e.child;
            case 12:
                return Me(t, e, e.pendingProps.children, n), e.child;
            case 10:
                e: {
                    if (i = e.type._context, r = e.pendingProps, s = e.memoizedProps, o = r.value, $(Os, i._currentValue), i._currentValue = o, s !== null) if (lt(s.value, o)) {
                        if (s.children === r.children && !Le.current) {
                            e = jt(t, e, n);
                            break e;
                        }
                    } else for(s = e.child, s !== null && (s.return = e); s !== null;){
                        var l = s.dependencies;
                        if (l !== null) {
                            o = s.child;
                            for(var a = l.firstContext; a !== null;){
                                if (a.context === i) {
                                    if (s.tag === 1) {
                                        a = Et(-1, n & -n), a.tag = 2;
                                        var u = s.updateQueue;
                                        if (u !== null) {
                                            u = u.shared;
                                            var c = u.pending;
                                            c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                                        }
                                    }
                                    s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), zl(s.return, n, e), l.lanes |= n;
                                    break;
                                }
                                a = a.next;
                            }
                        } else if (s.tag === 10) o = s.type === e.type ? null : s.child;
                        else if (s.tag === 18) {
                            if (o = s.return, o === null) throw Error(M(341));
                            o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), zl(o, n, e), o = s.sibling;
                        } else o = s.child;
                        if (o !== null) o.return = s;
                        else for(o = s; o !== null;){
                            if (o === e) {
                                o = null;
                                break;
                            }
                            if (s = o.sibling, s !== null) {
                                s.return = o.return, o = s;
                                break;
                            }
                            o = o.return;
                        }
                        s = o;
                    }
                    Me(t, e, r.children, n), e = e.child;
                }
                return e;
            case 9:
                return r = e.type, i = e.pendingProps.children, Gn(e, n), r = Ge(r), i = i(r), e.flags |= 1, Me(t, e, i, n), e.child;
            case 14:
                return i = e.type, r = tt(i, e.pendingProps), r = tt(i.type, r), pc(t, e, i, r, n);
            case 15:
                return Fh(t, e, e.type, e.pendingProps, n);
            case 17:
                return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : tt(i, r), fs(t, e), e.tag = 1, ze(i) ? (t = !0, Ds(e)) : t = !1, Gn(e, n), zh(e, i, r), Nl(e, i, r, n), Bl(null, e, i, !0, t, n);
            case 19:
                return Vh(t, e, n);
            case 22:
                return Ah(t, e, n);
        }
        throw Error(M(156, e.tag));
    };
    function sp(t, e) {
        return Of(t, e);
    }
    function Cy(t, e, n, i) {
        this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Ye(t, e, n, i) {
        return new Cy(t, e, n, i);
    }
    function Ka(t) {
        return t = t.prototype, !(!t || !t.isReactComponent);
    }
    function My(t) {
        if (typeof t == "function") return Ka(t) ? 1 : 0;
        if (t != null) {
            if (t = t.$$typeof, t === pa) return 11;
            if (t === ga) return 14;
        }
        return 2;
    }
    function Gt(t, e) {
        var n = t.alternate;
        return n === null ? (n = Ye(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : {
            lanes: e.lanes,
            firstContext: e.firstContext
        }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
    }
    function gs(t, e, n, i, r, s) {
        var o = 2;
        if (i = t, typeof t == "function") Ka(t) && (o = 1);
        else if (typeof t == "string") o = 5;
        else e: switch(t){
            case zn:
                return xn(n.children, r, s, e);
            case ha:
                o = 8, r |= 8;
                break;
            case ll:
                return t = Ye(12, n, e, r | 2), t.elementType = ll, t.lanes = s, t;
            case al:
                return t = Ye(13, n, e, r), t.elementType = al, t.lanes = s, t;
            case ul:
                return t = Ye(19, n, e, r), t.elementType = ul, t.lanes = s, t;
            case gf:
                return ao(n, r, s, e);
            default:
                if (typeof t == "object" && t !== null) switch(t.$$typeof){
                    case hf:
                        o = 10;
                        break e;
                    case pf:
                        o = 9;
                        break e;
                    case pa:
                        o = 11;
                        break e;
                    case ga:
                        o = 14;
                        break e;
                    case zt:
                        o = 16, i = null;
                        break e;
                }
                throw Error(M(130, t == null ? t : typeof t, ""));
        }
        return e = Ye(o, n, e, r), e.elementType = t, e.type = i, e.lanes = s, e;
    }
    function xn(t, e, n, i) {
        return t = Ye(7, t, i, e), t.lanes = n, t;
    }
    function ao(t, e, n, i) {
        return t = Ye(22, t, i, e), t.elementType = gf, t.lanes = n, t.stateNode = {
            isHidden: !1
        }, t;
    }
    function Xo(t, e, n) {
        return t = Ye(6, t, null, e), t.lanes = n, t;
    }
    function Qo(t, e, n) {
        return e = Ye(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = {
            containerInfo: t.containerInfo,
            pendingChildren: null,
            implementation: t.implementation
        }, e;
    }
    function Ey(t, e, n, i, r) {
        this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Po(0), this.expirationTimes = Po(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Po(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
    }
    function Ga(t, e, n, i, r, s, o, l, a) {
        return t = new Ey(t, e, n, l, a), e === 1 ? (e = 1, s === !0 && (e |= 8)) : e = 0, s = Ye(3, null, null, e), t.current = s, s.stateNode = t, s.memoizedState = {
            element: i,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        }, Ra(s), t;
    }
    function Py(t, e, n) {
        var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: Ln,
            key: i == null ? null : "" + i,
            children: t,
            containerInfo: e,
            implementation: n
        };
    }
    function op(t) {
        if (!t) return qt;
        t = t._reactInternals;
        e: {
            if (Pn(t) !== t || t.tag !== 1) throw Error(M(170));
            var e = t;
            do {
                switch(e.tag){
                    case 3:
                        e = e.stateNode.context;
                        break e;
                    case 1:
                        if (ze(e.type)) {
                            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
                            break e;
                        }
                }
                e = e.return;
            }while (e !== null);
            throw Error(M(171));
        }
        if (t.tag === 1) {
            var n = t.type;
            if (ze(n)) return oh(t, n, e);
        }
        return e;
    }
    function lp(t, e, n, i, r, s, o, l, a) {
        return t = Ga(n, i, !0, t, r, s, o, l, a), t.context = op(null), n = t.current, i = Ee(), r = Kt(n), s = Et(i, r), s.callback = e ?? null, Xt(n, s, r), t.current.lanes = r, Sr(t, r, i), Ie(t, i), t;
    }
    function uo(t, e, n, i) {
        var r = e.current, s = Ee(), o = Kt(r);
        return n = op(n), e.context === null ? e.context = n : e.pendingContext = n, e = Et(s, o), e.payload = {
            element: t
        }, i = i === void 0 ? null : i, i !== null && (e.callback = i), t = Xt(r, e, o), t !== null && (ot(t, r, o, s), us(t, r, o)), o;
    }
    function Ws(t) {
        if (t = t.current, !t.child) return null;
        switch(t.child.tag){
            case 5:
                return t.child.stateNode;
            default:
                return t.child.stateNode;
        }
    }
    function Mc(t, e) {
        if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
            var n = t.retryLane;
            t.retryLane = n !== 0 && n < e ? n : e;
        }
    }
    function Za(t, e) {
        Mc(t, e), (t = t.alternate) && Mc(t, e);
    }
    function Dy() {
        return null;
    }
    var ap = typeof reportError == "function" ? reportError : function(t) {
        console.error(t);
    };
    function Ja(t) {
        this._internalRoot = t;
    }
    co.prototype.render = Ja.prototype.render = function(t) {
        var e = this._internalRoot;
        if (e === null) throw Error(M(409));
        uo(t, e, null, null);
    };
    co.prototype.unmount = Ja.prototype.unmount = function() {
        var t = this._internalRoot;
        if (t !== null) {
            this._internalRoot = null;
            var e = t.containerInfo;
            Cn(function() {
                uo(null, t, null, null);
            }), e[Dt] = null;
        }
    };
    function co(t) {
        this._internalRoot = t;
    }
    co.prototype.unstable_scheduleHydration = function(t) {
        if (t) {
            var e = Af();
            t = {
                blockedOn: null,
                target: t,
                priority: e
            };
            for(var n = 0; n < Nt.length && e !== 0 && e < Nt[n].priority; n++);
            Nt.splice(n, 0, t), n === 0 && Hf(t);
        }
    };
    function qa(t) {
        return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
    }
    function fo(t) {
        return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
    }
    function Ec() {}
    function Ty(t, e, n, i, r) {
        if (r) {
            if (typeof i == "function") {
                var s = i;
                i = function() {
                    var u = Ws(o);
                    s.call(u);
                };
            }
            var o = lp(e, i, t, 0, null, !1, !1, "", Ec);
            return t._reactRootContainer = o, t[Dt] = o.current, sr(t.nodeType === 8 ? t.parentNode : t), Cn(), o;
        }
        for(; r = t.lastChild;)t.removeChild(r);
        if (typeof i == "function") {
            var l = i;
            i = function() {
                var u = Ws(a);
                l.call(u);
            };
        }
        var a = Ga(t, 0, !1, null, null, !1, !1, "", Ec);
        return t._reactRootContainer = a, t[Dt] = a.current, sr(t.nodeType === 8 ? t.parentNode : t), Cn(function() {
            uo(e, a, n, i);
        }), a;
    }
    function ho(t, e, n, i, r) {
        var s = n._reactRootContainer;
        if (s) {
            var o = s;
            if (typeof r == "function") {
                var l = r;
                r = function() {
                    var a = Ws(o);
                    l.call(a);
                };
            }
            uo(e, o, t, r);
        } else o = Ty(n, e, t, r, i);
        return Ws(o);
    }
    Nf = function(t) {
        switch(t.tag){
            case 3:
                var e = t.stateNode;
                if (e.current.memoizedState.isDehydrated) {
                    var n = ji(e.pendingLanes);
                    n !== 0 && (va(e, n | 1), Ie(e, re()), !(N & 6) && (si = re() + 500, rn()));
                }
                break;
            case 13:
                Cn(function() {
                    var i = Tt(t, 1);
                    if (i !== null) {
                        var r = Ee();
                        ot(i, t, 1, r);
                    }
                }), Za(t, 1);
        }
    };
    xa = function(t) {
        if (t.tag === 13) {
            var e = Tt(t, 134217728);
            if (e !== null) {
                var n = Ee();
                ot(e, t, 134217728, n);
            }
            Za(t, 134217728);
        }
    };
    Ff = function(t) {
        if (t.tag === 13) {
            var e = Kt(t), n = Tt(t, e);
            if (n !== null) {
                var i = Ee();
                ot(n, t, e, i);
            }
            Za(t, e);
        }
    };
    Af = function() {
        return H;
    };
    Bf = function(t, e) {
        var n = H;
        try {
            return H = t, e();
        } finally{
            H = n;
        }
    };
    xl = function(t, e, n) {
        switch(e){
            case "input":
                if (fl(t, n), e = n.name, n.type === "radio" && e != null) {
                    for(n = t; n.parentNode;)n = n.parentNode;
                    for(n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++){
                        var i = n[e];
                        if (i !== t && i.form === t.form) {
                            var r = no(i);
                            if (!r) throw Error(M(90));
                            yf(i), fl(i, r);
                        }
                    }
                }
                break;
            case "textarea":
                xf(t, n);
                break;
            case "select":
                e = n.value, e != null && Yn(t, !!n.multiple, e, !1);
        }
    };
    Mf = Ya;
    Ef = Cn;
    var jy = {
        usingClientEntryPoint: !1,
        Events: [
            kr,
            An,
            no,
            bf,
            Cf,
            Ya
        ]
    }, ki = {
        findFiberByHostInstance: hn,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    }, Oy = {
        bundleType: ki.bundleType,
        version: ki.version,
        rendererPackageName: ki.rendererPackageName,
        rendererConfig: ki.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Ot.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(t) {
            return t = Tf(t), t === null ? null : t.stateNode;
        },
        findFiberByHostInstance: ki.findFiberByHostInstance || Dy,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var Vr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!Vr.isDisabled && Vr.supportsFiber) try {
            Js = Vr.inject(Oy), gt = Vr;
        } catch  {}
    }
    He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jy;
    He.createPortal = function(t, e) {
        var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!qa(e)) throw Error(M(200));
        return Py(t, e, null, n);
    };
    He.createRoot = function(t, e) {
        if (!qa(t)) throw Error(M(299));
        var n = !1, i = "", r = ap;
        return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onRecoverableError !== void 0 && (r = e.onRecoverableError)), e = Ga(t, 1, !1, null, null, n, !1, i, r), t[Dt] = e.current, sr(t.nodeType === 8 ? t.parentNode : t), new Ja(e);
    };
    He.findDOMNode = function(t) {
        if (t == null) return null;
        if (t.nodeType === 1) return t;
        var e = t._reactInternals;
        if (e === void 0) throw typeof t.render == "function" ? Error(M(188)) : (t = Object.keys(t).join(","), Error(M(268, t)));
        return t = Tf(e), t = t === null ? null : t.stateNode, t;
    };
    He.flushSync = function(t) {
        return Cn(t);
    };
    He.hydrate = function(t, e, n) {
        if (!fo(e)) throw Error(M(200));
        return ho(null, t, e, !0, n);
    };
    He.hydrateRoot = function(t, e, n) {
        if (!qa(t)) throw Error(M(405));
        var i = n != null && n.hydratedSources || null, r = !1, s = "", o = ap;
        if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), e = lp(e, null, t, 1, n ?? null, r, !1, s, o), t[Dt] = e.current, sr(t), i) for(t = 0; t < i.length; t++)n = i[t], r = n._getVersion, r = r(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [
            n,
            r
        ] : e.mutableSourceEagerHydrationData.push(n, r);
        return new co(e);
    };
    He.render = function(t, e, n) {
        if (!fo(e)) throw Error(M(200));
        return ho(null, t, e, !1, n);
    };
    He.unmountComponentAtNode = function(t) {
        if (!fo(t)) throw Error(M(40));
        return t._reactRootContainer ? (Cn(function() {
            ho(null, null, t, !1, function() {
                t._reactRootContainer = null, t[Dt] = null;
            });
        }), !0) : !1;
    };
    He.unstable_batchedUpdates = Ya;
    He.unstable_renderSubtreeIntoContainer = function(t, e, n, i) {
        if (!fo(n)) throw Error(M(200));
        if (t == null || t._reactInternals === void 0) throw Error(M(38));
        return ho(t, e, n, !1, i);
    };
    He.version = "18.3.1-next-f1338f8080-20240426";
    function up() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(up);
        } catch (t) {
            console.error(t);
        }
    }
    up(), uf.exports = He;
    var Ry = uf.exports, Pc = Ry;
    sl.createRoot = Pc.createRoot, sl.hydrateRoot = Pc.hydrateRoot;
    const Ly = {}, Dc = (t)=>{
        let e;
        const n = new Set, i = (c, d)=>{
            const f = typeof c == "function" ? c(e) : c;
            if (!Object.is(f, e)) {
                const p = e;
                e = d ?? (typeof f != "object" || f === null) ? f : Object.assign({}, e, f), n.forEach((y)=>y(e, p));
            }
        }, r = ()=>e, a = {
            setState: i,
            getState: r,
            getInitialState: ()=>u,
            subscribe: (c)=>(n.add(c), ()=>n.delete(c)),
            destroy: ()=>{
                (Ly ? "production" : void 0) !== "production" && console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."), n.clear();
            }
        }, u = e = t(i, r, a);
        return a;
    }, zy = (t)=>t ? Dc(t) : Dc;
    var cp = {
        exports: {}
    }, dp = {}, fp = {
        exports: {}
    }, hp = {};
    var oi = A;
    function Iy(t, e) {
        return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    var Ny = typeof Object.is == "function" ? Object.is : Iy, Fy = oi.useState, Ay = oi.useEffect, By = oi.useLayoutEffect, Hy = oi.useDebugValue;
    function Wy(t, e) {
        var n = e(), i = Fy({
            inst: {
                value: n,
                getSnapshot: e
            }
        }), r = i[0].inst, s = i[1];
        return By(function() {
            r.value = n, r.getSnapshot = e, Ko(r) && s({
                inst: r
            });
        }, [
            t,
            n,
            e
        ]), Ay(function() {
            return Ko(r) && s({
                inst: r
            }), t(function() {
                Ko(r) && s({
                    inst: r
                });
            });
        }, [
            t
        ]), Hy(n), n;
    }
    function Ko(t) {
        var e = t.getSnapshot;
        t = t.value;
        try {
            var n = e();
            return !Ny(t, n);
        } catch  {
            return !0;
        }
    }
    function Vy(t, e) {
        return e();
    }
    var Uy = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Vy : Wy;
    hp.useSyncExternalStore = oi.useSyncExternalStore !== void 0 ? oi.useSyncExternalStore : Uy;
    fp.exports = hp;
    var $y = fp.exports;
    var po = A, Yy = $y;
    function Xy(t, e) {
        return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    var Qy = typeof Object.is == "function" ? Object.is : Xy, Ky = Yy.useSyncExternalStore, Gy = po.useRef, Zy = po.useEffect, Jy = po.useMemo, qy = po.useDebugValue;
    dp.useSyncExternalStoreWithSelector = function(t, e, n, i, r) {
        var s = Gy(null);
        if (s.current === null) {
            var o = {
                hasValue: !1,
                value: null
            };
            s.current = o;
        } else o = s.current;
        s = Jy(function() {
            function a(p) {
                if (!u) {
                    if (u = !0, c = p, p = i(p), r !== void 0 && o.hasValue) {
                        var y = o.value;
                        if (r(y, p)) return d = y;
                    }
                    return d = p;
                }
                if (y = d, Qy(c, p)) return y;
                var v = i(p);
                return r !== void 0 && r(y, v) ? (c = p, y) : (c = p, d = v);
            }
            var u = !1, c, d, f = n === void 0 ? null : n;
            return [
                function() {
                    return a(e());
                },
                f === null ? void 0 : function() {
                    return a(f());
                }
            ];
        }, [
            e,
            n,
            i,
            r
        ]);
        var l = Ky(t, s[0], s[1]);
        return Zy(function() {
            o.hasValue = !0, o.value = l;
        }, [
            l
        ]), qy(l), l;
    };
    cp.exports = dp;
    var ev = cp.exports;
    const tv = Gd(ev), pp = {}, { useDebugValue: nv } = vs, { useSyncExternalStoreWithSelector: iv } = tv;
    let Tc = !1;
    const rv = (t)=>t;
    function sv(t, e = rv, n) {
        (pp ? "production" : void 0) !== "production" && n && !Tc && (console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"), Tc = !0);
        const i = iv(t.subscribe, t.getState, t.getServerState || t.getInitialState, e, n);
        return nv(i), i;
    }
    const ov = (t)=>{
        (pp ? "production" : void 0) !== "production" && typeof t != "function" && console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
        const e = typeof t == "function" ? zy(t) : t, n = (i, r)=>sv(e, i, r);
        return Object.assign(n, e), n;
    }, lv = (t)=>ov, av = {};
    function uv(t, e) {
        let n;
        try {
            n = t();
        } catch  {
            return;
        }
        return {
            getItem: (r)=>{
                var s;
                const o = (a)=>a === null ? null : JSON.parse(a, void 0), l = (s = n.getItem(r)) != null ? s : null;
                return l instanceof Promise ? l.then(o) : o(l);
            },
            setItem: (r, s)=>n.setItem(r, JSON.stringify(s, void 0)),
            removeItem: (r)=>n.removeItem(r)
        };
    }
    const pr = (t)=>(e)=>{
            try {
                const n = t(e);
                return n instanceof Promise ? n : {
                    then (i) {
                        return pr(i)(n);
                    },
                    catch (i) {
                        return this;
                    }
                };
            } catch (n) {
                return {
                    then (i) {
                        return this;
                    },
                    catch (i) {
                        return pr(i)(n);
                    }
                };
            }
        }, cv = (t, e)=>(n, i, r)=>{
            let s = {
                getStorage: ()=>localStorage,
                serialize: JSON.stringify,
                deserialize: JSON.parse,
                partialize: (_)=>_,
                version: 0,
                merge: (_, m)=>({
                        ...m,
                        ..._
                    }),
                ...e
            }, o = !1;
            const l = new Set, a = new Set;
            let u;
            try {
                u = s.getStorage();
            } catch  {}
            if (!u) return t((..._)=>{
                console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`), n(..._);
            }, i, r);
            const c = pr(s.serialize), d = ()=>{
                const _ = s.partialize({
                    ...i()
                });
                let m;
                const h = c({
                    state: _,
                    version: s.version
                }).then((x)=>u.setItem(s.name, x)).catch((x)=>{
                    m = x;
                });
                if (m) throw m;
                return h;
            }, f = r.setState;
            r.setState = (_, m)=>{
                f(_, m), d();
            };
            const p = t((..._)=>{
                n(..._), d();
            }, i, r);
            let y;
            const v = ()=>{
                var _;
                if (!u) return;
                o = !1, l.forEach((h)=>h(i()));
                const m = ((_ = s.onRehydrateStorage) == null ? void 0 : _.call(s, i())) || void 0;
                return pr(u.getItem.bind(u))(s.name).then((h)=>{
                    if (h) return s.deserialize(h);
                }).then((h)=>{
                    if (h) if (typeof h.version == "number" && h.version !== s.version) {
                        if (s.migrate) return s.migrate(h.state, h.version);
                        console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
                    } else return h.state;
                }).then((h)=>{
                    var x;
                    return y = s.merge(h, (x = i()) != null ? x : p), n(y, !0), d();
                }).then(()=>{
                    m?.(y, void 0), o = !0, a.forEach((h)=>h(y));
                }).catch((h)=>{
                    m?.(void 0, h);
                });
            };
            return r.persist = {
                setOptions: (_)=>{
                    s = {
                        ...s,
                        ..._
                    }, _.getStorage && (u = _.getStorage());
                },
                clearStorage: ()=>{
                    u?.removeItem(s.name);
                },
                getOptions: ()=>s,
                rehydrate: ()=>v(),
                hasHydrated: ()=>o,
                onHydrate: (_)=>(l.add(_), ()=>{
                        l.delete(_);
                    }),
                onFinishHydration: (_)=>(a.add(_), ()=>{
                        a.delete(_);
                    })
            }, v(), y || p;
        }, dv = (t, e)=>(n, i, r)=>{
            let s = {
                storage: uv(()=>localStorage),
                partialize: (v)=>v,
                version: 0,
                merge: (v, _)=>({
                        ..._,
                        ...v
                    }),
                ...e
            }, o = !1;
            const l = new Set, a = new Set;
            let u = s.storage;
            if (!u) return t((...v)=>{
                console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`), n(...v);
            }, i, r);
            const c = ()=>{
                const v = s.partialize({
                    ...i()
                });
                return u.setItem(s.name, {
                    state: v,
                    version: s.version
                });
            }, d = r.setState;
            r.setState = (v, _)=>{
                d(v, _), c();
            };
            const f = t((...v)=>{
                n(...v), c();
            }, i, r);
            r.getInitialState = ()=>f;
            let p;
            const y = ()=>{
                var v, _;
                if (!u) return;
                o = !1, l.forEach((h)=>{
                    var x;
                    return h((x = i()) != null ? x : f);
                });
                const m = ((_ = s.onRehydrateStorage) == null ? void 0 : _.call(s, (v = i()) != null ? v : f)) || void 0;
                return pr(u.getItem.bind(u))(s.name).then((h)=>{
                    if (h) if (typeof h.version == "number" && h.version !== s.version) {
                        if (s.migrate) return [
                            !0,
                            s.migrate(h.state, h.version)
                        ];
                        console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
                    } else return [
                        !1,
                        h.state
                    ];
                    return [
                        !1,
                        void 0
                    ];
                }).then((h)=>{
                    var x;
                    const [S, w] = h;
                    if (p = s.merge(w, (x = i()) != null ? x : f), n(p, !0), S) return c();
                }).then(()=>{
                    m?.(p, void 0), p = i(), o = !0, a.forEach((h)=>h(p));
                }).catch((h)=>{
                    m?.(void 0, h);
                });
            };
            return r.persist = {
                setOptions: (v)=>{
                    s = {
                        ...s,
                        ...v
                    }, v.storage && (u = v.storage);
                },
                clearStorage: ()=>{
                    u?.removeItem(s.name);
                },
                getOptions: ()=>s,
                rehydrate: ()=>y(),
                hasHydrated: ()=>o,
                onHydrate: (v)=>(l.add(v), ()=>{
                        l.delete(v);
                    }),
                onFinishHydration: (v)=>(a.add(v), ()=>{
                        a.delete(v);
                    })
            }, s.skipHydration || y(), p || f;
        }, fv = (t, e)=>"getStorage" in e || "serialize" in e || "deserialize" in e ? ((av ? "production" : void 0) !== "production" && console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."), cv(t, e)) : dv(t, e), hv = fv, gp = {
        high: {
            muzzleVelocitySD: 10,
            bcSD: .5,
            windSpeedSD: 1,
            windDirectionSD: 5,
            rangeErrorSD: 1,
            meanRadiusMOA: .15
        },
        medium: {
            muzzleVelocitySD: 25,
            bcSD: 1,
            windSpeedSD: 2.5,
            windDirectionSD: 10,
            rangeErrorSD: 5,
            meanRadiusMOA: .3
        },
        low: {
            muzzleVelocitySD: 50,
            bcSD: 2,
            windSpeedSD: 5,
            windDirectionSD: 20,
            rangeErrorSD: 10,
            meanRadiusMOA: .45
        },
        custom: {
            muzzleVelocitySD: 25,
            bcSD: 1,
            windSpeedSD: 2.5,
            windDirectionSD: 10,
            rangeErrorSD: 5,
            meanRadiusMOA: .3
        }
    }, pv = {
        temperature: 59,
        pressure: 29.92,
        humidity: 50,
        altitude: 0,
        windSpeed: 0,
        windDirection: 90
    }, gv = {
        value: .5,
        dragModel: "G1"
    }, jc = {
        muzzleVelocity: 2800,
        bulletWeight: 168,
        bulletDiameter: .308,
        bc: gv,
        zeroRange: 100,
        sightHeight: 1.5,
        environment: pv
    }, mv = {
        width: 20,
        height: 20,
        inclination: 0
    }, yv = {
        iterations: 1e3,
        uncertainties: gp.medium,
        target: mv,
        maxRange: 1e3,
        rangeStep: 50
    }, pi = lv()(hv((t)=>({
            ballisticInputs: jc,
            maxRange: 1e3,
            rangeStep: 50,
            displayUnit: "inches",
            trajectory: null,
            isComputing: !1,
            error: null,
            monteCarloConfig: yv,
            simulationResult: null,
            simulationProgress: null,
            isSimulating: !1,
            setBallisticInputs: (e)=>t((n)=>({
                        ballisticInputs: {
                            ...n.ballisticInputs,
                            ...e
                        }
                    })),
            setMaxRange: (e)=>t({
                    maxRange: e
                }),
            setRangeStep: (e)=>t({
                    rangeStep: e
                }),
            setDisplayUnit: (e)=>t({
                    displayUnit: e
                }),
            setTrajectory: (e)=>t({
                    trajectory: e
                }),
            setComputing: (e)=>t({
                    isComputing: e
                }),
            setError: (e)=>t({
                    error: e
                }),
            resetToDefaults: ()=>t({
                    ballisticInputs: jc,
                    maxRange: 1e3,
                    rangeStep: 50,
                    trajectory: null,
                    error: null
                }),
            setMonteCarloConfig: (e)=>t((n)=>({
                        monteCarloConfig: {
                            ...n.monteCarloConfig,
                            ...e
                        }
                    })),
            setSimulationResult: (e)=>t({
                    simulationResult: e
                }),
            setSimulationProgress: (e)=>t({
                    simulationProgress: e
                }),
            setSimulating: (e)=>t({
                    isSimulating: e
                })
        }), {
        name: "openwez-storage",
        partialize: (t)=>({
                ballisticInputs: t.ballisticInputs,
                maxRange: t.maxRange,
                rangeStep: t.rangeStep,
                monteCarloConfig: t.monteCarloConfig
            })
    }));
    function te({ value: t, onChange: e, defaultValue: n = 0, min: i, max: r }) {
        const [s, o] = A.useState(!1), [l, a] = A.useState(""), u = A.useCallback((f)=>{
            f.target.select(), o(!0), a(t.toString());
        }, [
            t
        ]), c = A.useCallback((f)=>{
            a(f.target.value);
        }, []), d = A.useCallback(()=>{
            o(!1);
            const f = parseFloat(l);
            if (l === "" || isNaN(f)) {
                e(n);
                return;
            }
            let p = f;
            i !== void 0 && p < i && (p = i), r !== void 0 && p > r && (p = r), e(p);
        }, [
            l,
            e,
            n,
            i,
            r
        ]);
        return {
            value: s ? l : t,
            onFocus: u,
            onChange: c,
            onBlur: d
        };
    }
    function Oc() {
        const { ballisticInputs: t, setBallisticInputs: e, maxRange: n, rangeStep: i, setMaxRange: r, setRangeStep: s } = pi(), o = te({
            value: t.muzzleVelocity,
            onChange: (h)=>e({
                    muzzleVelocity: h
                }),
            defaultValue: 2600
        }), l = te({
            value: t.bulletWeight,
            onChange: (h)=>e({
                    bulletWeight: h
                }),
            defaultValue: 175
        }), a = te({
            value: t.bc.value,
            onChange: (h)=>e({
                    bc: {
                        ...t.bc,
                        value: h
                    }
                }),
            defaultValue: .243
        }), u = te({
            value: t.zeroRange,
            onChange: (h)=>e({
                    zeroRange: h
                }),
            defaultValue: 100
        }), c = te({
            value: t.sightHeight,
            onChange: (h)=>e({
                    sightHeight: h
                }),
            defaultValue: 1.5
        }), d = te({
            value: t.environment.windSpeed,
            onChange: (h)=>e({
                    environment: {
                        ...t.environment,
                        windSpeed: h
                    }
                }),
            defaultValue: 0
        }), f = te({
            value: t.environment.windDirection,
            onChange: (h)=>e({
                    environment: {
                        ...t.environment,
                        windDirection: h
                    }
                }),
            defaultValue: 90
        }), p = te({
            value: t.environment.temperature,
            onChange: (h)=>e({
                    environment: {
                        ...t.environment,
                        temperature: h
                    }
                }),
            defaultValue: 59
        }), y = te({
            value: t.environment.pressure,
            onChange: (h)=>e({
                    environment: {
                        ...t.environment,
                        pressure: h
                    }
                }),
            defaultValue: 29.92
        }), v = te({
            value: t.environment.altitude,
            onChange: (h)=>e({
                    environment: {
                        ...t.environment,
                        altitude: h
                    }
                }),
            defaultValue: 0
        }), _ = te({
            value: n,
            onChange: r,
            defaultValue: 1e3
        }), m = te({
            value: i,
            onChange: s,
            defaultValue: 25
        });
        return g.jsxs("div", {
            className: "input-form",
            children: [
                g.jsx("h2", {
                    children: "Ballistic Parameters"
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Muzzle Velocity (fps)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...o
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Bullet Weight (grains)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...l
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Drag Model"
                        }),
                        g.jsxs("select", {
                            value: t.bc.dragModel,
                            onChange: (h)=>e({
                                    bc: {
                                        ...t.bc,
                                        dragModel: h.target.value
                                    }
                                }),
                            children: [
                                g.jsx("option", {
                                    value: "G1",
                                    children: "G1 (Standard)"
                                }),
                                g.jsx("option", {
                                    value: "G7",
                                    children: "G7 (Boat Tail)"
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsxs("label", {
                            children: [
                                "Ballistic Coefficient (",
                                t.bc.dragModel,
                                ")"
                            ]
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.001",
                            ...a
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Zero Range (yards)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...u
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Sight Height / Height Over Bore (inches)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...c
                        })
                    ]
                }),
                g.jsx("h3", {
                    style: {
                        marginTop: "1.5rem",
                        marginBottom: "0.5rem"
                    },
                    children: "Environmental Conditions"
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Wind Speed (mph)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...d
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Wind Direction (degrees)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...f
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Temperature (°F)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...p
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Pressure (inHg)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.01",
                            ...y
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Altitude (feet)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...v
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Maximum Range (yards)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ..._
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Range Step / Increment (yards)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...m
                        })
                    ]
                })
            ]
        });
    }
    function vv(t, e) {
        return e === 0 ? 0 : t / (e * 1.047);
    }
    function xv(t, e) {
        return e === 0 ? 0 : t / (e * 36) * 1e3;
    }
    function Rc(t, e, n) {
        switch(n){
            case "inches":
                return t;
            case "MOA":
                return vv(t, e);
            case "MIL":
                return xv(t, e);
        }
    }
    function _v(t) {
        switch(t){
            case "inches":
                return "in";
            case "MOA":
                return "MOA";
            case "MIL":
                return "MIL";
        }
    }
    function Lc(t, e) {
        switch(e){
            case "inches":
                return t.toFixed(2);
            case "MOA":
                return t.toFixed(2);
            case "MIL":
                return t.toFixed(2);
        }
    }
    function Sv(t) {
        if (!t || t.length === 0) return "";
        const e = [
            "Range (yards)",
            "Drop (inches)",
            "Drift (inches)",
            "Velocity (fps)",
            "Energy (ft-lbs)",
            "Time of Flight (seconds)"
        ], n = t.map((r)=>[
                r.range.toFixed(2),
                r.drop.toFixed(2),
                r.drift.toFixed(2),
                r.velocity.toFixed(1),
                r.energy.toFixed(1),
                r.timeOfFlight.toFixed(4)
            ]);
        return [
            e.join(","),
            ...n.map((r)=>r.join(","))
        ].join(`
`);
    }
    function wv(t, e) {
        if (!t) return "";
        const n = [];
        return n.push("OpenWEZ Monte Carlo Simulation Results"), n.push(""), n.push("Target Configuration"), n.push(`Target Width (inches),${e.width}`), n.push(`Target Height (inches),${e.height}`), n.push(""), n.push("Statistics at Max Range"), n.push(""), n.push("Total Dispersion (Ballistic + Rifle Precision)"), n.push(`Mean X (inches),${t.statistics.mean.x.toFixed(2)}`), n.push(`Mean Y (inches),${t.statistics.mean.y.toFixed(2)}`), n.push(`Std Dev X (inches),${t.statistics.standardDeviation.x.toFixed(2)}`), n.push(`Std Dev Y (inches),${t.statistics.standardDeviation.y.toFixed(2)}`), n.push(""), n.push("Ballistic Uncertainties Only"), n.push(`Mean X (inches),${t.statisticsBallisticOnly.mean.x.toFixed(2)}`), n.push(`Mean Y (inches),${t.statisticsBallisticOnly.mean.y.toFixed(2)}`), n.push(`Std Dev X (inches),${t.statisticsBallisticOnly.standardDeviation.x.toFixed(2)}`), n.push(`Std Dev Y (inches),${t.statisticsBallisticOnly.standardDeviation.y.toFixed(2)}`), n.push(""), n.push("Probability of Hit by Range"), n.push("Range (yards),P(hit)"), Object.keys(t.pHitByRange).map(Number).sort((r, s)=>r - s).forEach((r)=>{
            n.push(`${r},${t.pHitByRange[r].toFixed(4)}`);
        }), n.push(""), n.push("Impact Points at Max Range (Total Dispersion)"), n.push("X (inches),Y (inches)"), t.impactPoints.forEach((r)=>{
            n.push(`${r.x.toFixed(2)},${r.y.toFixed(2)}`);
        }), n.push(""), n.push("Impact Points at Max Range (Ballistic Only)"), n.push("X (inches),Y (inches)"), t.ballisticImpactPoints.forEach((r)=>{
            n.push(`${r.x.toFixed(2)},${r.y.toFixed(2)}`);
        }), n.join(`
`);
    }
    function eu(t, e) {
        const n = new Blob([
            t
        ], {
            type: "text/csv;charset=utf-8;"
        }), i = document.createElement("a");
        if (i.download !== void 0) {
            const r = URL.createObjectURL(n);
            i.setAttribute("href", r), i.setAttribute("download", e), i.style.visibility = "hidden", document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
        }
    }
    function kv(t, e = "trajectory.csv") {
        const n = Sv(t);
        n && eu(n, e);
    }
    function bv(t, e, n = "monte-carlo-results.csv") {
        const i = wv(t, e);
        i && eu(i, n);
    }
    function Cv(t) {
        if (!t || t.length === 0) return "";
        const e = [], n = [
            "Range (yd)"
        ];
        t.forEach((s)=>{
            n.push(s.label, "", "", "");
        }), e.push(n.join(","));
        const i = [
            ""
        ];
        t.forEach(()=>{
            i.push("Drop (in)", "Drift (in)", "Velocity (fps)", "Energy (ft-lbs)");
        }), e.push(i.join(","));
        const r = Math.max(...t.map((s)=>s.data.length));
        for(let s = 0; s < r; s++){
            const o = [
                t[0].data[s]?.range.toFixed(0) || ""
            ];
            t.forEach((l)=>{
                const a = l.data[s];
                a ? o.push(a.drop.toFixed(2), a.drift.toFixed(2), a.velocity.toFixed(0), a.energy.toFixed(0)) : o.push("", "", "", "");
            }), e.push(o.join(","));
        }
        return e.join(`
`);
    }
    function Mv(t, e = "trajectory-comparison.csv") {
        const n = Cv(t);
        n && eu(n, e);
    }
    function Ev(t) {
        const e = (t - 32) * 5 / 9 + 273.15;
        return Math.sqrt(1.4 * 287.058 * e) * 3.28084;
    }
    function zc(t, e) {
        for(let n = 0; n < t.length - 1; n++){
            const i = t[n], r = t[n + 1];
            if (i.velocity >= e && r.velocity < e) {
                const s = i.velocity - r.velocity, o = r.range - i.range, l = i.velocity - e;
                return s > 0 ? i.range + l / s * o : i.range;
            }
        }
        return null;
    }
    function Pv() {
        const { trajectory: t, ballisticInputs: e, displayUnit: n, setDisplayUnit: i } = pi();
        if (!t || t.length === 0) return g.jsx("div", {
            className: "trajectory-table",
            children: 'No trajectory data. Click "Calculate" to compute.'
        });
        const r = Ev(e.environment.temperature), s = r * 1.2, o = r * 1, l = zc(t, s), a = zc(t, o), u = [];
        let c = !1, d = !1;
        const f = _v(n);
        t.forEach((y, v)=>{
            !c && l !== null && y.range > l && (u.push(g.jsx("tr", {
                className: "velocity-marker transonic",
                children: g.jsxs("td", {
                    colSpan: 6,
                    style: {
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#fff3cd"
                    },
                    children: [
                        "Transonic (Mach 1.2 = ",
                        s.toFixed(0),
                        " fps) at ",
                        l.toFixed(0),
                        " yards"
                    ]
                })
            }, `transonic-${v}`)), c = !0), !d && a !== null && y.range > a && (u.push(g.jsx("tr", {
                className: "velocity-marker subsonic",
                children: g.jsxs("td", {
                    colSpan: 6,
                    style: {
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#d1ecf1"
                    },
                    children: [
                        "Subsonic (Mach 1.0 = ",
                        o.toFixed(0),
                        " fps) at ",
                        a.toFixed(0),
                        " yards"
                    ]
                })
            }, `subsonic-${v}`)), d = !0);
            const _ = Rc(y.drop, y.range, n), m = Rc(y.drift, y.range, n);
            u.push(g.jsxs("tr", {
                children: [
                    g.jsx("td", {
                        children: y.range.toFixed(0)
                    }),
                    g.jsx("td", {
                        children: Lc(_, n)
                    }),
                    g.jsx("td", {
                        children: Lc(m, n)
                    }),
                    g.jsx("td", {
                        children: y.velocity.toFixed(0)
                    }),
                    g.jsx("td", {
                        children: y.energy.toFixed(0)
                    }),
                    g.jsx("td", {
                        children: y.timeOfFlight.toFixed(3)
                    })
                ]
            }, v));
        });
        const p = ()=>{
            const y = new Date().toISOString().split("T")[0];
            kv(t, `trajectory-${y}.csv`);
        };
        return g.jsxs("div", {
            className: "trajectory-table",
            children: [
                g.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem"
                    },
                    children: [
                        g.jsx("h2", {
                            style: {
                                margin: 0
                            },
                            children: "Trajectory Data"
                        }),
                        g.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem"
                            },
                            children: [
                                g.jsx("label", {
                                    htmlFor: "unit-selector",
                                    style: {
                                        fontWeight: 600
                                    },
                                    children: "Units:"
                                }),
                                g.jsxs("select", {
                                    id: "unit-selector",
                                    value: n,
                                    onChange: (y)=>i(y.target.value),
                                    style: {
                                        padding: "0.25rem 0.5rem",
                                        fontSize: "0.9rem"
                                    },
                                    children: [
                                        g.jsx("option", {
                                            value: "inches",
                                            children: "Inches"
                                        }),
                                        g.jsx("option", {
                                            value: "MOA",
                                            children: "MOA"
                                        }),
                                        g.jsx("option", {
                                            value: "MIL",
                                            children: "MIL"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("table", {
                    children: [
                        g.jsx("thead", {
                            children: g.jsxs("tr", {
                                children: [
                                    g.jsx("th", {
                                        children: "Range (yd)"
                                    }),
                                    g.jsxs("th", {
                                        children: [
                                            "Drop (",
                                            f,
                                            ")"
                                        ]
                                    }),
                                    g.jsxs("th", {
                                        children: [
                                            "Drift (",
                                            f,
                                            ")"
                                        ]
                                    }),
                                    g.jsx("th", {
                                        children: "Velocity (fps)"
                                    }),
                                    g.jsx("th", {
                                        children: "Energy (ft-lbs)"
                                    }),
                                    g.jsx("th", {
                                        children: "Time (s)"
                                    })
                                ]
                            })
                        }),
                        g.jsx("tbody", {
                            children: u
                        })
                    ]
                }),
                g.jsx("div", {
                    style: {
                        marginTop: "1rem",
                        textAlign: "center"
                    },
                    children: g.jsx("button", {
                        onClick: p,
                        style: {
                            padding: "0.5rem 1.5rem",
                            fontSize: "0.9rem",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: 600
                        },
                        children: "Export CSV"
                    })
                })
            ]
        });
    }
    function Dv() {
        const { monteCarloConfig: t, setMonteCarloConfig: e } = pi(), n = (p)=>{
            p !== "custom" && e({
                uncertainties: gp[p]
            });
        }, i = te({
            value: t.iterations,
            onChange: (p)=>e({
                    iterations: p
                }),
            defaultValue: 1e3,
            min: 100,
            max: 5e3
        }), r = te({
            value: t.maxRange,
            onChange: (p)=>e({
                    maxRange: p
                }),
            defaultValue: 1e3,
            min: 100,
            max: 2e3
        }), s = te({
            value: t.target.width,
            onChange: (p)=>e({
                    target: {
                        ...t.target,
                        width: p
                    }
                }),
            defaultValue: 18
        }), o = te({
            value: t.target.height,
            onChange: (p)=>e({
                    target: {
                        ...t.target,
                        height: p
                    }
                }),
            defaultValue: 30
        }), l = te({
            value: t.uncertainties.muzzleVelocitySD,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        muzzleVelocitySD: p
                    }
                }),
            defaultValue: 25
        }), a = te({
            value: t.uncertainties.windSpeedSD,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        windSpeedSD: p
                    }
                }),
            defaultValue: 2.5
        }), u = te({
            value: t.uncertainties.windDirectionSD,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        windDirectionSD: p
                    }
                }),
            defaultValue: 10
        }), c = te({
            value: t.uncertainties.rangeErrorSD,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        rangeErrorSD: p
                    }
                }),
            defaultValue: 5
        }), d = te({
            value: t.uncertainties.bcSD,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        bcSD: p
                    }
                }),
            defaultValue: 1
        }), f = te({
            value: t.uncertainties.meanRadiusMOA,
            onChange: (p)=>e({
                    uncertainties: {
                        ...t.uncertainties,
                        meanRadiusMOA: p
                    }
                }),
            defaultValue: .3
        });
        return g.jsxs("div", {
            className: "monte-carlo-controls",
            children: [
                g.jsx("h2", {
                    children: "Monte Carlo Settings"
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Iterations"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...i,
                            min: "100",
                            max: "5000",
                            step: "100"
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Max Range (yards)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...r,
                            min: "100",
                            max: "2000",
                            step: "50"
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Confidence Level Preset"
                        }),
                        g.jsxs("select", {
                            onChange: (p)=>n(p.target.value),
                            defaultValue: "medium",
                            children: [
                                g.jsx("option", {
                                    value: "high",
                                    children: "High (tight grouping)"
                                }),
                                g.jsx("option", {
                                    value: "medium",
                                    children: "Medium (average shooter)"
                                }),
                                g.jsx("option", {
                                    value: "low",
                                    children: "Low (beginner)"
                                }),
                                g.jsx("option", {
                                    value: "custom",
                                    children: "Custom (manual values)"
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Target Width (inches)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...s
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Target Height (inches)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            ...o
                        })
                    ]
                }),
                g.jsx("h3", {
                    children: "Uncertainties (Standard Deviation)"
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Muzzle Velocity SD (fps)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...l
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Wind Speed SD (mph)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...a
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Wind Direction SD (degrees)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...u
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Range Error SD (yards)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...c
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "BC Uncertainty SD (%)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...d
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "form-group",
                    children: [
                        g.jsx("label", {
                            children: "Rifle Precision - Mean Radius (MOA)"
                        }),
                        g.jsx("input", {
                            type: "number",
                            step: "0.1",
                            ...f
                        })
                    ]
                })
            ]
        });
    }
    function Cr(t) {
        return t + .5 | 0;
    }
    const Ht = (t, e, n)=>Math.max(Math.min(t, n), e);
    function Ri(t) {
        return Ht(Cr(t * 2.55), 0, 255);
    }
    function Zt(t) {
        return Ht(Cr(t * 255), 0, 255);
    }
    function bt(t) {
        return Ht(Cr(t / 2.55) / 100, 0, 1);
    }
    function Ic(t) {
        return Ht(Cr(t * 100), 0, 100);
    }
    const Ve = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    }, Jl = [
        ..."0123456789ABCDEF"
    ], Tv = (t)=>Jl[t & 15], jv = (t)=>Jl[(t & 240) >> 4] + Jl[t & 15], Ur = (t)=>(t & 240) >> 4 === (t & 15), Ov = (t)=>Ur(t.r) && Ur(t.g) && Ur(t.b) && Ur(t.a);
    function Rv(t) {
        var e = t.length, n;
        return t[0] === "#" && (e === 4 || e === 5 ? n = {
            r: 255 & Ve[t[1]] * 17,
            g: 255 & Ve[t[2]] * 17,
            b: 255 & Ve[t[3]] * 17,
            a: e === 5 ? Ve[t[4]] * 17 : 255
        } : (e === 7 || e === 9) && (n = {
            r: Ve[t[1]] << 4 | Ve[t[2]],
            g: Ve[t[3]] << 4 | Ve[t[4]],
            b: Ve[t[5]] << 4 | Ve[t[6]],
            a: e === 9 ? Ve[t[7]] << 4 | Ve[t[8]] : 255
        })), n;
    }
    const Lv = (t, e)=>t < 255 ? e(t) : "";
    function zv(t) {
        var e = Ov(t) ? Tv : jv;
        return t ? "#" + e(t.r) + e(t.g) + e(t.b) + Lv(t.a, e) : void 0;
    }
    const Iv = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    function mp(t, e, n) {
        const i = e * Math.min(n, 1 - n), r = (s, o = (s + t / 30) % 12)=>n - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
        return [
            r(0),
            r(8),
            r(4)
        ];
    }
    function Nv(t, e, n) {
        const i = (r, s = (r + t / 60) % 6)=>n - n * e * Math.max(Math.min(s, 4 - s, 1), 0);
        return [
            i(5),
            i(3),
            i(1)
        ];
    }
    function Fv(t, e, n) {
        const i = mp(t, 1, .5);
        let r;
        for(e + n > 1 && (r = 1 / (e + n), e *= r, n *= r), r = 0; r < 3; r++)i[r] *= 1 - e - n, i[r] += e;
        return i;
    }
    function Av(t, e, n, i, r) {
        return t === r ? (e - n) / i + (e < n ? 6 : 0) : e === r ? (n - t) / i + 2 : (t - e) / i + 4;
    }
    function tu(t) {
        const n = t.r / 255, i = t.g / 255, r = t.b / 255, s = Math.max(n, i, r), o = Math.min(n, i, r), l = (s + o) / 2;
        let a, u, c;
        return s !== o && (c = s - o, u = l > .5 ? c / (2 - s - o) : c / (s + o), a = Av(n, i, r, c, s), a = a * 60 + .5), [
            a | 0,
            u || 0,
            l
        ];
    }
    function nu(t, e, n, i) {
        return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, n, i)).map(Zt);
    }
    function iu(t, e, n) {
        return nu(mp, t, e, n);
    }
    function Bv(t, e, n) {
        return nu(Fv, t, e, n);
    }
    function Hv(t, e, n) {
        return nu(Nv, t, e, n);
    }
    function yp(t) {
        return (t % 360 + 360) % 360;
    }
    function Wv(t) {
        const e = Iv.exec(t);
        let n = 255, i;
        if (!e) return;
        e[5] !== i && (n = e[6] ? Ri(+e[5]) : Zt(+e[5]));
        const r = yp(+e[2]), s = +e[3] / 100, o = +e[4] / 100;
        return e[1] === "hwb" ? i = Bv(r, s, o) : e[1] === "hsv" ? i = Hv(r, s, o) : i = iu(r, s, o), {
            r: i[0],
            g: i[1],
            b: i[2],
            a: n
        };
    }
    function Vv(t, e) {
        var n = tu(t);
        n[0] = yp(n[0] + e), n = iu(n), t.r = n[0], t.g = n[1], t.b = n[2];
    }
    function Uv(t) {
        if (!t) return;
        const e = tu(t), n = e[0], i = Ic(e[1]), r = Ic(e[2]);
        return t.a < 255 ? `hsla(${n}, ${i}%, ${r}%, ${bt(t.a)})` : `hsl(${n}, ${i}%, ${r}%)`;
    }
    const Nc = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    }, Fc = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };
    function $v() {
        const t = {}, e = Object.keys(Fc), n = Object.keys(Nc);
        let i, r, s, o, l;
        for(i = 0; i < e.length; i++){
            for(o = l = e[i], r = 0; r < n.length; r++)s = n[r], l = l.replace(s, Nc[s]);
            s = parseInt(Fc[o], 16), t[l] = [
                s >> 16 & 255,
                s >> 8 & 255,
                s & 255
            ];
        }
        return t;
    }
    let $r;
    function Yv(t) {
        $r || ($r = $v(), $r.transparent = [
            0,
            0,
            0,
            0
        ]);
        const e = $r[t.toLowerCase()];
        return e && {
            r: e[0],
            g: e[1],
            b: e[2],
            a: e.length === 4 ? e[3] : 255
        };
    }
    const Xv = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    function Qv(t) {
        const e = Xv.exec(t);
        let n = 255, i, r, s;
        if (e) {
            if (e[7] !== i) {
                const o = +e[7];
                n = e[8] ? Ri(o) : Ht(o * 255, 0, 255);
            }
            return i = +e[1], r = +e[3], s = +e[5], i = 255 & (e[2] ? Ri(i) : Ht(i, 0, 255)), r = 255 & (e[4] ? Ri(r) : Ht(r, 0, 255)), s = 255 & (e[6] ? Ri(s) : Ht(s, 0, 255)), {
                r: i,
                g: r,
                b: s,
                a: n
            };
        }
    }
    function Kv(t) {
        return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${bt(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
    }
    const Go = (t)=>t <= .0031308 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - .055, Rn = (t)=>t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);
    function Gv(t, e, n) {
        const i = Rn(bt(t.r)), r = Rn(bt(t.g)), s = Rn(bt(t.b));
        return {
            r: Zt(Go(i + n * (Rn(bt(e.r)) - i))),
            g: Zt(Go(r + n * (Rn(bt(e.g)) - r))),
            b: Zt(Go(s + n * (Rn(bt(e.b)) - s))),
            a: t.a + n * (e.a - t.a)
        };
    }
    function Yr(t, e, n) {
        if (t) {
            let i = tu(t);
            i[e] = Math.max(0, Math.min(i[e] + i[e] * n, e === 0 ? 360 : 1)), i = iu(i), t.r = i[0], t.g = i[1], t.b = i[2];
        }
    }
    function vp(t, e) {
        return t && Object.assign(e || {}, t);
    }
    function Ac(t) {
        var e = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        };
        return Array.isArray(t) ? t.length >= 3 && (e = {
            r: t[0],
            g: t[1],
            b: t[2],
            a: 255
        }, t.length > 3 && (e.a = Zt(t[3]))) : (e = vp(t, {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }), e.a = Zt(e.a)), e;
    }
    function Zv(t) {
        return t.charAt(0) === "r" ? Qv(t) : Wv(t);
    }
    class gr {
        constructor(e){
            if (e instanceof gr) return e;
            const n = typeof e;
            let i;
            n === "object" ? i = Ac(e) : n === "string" && (i = Rv(e) || Yv(e) || Zv(e)), this._rgb = i, this._valid = !!i;
        }
        get valid() {
            return this._valid;
        }
        get rgb() {
            var e = vp(this._rgb);
            return e && (e.a = bt(e.a)), e;
        }
        set rgb(e) {
            this._rgb = Ac(e);
        }
        rgbString() {
            return this._valid ? Kv(this._rgb) : void 0;
        }
        hexString() {
            return this._valid ? zv(this._rgb) : void 0;
        }
        hslString() {
            return this._valid ? Uv(this._rgb) : void 0;
        }
        mix(e, n) {
            if (e) {
                const i = this.rgb, r = e.rgb;
                let s;
                const o = n === s ? .5 : n, l = 2 * o - 1, a = i.a - r.a, u = ((l * a === -1 ? l : (l + a) / (1 + l * a)) + 1) / 2;
                s = 1 - u, i.r = 255 & u * i.r + s * r.r + .5, i.g = 255 & u * i.g + s * r.g + .5, i.b = 255 & u * i.b + s * r.b + .5, i.a = o * i.a + (1 - o) * r.a, this.rgb = i;
            }
            return this;
        }
        interpolate(e, n) {
            return e && (this._rgb = Gv(this._rgb, e._rgb, n)), this;
        }
        clone() {
            return new gr(this.rgb);
        }
        alpha(e) {
            return this._rgb.a = Zt(e), this;
        }
        clearer(e) {
            const n = this._rgb;
            return n.a *= 1 - e, this;
        }
        greyscale() {
            const e = this._rgb, n = Cr(e.r * .3 + e.g * .59 + e.b * .11);
            return e.r = e.g = e.b = n, this;
        }
        opaquer(e) {
            const n = this._rgb;
            return n.a *= 1 + e, this;
        }
        negate() {
            const e = this._rgb;
            return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
        }
        lighten(e) {
            return Yr(this._rgb, 2, e), this;
        }
        darken(e) {
            return Yr(this._rgb, 2, -e), this;
        }
        saturate(e) {
            return Yr(this._rgb, 1, e), this;
        }
        desaturate(e) {
            return Yr(this._rgb, 1, -e), this;
        }
        rotate(e) {
            return Vv(this._rgb, e), this;
        }
    }
    function xt() {}
    const Jv = (()=>{
        let t = 0;
        return ()=>t++;
    })();
    function V(t) {
        return t == null;
    }
    function ce(t) {
        if (Array.isArray && Array.isArray(t)) return !0;
        const e = Object.prototype.toString.call(t);
        return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
    }
    function F(t) {
        return t !== null && Object.prototype.toString.call(t) === "[object Object]";
    }
    function Je(t) {
        return (typeof t == "number" || t instanceof Number) && isFinite(+t);
    }
    function ct(t, e) {
        return Je(t) ? t : e;
    }
    function I(t, e) {
        return typeof t > "u" ? e : t;
    }
    const qv = (t, e)=>typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
    function Q(t, e, n) {
        if (t && typeof t.call == "function") return t.apply(n, e);
    }
    function B(t, e, n, i) {
        let r, s, o;
        if (ce(t)) for(s = t.length, r = 0; r < s; r++)e.call(n, t[r], r);
        else if (F(t)) for(o = Object.keys(t), s = o.length, r = 0; r < s; r++)e.call(n, t[o[r]], o[r]);
    }
    function Vs(t, e) {
        let n, i, r, s;
        if (!t || !e || t.length !== e.length) return !1;
        for(n = 0, i = t.length; n < i; ++n)if (r = t[n], s = e[n], r.datasetIndex !== s.datasetIndex || r.index !== s.index) return !1;
        return !0;
    }
    function Us(t) {
        if (ce(t)) return t.map(Us);
        if (F(t)) {
            const e = Object.create(null), n = Object.keys(t), i = n.length;
            let r = 0;
            for(; r < i; ++r)e[n[r]] = Us(t[n[r]]);
            return e;
        }
        return t;
    }
    function xp(t) {
        return [
            "__proto__",
            "prototype",
            "constructor"
        ].indexOf(t) === -1;
    }
    function e0(t, e, n, i) {
        if (!xp(t)) return;
        const r = e[t], s = n[t];
        F(r) && F(s) ? mr(r, s, i) : e[t] = Us(s);
    }
    function mr(t, e, n) {
        const i = ce(e) ? e : [
            e
        ], r = i.length;
        if (!F(t)) return t;
        n = n || {};
        const s = n.merger || e0;
        let o;
        for(let l = 0; l < r; ++l){
            if (o = i[l], !F(o)) continue;
            const a = Object.keys(o);
            for(let u = 0, c = a.length; u < c; ++u)s(a[u], t, o, n);
        }
        return t;
    }
    function Yi(t, e) {
        return mr(t, e, {
            merger: t0
        });
    }
    function t0(t, e, n) {
        if (!xp(t)) return;
        const i = e[t], r = n[t];
        F(i) && F(r) ? Yi(i, r) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = Us(r));
    }
    const Bc = {
        "": (t)=>t,
        x: (t)=>t.x,
        y: (t)=>t.y
    };
    function n0(t) {
        const e = t.split("."), n = [];
        let i = "";
        for (const r of e)i += r, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
        return n;
    }
    function i0(t) {
        const e = n0(t);
        return (n)=>{
            for (const i of e){
                if (i === "") break;
                n = n && n[i];
            }
            return n;
        };
    }
    function $s(t, e) {
        return (Bc[e] || (Bc[e] = i0(e)))(t);
    }
    function ru(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
    const Ys = (t)=>typeof t < "u", en = (t)=>typeof t == "function", Hc = (t, e)=>{
        if (t.size !== e.size) return !1;
        for (const n of t)if (!e.has(n)) return !1;
        return !0;
    };
    function r0(t) {
        return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
    }
    const fe = Math.PI, yt = 2 * fe, s0 = yt + fe, Xs = Number.POSITIVE_INFINITY, o0 = fe / 180, rt = fe / 2, sn = fe / 4, Wc = fe * 2 / 3, _p = Math.log10, li = Math.sign;
    function Xi(t, e, n) {
        return Math.abs(t - e) < n;
    }
    function Vc(t) {
        const e = Math.round(t);
        t = Xi(t, e, t / 1e3) ? e : t;
        const n = Math.pow(10, Math.floor(_p(t))), i = t / n;
        return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
    }
    function l0(t) {
        const e = [], n = Math.sqrt(t);
        let i;
        for(i = 1; i < n; i++)t % i === 0 && (e.push(i), e.push(t / i));
        return n === (n | 0) && e.push(n), e.sort((r, s)=>r - s).pop(), e;
    }
    function a0(t) {
        return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
    }
    function ai(t) {
        return !a0(t) && !isNaN(parseFloat(t)) && isFinite(t);
    }
    function u0(t, e) {
        const n = Math.round(t);
        return n - e <= t && n + e >= t;
    }
    function c0(t, e, n) {
        let i, r, s;
        for(i = 0, r = t.length; i < r; i++)s = t[i][n], isNaN(s) || (e.min = Math.min(e.min, s), e.max = Math.max(e.max, s));
    }
    function mn(t) {
        return t * (fe / 180);
    }
    function d0(t) {
        return t * (180 / fe);
    }
    function Uc(t) {
        if (!Je(t)) return;
        let e = 1, n = 0;
        for(; Math.round(t * e) / e !== t;)e *= 10, n++;
        return n;
    }
    function f0(t, e) {
        const n = e.x - t.x, i = e.y - t.y, r = Math.sqrt(n * n + i * i);
        let s = Math.atan2(i, n);
        return s < -.5 * fe && (s += yt), {
            angle: s,
            distance: r
        };
    }
    function ql(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
    }
    function h0(t, e) {
        return (t - e + s0) % yt - fe;
    }
    function Lt(t) {
        return (t % yt + yt) % yt;
    }
    function Sp(t, e, n, i) {
        const r = Lt(t), s = Lt(e), o = Lt(n), l = Lt(s - r), a = Lt(o - r), u = Lt(r - s), c = Lt(r - o);
        return r === s || r === o || i && s === o || l > a && u < c;
    }
    function Xe(t, e, n) {
        return Math.max(e, Math.min(n, t));
    }
    function p0(t) {
        return Xe(t, -32768, 32767);
    }
    function Li(t, e, n, i = 1e-6) {
        return t >= Math.min(e, n) - i && t <= Math.max(e, n) + i;
    }
    function su(t, e, n) {
        n = n || ((o)=>t[o] < e);
        let i = t.length - 1, r = 0, s;
        for(; i - r > 1;)s = r + i >> 1, n(s) ? r = s : i = s;
        return {
            lo: r,
            hi: i
        };
    }
    const yn = (t, e, n, i)=>su(t, n, i ? (r)=>{
            const s = t[r][e];
            return s < n || s === n && t[r + 1][e] === n;
        } : (r)=>t[r][e] < n), g0 = (t, e, n)=>su(t, n, (i)=>t[i][e] >= n);
    function m0(t, e, n) {
        let i = 0, r = t.length;
        for(; i < r && t[i] < e;)i++;
        for(; r > i && t[r - 1] > n;)r--;
        return i > 0 || r < t.length ? t.slice(i, r) : t;
    }
    const wp = [
        "push",
        "pop",
        "shift",
        "splice",
        "unshift"
    ];
    function y0(t, e) {
        if (t._chartjs) {
            t._chartjs.listeners.push(e);
            return;
        }
        Object.defineProperty(t, "_chartjs", {
            configurable: !0,
            enumerable: !1,
            value: {
                listeners: [
                    e
                ]
            }
        }), wp.forEach((n)=>{
            const i = "_onData" + ru(n), r = t[n];
            Object.defineProperty(t, n, {
                configurable: !0,
                enumerable: !1,
                value (...s) {
                    const o = r.apply(this, s);
                    return t._chartjs.listeners.forEach((l)=>{
                        typeof l[i] == "function" && l[i](...s);
                    }), o;
                }
            });
        });
    }
    function $c(t, e) {
        const n = t._chartjs;
        if (!n) return;
        const i = n.listeners, r = i.indexOf(e);
        r !== -1 && i.splice(r, 1), !(i.length > 0) && (wp.forEach((s)=>{
            delete t[s];
        }), delete t._chartjs);
    }
    function v0(t) {
        const e = new Set(t);
        return e.size === t.length ? t : Array.from(e);
    }
    const kp = function() {
        return typeof window > "u" ? function(t) {
            return t();
        } : window.requestAnimationFrame;
    }();
    function bp(t, e) {
        let n = [], i = !1;
        return function(...r) {
            n = r, i || (i = !0, kp.call(window, ()=>{
                i = !1, t.apply(e, n);
            }));
        };
    }
    function x0(t, e) {
        let n;
        return function(...i) {
            return e ? (clearTimeout(n), n = setTimeout(t, e, i)) : t.apply(this, i), e;
        };
    }
    const ou = (t)=>t === "start" ? "left" : t === "end" ? "right" : "center", _e = (t, e, n)=>t === "start" ? e : t === "end" ? n : (e + n) / 2, _0 = (t, e, n, i)=>t === (i ? "left" : "right") ? n : t === "center" ? (e + n) / 2 : e;
    function Cp(t, e, n) {
        const i = e.length;
        let r = 0, s = i;
        if (t._sorted) {
            const { iScale: o, vScale: l, _parsed: a } = t, u = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, c = o.axis, { min: d, max: f, minDefined: p, maxDefined: y } = o.getUserBounds();
            if (p) {
                if (r = Math.min(yn(a, c, d).lo, n ? i : yn(e, c, o.getPixelForValue(d)).lo), u) {
                    const v = a.slice(0, r + 1).reverse().findIndex((_)=>!V(_[l.axis]));
                    r -= Math.max(0, v);
                }
                r = Xe(r, 0, i - 1);
            }
            if (y) {
                let v = Math.max(yn(a, o.axis, f, !0).hi + 1, n ? 0 : yn(e, c, o.getPixelForValue(f), !0).hi + 1);
                if (u) {
                    const _ = a.slice(v - 1).findIndex((m)=>!V(m[l.axis]));
                    v += Math.max(0, _);
                }
                s = Xe(v, r, i) - r;
            } else s = i - r;
        }
        return {
            start: r,
            count: s
        };
    }
    function Mp(t) {
        const { xScale: e, yScale: n, _scaleRanges: i } = t, r = {
            xmin: e.min,
            xmax: e.max,
            ymin: n.min,
            ymax: n.max
        };
        if (!i) return t._scaleRanges = r, !0;
        const s = i.xmin !== e.min || i.xmax !== e.max || i.ymin !== n.min || i.ymax !== n.max;
        return Object.assign(i, r), s;
    }
    const Xr = (t)=>t === 0 || t === 1, Yc = (t, e, n)=>-(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * yt / n)), Xc = (t, e, n)=>Math.pow(2, -10 * t) * Math.sin((t - e) * yt / n) + 1, Qi = {
        linear: (t)=>t,
        easeInQuad: (t)=>t * t,
        easeOutQuad: (t)=>-t * (t - 2),
        easeInOutQuad: (t)=>(t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
        easeInCubic: (t)=>t * t * t,
        easeOutCubic: (t)=>(t -= 1) * t * t + 1,
        easeInOutCubic: (t)=>(t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
        easeInQuart: (t)=>t * t * t * t,
        easeOutQuart: (t)=>-((t -= 1) * t * t * t - 1),
        easeInOutQuart: (t)=>(t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
        easeInQuint: (t)=>t * t * t * t * t,
        easeOutQuint: (t)=>(t -= 1) * t * t * t * t + 1,
        easeInOutQuint: (t)=>(t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
        easeInSine: (t)=>-Math.cos(t * rt) + 1,
        easeOutSine: (t)=>Math.sin(t * rt),
        easeInOutSine: (t)=>-.5 * (Math.cos(fe * t) - 1),
        easeInExpo: (t)=>t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
        easeOutExpo: (t)=>t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
        easeInOutExpo: (t)=>Xr(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (t * 2 - 1)) : .5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
        easeInCirc: (t)=>t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
        easeOutCirc: (t)=>Math.sqrt(1 - (t -= 1) * t),
        easeInOutCirc: (t)=>(t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
        easeInElastic: (t)=>Xr(t) ? t : Yc(t, .075, .3),
        easeOutElastic: (t)=>Xr(t) ? t : Xc(t, .075, .3),
        easeInOutElastic (t) {
            return Xr(t) ? t : t < .5 ? .5 * Yc(t * 2, .1125, .45) : .5 + .5 * Xc(t * 2 - 1, .1125, .45);
        },
        easeInBack (t) {
            return t * t * ((1.70158 + 1) * t - 1.70158);
        },
        easeOutBack (t) {
            return (t -= 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
        },
        easeInOutBack (t) {
            let e = 1.70158;
            return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
        },
        easeInBounce: (t)=>1 - Qi.easeOutBounce(1 - t),
        easeOutBounce (t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        easeInOutBounce: (t)=>t < .5 ? Qi.easeInBounce(t * 2) * .5 : Qi.easeOutBounce(t * 2 - 1) * .5 + .5
    };
    function lu(t) {
        if (t && typeof t == "object") {
            const e = t.toString();
            return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
        }
        return !1;
    }
    function Qc(t) {
        return lu(t) ? t : new gr(t);
    }
    function Zo(t) {
        return lu(t) ? t : new gr(t).saturate(.5).darken(.1).hexString();
    }
    const S0 = [
        "x",
        "y",
        "borderWidth",
        "radius",
        "tension"
    ], w0 = [
        "color",
        "borderColor",
        "backgroundColor"
    ];
    function k0(t) {
        t.set("animation", {
            delay: void 0,
            duration: 1e3,
            easing: "easeOutQuart",
            fn: void 0,
            from: void 0,
            loop: void 0,
            to: void 0,
            type: void 0
        }), t.describe("animation", {
            _fallback: !1,
            _indexable: !1,
            _scriptable: (e)=>e !== "onProgress" && e !== "onComplete" && e !== "fn"
        }), t.set("animations", {
            colors: {
                type: "color",
                properties: w0
            },
            numbers: {
                type: "number",
                properties: S0
            }
        }), t.describe("animations", {
            _fallback: "animation"
        }), t.set("transitions", {
            active: {
                animation: {
                    duration: 400
                }
            },
            resize: {
                animation: {
                    duration: 0
                }
            },
            show: {
                animations: {
                    colors: {
                        from: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        duration: 0
                    }
                }
            },
            hide: {
                animations: {
                    colors: {
                        to: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        easing: "linear",
                        fn: (e)=>e | 0
                    }
                }
            }
        });
    }
    function b0(t) {
        t.set("layout", {
            autoPadding: !0,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
    }
    const Kc = new Map;
    function C0(t, e) {
        e = e || {};
        const n = t + JSON.stringify(e);
        let i = Kc.get(n);
        return i || (i = new Intl.NumberFormat(t, e), Kc.set(n, i)), i;
    }
    function Ep(t, e, n) {
        return C0(e, n).format(t);
    }
    const M0 = {
        values (t) {
            return ce(t) ? t : "" + t;
        },
        numeric (t, e, n) {
            if (t === 0) return "0";
            const i = this.chart.options.locale;
            let r, s = t;
            if (n.length > 1) {
                const u = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
                (u < 1e-4 || u > 1e15) && (r = "scientific"), s = E0(t, n);
            }
            const o = _p(Math.abs(s)), l = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), a = {
                notation: r,
                minimumFractionDigits: l,
                maximumFractionDigits: l
            };
            return Object.assign(a, this.options.ticks.format), Ep(t, i, a);
        }
    };
    function E0(t, e) {
        let n = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
        return Math.abs(n) >= 1 && t !== Math.floor(t) && (n = t - Math.floor(t)), n;
    }
    var Pp = {
        formatters: M0
    };
    function P0(t) {
        t.set("scale", {
            display: !0,
            offset: !1,
            reverse: !1,
            beginAtZero: !1,
            bounds: "ticks",
            clip: !0,
            grace: 0,
            grid: {
                display: !0,
                lineWidth: 1,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickLength: 8,
                tickWidth: (e, n)=>n.lineWidth,
                tickColor: (e, n)=>n.color,
                offset: !1
            },
            border: {
                display: !0,
                dash: [],
                dashOffset: 0,
                width: 1
            },
            title: {
                display: !1,
                text: "",
                padding: {
                    top: 4,
                    bottom: 4
                }
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: !1,
                textStrokeWidth: 0,
                textStrokeColor: "",
                padding: 3,
                display: !0,
                autoSkip: !0,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: Pp.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: !1,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2
            }
        }), t.route("scale.ticks", "color", "", "color"), t.route("scale.grid", "color", "", "borderColor"), t.route("scale.border", "color", "", "borderColor"), t.route("scale.title", "color", "", "color"), t.describe("scale", {
            _fallback: !1,
            _scriptable: (e)=>!e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
            _indexable: (e)=>e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
        }), t.describe("scales", {
            _fallback: "scale"
        }), t.describe("scale.ticks", {
            _scriptable: (e)=>e !== "backdropPadding" && e !== "callback",
            _indexable: (e)=>e !== "backdropPadding"
        });
    }
    const Mn = Object.create(null), ea = Object.create(null);
    function Ki(t, e) {
        if (!e) return t;
        const n = e.split(".");
        for(let i = 0, r = n.length; i < r; ++i){
            const s = n[i];
            t = t[s] || (t[s] = Object.create(null));
        }
        return t;
    }
    function Jo(t, e, n) {
        return typeof e == "string" ? mr(Ki(t, e), n) : mr(Ki(t, ""), e);
    }
    class D0 {
        constructor(e, n){
            this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i)=>i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
                "mousemove",
                "mouseout",
                "click",
                "touchstart",
                "touchmove"
            ], this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null
            }, this.hover = {}, this.hoverBackgroundColor = (i, r)=>Zo(r.backgroundColor), this.hoverBorderColor = (i, r)=>Zo(r.borderColor), this.hoverColor = (i, r)=>Zo(r.color), this.indexAxis = "x", this.interaction = {
                mode: "nearest",
                intersect: !0,
                includeInvisible: !1
            }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(n);
        }
        set(e, n) {
            return Jo(this, e, n);
        }
        get(e) {
            return Ki(this, e);
        }
        describe(e, n) {
            return Jo(ea, e, n);
        }
        override(e, n) {
            return Jo(Mn, e, n);
        }
        route(e, n, i, r) {
            const s = Ki(this, e), o = Ki(this, i), l = "_" + n;
            Object.defineProperties(s, {
                [l]: {
                    value: s[n],
                    writable: !0
                },
                [n]: {
                    enumerable: !0,
                    get () {
                        const a = this[l], u = o[r];
                        return F(a) ? Object.assign({}, u, a) : I(a, u);
                    },
                    set (a) {
                        this[l] = a;
                    }
                }
            });
        }
        apply(e) {
            e.forEach((n)=>n(this));
        }
    }
    var se = new D0({
        _scriptable: (t)=>!t.startsWith("on"),
        _indexable: (t)=>t !== "events",
        hover: {
            _fallback: "interaction"
        },
        interaction: {
            _scriptable: !1,
            _indexable: !1
        }
    }, [
        k0,
        b0,
        P0
    ]);
    function T0(t) {
        return !t || V(t.size) || V(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
    }
    function Gc(t, e, n, i, r) {
        let s = e[r];
        return s || (s = e[r] = t.measureText(r).width, n.push(r)), s > i && (i = s), i;
    }
    function on(t, e, n) {
        const i = t.currentDevicePixelRatio, r = n !== 0 ? Math.max(n / 2, .5) : 0;
        return Math.round((e - r) * i) / i + r;
    }
    function Zc(t, e) {
        !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
    }
    function ta(t, e, n, i) {
        Dp(t, e, n, i, null);
    }
    function Dp(t, e, n, i, r) {
        let s, o, l, a, u, c, d, f;
        const p = e.pointStyle, y = e.rotation, v = e.radius;
        let _ = (y || 0) * o0;
        if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
            t.save(), t.translate(n, i), t.rotate(_), t.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), t.restore();
            return;
        }
        if (!(isNaN(v) || v <= 0)) {
            switch(t.beginPath(), p){
                default:
                    r ? t.ellipse(n, i, r / 2, v, 0, 0, yt) : t.arc(n, i, v, 0, yt), t.closePath();
                    break;
                case "triangle":
                    c = r ? r / 2 : v, t.moveTo(n + Math.sin(_) * c, i - Math.cos(_) * v), _ += Wc, t.lineTo(n + Math.sin(_) * c, i - Math.cos(_) * v), _ += Wc, t.lineTo(n + Math.sin(_) * c, i - Math.cos(_) * v), t.closePath();
                    break;
                case "rectRounded":
                    u = v * .516, a = v - u, o = Math.cos(_ + sn) * a, d = Math.cos(_ + sn) * (r ? r / 2 - u : a), l = Math.sin(_ + sn) * a, f = Math.sin(_ + sn) * (r ? r / 2 - u : a), t.arc(n - d, i - l, u, _ - fe, _ - rt), t.arc(n + f, i - o, u, _ - rt, _), t.arc(n + d, i + l, u, _, _ + rt), t.arc(n - f, i + o, u, _ + rt, _ + fe), t.closePath();
                    break;
                case "rect":
                    if (!y) {
                        a = Math.SQRT1_2 * v, c = r ? r / 2 : a, t.rect(n - c, i - a, 2 * c, 2 * a);
                        break;
                    }
                    _ += sn;
                case "rectRot":
                    d = Math.cos(_) * (r ? r / 2 : v), o = Math.cos(_) * v, l = Math.sin(_) * v, f = Math.sin(_) * (r ? r / 2 : v), t.moveTo(n - d, i - l), t.lineTo(n + f, i - o), t.lineTo(n + d, i + l), t.lineTo(n - f, i + o), t.closePath();
                    break;
                case "crossRot":
                    _ += sn;
                case "cross":
                    d = Math.cos(_) * (r ? r / 2 : v), o = Math.cos(_) * v, l = Math.sin(_) * v, f = Math.sin(_) * (r ? r / 2 : v), t.moveTo(n - d, i - l), t.lineTo(n + d, i + l), t.moveTo(n + f, i - o), t.lineTo(n - f, i + o);
                    break;
                case "star":
                    d = Math.cos(_) * (r ? r / 2 : v), o = Math.cos(_) * v, l = Math.sin(_) * v, f = Math.sin(_) * (r ? r / 2 : v), t.moveTo(n - d, i - l), t.lineTo(n + d, i + l), t.moveTo(n + f, i - o), t.lineTo(n - f, i + o), _ += sn, d = Math.cos(_) * (r ? r / 2 : v), o = Math.cos(_) * v, l = Math.sin(_) * v, f = Math.sin(_) * (r ? r / 2 : v), t.moveTo(n - d, i - l), t.lineTo(n + d, i + l), t.moveTo(n + f, i - o), t.lineTo(n - f, i + o);
                    break;
                case "line":
                    o = r ? r / 2 : Math.cos(_) * v, l = Math.sin(_) * v, t.moveTo(n - o, i - l), t.lineTo(n + o, i + l);
                    break;
                case "dash":
                    t.moveTo(n, i), t.lineTo(n + Math.cos(_) * (r ? r / 2 : v), i + Math.sin(_) * v);
                    break;
                case !1:
                    t.closePath();
                    break;
            }
            t.fill(), e.borderWidth > 0 && t.stroke();
        }
    }
    function yr(t, e, n) {
        return n = n || .5, !e || t && t.x > e.left - n && t.x < e.right + n && t.y > e.top - n && t.y < e.bottom + n;
    }
    function au(t, e) {
        t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
    }
    function uu(t) {
        t.restore();
    }
    function j0(t, e, n, i, r) {
        if (!e) return t.lineTo(n.x, n.y);
        if (r === "middle") {
            const s = (e.x + n.x) / 2;
            t.lineTo(s, e.y), t.lineTo(s, n.y);
        } else r === "after" != !!i ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y);
        t.lineTo(n.x, n.y);
    }
    function O0(t, e, n, i) {
        if (!e) return t.lineTo(n.x, n.y);
        t.bezierCurveTo(i ? e.cp1x : e.cp2x, i ? e.cp1y : e.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
    }
    function R0(t, e) {
        e.translation && t.translate(e.translation[0], e.translation[1]), V(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
    }
    function L0(t, e, n, i, r) {
        if (r.strikethrough || r.underline) {
            const s = t.measureText(i), o = e - s.actualBoundingBoxLeft, l = e + s.actualBoundingBoxRight, a = n - s.actualBoundingBoxAscent, u = n + s.actualBoundingBoxDescent, c = r.strikethrough ? (a + u) / 2 : u;
            t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = r.decorationWidth || 2, t.moveTo(o, c), t.lineTo(l, c), t.stroke();
        }
    }
    function z0(t, e) {
        const n = t.fillStyle;
        t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = n;
    }
    function vr(t, e, n, i, r, s = {}) {
        const o = ce(e) ? e : [
            e
        ], l = s.strokeWidth > 0 && s.strokeColor !== "";
        let a, u;
        for(t.save(), t.font = r.string, R0(t, s), a = 0; a < o.length; ++a)u = o[a], s.backdrop && z0(t, s.backdrop), l && (s.strokeColor && (t.strokeStyle = s.strokeColor), V(s.strokeWidth) || (t.lineWidth = s.strokeWidth), t.strokeText(u, n, i, s.maxWidth)), t.fillText(u, n, i, s.maxWidth), L0(t, n, i, u, s), i += Number(r.lineHeight);
        t.restore();
    }
    function na(t, e) {
        const { x: n, y: i, w: r, h: s, radius: o } = e;
        t.arc(n + o.topLeft, i + o.topLeft, o.topLeft, 1.5 * fe, fe, !0), t.lineTo(n, i + s - o.bottomLeft), t.arc(n + o.bottomLeft, i + s - o.bottomLeft, o.bottomLeft, fe, rt, !0), t.lineTo(n + r - o.bottomRight, i + s), t.arc(n + r - o.bottomRight, i + s - o.bottomRight, o.bottomRight, rt, 0, !0), t.lineTo(n + r, i + o.topRight), t.arc(n + r - o.topRight, i + o.topRight, o.topRight, 0, -rt, !0), t.lineTo(n + o.topLeft, i);
    }
    const I0 = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, N0 = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
    function F0(t, e) {
        const n = ("" + t).match(I0);
        if (!n || n[1] === "normal") return e * 1.2;
        switch(t = +n[2], n[3]){
            case "px":
                return t;
            case "%":
                t /= 100;
                break;
        }
        return e * t;
    }
    const A0 = (t)=>+t || 0;
    function Tp(t, e) {
        const n = {}, i = F(e), r = i ? Object.keys(e) : e, s = F(t) ? i ? (o)=>I(t[o], t[e[o]]) : (o)=>t[o] : ()=>t;
        for (const o of r)n[o] = A0(s(o));
        return n;
    }
    function B0(t) {
        return Tp(t, {
            top: "y",
            right: "x",
            bottom: "y",
            left: "x"
        });
    }
    function Gi(t) {
        return Tp(t, [
            "topLeft",
            "topRight",
            "bottomLeft",
            "bottomRight"
        ]);
    }
    function qe(t) {
        const e = B0(t);
        return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
    }
    function we(t, e) {
        t = t || {}, e = e || se.font;
        let n = I(t.size, e.size);
        typeof n == "string" && (n = parseInt(n, 10));
        let i = I(t.style, e.style);
        i && !("" + i).match(N0) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
        const r = {
            family: I(t.family, e.family),
            lineHeight: F0(I(t.lineHeight, e.lineHeight), n),
            size: n,
            style: i,
            weight: I(t.weight, e.weight),
            string: ""
        };
        return r.string = T0(r), r;
    }
    function Qr(t, e, n, i) {
        let r, s, o;
        for(r = 0, s = t.length; r < s; ++r)if (o = t[r], o !== void 0 && o !== void 0) return o;
    }
    function H0(t, e, n) {
        const { min: i, max: r } = t, s = qv(e, (r - i) / 2), o = (l, a)=>n && l === 0 ? 0 : l + a;
        return {
            min: o(i, -Math.abs(s)),
            max: o(r, s)
        };
    }
    function Dn(t, e) {
        return Object.assign(Object.create(t), e);
    }
    function cu(t, e = [
        ""
    ], n, i, r = ()=>t[0]) {
        const s = n || t;
        typeof i > "u" && (i = Lp("_fallback", t));
        const o = {
            [Symbol.toStringTag]: "Object",
            _cacheable: !0,
            _scopes: t,
            _rootScopes: s,
            _fallback: i,
            _getTarget: r,
            override: (l)=>cu([
                    l,
                    ...t
                ], e, s, i)
        };
        return new Proxy(o, {
            deleteProperty (l, a) {
                return delete l[a], delete l._keys, delete t[0][a], !0;
            },
            get (l, a) {
                return Op(l, a, ()=>K0(a, e, t, l));
            },
            getOwnPropertyDescriptor (l, a) {
                return Reflect.getOwnPropertyDescriptor(l._scopes[0], a);
            },
            getPrototypeOf () {
                return Reflect.getPrototypeOf(t[0]);
            },
            has (l, a) {
                return qc(l).includes(a);
            },
            ownKeys (l) {
                return qc(l);
            },
            set (l, a, u) {
                const c = l._storage || (l._storage = r());
                return l[a] = c[a] = u, delete l._keys, !0;
            }
        });
    }
    function ui(t, e, n, i) {
        const r = {
            _cacheable: !1,
            _proxy: t,
            _context: e,
            _subProxy: n,
            _stack: new Set,
            _descriptors: jp(t, i),
            setContext: (s)=>ui(t, s, n, i),
            override: (s)=>ui(t.override(s), e, n, i)
        };
        return new Proxy(r, {
            deleteProperty (s, o) {
                return delete s[o], delete t[o], !0;
            },
            get (s, o, l) {
                return Op(s, o, ()=>V0(s, o, l));
            },
            getOwnPropertyDescriptor (s, o) {
                return s._descriptors.allKeys ? Reflect.has(t, o) ? {
                    enumerable: !0,
                    configurable: !0
                } : void 0 : Reflect.getOwnPropertyDescriptor(t, o);
            },
            getPrototypeOf () {
                return Reflect.getPrototypeOf(t);
            },
            has (s, o) {
                return Reflect.has(t, o);
            },
            ownKeys () {
                return Reflect.ownKeys(t);
            },
            set (s, o, l) {
                return t[o] = l, delete s[o], !0;
            }
        });
    }
    function jp(t, e = {
        scriptable: !0,
        indexable: !0
    }) {
        const { _scriptable: n = e.scriptable, _indexable: i = e.indexable, _allKeys: r = e.allKeys } = t;
        return {
            allKeys: r,
            scriptable: n,
            indexable: i,
            isScriptable: en(n) ? n : ()=>n,
            isIndexable: en(i) ? i : ()=>i
        };
    }
    const W0 = (t, e)=>t ? t + ru(e) : e, du = (t, e)=>F(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
    function Op(t, e, n) {
        if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor") return t[e];
        const i = n();
        return t[e] = i, i;
    }
    function V0(t, e, n) {
        const { _proxy: i, _context: r, _subProxy: s, _descriptors: o } = t;
        let l = i[e];
        return en(l) && o.isScriptable(e) && (l = U0(e, l, t, n)), ce(l) && l.length && (l = $0(e, l, t, o.isIndexable)), du(e, l) && (l = ui(l, r, s && s[e], o)), l;
    }
    function U0(t, e, n, i) {
        const { _proxy: r, _context: s, _subProxy: o, _stack: l } = n;
        if (l.has(t)) throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + t);
        l.add(t);
        let a = e(s, o || i);
        return l.delete(t), du(t, a) && (a = fu(r._scopes, r, t, a)), a;
    }
    function $0(t, e, n, i) {
        const { _proxy: r, _context: s, _subProxy: o, _descriptors: l } = n;
        if (typeof s.index < "u" && i(t)) return e[s.index % e.length];
        if (F(e[0])) {
            const a = e, u = r._scopes.filter((c)=>c !== a);
            e = [];
            for (const c of a){
                const d = fu(u, r, t, c);
                e.push(ui(d, s, o && o[t], l));
            }
        }
        return e;
    }
    function Rp(t, e, n) {
        return en(t) ? t(e, n) : t;
    }
    const Y0 = (t, e)=>t === !0 ? e : typeof t == "string" ? $s(e, t) : void 0;
    function X0(t, e, n, i, r) {
        for (const s of e){
            const o = Y0(n, s);
            if (o) {
                t.add(o);
                const l = Rp(o._fallback, n, r);
                if (typeof l < "u" && l !== n && l !== i) return l;
            } else if (o === !1 && typeof i < "u" && n !== i) return null;
        }
        return !1;
    }
    function fu(t, e, n, i) {
        const r = e._rootScopes, s = Rp(e._fallback, n, i), o = [
            ...t,
            ...r
        ], l = new Set;
        l.add(i);
        let a = Jc(l, o, n, s || n, i);
        return a === null || typeof s < "u" && s !== n && (a = Jc(l, o, s, a, i), a === null) ? !1 : cu(Array.from(l), [
            ""
        ], r, s, ()=>Q0(e, n, i));
    }
    function Jc(t, e, n, i, r) {
        for(; n;)n = X0(t, e, n, i, r);
        return n;
    }
    function Q0(t, e, n) {
        const i = t._getTarget();
        e in i || (i[e] = {});
        const r = i[e];
        return ce(r) && F(n) ? n : r || {};
    }
    function K0(t, e, n, i) {
        let r;
        for (const s of e)if (r = Lp(W0(s, t), n), typeof r < "u") return du(t, r) ? fu(n, i, t, r) : r;
    }
    function Lp(t, e) {
        for (const n of e){
            if (!n) continue;
            const i = n[t];
            if (typeof i < "u") return i;
        }
    }
    function qc(t) {
        let e = t._keys;
        return e || (e = t._keys = G0(t._scopes)), e;
    }
    function G0(t) {
        const e = new Set;
        for (const n of t)for (const i of Object.keys(n).filter((r)=>!r.startsWith("_")))e.add(i);
        return Array.from(e);
    }
    const Z0 = Number.EPSILON || 1e-14, ci = (t, e)=>e < t.length && !t[e].skip && t[e], zp = (t)=>t === "x" ? "y" : "x";
    function J0(t, e, n, i) {
        const r = t.skip ? e : t, s = e, o = n.skip ? e : n, l = ql(s, r), a = ql(o, s);
        let u = l / (l + a), c = a / (l + a);
        u = isNaN(u) ? 0 : u, c = isNaN(c) ? 0 : c;
        const d = i * u, f = i * c;
        return {
            previous: {
                x: s.x - d * (o.x - r.x),
                y: s.y - d * (o.y - r.y)
            },
            next: {
                x: s.x + f * (o.x - r.x),
                y: s.y + f * (o.y - r.y)
            }
        };
    }
    function q0(t, e, n) {
        const i = t.length;
        let r, s, o, l, a, u = ci(t, 0);
        for(let c = 0; c < i - 1; ++c)if (a = u, u = ci(t, c + 1), !(!a || !u)) {
            if (Xi(e[c], 0, Z0)) {
                n[c] = n[c + 1] = 0;
                continue;
            }
            r = n[c] / e[c], s = n[c + 1] / e[c], l = Math.pow(r, 2) + Math.pow(s, 2), !(l <= 9) && (o = 3 / Math.sqrt(l), n[c] = r * o * e[c], n[c + 1] = s * o * e[c]);
        }
    }
    function ex(t, e, n = "x") {
        const i = zp(n), r = t.length;
        let s, o, l, a = ci(t, 0);
        for(let u = 0; u < r; ++u){
            if (o = l, l = a, a = ci(t, u + 1), !l) continue;
            const c = l[n], d = l[i];
            o && (s = (c - o[n]) / 3, l[`cp1${n}`] = c - s, l[`cp1${i}`] = d - s * e[u]), a && (s = (a[n] - c) / 3, l[`cp2${n}`] = c + s, l[`cp2${i}`] = d + s * e[u]);
        }
    }
    function tx(t, e = "x") {
        const n = zp(e), i = t.length, r = Array(i).fill(0), s = Array(i);
        let o, l, a, u = ci(t, 0);
        for(o = 0; o < i; ++o)if (l = a, a = u, u = ci(t, o + 1), !!a) {
            if (u) {
                const c = u[e] - a[e];
                r[o] = c !== 0 ? (u[n] - a[n]) / c : 0;
            }
            s[o] = l ? u ? li(r[o - 1]) !== li(r[o]) ? 0 : (r[o - 1] + r[o]) / 2 : r[o - 1] : r[o];
        }
        q0(t, r, s), ex(t, s, e);
    }
    function Kr(t, e, n) {
        return Math.max(Math.min(t, n), e);
    }
    function nx(t, e) {
        let n, i, r, s, o, l = yr(t[0], e);
        for(n = 0, i = t.length; n < i; ++n)o = s, s = l, l = n < i - 1 && yr(t[n + 1], e), s && (r = t[n], o && (r.cp1x = Kr(r.cp1x, e.left, e.right), r.cp1y = Kr(r.cp1y, e.top, e.bottom)), l && (r.cp2x = Kr(r.cp2x, e.left, e.right), r.cp2y = Kr(r.cp2y, e.top, e.bottom)));
    }
    function ix(t, e, n, i, r) {
        let s, o, l, a;
        if (e.spanGaps && (t = t.filter((u)=>!u.skip)), e.cubicInterpolationMode === "monotone") tx(t, r);
        else {
            let u = i ? t[t.length - 1] : t[0];
            for(s = 0, o = t.length; s < o; ++s)l = t[s], a = J0(u, l, t[Math.min(s + 1, o - (i ? 0 : 1)) % o], e.tension), l.cp1x = a.previous.x, l.cp1y = a.previous.y, l.cp2x = a.next.x, l.cp2y = a.next.y, u = l;
        }
        e.capBezierPoints && nx(t, n);
    }
    function hu() {
        return typeof window < "u" && typeof document < "u";
    }
    function pu(t) {
        let e = t.parentNode;
        return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
    }
    function Qs(t, e, n) {
        let i;
        return typeof t == "string" ? (i = parseInt(t, 10), t.indexOf("%") !== -1 && (i = i / 100 * e.parentNode[n])) : i = t, i;
    }
    const go = (t)=>t.ownerDocument.defaultView.getComputedStyle(t, null);
    function rx(t, e) {
        return go(t).getPropertyValue(e);
    }
    const sx = [
        "top",
        "right",
        "bottom",
        "left"
    ];
    function _n(t, e, n) {
        const i = {};
        n = n ? "-" + n : "";
        for(let r = 0; r < 4; r++){
            const s = sx[r];
            i[s] = parseFloat(t[e + "-" + s + n]) || 0;
        }
        return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
    }
    const ox = (t, e, n)=>(t > 0 || e > 0) && (!n || !n.shadowRoot);
    function lx(t, e) {
        const n = t.touches, i = n && n.length ? n[0] : t, { offsetX: r, offsetY: s } = i;
        let o = !1, l, a;
        if (ox(r, s, t.target)) l = r, a = s;
        else {
            const u = e.getBoundingClientRect();
            l = i.clientX - u.left, a = i.clientY - u.top, o = !0;
        }
        return {
            x: l,
            y: a,
            box: o
        };
    }
    function cn(t, e) {
        if ("native" in t) return t;
        const { canvas: n, currentDevicePixelRatio: i } = e, r = go(n), s = r.boxSizing === "border-box", o = _n(r, "padding"), l = _n(r, "border", "width"), { x: a, y: u, box: c } = lx(t, n), d = o.left + (c && l.left), f = o.top + (c && l.top);
        let { width: p, height: y } = e;
        return s && (p -= o.width + l.width, y -= o.height + l.height), {
            x: Math.round((a - d) / p * n.width / i),
            y: Math.round((u - f) / y * n.height / i)
        };
    }
    function ax(t, e, n) {
        let i, r;
        if (e === void 0 || n === void 0) {
            const s = t && pu(t);
            if (!s) e = t.clientWidth, n = t.clientHeight;
            else {
                const o = s.getBoundingClientRect(), l = go(s), a = _n(l, "border", "width"), u = _n(l, "padding");
                e = o.width - u.width - a.width, n = o.height - u.height - a.height, i = Qs(l.maxWidth, s, "clientWidth"), r = Qs(l.maxHeight, s, "clientHeight");
            }
        }
        return {
            width: e,
            height: n,
            maxWidth: i || Xs,
            maxHeight: r || Xs
        };
    }
    const Wt = (t)=>Math.round(t * 10) / 10;
    function ux(t, e, n, i) {
        const r = go(t), s = _n(r, "margin"), o = Qs(r.maxWidth, t, "clientWidth") || Xs, l = Qs(r.maxHeight, t, "clientHeight") || Xs, a = ax(t, e, n);
        let { width: u, height: c } = a;
        if (r.boxSizing === "content-box") {
            const f = _n(r, "border", "width"), p = _n(r, "padding");
            u -= p.width + f.width, c -= p.height + f.height;
        }
        return u = Math.max(0, u - s.width), c = Math.max(0, i ? u / i : c - s.height), u = Wt(Math.min(u, o, a.maxWidth)), c = Wt(Math.min(c, l, a.maxHeight)), u && !c && (c = Wt(u / 2)), (e !== void 0 || n !== void 0) && i && a.height && c > a.height && (c = a.height, u = Wt(Math.floor(c * i))), {
            width: u,
            height: c
        };
    }
    function ed(t, e, n) {
        const i = e || 1, r = Wt(t.height * i), s = Wt(t.width * i);
        t.height = Wt(t.height), t.width = Wt(t.width);
        const o = t.canvas;
        return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${t.height}px`, o.style.width = `${t.width}px`), t.currentDevicePixelRatio !== i || o.height !== r || o.width !== s ? (t.currentDevicePixelRatio = i, o.height = r, o.width = s, t.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
    }
    const cx = function() {
        let t = !1;
        try {
            const e = {
                get passive () {
                    return t = !0, !1;
                }
            };
            hu() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
        } catch  {}
        return t;
    }();
    function td(t, e) {
        const n = rx(t, e), i = n && n.match(/^(\d+)(\.\d+)?px$/);
        return i ? +i[1] : void 0;
    }
    function dn(t, e, n, i) {
        return {
            x: t.x + n * (e.x - t.x),
            y: t.y + n * (e.y - t.y)
        };
    }
    function dx(t, e, n, i) {
        return {
            x: t.x + n * (e.x - t.x),
            y: i === "middle" ? n < .5 ? t.y : e.y : i === "after" ? n < 1 ? t.y : e.y : n > 0 ? e.y : t.y
        };
    }
    function fx(t, e, n, i) {
        const r = {
            x: t.cp2x,
            y: t.cp2y
        }, s = {
            x: e.cp1x,
            y: e.cp1y
        }, o = dn(t, r, n), l = dn(r, s, n), a = dn(s, e, n), u = dn(o, l, n), c = dn(l, a, n);
        return dn(u, c, n);
    }
    const hx = function(t, e) {
        return {
            x (n) {
                return t + t + e - n;
            },
            setWidth (n) {
                e = n;
            },
            textAlign (n) {
                return n === "center" ? n : n === "right" ? "left" : "right";
            },
            xPlus (n, i) {
                return n - i;
            },
            leftForLtr (n, i) {
                return n - i;
            }
        };
    }, px = function() {
        return {
            x (t) {
                return t;
            },
            setWidth (t) {},
            textAlign (t) {
                return t;
            },
            xPlus (t, e) {
                return t + e;
            },
            leftForLtr (t, e) {
                return t;
            }
        };
    };
    function Jn(t, e, n) {
        return t ? hx(e, n) : px();
    }
    function Ip(t, e) {
        let n, i;
        (e === "ltr" || e === "rtl") && (n = t.canvas.style, i = [
            n.getPropertyValue("direction"),
            n.getPropertyPriority("direction")
        ], n.setProperty("direction", e, "important"), t.prevTextDirection = i);
    }
    function Np(t, e) {
        e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
    }
    function Fp(t) {
        return t === "angle" ? {
            between: Sp,
            compare: h0,
            normalize: Lt
        } : {
            between: Li,
            compare: (e, n)=>e - n,
            normalize: (e)=>e
        };
    }
    function nd({ start: t, end: e, count: n, loop: i, style: r }) {
        return {
            start: t % n,
            end: e % n,
            loop: i && (e - t + 1) % n === 0,
            style: r
        };
    }
    function gx(t, e, n) {
        const { property: i, start: r, end: s } = n, { between: o, normalize: l } = Fp(i), a = e.length;
        let { start: u, end: c, loop: d } = t, f, p;
        if (d) {
            for(u += a, c += a, f = 0, p = a; f < p && o(l(e[u % a][i]), r, s); ++f)u--, c--;
            u %= a, c %= a;
        }
        return c < u && (c += a), {
            start: u,
            end: c,
            loop: d,
            style: t.style
        };
    }
    function mx(t, e, n) {
        if (!n) return [
            t
        ];
        const { property: i, start: r, end: s } = n, o = e.length, { compare: l, between: a, normalize: u } = Fp(i), { start: c, end: d, loop: f, style: p } = gx(t, e, n), y = [];
        let v = !1, _ = null, m, h, x;
        const S = ()=>a(r, x, m) && l(r, x) !== 0, w = ()=>l(s, m) === 0 || a(s, x, m), C = ()=>v || S(), k = ()=>!v || w();
        for(let b = c, E = c; b <= d; ++b)h = e[b % o], !h.skip && (m = u(h[i]), m !== x && (v = a(m, r, s), _ === null && C() && (_ = l(m, r) === 0 ? b : E), _ !== null && k() && (y.push(nd({
            start: _,
            end: b,
            loop: f,
            count: o,
            style: p
        })), _ = null), E = b, x = m));
        return _ !== null && y.push(nd({
            start: _,
            end: d,
            loop: f,
            count: o,
            style: p
        })), y;
    }
    function yx(t, e) {
        const n = [], i = t.segments;
        for(let r = 0; r < i.length; r++){
            const s = mx(i[r], t.points, e);
            s.length && n.push(...s);
        }
        return n;
    }
    function vx(t, e, n, i) {
        let r = 0, s = e - 1;
        if (n && !i) for(; r < e && !t[r].skip;)r++;
        for(; r < e && t[r].skip;)r++;
        for(r %= e, n && (s += r); s > r && t[s % e].skip;)s--;
        return s %= e, {
            start: r,
            end: s
        };
    }
    function xx(t, e, n, i) {
        const r = t.length, s = [];
        let o = e, l = t[e], a;
        for(a = e + 1; a <= n; ++a){
            const u = t[a % r];
            u.skip || u.stop ? l.skip || (i = !1, s.push({
                start: e % r,
                end: (a - 1) % r,
                loop: i
            }), e = o = u.stop ? a : null) : (o = a, l.skip && (e = a)), l = u;
        }
        return o !== null && s.push({
            start: e % r,
            end: o % r,
            loop: i
        }), s;
    }
    function _x(t, e) {
        const n = t.points, i = t.options.spanGaps, r = n.length;
        if (!r) return [];
        const s = !!t._loop, { start: o, end: l } = vx(n, r, s, i);
        if (i === !0) return id(t, [
            {
                start: o,
                end: l,
                loop: s
            }
        ], n, e);
        const a = l < o ? l + r : l, u = !!t._fullLoop && o === 0 && l === r - 1;
        return id(t, xx(n, o, a, u), n, e);
    }
    function id(t, e, n, i) {
        return !i || !i.setContext || !n ? e : Sx(t, e, n, i);
    }
    function Sx(t, e, n, i) {
        const r = t._chart.getContext(), s = rd(t.options), { _datasetIndex: o, options: { spanGaps: l } } = t, a = n.length, u = [];
        let c = s, d = e[0].start, f = d;
        function p(y, v, _, m) {
            const h = l ? -1 : 1;
            if (y !== v) {
                for(y += a; n[y % a].skip;)y -= h;
                for(; n[v % a].skip;)v += h;
                y % a !== v % a && (u.push({
                    start: y % a,
                    end: v % a,
                    loop: _,
                    style: m
                }), c = m, d = v % a);
            }
        }
        for (const y of e){
            d = l ? d : y.start;
            let v = n[d % a], _;
            for(f = d + 1; f <= y.end; f++){
                const m = n[f % a];
                _ = rd(i.setContext(Dn(r, {
                    type: "segment",
                    p0: v,
                    p1: m,
                    p0DataIndex: (f - 1) % a,
                    p1DataIndex: f % a,
                    datasetIndex: o
                }))), wx(_, c) && p(d, f - 1, y.loop, c), v = m, c = _;
            }
            d < f - 1 && p(d, f - 1, y.loop, c);
        }
        return u;
    }
    function rd(t) {
        return {
            backgroundColor: t.backgroundColor,
            borderCapStyle: t.borderCapStyle,
            borderDash: t.borderDash,
            borderDashOffset: t.borderDashOffset,
            borderJoinStyle: t.borderJoinStyle,
            borderWidth: t.borderWidth,
            borderColor: t.borderColor
        };
    }
    function wx(t, e) {
        if (!e) return !1;
        const n = [], i = function(r, s) {
            return lu(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
        };
        return JSON.stringify(t, i) !== JSON.stringify(e, i);
    }
    function Gr(t, e, n) {
        return t.options.clip ? t[n] : e[n];
    }
    function kx(t, e) {
        const { xScale: n, yScale: i } = t;
        return n && i ? {
            left: Gr(n, e, "left"),
            right: Gr(n, e, "right"),
            top: Gr(i, e, "top"),
            bottom: Gr(i, e, "bottom")
        } : e;
    }
    function bx(t, e) {
        const n = e._clip;
        if (n.disabled) return !1;
        const i = kx(e, t.chartArea);
        return {
            left: n.left === !1 ? 0 : i.left - (n.left === !0 ? 0 : n.left),
            right: n.right === !1 ? t.width : i.right + (n.right === !0 ? 0 : n.right),
            top: n.top === !1 ? 0 : i.top - (n.top === !0 ? 0 : n.top),
            bottom: n.bottom === !1 ? t.height : i.bottom + (n.bottom === !0 ? 0 : n.bottom)
        };
    }
    class Cx {
        constructor(){
            this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0;
        }
        _notify(e, n, i, r) {
            const s = n.listeners[r], o = n.duration;
            s.forEach((l)=>l({
                    chart: e,
                    initial: n.initial,
                    numSteps: o,
                    currentStep: Math.min(i - n.start, o)
                }));
        }
        _refresh() {
            this._request || (this._running = !0, this._request = kp.call(window, ()=>{
                this._update(), this._request = null, this._running && this._refresh();
            }));
        }
        _update(e = Date.now()) {
            let n = 0;
            this._charts.forEach((i, r)=>{
                if (!i.running || !i.items.length) return;
                const s = i.items;
                let o = s.length - 1, l = !1, a;
                for(; o >= 0; --o)a = s[o], a._active ? (a._total > i.duration && (i.duration = a._total), a.tick(e), l = !0) : (s[o] = s[s.length - 1], s.pop());
                l && (r.draw(), this._notify(r, i, e, "progress")), s.length || (i.running = !1, this._notify(r, i, e, "complete"), i.initial = !1), n += s.length;
            }), this._lastDate = e, n === 0 && (this._running = !1);
        }
        _getAnims(e) {
            const n = this._charts;
            let i = n.get(e);
            return i || (i = {
                running: !1,
                initial: !0,
                items: [],
                listeners: {
                    complete: [],
                    progress: []
                }
            }, n.set(e, i)), i;
        }
        listen(e, n, i) {
            this._getAnims(e).listeners[n].push(i);
        }
        add(e, n) {
            !n || !n.length || this._getAnims(e).items.push(...n);
        }
        has(e) {
            return this._getAnims(e).items.length > 0;
        }
        start(e) {
            const n = this._charts.get(e);
            n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((i, r)=>Math.max(i, r._duration), 0), this._refresh());
        }
        running(e) {
            if (!this._running) return !1;
            const n = this._charts.get(e);
            return !(!n || !n.running || !n.items.length);
        }
        stop(e) {
            const n = this._charts.get(e);
            if (!n || !n.items.length) return;
            const i = n.items;
            let r = i.length - 1;
            for(; r >= 0; --r)i[r].cancel();
            n.items = [], this._notify(e, n, Date.now(), "complete");
        }
        remove(e) {
            return this._charts.delete(e);
        }
    }
    var _t = new Cx;
    const sd = "transparent", Mx = {
        boolean (t, e, n) {
            return n > .5 ? e : t;
        },
        color (t, e, n) {
            const i = Qc(t || sd), r = i.valid && Qc(e || sd);
            return r && r.valid ? r.mix(i, n).hexString() : e;
        },
        number (t, e, n) {
            return t + (e - t) * n;
        }
    };
    class Ex {
        constructor(e, n, i, r){
            const s = n[i];
            r = Qr([
                e.to,
                r,
                s,
                e.from
            ]);
            const o = Qr([
                e.from,
                s,
                r
            ]);
            this._active = !0, this._fn = e.fn || Mx[e.type || typeof o], this._easing = Qi[e.easing] || Qi.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = n, this._prop = i, this._from = o, this._to = r, this._promises = void 0;
        }
        active() {
            return this._active;
        }
        update(e, n, i) {
            if (this._active) {
                this._notify(!1);
                const r = this._target[this._prop], s = i - this._start, o = this._duration - s;
                this._start = i, this._duration = Math.floor(Math.max(o, e.duration)), this._total += s, this._loop = !!e.loop, this._to = Qr([
                    e.to,
                    n,
                    r,
                    e.from
                ]), this._from = Qr([
                    e.from,
                    r,
                    n
                ]);
            }
        }
        cancel() {
            this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
        }
        tick(e) {
            const n = e - this._start, i = this._duration, r = this._prop, s = this._from, o = this._loop, l = this._to;
            let a;
            if (this._active = s !== l && (o || n < i), !this._active) {
                this._target[r] = l, this._notify(!0);
                return;
            }
            if (n < 0) {
                this._target[r] = s;
                return;
            }
            a = n / i % 2, a = o && a > 1 ? 2 - a : a, a = this._easing(Math.min(1, Math.max(0, a))), this._target[r] = this._fn(s, l, a);
        }
        wait() {
            const e = this._promises || (this._promises = []);
            return new Promise((n, i)=>{
                e.push({
                    res: n,
                    rej: i
                });
            });
        }
        _notify(e) {
            const n = e ? "res" : "rej", i = this._promises || [];
            for(let r = 0; r < i.length; r++)i[r][n]();
        }
    }
    class Ap {
        constructor(e, n){
            this._chart = e, this._properties = new Map, this.configure(n);
        }
        configure(e) {
            if (!F(e)) return;
            const n = Object.keys(se.animation), i = this._properties;
            Object.getOwnPropertyNames(e).forEach((r)=>{
                const s = e[r];
                if (!F(s)) return;
                const o = {};
                for (const l of n)o[l] = s[l];
                (ce(s.properties) && s.properties || [
                    r
                ]).forEach((l)=>{
                    (l === r || !i.has(l)) && i.set(l, o);
                });
            });
        }
        _animateOptions(e, n) {
            const i = n.options, r = Dx(e, i);
            if (!r) return [];
            const s = this._createAnimations(r, i);
            return i.$shared && Px(e.options.$animations, i).then(()=>{
                e.options = i;
            }, ()=>{}), s;
        }
        _createAnimations(e, n) {
            const i = this._properties, r = [], s = e.$animations || (e.$animations = {}), o = Object.keys(n), l = Date.now();
            let a;
            for(a = o.length - 1; a >= 0; --a){
                const u = o[a];
                if (u.charAt(0) === "$") continue;
                if (u === "options") {
                    r.push(...this._animateOptions(e, n));
                    continue;
                }
                const c = n[u];
                let d = s[u];
                const f = i.get(u);
                if (d) if (f && d.active()) {
                    d.update(f, c, l);
                    continue;
                } else d.cancel();
                if (!f || !f.duration) {
                    e[u] = c;
                    continue;
                }
                s[u] = d = new Ex(f, e, u, c), r.push(d);
            }
            return r;
        }
        update(e, n) {
            if (this._properties.size === 0) {
                Object.assign(e, n);
                return;
            }
            const i = this._createAnimations(e, n);
            if (i.length) return _t.add(this._chart, i), !0;
        }
    }
    function Px(t, e) {
        const n = [], i = Object.keys(e);
        for(let r = 0; r < i.length; r++){
            const s = t[i[r]];
            s && s.active() && n.push(s.wait());
        }
        return Promise.all(n);
    }
    function Dx(t, e) {
        if (!e) return;
        let n = t.options;
        if (!n) {
            t.options = e;
            return;
        }
        return n.$shared && (t.options = n = Object.assign({}, n, {
            $shared: !1,
            $animations: {}
        })), n;
    }
    function od(t, e) {
        const n = t && t.options || {}, i = n.reverse, r = n.min === void 0 ? e : 0, s = n.max === void 0 ? e : 0;
        return {
            start: i ? s : r,
            end: i ? r : s
        };
    }
    function Tx(t, e, n) {
        if (n === !1) return !1;
        const i = od(t, n), r = od(e, n);
        return {
            top: r.end,
            right: i.end,
            bottom: r.start,
            left: i.start
        };
    }
    function jx(t) {
        let e, n, i, r;
        return F(t) ? (e = t.top, n = t.right, i = t.bottom, r = t.left) : e = n = i = r = t, {
            top: e,
            right: n,
            bottom: i,
            left: r,
            disabled: t === !1
        };
    }
    function Bp(t, e) {
        const n = [], i = t._getSortedDatasetMetas(e);
        let r, s;
        for(r = 0, s = i.length; r < s; ++r)n.push(i[r].index);
        return n;
    }
    function ld(t, e, n, i = {}) {
        const r = t.keys, s = i.mode === "single";
        let o, l, a, u;
        if (e === null) return;
        let c = !1;
        for(o = 0, l = r.length; o < l; ++o){
            if (a = +r[o], a === n) {
                if (c = !0, i.all) continue;
                break;
            }
            u = t.values[a], Je(u) && (s || e === 0 || li(e) === li(u)) && (e += u);
        }
        return !c && !i.all ? 0 : e;
    }
    function Ox(t, e) {
        const { iScale: n, vScale: i } = e, r = n.axis === "x" ? "x" : "y", s = i.axis === "x" ? "x" : "y", o = Object.keys(t), l = new Array(o.length);
        let a, u, c;
        for(a = 0, u = o.length; a < u; ++a)c = o[a], l[a] = {
            [r]: c,
            [s]: t[c]
        };
        return l;
    }
    function qo(t, e) {
        const n = t && t.options.stacked;
        return n || n === void 0 && e.stack !== void 0;
    }
    function Rx(t, e, n) {
        return `${t.id}.${e.id}.${n.stack || n.type}`;
    }
    function Lx(t) {
        const { min: e, max: n, minDefined: i, maxDefined: r } = t.getUserBounds();
        return {
            min: i ? e : Number.NEGATIVE_INFINITY,
            max: r ? n : Number.POSITIVE_INFINITY
        };
    }
    function zx(t, e, n) {
        const i = t[e] || (t[e] = {});
        return i[n] || (i[n] = {});
    }
    function ad(t, e, n, i) {
        for (const r of e.getMatchingVisibleMetas(i).reverse()){
            const s = t[r.index];
            if (n && s > 0 || !n && s < 0) return r.index;
        }
        return null;
    }
    function ud(t, e) {
        const { chart: n, _cachedMeta: i } = t, r = n._stacks || (n._stacks = {}), { iScale: s, vScale: o, index: l } = i, a = s.axis, u = o.axis, c = Rx(s, o, i), d = e.length;
        let f;
        for(let p = 0; p < d; ++p){
            const y = e[p], { [a]: v, [u]: _ } = y, m = y._stacks || (y._stacks = {});
            f = m[u] = zx(r, c, v), f[l] = _, f._top = ad(f, o, !0, i.type), f._bottom = ad(f, o, !1, i.type);
            const h = f._visualValues || (f._visualValues = {});
            h[l] = _;
        }
    }
    function el(t, e) {
        const n = t.scales;
        return Object.keys(n).filter((i)=>n[i].axis === e).shift();
    }
    function Ix(t, e) {
        return Dn(t, {
            active: !1,
            dataset: void 0,
            datasetIndex: e,
            index: e,
            mode: "default",
            type: "dataset"
        });
    }
    function Nx(t, e, n) {
        return Dn(t, {
            active: !1,
            dataIndex: e,
            parsed: void 0,
            raw: void 0,
            element: n,
            index: e,
            mode: "default",
            type: "data"
        });
    }
    function bi(t, e) {
        const n = t.controller.index, i = t.vScale && t.vScale.axis;
        if (i) {
            e = e || t._parsed;
            for (const r of e){
                const s = r._stacks;
                if (!s || s[i] === void 0 || s[i][n] === void 0) return;
                delete s[i][n], s[i]._visualValues !== void 0 && s[i]._visualValues[n] !== void 0 && delete s[i]._visualValues[n];
            }
        }
    }
    const tl = (t)=>t === "reset" || t === "none", cd = (t, e)=>e ? t : Object.assign({}, t), Fx = (t, e, n)=>t && !e.hidden && e._stacked && {
            keys: Bp(n, !0),
            values: null
        };
    class gu {
        static defaults = {};
        static datasetElementType = null;
        static dataElementType = null;
        constructor(e, n){
            this.chart = e, this._ctx = e.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
        }
        initialize() {
            const e = this._cachedMeta;
            this.configure(), this.linkScales(), e._stacked = qo(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
        updateIndex(e) {
            this.index !== e && bi(this._cachedMeta), this.index = e;
        }
        linkScales() {
            const e = this.chart, n = this._cachedMeta, i = this.getDataset(), r = (d, f, p, y)=>d === "x" ? f : d === "r" ? y : p, s = n.xAxisID = I(i.xAxisID, el(e, "x")), o = n.yAxisID = I(i.yAxisID, el(e, "y")), l = n.rAxisID = I(i.rAxisID, el(e, "r")), a = n.indexAxis, u = n.iAxisID = r(a, s, o, l), c = n.vAxisID = r(a, o, s, l);
            n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(o), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(u), n.vScale = this.getScaleForId(c);
        }
        getDataset() {
            return this.chart.data.datasets[this.index];
        }
        getMeta() {
            return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(e) {
            return this.chart.scales[e];
        }
        _getOtherScale(e) {
            const n = this._cachedMeta;
            return e === n.iScale ? n.vScale : n.iScale;
        }
        reset() {
            this._update("reset");
        }
        _destroy() {
            const e = this._cachedMeta;
            this._data && $c(this._data, this), e._stacked && bi(e);
        }
        _dataCheck() {
            const e = this.getDataset(), n = e.data || (e.data = []), i = this._data;
            if (F(n)) {
                const r = this._cachedMeta;
                this._data = Ox(n, r);
            } else if (i !== n) {
                if (i) {
                    $c(i, this);
                    const r = this._cachedMeta;
                    bi(r), r._parsed = [];
                }
                n && Object.isExtensible(n) && y0(n, this), this._syncList = [], this._data = n;
            }
        }
        addElements() {
            const e = this._cachedMeta;
            this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType);
        }
        buildOrUpdateElements(e) {
            const n = this._cachedMeta, i = this.getDataset();
            let r = !1;
            this._dataCheck();
            const s = n._stacked;
            n._stacked = qo(n.vScale, n), n.stack !== i.stack && (r = !0, bi(n), n.stack = i.stack), this._resyncElements(e), (r || s !== n._stacked) && (ud(this, n._parsed), n._stacked = qo(n.vScale, n));
        }
        configure() {
            const e = this.chart.config, n = e.datasetScopeKeys(this._type), i = e.getOptionScopes(this.getDataset(), n, !0);
            this.options = e.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
        }
        parse(e, n) {
            const { _cachedMeta: i, _data: r } = this, { iScale: s, _stacked: o } = i, l = s.axis;
            let a = e === 0 && n === r.length ? !0 : i._sorted, u = e > 0 && i._parsed[e - 1], c, d, f;
            if (this._parsing === !1) i._parsed = r, i._sorted = !0, f = r;
            else {
                ce(r[e]) ? f = this.parseArrayData(i, r, e, n) : F(r[e]) ? f = this.parseObjectData(i, r, e, n) : f = this.parsePrimitiveData(i, r, e, n);
                const p = ()=>d[l] === null || u && d[l] < u[l];
                for(c = 0; c < n; ++c)i._parsed[c + e] = d = f[c], a && (p() && (a = !1), u = d);
                i._sorted = a;
            }
            o && ud(this, f);
        }
        parsePrimitiveData(e, n, i, r) {
            const { iScale: s, vScale: o } = e, l = s.axis, a = o.axis, u = s.getLabels(), c = s === o, d = new Array(r);
            let f, p, y;
            for(f = 0, p = r; f < p; ++f)y = f + i, d[f] = {
                [l]: c || s.parse(u[y], y),
                [a]: o.parse(n[y], y)
            };
            return d;
        }
        parseArrayData(e, n, i, r) {
            const { xScale: s, yScale: o } = e, l = new Array(r);
            let a, u, c, d;
            for(a = 0, u = r; a < u; ++a)c = a + i, d = n[c], l[a] = {
                x: s.parse(d[0], c),
                y: o.parse(d[1], c)
            };
            return l;
        }
        parseObjectData(e, n, i, r) {
            const { xScale: s, yScale: o } = e, { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing, u = new Array(r);
            let c, d, f, p;
            for(c = 0, d = r; c < d; ++c)f = c + i, p = n[f], u[c] = {
                x: s.parse($s(p, l), f),
                y: o.parse($s(p, a), f)
            };
            return u;
        }
        getParsed(e) {
            return this._cachedMeta._parsed[e];
        }
        getDataElement(e) {
            return this._cachedMeta.data[e];
        }
        applyStack(e, n, i) {
            const r = this.chart, s = this._cachedMeta, o = n[e.axis], l = {
                keys: Bp(r, !0),
                values: n._stacks[e.axis]._visualValues
            };
            return ld(l, o, s.index, {
                mode: i
            });
        }
        updateRangeFromParsed(e, n, i, r) {
            const s = i[n.axis];
            let o = s === null ? NaN : s;
            const l = r && i._stacks[n.axis];
            r && l && (r.values = l, o = ld(r, s, this._cachedMeta.index)), e.min = Math.min(e.min, o), e.max = Math.max(e.max, o);
        }
        getMinMax(e, n) {
            const i = this._cachedMeta, r = i._parsed, s = i._sorted && e === i.iScale, o = r.length, l = this._getOtherScale(e), a = Fx(n, i, this.chart), u = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            }, { min: c, max: d } = Lx(l);
            let f, p;
            function y() {
                p = r[f];
                const v = p[l.axis];
                return !Je(p[e.axis]) || c > v || d < v;
            }
            for(f = 0; f < o && !(!y() && (this.updateRangeFromParsed(u, e, p, a), s)); ++f);
            if (s) {
                for(f = o - 1; f >= 0; --f)if (!y()) {
                    this.updateRangeFromParsed(u, e, p, a);
                    break;
                }
            }
            return u;
        }
        getAllParsedValues(e) {
            const n = this._cachedMeta._parsed, i = [];
            let r, s, o;
            for(r = 0, s = n.length; r < s; ++r)o = n[r][e.axis], Je(o) && i.push(o);
            return i;
        }
        getMaxOverflow() {
            return !1;
        }
        getLabelAndValue(e) {
            const n = this._cachedMeta, i = n.iScale, r = n.vScale, s = this.getParsed(e);
            return {
                label: i ? "" + i.getLabelForValue(s[i.axis]) : "",
                value: r ? "" + r.getLabelForValue(s[r.axis]) : ""
            };
        }
        _update(e) {
            const n = this._cachedMeta;
            this.update(e || "default"), n._clip = jx(I(this.options.clip, Tx(n.xScale, n.yScale, this.getMaxOverflow())));
        }
        update(e) {}
        draw() {
            const e = this._ctx, n = this.chart, i = this._cachedMeta, r = i.data || [], s = n.chartArea, o = [], l = this._drawStart || 0, a = this._drawCount || r.length - l, u = this.options.drawActiveElementsOnTop;
            let c;
            for(i.dataset && i.dataset.draw(e, s, l, a), c = l; c < l + a; ++c){
                const d = r[c];
                d.hidden || (d.active && u ? o.push(d) : d.draw(e, s));
            }
            for(c = 0; c < o.length; ++c)o[c].draw(e, s);
        }
        getStyle(e, n) {
            const i = n ? "active" : "default";
            return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(e || 0, i);
        }
        getContext(e, n, i) {
            const r = this.getDataset();
            let s;
            if (e >= 0 && e < this._cachedMeta.data.length) {
                const o = this._cachedMeta.data[e];
                s = o.$context || (o.$context = Nx(this.getContext(), e, o)), s.parsed = this.getParsed(e), s.raw = r.data[e], s.index = s.dataIndex = e;
            } else s = this.$context || (this.$context = Ix(this.chart.getContext(), this.index)), s.dataset = r, s.index = s.datasetIndex = this.index;
            return s.active = !!n, s.mode = i, s;
        }
        resolveDatasetElementOptions(e) {
            return this._resolveElementOptions(this.datasetElementType.id, e);
        }
        resolveDataElementOptions(e, n) {
            return this._resolveElementOptions(this.dataElementType.id, n, e);
        }
        _resolveElementOptions(e, n = "default", i) {
            const r = n === "active", s = this._cachedDataOpts, o = e + "-" + n, l = s[o], a = this.enableOptionSharing && Ys(i);
            if (l) return cd(l, a);
            const u = this.chart.config, c = u.datasetElementScopeKeys(this._type, e), d = r ? [
                `${e}Hover`,
                "hover",
                e,
                ""
            ] : [
                e,
                ""
            ], f = u.getOptionScopes(this.getDataset(), c), p = Object.keys(se.elements[e]), y = ()=>this.getContext(i, r, n), v = u.resolveNamedOptions(f, p, y, d);
            return v.$shared && (v.$shared = a, s[o] = Object.freeze(cd(v, a))), v;
        }
        _resolveAnimations(e, n, i) {
            const r = this.chart, s = this._cachedDataOpts, o = `animation-${n}`, l = s[o];
            if (l) return l;
            let a;
            if (r.options.animation !== !1) {
                const c = this.chart.config, d = c.datasetAnimationScopeKeys(this._type, n), f = c.getOptionScopes(this.getDataset(), d);
                a = c.createResolver(f, this.getContext(e, i, n));
            }
            const u = new Ap(r, a && a.animations);
            return a && a._cacheable && (s[o] = Object.freeze(u)), u;
        }
        getSharedOptions(e) {
            if (e.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
        }
        includeOptions(e, n) {
            return !n || tl(e) || this.chart._animationsDisabled;
        }
        _getSharedOptions(e, n) {
            const i = this.resolveDataElementOptions(e, n), r = this._sharedOptions, s = this.getSharedOptions(i), o = this.includeOptions(n, s) || s !== r;
            return this.updateSharedOptions(s, n, i), {
                sharedOptions: s,
                includeOptions: o
            };
        }
        updateElement(e, n, i, r) {
            tl(r) ? Object.assign(e, i) : this._resolveAnimations(n, r).update(e, i);
        }
        updateSharedOptions(e, n, i) {
            e && !tl(n) && this._resolveAnimations(void 0, n).update(e, i);
        }
        _setStyle(e, n, i, r) {
            e.active = r;
            const s = this.getStyle(n, r);
            this._resolveAnimations(n, i, r).update(e, {
                options: !r && this.getSharedOptions(s) || s
            });
        }
        removeHoverStyle(e, n, i) {
            this._setStyle(e, i, "active", !1);
        }
        setHoverStyle(e, n, i) {
            this._setStyle(e, i, "active", !0);
        }
        _removeDatasetHoverStyle() {
            const e = this._cachedMeta.dataset;
            e && this._setStyle(e, void 0, "active", !1);
        }
        _setDatasetHoverStyle() {
            const e = this._cachedMeta.dataset;
            e && this._setStyle(e, void 0, "active", !0);
        }
        _resyncElements(e) {
            const n = this._data, i = this._cachedMeta.data;
            for (const [l, a, u] of this._syncList)this[l](a, u);
            this._syncList = [];
            const r = i.length, s = n.length, o = Math.min(s, r);
            o && this.parse(0, o), s > r ? this._insertElements(r, s - r, e) : s < r && this._removeElements(s, r - s);
        }
        _insertElements(e, n, i = !0) {
            const r = this._cachedMeta, s = r.data, o = e + n;
            let l;
            const a = (u)=>{
                for(u.length += n, l = u.length - 1; l >= o; l--)u[l] = u[l - n];
            };
            for(a(s), l = e; l < o; ++l)s[l] = new this.dataElementType;
            this._parsing && a(r._parsed), this.parse(e, n), i && this.updateElements(s, e, n, "reset");
        }
        updateElements(e, n, i, r) {}
        _removeElements(e, n) {
            const i = this._cachedMeta;
            if (this._parsing) {
                const r = i._parsed.splice(e, n);
                i._stacked && bi(i, r);
            }
            i.data.splice(e, n);
        }
        _sync(e) {
            if (this._parsing) this._syncList.push(e);
            else {
                const [n, i, r] = e;
                this[n](i, r);
            }
            this.chart._dataChanges.push([
                this.index,
                ...e
            ]);
        }
        _onDataPush() {
            const e = arguments.length;
            this._sync([
                "_insertElements",
                this.getDataset().data.length - e,
                e
            ]);
        }
        _onDataPop() {
            this._sync([
                "_removeElements",
                this._cachedMeta.data.length - 1,
                1
            ]);
        }
        _onDataShift() {
            this._sync([
                "_removeElements",
                0,
                1
            ]);
        }
        _onDataSplice(e, n) {
            n && this._sync([
                "_removeElements",
                e,
                n
            ]);
            const i = arguments.length - 2;
            i && this._sync([
                "_insertElements",
                e,
                i
            ]);
        }
        _onDataUnshift() {
            this._sync([
                "_insertElements",
                0,
                arguments.length
            ]);
        }
    }
    class Ax extends gu {
        static id = "line";
        static defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            showLine: !0,
            spanGaps: !1
        };
        static overrides = {
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
        }
        update(e) {
            const n = this._cachedMeta, { dataset: i, data: r = [], _dataset: s } = n, o = this.chart._animationsDisabled;
            let { start: l, count: a } = Cp(n, r, o);
            this._drawStart = l, this._drawCount = a, Mp(n) && (l = 0, a = r.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!s._decimated, i.points = r;
            const u = this.resolveDatasetElementOptions(e);
            this.options.showLine || (u.borderWidth = 0), u.segment = this.options.segment, this.updateElement(i, void 0, {
                animated: !o,
                options: u
            }, e), this.updateElements(r, l, a, e);
        }
        updateElements(e, n, i, r) {
            const s = r === "reset", { iScale: o, vScale: l, _stacked: a, _dataset: u } = this._cachedMeta, { sharedOptions: c, includeOptions: d } = this._getSharedOptions(n, r), f = o.axis, p = l.axis, { spanGaps: y, segment: v } = this.options, _ = ai(y) ? y : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || s || r === "none", h = n + i, x = e.length;
            let S = n > 0 && this.getParsed(n - 1);
            for(let w = 0; w < x; ++w){
                const C = e[w], k = m ? C : {};
                if (w < n || w >= h) {
                    k.skip = !0;
                    continue;
                }
                const b = this.getParsed(w), E = V(b[p]), P = k[f] = o.getPixelForValue(b[f], w), j = k[p] = s || E ? l.getBasePixel() : l.getPixelForValue(a ? this.applyStack(l, b, a) : b[p], w);
                k.skip = isNaN(P) || isNaN(j) || E, k.stop = w > 0 && Math.abs(b[f] - S[f]) > _, v && (k.parsed = b, k.raw = u.data[w]), d && (k.options = c || this.resolveDataElementOptions(w, C.active ? "active" : r)), m || this.updateElement(C, w, k, r), S = b;
            }
        }
        getMaxOverflow() {
            const e = this._cachedMeta, n = e.dataset, i = n.options && n.options.borderWidth || 0, r = e.data || [];
            if (!r.length) return i;
            const s = r[0].size(this.resolveDataElementOptions(0)), o = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
            return Math.max(i, s, o) / 2;
        }
        draw() {
            const e = this._cachedMeta;
            e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
        }
    }
    class Bx extends gu {
        static id = "scatter";
        static defaults = {
            datasetElementType: !1,
            dataElementType: "point",
            showLine: !1,
            fill: !1
        };
        static overrides = {
            interaction: {
                mode: "point"
            },
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        getLabelAndValue(e) {
            const n = this._cachedMeta, i = this.chart.data.labels || [], { xScale: r, yScale: s } = n, o = this.getParsed(e), l = r.getLabelForValue(o.x), a = s.getLabelForValue(o.y);
            return {
                label: i[e] || "",
                value: "(" + l + ", " + a + ")"
            };
        }
        update(e) {
            const n = this._cachedMeta, { data: i = [] } = n, r = this.chart._animationsDisabled;
            let { start: s, count: o } = Cp(n, i, r);
            if (this._drawStart = s, this._drawCount = o, Mp(n) && (s = 0, o = i.length), this.options.showLine) {
                this.datasetElementType || this.addElements();
                const { dataset: l, _dataset: a } = n;
                l._chart = this.chart, l._datasetIndex = this.index, l._decimated = !!a._decimated, l.points = i;
                const u = this.resolveDatasetElementOptions(e);
                u.segment = this.options.segment, this.updateElement(l, void 0, {
                    animated: !r,
                    options: u
                }, e);
            } else this.datasetElementType && (delete n.dataset, this.datasetElementType = !1);
            this.updateElements(i, s, o, e);
        }
        addElements() {
            const { showLine: e } = this.options;
            !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
        }
        updateElements(e, n, i, r) {
            const s = r === "reset", { iScale: o, vScale: l, _stacked: a, _dataset: u } = this._cachedMeta, c = this.resolveDataElementOptions(n, r), d = this.getSharedOptions(c), f = this.includeOptions(r, d), p = o.axis, y = l.axis, { spanGaps: v, segment: _ } = this.options, m = ai(v) ? v : Number.POSITIVE_INFINITY, h = this.chart._animationsDisabled || s || r === "none";
            let x = n > 0 && this.getParsed(n - 1);
            for(let S = n; S < n + i; ++S){
                const w = e[S], C = this.getParsed(S), k = h ? w : {}, b = V(C[y]), E = k[p] = o.getPixelForValue(C[p], S), P = k[y] = s || b ? l.getBasePixel() : l.getPixelForValue(a ? this.applyStack(l, C, a) : C[y], S);
                k.skip = isNaN(E) || isNaN(P) || b, k.stop = S > 0 && Math.abs(C[p] - x[p]) > m, _ && (k.parsed = C, k.raw = u.data[S]), f && (k.options = d || this.resolveDataElementOptions(S, w.active ? "active" : r)), h || this.updateElement(w, S, k, r), x = C;
            }
            this.updateSharedOptions(d, r, c);
        }
        getMaxOverflow() {
            const e = this._cachedMeta, n = e.data || [];
            if (!this.options.showLine) {
                let l = 0;
                for(let a = n.length - 1; a >= 0; --a)l = Math.max(l, n[a].size(this.resolveDataElementOptions(a)) / 2);
                return l > 0 && l;
            }
            const i = e.dataset, r = i.options && i.options.borderWidth || 0;
            if (!n.length) return r;
            const s = n[0].size(this.resolveDataElementOptions(0)), o = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
            return Math.max(r, s, o) / 2;
        }
    }
    function ln() {
        throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
    }
    class mu {
        static override(e) {
            Object.assign(mu.prototype, e);
        }
        options;
        constructor(e){
            this.options = e || {};
        }
        init() {}
        formats() {
            return ln();
        }
        parse() {
            return ln();
        }
        format() {
            return ln();
        }
        add() {
            return ln();
        }
        diff() {
            return ln();
        }
        startOf() {
            return ln();
        }
        endOf() {
            return ln();
        }
    }
    var Hx = {
        _date: mu
    };
    function Wx(t, e, n, i) {
        const { controller: r, data: s, _sorted: o } = t, l = r._cachedMeta.iScale, a = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
        if (l && e === l.axis && e !== "r" && o && s.length) {
            const u = l._reversePixels ? g0 : yn;
            if (i) {
                if (r._sharedOptions) {
                    const c = s[0], d = typeof c.getRange == "function" && c.getRange(e);
                    if (d) {
                        const f = u(s, e, n - d), p = u(s, e, n + d);
                        return {
                            lo: f.lo,
                            hi: p.hi
                        };
                    }
                }
            } else {
                const c = u(s, e, n);
                if (a) {
                    const { vScale: d } = r._cachedMeta, { _parsed: f } = t, p = f.slice(0, c.lo + 1).reverse().findIndex((v)=>!V(v[d.axis]));
                    c.lo -= Math.max(0, p);
                    const y = f.slice(c.hi).findIndex((v)=>!V(v[d.axis]));
                    c.hi += Math.max(0, y);
                }
                return c;
            }
        }
        return {
            lo: 0,
            hi: s.length - 1
        };
    }
    function mo(t, e, n, i, r) {
        const s = t.getSortedVisibleDatasetMetas(), o = n[e];
        for(let l = 0, a = s.length; l < a; ++l){
            const { index: u, data: c } = s[l], { lo: d, hi: f } = Wx(s[l], e, o, r);
            for(let p = d; p <= f; ++p){
                const y = c[p];
                y.skip || i(y, u, p);
            }
        }
    }
    function Vx(t) {
        const e = t.indexOf("x") !== -1, n = t.indexOf("y") !== -1;
        return function(i, r) {
            const s = e ? Math.abs(i.x - r.x) : 0, o = n ? Math.abs(i.y - r.y) : 0;
            return Math.sqrt(Math.pow(s, 2) + Math.pow(o, 2));
        };
    }
    function nl(t, e, n, i, r) {
        const s = [];
        return !r && !t.isPointInArea(e) || mo(t, n, e, function(l, a, u) {
            !r && !yr(l, t.chartArea, 0) || l.inRange(e.x, e.y, i) && s.push({
                element: l,
                datasetIndex: a,
                index: u
            });
        }, !0), s;
    }
    function Ux(t, e, n, i) {
        let r = [];
        function s(o, l, a) {
            const { startAngle: u, endAngle: c } = o.getProps([
                "startAngle",
                "endAngle"
            ], i), { angle: d } = f0(o, {
                x: e.x,
                y: e.y
            });
            Sp(d, u, c) && r.push({
                element: o,
                datasetIndex: l,
                index: a
            });
        }
        return mo(t, n, e, s), r;
    }
    function $x(t, e, n, i, r, s) {
        let o = [];
        const l = Vx(n);
        let a = Number.POSITIVE_INFINITY;
        function u(c, d, f) {
            const p = c.inRange(e.x, e.y, r);
            if (i && !p) return;
            const y = c.getCenterPoint(r);
            if (!(!!s || t.isPointInArea(y)) && !p) return;
            const _ = l(e, y);
            _ < a ? (o = [
                {
                    element: c,
                    datasetIndex: d,
                    index: f
                }
            ], a = _) : _ === a && o.push({
                element: c,
                datasetIndex: d,
                index: f
            });
        }
        return mo(t, n, e, u), o;
    }
    function il(t, e, n, i, r, s) {
        return !s && !t.isPointInArea(e) ? [] : n === "r" && !i ? Ux(t, e, n, r) : $x(t, e, n, i, r, s);
    }
    function dd(t, e, n, i, r) {
        const s = [], o = n === "x" ? "inXRange" : "inYRange";
        let l = !1;
        return mo(t, n, e, (a, u, c)=>{
            a[o] && a[o](e[n], r) && (s.push({
                element: a,
                datasetIndex: u,
                index: c
            }), l = l || a.inRange(e.x, e.y, r));
        }), i && !l ? [] : s;
    }
    var Yx = {
        modes: {
            index (t, e, n, i) {
                const r = cn(e, t), s = n.axis || "x", o = n.includeInvisible || !1, l = n.intersect ? nl(t, r, s, i, o) : il(t, r, s, !1, i, o), a = [];
                return l.length ? (t.getSortedVisibleDatasetMetas().forEach((u)=>{
                    const c = l[0].index, d = u.data[c];
                    d && !d.skip && a.push({
                        element: d,
                        datasetIndex: u.index,
                        index: c
                    });
                }), a) : [];
            },
            dataset (t, e, n, i) {
                const r = cn(e, t), s = n.axis || "xy", o = n.includeInvisible || !1;
                let l = n.intersect ? nl(t, r, s, i, o) : il(t, r, s, !1, i, o);
                if (l.length > 0) {
                    const a = l[0].datasetIndex, u = t.getDatasetMeta(a).data;
                    l = [];
                    for(let c = 0; c < u.length; ++c)l.push({
                        element: u[c],
                        datasetIndex: a,
                        index: c
                    });
                }
                return l;
            },
            point (t, e, n, i) {
                const r = cn(e, t), s = n.axis || "xy", o = n.includeInvisible || !1;
                return nl(t, r, s, i, o);
            },
            nearest (t, e, n, i) {
                const r = cn(e, t), s = n.axis || "xy", o = n.includeInvisible || !1;
                return il(t, r, s, n.intersect, i, o);
            },
            x (t, e, n, i) {
                const r = cn(e, t);
                return dd(t, r, "x", n.intersect, i);
            },
            y (t, e, n, i) {
                const r = cn(e, t);
                return dd(t, r, "y", n.intersect, i);
            }
        }
    };
    const Hp = [
        "left",
        "top",
        "right",
        "bottom"
    ];
    function Ci(t, e) {
        return t.filter((n)=>n.pos === e);
    }
    function fd(t, e) {
        return t.filter((n)=>Hp.indexOf(n.pos) === -1 && n.box.axis === e);
    }
    function Mi(t, e) {
        return t.sort((n, i)=>{
            const r = e ? i : n, s = e ? n : i;
            return r.weight === s.weight ? r.index - s.index : r.weight - s.weight;
        });
    }
    function Xx(t) {
        const e = [];
        let n, i, r, s, o, l;
        for(n = 0, i = (t || []).length; n < i; ++n)r = t[n], { position: s, options: { stack: o, stackWeight: l = 1 } } = r, e.push({
            index: n,
            box: r,
            pos: s,
            horizontal: r.isHorizontal(),
            weight: r.weight,
            stack: o && s + o,
            stackWeight: l
        });
        return e;
    }
    function Qx(t) {
        const e = {};
        for (const n of t){
            const { stack: i, pos: r, stackWeight: s } = n;
            if (!i || !Hp.includes(r)) continue;
            const o = e[i] || (e[i] = {
                count: 0,
                placed: 0,
                weight: 0,
                size: 0
            });
            o.count++, o.weight += s;
        }
        return e;
    }
    function Kx(t, e) {
        const n = Qx(t), { vBoxMaxWidth: i, hBoxMaxHeight: r } = e;
        let s, o, l;
        for(s = 0, o = t.length; s < o; ++s){
            l = t[s];
            const { fullSize: a } = l.box, u = n[l.stack], c = u && l.stackWeight / u.weight;
            l.horizontal ? (l.width = c ? c * i : a && e.availableWidth, l.height = r) : (l.width = i, l.height = c ? c * r : a && e.availableHeight);
        }
        return n;
    }
    function Gx(t) {
        const e = Xx(t), n = Mi(e.filter((u)=>u.box.fullSize), !0), i = Mi(Ci(e, "left"), !0), r = Mi(Ci(e, "right")), s = Mi(Ci(e, "top"), !0), o = Mi(Ci(e, "bottom")), l = fd(e, "x"), a = fd(e, "y");
        return {
            fullSize: n,
            leftAndTop: i.concat(s),
            rightAndBottom: r.concat(a).concat(o).concat(l),
            chartArea: Ci(e, "chartArea"),
            vertical: i.concat(r).concat(a),
            horizontal: s.concat(o).concat(l)
        };
    }
    function hd(t, e, n, i) {
        return Math.max(t[n], e[n]) + Math.max(t[i], e[i]);
    }
    function Wp(t, e) {
        t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
    }
    function Zx(t, e, n, i) {
        const { pos: r, box: s } = n, o = t.maxPadding;
        if (!F(r)) {
            n.size && (t[r] -= n.size);
            const d = i[n.stack] || {
                size: 0,
                count: 1
            };
            d.size = Math.max(d.size, n.horizontal ? s.height : s.width), n.size = d.size / d.count, t[r] += n.size;
        }
        s.getPadding && Wp(o, s.getPadding());
        const l = Math.max(0, e.outerWidth - hd(o, t, "left", "right")), a = Math.max(0, e.outerHeight - hd(o, t, "top", "bottom")), u = l !== t.w, c = a !== t.h;
        return t.w = l, t.h = a, n.horizontal ? {
            same: u,
            other: c
        } : {
            same: c,
            other: u
        };
    }
    function Jx(t) {
        const e = t.maxPadding;
        function n(i) {
            const r = Math.max(e[i] - t[i], 0);
            return t[i] += r, r;
        }
        t.y += n("top"), t.x += n("left"), n("right"), n("bottom");
    }
    function qx(t, e) {
        const n = e.maxPadding;
        function i(r) {
            const s = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            return r.forEach((o)=>{
                s[o] = Math.max(e[o], n[o]);
            }), s;
        }
        return i(t ? [
            "left",
            "right"
        ] : [
            "top",
            "bottom"
        ]);
    }
    function zi(t, e, n, i) {
        const r = [];
        let s, o, l, a, u, c;
        for(s = 0, o = t.length, u = 0; s < o; ++s){
            l = t[s], a = l.box, a.update(l.width || e.w, l.height || e.h, qx(l.horizontal, e));
            const { same: d, other: f } = Zx(e, n, l, i);
            u |= d && r.length, c = c || f, a.fullSize || r.push(l);
        }
        return u && zi(r, e, n, i) || c;
    }
    function Zr(t, e, n, i, r) {
        t.top = n, t.left = e, t.right = e + i, t.bottom = n + r, t.width = i, t.height = r;
    }
    function pd(t, e, n, i) {
        const r = n.padding;
        let { x: s, y: o } = e;
        for (const l of t){
            const a = l.box, u = i[l.stack] || {
                placed: 0,
                weight: 1
            }, c = l.stackWeight / u.weight || 1;
            if (l.horizontal) {
                const d = e.w * c, f = u.size || a.height;
                Ys(u.start) && (o = u.start), a.fullSize ? Zr(a, r.left, o, n.outerWidth - r.right - r.left, f) : Zr(a, e.left + u.placed, o, d, f), u.start = o, u.placed += d, o = a.bottom;
            } else {
                const d = e.h * c, f = u.size || a.width;
                Ys(u.start) && (s = u.start), a.fullSize ? Zr(a, s, r.top, f, n.outerHeight - r.bottom - r.top) : Zr(a, s, e.top + u.placed, f, d), u.start = s, u.placed += d, s = a.right;
            }
        }
        e.x = s, e.y = o;
    }
    var Qe = {
        addBox (t, e) {
            t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
                return [
                    {
                        z: 0,
                        draw (n) {
                            e.draw(n);
                        }
                    }
                ];
            }, t.boxes.push(e);
        },
        removeBox (t, e) {
            const n = t.boxes ? t.boxes.indexOf(e) : -1;
            n !== -1 && t.boxes.splice(n, 1);
        },
        configure (t, e, n) {
            e.fullSize = n.fullSize, e.position = n.position, e.weight = n.weight;
        },
        update (t, e, n, i) {
            if (!t) return;
            const r = qe(t.options.layout.padding), s = Math.max(e - r.width, 0), o = Math.max(n - r.height, 0), l = Gx(t.boxes), a = l.vertical, u = l.horizontal;
            B(t.boxes, (v)=>{
                typeof v.beforeLayout == "function" && v.beforeLayout();
            });
            const c = a.reduce((v, _)=>_.box.options && _.box.options.display === !1 ? v : v + 1, 0) || 1, d = Object.freeze({
                outerWidth: e,
                outerHeight: n,
                padding: r,
                availableWidth: s,
                availableHeight: o,
                vBoxMaxWidth: s / 2 / c,
                hBoxMaxHeight: o / 2
            }), f = Object.assign({}, r);
            Wp(f, qe(i));
            const p = Object.assign({
                maxPadding: f,
                w: s,
                h: o,
                x: r.left,
                y: r.top
            }, r), y = Kx(a.concat(u), d);
            zi(l.fullSize, p, d, y), zi(a, p, d, y), zi(u, p, d, y) && zi(a, p, d, y), Jx(p), pd(l.leftAndTop, p, d, y), p.x += p.w, p.y += p.h, pd(l.rightAndBottom, p, d, y), t.chartArea = {
                left: p.left,
                top: p.top,
                right: p.left + p.w,
                bottom: p.top + p.h,
                height: p.h,
                width: p.w
            }, B(l.chartArea, (v)=>{
                const _ = v.box;
                Object.assign(_, t.chartArea), _.update(p.w, p.h, {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                });
            });
        }
    };
    class Vp {
        acquireContext(e, n) {}
        releaseContext(e) {
            return !1;
        }
        addEventListener(e, n, i) {}
        removeEventListener(e, n, i) {}
        getDevicePixelRatio() {
            return 1;
        }
        getMaximumSize(e, n, i, r) {
            return n = Math.max(0, n || e.width), i = i || e.height, {
                width: n,
                height: Math.max(0, r ? Math.floor(n / r) : i)
            };
        }
        isAttached(e) {
            return !0;
        }
        updateConfig(e) {}
    }
    class e_ extends Vp {
        acquireContext(e) {
            return e && e.getContext && e.getContext("2d") || null;
        }
        updateConfig(e) {
            e.options.animation = !1;
        }
    }
    const ms = "$chartjs", t_ = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    }, gd = (t)=>t === null || t === "";
    function n_(t, e) {
        const n = t.style, i = t.getAttribute("height"), r = t.getAttribute("width");
        if (t[ms] = {
            initial: {
                height: i,
                width: r,
                style: {
                    display: n.display,
                    height: n.height,
                    width: n.width
                }
            }
        }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", gd(r)) {
            const s = td(t, "width");
            s !== void 0 && (t.width = s);
        }
        if (gd(i)) if (t.style.height === "") t.height = t.width / (e || 2);
        else {
            const s = td(t, "height");
            s !== void 0 && (t.height = s);
        }
        return t;
    }
    const Up = cx ? {
        passive: !0
    } : !1;
    function i_(t, e, n) {
        t && t.addEventListener(e, n, Up);
    }
    function r_(t, e, n) {
        t && t.canvas && t.canvas.removeEventListener(e, n, Up);
    }
    function s_(t, e) {
        const n = t_[t.type] || t.type, { x: i, y: r } = cn(t, e);
        return {
            type: n,
            chart: e,
            native: t,
            x: i !== void 0 ? i : null,
            y: r !== void 0 ? r : null
        };
    }
    function Ks(t, e) {
        for (const n of t)if (n === e || n.contains(e)) return !0;
    }
    function o_(t, e, n) {
        const i = t.canvas, r = new MutationObserver((s)=>{
            let o = !1;
            for (const l of s)o = o || Ks(l.addedNodes, i), o = o && !Ks(l.removedNodes, i);
            o && n();
        });
        return r.observe(document, {
            childList: !0,
            subtree: !0
        }), r;
    }
    function l_(t, e, n) {
        const i = t.canvas, r = new MutationObserver((s)=>{
            let o = !1;
            for (const l of s)o = o || Ks(l.removedNodes, i), o = o && !Ks(l.addedNodes, i);
            o && n();
        });
        return r.observe(document, {
            childList: !0,
            subtree: !0
        }), r;
    }
    const xr = new Map;
    let md = 0;
    function $p() {
        const t = window.devicePixelRatio;
        t !== md && (md = t, xr.forEach((e, n)=>{
            n.currentDevicePixelRatio !== t && e();
        }));
    }
    function a_(t, e) {
        xr.size || window.addEventListener("resize", $p), xr.set(t, e);
    }
    function u_(t) {
        xr.delete(t), xr.size || window.removeEventListener("resize", $p);
    }
    function c_(t, e, n) {
        const i = t.canvas, r = i && pu(i);
        if (!r) return;
        const s = bp((l, a)=>{
            const u = r.clientWidth;
            n(l, a), u < r.clientWidth && n();
        }, window), o = new ResizeObserver((l)=>{
            const a = l[0], u = a.contentRect.width, c = a.contentRect.height;
            u === 0 && c === 0 || s(u, c);
        });
        return o.observe(r), a_(t, s), o;
    }
    function rl(t, e, n) {
        n && n.disconnect(), e === "resize" && u_(t);
    }
    function d_(t, e, n) {
        const i = t.canvas, r = bp((s)=>{
            t.ctx !== null && n(s_(s, t));
        }, t);
        return i_(i, e, r), r;
    }
    class f_ extends Vp {
        acquireContext(e, n) {
            const i = e && e.getContext && e.getContext("2d");
            return i && i.canvas === e ? (n_(e, n), i) : null;
        }
        releaseContext(e) {
            const n = e.canvas;
            if (!n[ms]) return !1;
            const i = n[ms].initial;
            [
                "height",
                "width"
            ].forEach((s)=>{
                const o = i[s];
                V(o) ? n.removeAttribute(s) : n.setAttribute(s, o);
            });
            const r = i.style || {};
            return Object.keys(r).forEach((s)=>{
                n.style[s] = r[s];
            }), n.width = n.width, delete n[ms], !0;
        }
        addEventListener(e, n, i) {
            this.removeEventListener(e, n);
            const r = e.$proxies || (e.$proxies = {}), o = {
                attach: o_,
                detach: l_,
                resize: c_
            }[n] || d_;
            r[n] = o(e, n, i);
        }
        removeEventListener(e, n) {
            const i = e.$proxies || (e.$proxies = {}), r = i[n];
            if (!r) return;
            ({
                attach: rl,
                detach: rl,
                resize: rl
            }[n] || r_)(e, n, r), i[n] = void 0;
        }
        getDevicePixelRatio() {
            return window.devicePixelRatio;
        }
        getMaximumSize(e, n, i, r) {
            return ux(e, n, i, r);
        }
        isAttached(e) {
            const n = e && pu(e);
            return !!(n && n.isConnected);
        }
    }
    function h_(t) {
        return !hu() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? e_ : f_;
    }
    class Tn {
        static defaults = {};
        static defaultRoutes = void 0;
        x;
        y;
        active = !1;
        options;
        $animations;
        tooltipPosition(e) {
            const { x: n, y: i } = this.getProps([
                "x",
                "y"
            ], e);
            return {
                x: n,
                y: i
            };
        }
        hasValue() {
            return ai(this.x) && ai(this.y);
        }
        getProps(e, n) {
            const i = this.$animations;
            if (!n || !i) return this;
            const r = {};
            return e.forEach((s)=>{
                r[s] = i[s] && i[s].active() ? i[s]._to : this[s];
            }), r;
        }
    }
    function p_(t, e) {
        const n = t.options.ticks, i = g_(t), r = Math.min(n.maxTicksLimit || i, i), s = n.major.enabled ? y_(e) : [], o = s.length, l = s[0], a = s[o - 1], u = [];
        if (o > r) return v_(e, u, s, o / r), u;
        const c = m_(s, e, r);
        if (o > 0) {
            let d, f;
            const p = o > 1 ? Math.round((a - l) / (o - 1)) : null;
            for(Jr(e, u, c, V(p) ? 0 : l - p, l), d = 0, f = o - 1; d < f; d++)Jr(e, u, c, s[d], s[d + 1]);
            return Jr(e, u, c, a, V(p) ? e.length : a + p), u;
        }
        return Jr(e, u, c), u;
    }
    function g_(t) {
        const e = t.options.offset, n = t._tickSize(), i = t._length / n + (e ? 0 : 1), r = t._maxLength / n;
        return Math.floor(Math.min(i, r));
    }
    function m_(t, e, n) {
        const i = x_(t), r = e.length / n;
        if (!i) return Math.max(r, 1);
        const s = l0(i);
        for(let o = 0, l = s.length - 1; o < l; o++){
            const a = s[o];
            if (a > r) return a;
        }
        return Math.max(r, 1);
    }
    function y_(t) {
        const e = [];
        let n, i;
        for(n = 0, i = t.length; n < i; n++)t[n].major && e.push(n);
        return e;
    }
    function v_(t, e, n, i) {
        let r = 0, s = n[0], o;
        for(i = Math.ceil(i), o = 0; o < t.length; o++)o === s && (e.push(t[o]), r++, s = n[r * i]);
    }
    function Jr(t, e, n, i, r) {
        const s = I(i, 0), o = Math.min(I(r, t.length), t.length);
        let l = 0, a, u, c;
        for(n = Math.ceil(n), r && (a = r - i, n = a / Math.floor(a / n)), c = s; c < 0;)l++, c = Math.round(s + l * n);
        for(u = Math.max(s, 0); u < o; u++)u === c && (e.push(t[u]), l++, c = Math.round(s + l * n));
    }
    function x_(t) {
        const e = t.length;
        let n, i;
        if (e < 2) return !1;
        for(i = t[0], n = 1; n < e; ++n)if (t[n] - t[n - 1] !== i) return !1;
        return i;
    }
    const __ = (t)=>t === "left" ? "right" : t === "right" ? "left" : t, yd = (t, e, n)=>e === "top" || e === "left" ? t[e] + n : t[e] - n, vd = (t, e)=>Math.min(e || t, t);
    function xd(t, e) {
        const n = [], i = t.length / e, r = t.length;
        let s = 0;
        for(; s < r; s += i)n.push(t[Math.floor(s)]);
        return n;
    }
    function S_(t, e, n) {
        const i = t.ticks.length, r = Math.min(e, i - 1), s = t._startPixel, o = t._endPixel, l = 1e-6;
        let a = t.getPixelForTick(r), u;
        if (!(n && (i === 1 ? u = Math.max(a - s, o - a) : e === 0 ? u = (t.getPixelForTick(1) - a) / 2 : u = (a - t.getPixelForTick(r - 1)) / 2, a += r < e ? u : -u, a < s - l || a > o + l))) return a;
    }
    function w_(t, e) {
        B(t, (n)=>{
            const i = n.gc, r = i.length / 2;
            let s;
            if (r > e) {
                for(s = 0; s < r; ++s)delete n.data[i[s]];
                i.splice(0, r);
            }
        });
    }
    function Ei(t) {
        return t.drawTicks ? t.tickLength : 0;
    }
    function _d(t, e) {
        if (!t.display) return 0;
        const n = we(t.font, e), i = qe(t.padding);
        return (ce(t.text) ? t.text.length : 1) * n.lineHeight + i.height;
    }
    function k_(t, e) {
        return Dn(t, {
            scale: e,
            type: "scale"
        });
    }
    function b_(t, e, n) {
        return Dn(t, {
            tick: n,
            index: e,
            type: "tick"
        });
    }
    function C_(t, e, n) {
        let i = ou(t);
        return (n && e !== "right" || !n && e === "right") && (i = __(i)), i;
    }
    function M_(t, e, n, i) {
        const { top: r, left: s, bottom: o, right: l, chart: a } = t, { chartArea: u, scales: c } = a;
        let d = 0, f, p, y;
        const v = o - r, _ = l - s;
        if (t.isHorizontal()) {
            if (p = _e(i, s, l), F(n)) {
                const m = Object.keys(n)[0], h = n[m];
                y = c[m].getPixelForValue(h) + v - e;
            } else n === "center" ? y = (u.bottom + u.top) / 2 + v - e : y = yd(t, n, e);
            f = l - s;
        } else {
            if (F(n)) {
                const m = Object.keys(n)[0], h = n[m];
                p = c[m].getPixelForValue(h) - _ + e;
            } else n === "center" ? p = (u.left + u.right) / 2 - _ + e : p = yd(t, n, e);
            y = _e(i, o, r), d = n === "left" ? -rt : rt;
        }
        return {
            titleX: p,
            titleY: y,
            maxWidth: f,
            rotation: d
        };
    }
    class gi extends Tn {
        constructor(e){
            super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
        }
        init(e) {
            this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
        }
        parse(e, n) {
            return e;
        }
        getUserBounds() {
            let { _userMin: e, _userMax: n, _suggestedMin: i, _suggestedMax: r } = this;
            return e = ct(e, Number.POSITIVE_INFINITY), n = ct(n, Number.NEGATIVE_INFINITY), i = ct(i, Number.POSITIVE_INFINITY), r = ct(r, Number.NEGATIVE_INFINITY), {
                min: ct(e, i),
                max: ct(n, r),
                minDefined: Je(e),
                maxDefined: Je(n)
            };
        }
        getMinMax(e) {
            let { min: n, max: i, minDefined: r, maxDefined: s } = this.getUserBounds(), o;
            if (r && s) return {
                min: n,
                max: i
            };
            const l = this.getMatchingVisibleMetas();
            for(let a = 0, u = l.length; a < u; ++a)o = l[a].controller.getMinMax(this, e), r || (n = Math.min(n, o.min)), s || (i = Math.max(i, o.max));
            return n = s && n > i ? i : n, i = r && n > i ? n : i, {
                min: ct(n, ct(i, n)),
                max: ct(i, ct(n, i))
            };
        }
        getPadding() {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            };
        }
        getTicks() {
            return this.ticks;
        }
        getLabels() {
            const e = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
        }
        getLabelItems(e = this.chart.chartArea) {
            return this._labelItems || (this._labelItems = this._computeLabelItems(e));
        }
        beforeLayout() {
            this._cache = {}, this._dataLimitsCached = !1;
        }
        beforeUpdate() {
            Q(this.options.beforeUpdate, [
                this
            ]);
        }
        update(e, n, i) {
            const { beginAtZero: r, grace: s, ticks: o } = this.options, l = o.sampleSize;
            this.beforeUpdate(), this.maxWidth = e, this.maxHeight = n, this._margins = i = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = H0(this, s, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
            const a = l < this.ticks.length;
            this._convertTicksToLabels(a ? xd(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = p_(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), a && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
        }
        configure() {
            let e = this.options.reverse, n, i;
            this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, e = !e), this._startPixel = n, this._endPixel = i, this._reversePixels = e, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
        }
        afterUpdate() {
            Q(this.options.afterUpdate, [
                this
            ]);
        }
        beforeSetDimensions() {
            Q(this.options.beforeSetDimensions, [
                this
            ]);
        }
        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
        }
        afterSetDimensions() {
            Q(this.options.afterSetDimensions, [
                this
            ]);
        }
        _callHooks(e) {
            this.chart.notifyPlugins(e, this.getContext()), Q(this.options[e], [
                this
            ]);
        }
        beforeDataLimits() {
            this._callHooks("beforeDataLimits");
        }
        determineDataLimits() {}
        afterDataLimits() {
            this._callHooks("afterDataLimits");
        }
        beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
        }
        buildTicks() {
            return [];
        }
        afterBuildTicks() {
            this._callHooks("afterBuildTicks");
        }
        beforeTickToLabelConversion() {
            Q(this.options.beforeTickToLabelConversion, [
                this
            ]);
        }
        generateTickLabels(e) {
            const n = this.options.ticks;
            let i, r, s;
            for(i = 0, r = e.length; i < r; i++)s = e[i], s.label = Q(n.callback, [
                s.value,
                i,
                e
            ], this);
        }
        afterTickToLabelConversion() {
            Q(this.options.afterTickToLabelConversion, [
                this
            ]);
        }
        beforeCalculateLabelRotation() {
            Q(this.options.beforeCalculateLabelRotation, [
                this
            ]);
        }
        calculateLabelRotation() {
            const e = this.options, n = e.ticks, i = vd(this.ticks.length, e.ticks.maxTicksLimit), r = n.minRotation || 0, s = n.maxRotation;
            let o = r, l, a, u;
            if (!this._isVisible() || !n.display || r >= s || i <= 1 || !this.isHorizontal()) {
                this.labelRotation = r;
                return;
            }
            const c = this._getLabelSizes(), d = c.widest.width, f = c.highest.height, p = Xe(this.chart.width - d, 0, this.maxWidth);
            l = e.offset ? this.maxWidth / i : p / (i - 1), d + 6 > l && (l = p / (i - (e.offset ? .5 : 1)), a = this.maxHeight - Ei(e.grid) - n.padding - _d(e.title, this.chart.options.font), u = Math.sqrt(d * d + f * f), o = d0(Math.min(Math.asin(Xe((c.highest.height + 6) / l, -1, 1)), Math.asin(Xe(a / u, -1, 1)) - Math.asin(Xe(f / u, -1, 1)))), o = Math.max(r, Math.min(s, o))), this.labelRotation = o;
        }
        afterCalculateLabelRotation() {
            Q(this.options.afterCalculateLabelRotation, [
                this
            ]);
        }
        afterAutoSkip() {}
        beforeFit() {
            Q(this.options.beforeFit, [
                this
            ]);
        }
        fit() {
            const e = {
                width: 0,
                height: 0
            }, { chart: n, options: { ticks: i, title: r, grid: s } } = this, o = this._isVisible(), l = this.isHorizontal();
            if (o) {
                const a = _d(r, n.options.font);
                if (l ? (e.width = this.maxWidth, e.height = Ei(s) + a) : (e.height = this.maxHeight, e.width = Ei(s) + a), i.display && this.ticks.length) {
                    const { first: u, last: c, widest: d, highest: f } = this._getLabelSizes(), p = i.padding * 2, y = mn(this.labelRotation), v = Math.cos(y), _ = Math.sin(y);
                    if (l) {
                        const m = i.mirror ? 0 : _ * d.width + v * f.height;
                        e.height = Math.min(this.maxHeight, e.height + m + p);
                    } else {
                        const m = i.mirror ? 0 : v * d.width + _ * f.height;
                        e.width = Math.min(this.maxWidth, e.width + m + p);
                    }
                    this._calculatePadding(u, c, _, v);
                }
            }
            this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
        }
        _calculatePadding(e, n, i, r) {
            const { ticks: { align: s, padding: o }, position: l } = this.options, a = this.labelRotation !== 0, u = l !== "top" && this.axis === "x";
            if (this.isHorizontal()) {
                const c = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
                let f = 0, p = 0;
                a ? u ? (f = r * e.width, p = i * n.height) : (f = i * e.height, p = r * n.width) : s === "start" ? p = n.width : s === "end" ? f = e.width : s !== "inner" && (f = e.width / 2, p = n.width / 2), this.paddingLeft = Math.max((f - c + o) * this.width / (this.width - c), 0), this.paddingRight = Math.max((p - d + o) * this.width / (this.width - d), 0);
            } else {
                let c = n.height / 2, d = e.height / 2;
                s === "start" ? (c = 0, d = e.height) : s === "end" && (c = n.height, d = 0), this.paddingTop = c + o, this.paddingBottom = d + o;
            }
        }
        _handleMargins() {
            this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
        }
        afterFit() {
            Q(this.options.afterFit, [
                this
            ]);
        }
        isHorizontal() {
            const { axis: e, position: n } = this.options;
            return n === "top" || n === "bottom" || e === "x";
        }
        isFullSize() {
            return this.options.fullSize;
        }
        _convertTicksToLabels(e) {
            this.beforeTickToLabelConversion(), this.generateTickLabels(e);
            let n, i;
            for(n = 0, i = e.length; n < i; n++)V(e[n].label) && (e.splice(n, 1), i--, n--);
            this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
            let e = this._labelSizes;
            if (!e) {
                const n = this.options.ticks.sampleSize;
                let i = this.ticks;
                n < i.length && (i = xd(i, n)), this._labelSizes = e = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
            }
            return e;
        }
        _computeLabelSizes(e, n, i) {
            const { ctx: r, _longestTextCache: s } = this, o = [], l = [], a = Math.floor(n / vd(n, i));
            let u = 0, c = 0, d, f, p, y, v, _, m, h, x, S, w;
            for(d = 0; d < n; d += a){
                if (y = e[d].label, v = this._resolveTickFontOptions(d), r.font = _ = v.string, m = s[_] = s[_] || {
                    data: {},
                    gc: []
                }, h = v.lineHeight, x = S = 0, !V(y) && !ce(y)) x = Gc(r, m.data, m.gc, x, y), S = h;
                else if (ce(y)) for(f = 0, p = y.length; f < p; ++f)w = y[f], !V(w) && !ce(w) && (x = Gc(r, m.data, m.gc, x, w), S += h);
                o.push(x), l.push(S), u = Math.max(x, u), c = Math.max(S, c);
            }
            w_(s, n);
            const C = o.indexOf(u), k = l.indexOf(c), b = (E)=>({
                    width: o[E] || 0,
                    height: l[E] || 0
                });
            return {
                first: b(0),
                last: b(n - 1),
                widest: b(C),
                highest: b(k),
                widths: o,
                heights: l
            };
        }
        getLabelForValue(e) {
            return e;
        }
        getPixelForValue(e, n) {
            return NaN;
        }
        getValueForPixel(e) {}
        getPixelForTick(e) {
            const n = this.ticks;
            return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
        }
        getPixelForDecimal(e) {
            this._reversePixels && (e = 1 - e);
            const n = this._startPixel + e * this._length;
            return p0(this._alignToPixels ? on(this.chart, n, 0) : n);
        }
        getDecimalForPixel(e) {
            const n = (e - this._startPixel) / this._length;
            return this._reversePixels ? 1 - n : n;
        }
        getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
            const { min: e, max: n } = this;
            return e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0;
        }
        getContext(e) {
            const n = this.ticks || [];
            if (e >= 0 && e < n.length) {
                const i = n[e];
                return i.$context || (i.$context = b_(this.getContext(), e, i));
            }
            return this.$context || (this.$context = k_(this.chart.getContext(), this));
        }
        _tickSize() {
            const e = this.options.ticks, n = mn(this.labelRotation), i = Math.abs(Math.cos(n)), r = Math.abs(Math.sin(n)), s = this._getLabelSizes(), o = e.autoSkipPadding || 0, l = s ? s.widest.width + o : 0, a = s ? s.highest.height + o : 0;
            return this.isHorizontal() ? a * i > l * r ? l / i : a / r : a * r < l * i ? a / i : l / r;
        }
        _isVisible() {
            const e = this.options.display;
            return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(e) {
            const n = this.axis, i = this.chart, r = this.options, { grid: s, position: o, border: l } = r, a = s.offset, u = this.isHorizontal(), d = this.ticks.length + (a ? 1 : 0), f = Ei(s), p = [], y = l.setContext(this.getContext()), v = y.display ? y.width : 0, _ = v / 2, m = function(ie) {
                return on(i, ie, v);
            };
            let h, x, S, w, C, k, b, E, P, j, L, W;
            if (o === "top") h = m(this.bottom), k = this.bottom - f, E = h - _, j = m(e.top) + _, W = e.bottom;
            else if (o === "bottom") h = m(this.top), j = e.top, W = m(e.bottom) - _, k = h + _, E = this.top + f;
            else if (o === "left") h = m(this.right), C = this.right - f, b = h - _, P = m(e.left) + _, L = e.right;
            else if (o === "right") h = m(this.left), P = e.left, L = m(e.right) - _, C = h + _, b = this.left + f;
            else if (n === "x") {
                if (o === "center") h = m((e.top + e.bottom) / 2 + .5);
                else if (F(o)) {
                    const ie = Object.keys(o)[0], ye = o[ie];
                    h = m(this.chart.scales[ie].getPixelForValue(ye));
                }
                j = e.top, W = e.bottom, k = h + _, E = k + f;
            } else if (n === "y") {
                if (o === "center") h = m((e.left + e.right) / 2);
                else if (F(o)) {
                    const ie = Object.keys(o)[0], ye = o[ie];
                    h = m(this.chart.scales[ie].getPixelForValue(ye));
                }
                C = h - _, b = C - f, P = e.left, L = e.right;
            }
            const he = I(r.ticks.maxTicksLimit, d), Z = Math.max(1, Math.ceil(d / he));
            for(x = 0; x < d; x += Z){
                const ie = this.getContext(x), ye = s.setContext(ie), D = l.setContext(ie), O = ye.lineWidth, R = ye.color, U = D.dash || [], Y = D.dashOffset, at = ye.tickWidth, be = ye.tickColor, vt = ye.tickBorderDash || [], Ce = ye.tickBorderDashOffset;
                S = S_(this, x, a), S !== void 0 && (w = on(i, S, O), u ? C = b = P = L = w : k = E = j = W = w, p.push({
                    tx1: C,
                    ty1: k,
                    tx2: b,
                    ty2: E,
                    x1: P,
                    y1: j,
                    x2: L,
                    y2: W,
                    width: O,
                    color: R,
                    borderDash: U,
                    borderDashOffset: Y,
                    tickWidth: at,
                    tickColor: be,
                    tickBorderDash: vt,
                    tickBorderDashOffset: Ce
                }));
            }
            return this._ticksLength = d, this._borderValue = h, p;
        }
        _computeLabelItems(e) {
            const n = this.axis, i = this.options, { position: r, ticks: s } = i, o = this.isHorizontal(), l = this.ticks, { align: a, crossAlign: u, padding: c, mirror: d } = s, f = Ei(i.grid), p = f + c, y = d ? -c : p, v = -mn(this.labelRotation), _ = [];
            let m, h, x, S, w, C, k, b, E, P, j, L, W = "middle";
            if (r === "top") C = this.bottom - y, k = this._getXAxisLabelAlignment();
            else if (r === "bottom") C = this.top + y, k = this._getXAxisLabelAlignment();
            else if (r === "left") {
                const Z = this._getYAxisLabelAlignment(f);
                k = Z.textAlign, w = Z.x;
            } else if (r === "right") {
                const Z = this._getYAxisLabelAlignment(f);
                k = Z.textAlign, w = Z.x;
            } else if (n === "x") {
                if (r === "center") C = (e.top + e.bottom) / 2 + p;
                else if (F(r)) {
                    const Z = Object.keys(r)[0], ie = r[Z];
                    C = this.chart.scales[Z].getPixelForValue(ie) + p;
                }
                k = this._getXAxisLabelAlignment();
            } else if (n === "y") {
                if (r === "center") w = (e.left + e.right) / 2 - p;
                else if (F(r)) {
                    const Z = Object.keys(r)[0], ie = r[Z];
                    w = this.chart.scales[Z].getPixelForValue(ie);
                }
                k = this._getYAxisLabelAlignment(f).textAlign;
            }
            n === "y" && (a === "start" ? W = "top" : a === "end" && (W = "bottom"));
            const he = this._getLabelSizes();
            for(m = 0, h = l.length; m < h; ++m){
                x = l[m], S = x.label;
                const Z = s.setContext(this.getContext(m));
                b = this.getPixelForTick(m) + s.labelOffset, E = this._resolveTickFontOptions(m), P = E.lineHeight, j = ce(S) ? S.length : 1;
                const ie = j / 2, ye = Z.color, D = Z.textStrokeColor, O = Z.textStrokeWidth;
                let R = k;
                o ? (w = b, k === "inner" && (m === h - 1 ? R = this.options.reverse ? "left" : "right" : m === 0 ? R = this.options.reverse ? "right" : "left" : R = "center"), r === "top" ? u === "near" || v !== 0 ? L = -j * P + P / 2 : u === "center" ? L = -he.highest.height / 2 - ie * P + P : L = -he.highest.height + P / 2 : u === "near" || v !== 0 ? L = P / 2 : u === "center" ? L = he.highest.height / 2 - ie * P : L = he.highest.height - j * P, d && (L *= -1), v !== 0 && !Z.showLabelBackdrop && (w += P / 2 * Math.sin(v))) : (C = b, L = (1 - j) * P / 2);
                let U;
                if (Z.showLabelBackdrop) {
                    const Y = qe(Z.backdropPadding), at = he.heights[m], be = he.widths[m];
                    let vt = L - Y.top, Ce = 0 - Y.left;
                    switch(W){
                        case "middle":
                            vt -= at / 2;
                            break;
                        case "bottom":
                            vt -= at;
                            break;
                    }
                    switch(k){
                        case "center":
                            Ce -= be / 2;
                            break;
                        case "right":
                            Ce -= be;
                            break;
                        case "inner":
                            m === h - 1 ? Ce -= be : m > 0 && (Ce -= be / 2);
                            break;
                    }
                    U = {
                        left: Ce,
                        top: vt,
                        width: be + Y.width,
                        height: at + Y.height,
                        color: Z.backdropColor
                    };
                }
                _.push({
                    label: S,
                    font: E,
                    textOffset: L,
                    options: {
                        rotation: v,
                        color: ye,
                        strokeColor: D,
                        strokeWidth: O,
                        textAlign: R,
                        textBaseline: W,
                        translation: [
                            w,
                            C
                        ],
                        backdrop: U
                    }
                });
            }
            return _;
        }
        _getXAxisLabelAlignment() {
            const { position: e, ticks: n } = this.options;
            if (-mn(this.labelRotation)) return e === "top" ? "left" : "right";
            let r = "center";
            return n.align === "start" ? r = "left" : n.align === "end" ? r = "right" : n.align === "inner" && (r = "inner"), r;
        }
        _getYAxisLabelAlignment(e) {
            const { position: n, ticks: { crossAlign: i, mirror: r, padding: s } } = this.options, o = this._getLabelSizes(), l = e + s, a = o.widest.width;
            let u, c;
            return n === "left" ? r ? (c = this.right + s, i === "near" ? u = "left" : i === "center" ? (u = "center", c += a / 2) : (u = "right", c += a)) : (c = this.right - l, i === "near" ? u = "right" : i === "center" ? (u = "center", c -= a / 2) : (u = "left", c = this.left)) : n === "right" ? r ? (c = this.left + s, i === "near" ? u = "right" : i === "center" ? (u = "center", c -= a / 2) : (u = "left", c -= a)) : (c = this.left + l, i === "near" ? u = "left" : i === "center" ? (u = "center", c += a / 2) : (u = "right", c = this.right)) : u = "right", {
                textAlign: u,
                x: c
            };
        }
        _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            const e = this.chart, n = this.options.position;
            if (n === "left" || n === "right") return {
                top: 0,
                left: this.left,
                bottom: e.height,
                right: this.right
            };
            if (n === "top" || n === "bottom") return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: e.width
            };
        }
        drawBackground() {
            const { ctx: e, options: { backgroundColor: n }, left: i, top: r, width: s, height: o } = this;
            n && (e.save(), e.fillStyle = n, e.fillRect(i, r, s, o), e.restore());
        }
        getLineWidthForValue(e) {
            const n = this.options.grid;
            if (!this._isVisible() || !n.display) return 0;
            const r = this.ticks.findIndex((s)=>s.value === e);
            return r >= 0 ? n.setContext(this.getContext(r)).lineWidth : 0;
        }
        drawGrid(e) {
            const n = this.options.grid, i = this.ctx, r = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
            let s, o;
            const l = (a, u, c)=>{
                !c.width || !c.color || (i.save(), i.lineWidth = c.width, i.strokeStyle = c.color, i.setLineDash(c.borderDash || []), i.lineDashOffset = c.borderDashOffset, i.beginPath(), i.moveTo(a.x, a.y), i.lineTo(u.x, u.y), i.stroke(), i.restore());
            };
            if (n.display) for(s = 0, o = r.length; s < o; ++s){
                const a = r[s];
                n.drawOnChartArea && l({
                    x: a.x1,
                    y: a.y1
                }, {
                    x: a.x2,
                    y: a.y2
                }, a), n.drawTicks && l({
                    x: a.tx1,
                    y: a.ty1
                }, {
                    x: a.tx2,
                    y: a.ty2
                }, {
                    color: a.tickColor,
                    width: a.tickWidth,
                    borderDash: a.tickBorderDash,
                    borderDashOffset: a.tickBorderDashOffset
                });
            }
        }
        drawBorder() {
            const { chart: e, ctx: n, options: { border: i, grid: r } } = this, s = i.setContext(this.getContext()), o = i.display ? s.width : 0;
            if (!o) return;
            const l = r.setContext(this.getContext(0)).lineWidth, a = this._borderValue;
            let u, c, d, f;
            this.isHorizontal() ? (u = on(e, this.left, o) - o / 2, c = on(e, this.right, l) + l / 2, d = f = a) : (d = on(e, this.top, o) - o / 2, f = on(e, this.bottom, l) + l / 2, u = c = a), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(u, d), n.lineTo(c, f), n.stroke(), n.restore();
        }
        drawLabels(e) {
            if (!this.options.ticks.display) return;
            const i = this.ctx, r = this._computeLabelArea();
            r && au(i, r);
            const s = this.getLabelItems(e);
            for (const o of s){
                const l = o.options, a = o.font, u = o.label, c = o.textOffset;
                vr(i, u, 0, c, a, l);
            }
            r && uu(i);
        }
        drawTitle() {
            const { ctx: e, options: { position: n, title: i, reverse: r } } = this;
            if (!i.display) return;
            const s = we(i.font), o = qe(i.padding), l = i.align;
            let a = s.lineHeight / 2;
            n === "bottom" || n === "center" || F(n) ? (a += o.bottom, ce(i.text) && (a += s.lineHeight * (i.text.length - 1))) : a += o.top;
            const { titleX: u, titleY: c, maxWidth: d, rotation: f } = M_(this, a, n, l);
            vr(e, i.text, 0, 0, s, {
                color: i.color,
                maxWidth: d,
                rotation: f,
                textAlign: C_(l, n, r),
                textBaseline: "middle",
                translation: [
                    u,
                    c
                ]
            });
        }
        draw(e) {
            this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
        }
        _layers() {
            const e = this.options, n = e.ticks && e.ticks.z || 0, i = I(e.grid && e.grid.z, -1), r = I(e.border && e.border.z, 0);
            return !this._isVisible() || this.draw !== gi.prototype.draw ? [
                {
                    z: n,
                    draw: (s)=>{
                        this.draw(s);
                    }
                }
            ] : [
                {
                    z: i,
                    draw: (s)=>{
                        this.drawBackground(), this.drawGrid(s), this.drawTitle();
                    }
                },
                {
                    z: r,
                    draw: ()=>{
                        this.drawBorder();
                    }
                },
                {
                    z: n,
                    draw: (s)=>{
                        this.drawLabels(s);
                    }
                }
            ];
        }
        getMatchingVisibleMetas(e) {
            const n = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", r = [];
            let s, o;
            for(s = 0, o = n.length; s < o; ++s){
                const l = n[s];
                l[i] === this.id && (!e || l.type === e) && r.push(l);
            }
            return r;
        }
        _resolveTickFontOptions(e) {
            const n = this.options.ticks.setContext(this.getContext(e));
            return we(n.font);
        }
        _maxDigits() {
            const e = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / e;
        }
    }
    class qr {
        constructor(e, n, i){
            this.type = e, this.scope = n, this.override = i, this.items = Object.create(null);
        }
        isForType(e) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
        }
        register(e) {
            const n = Object.getPrototypeOf(e);
            let i;
            D_(n) && (i = this.register(n));
            const r = this.items, s = e.id, o = this.scope + "." + s;
            if (!s) throw new Error("class does not have id: " + e);
            return s in r || (r[s] = e, E_(e, o, i), this.override && se.override(e.id, e.overrides)), o;
        }
        get(e) {
            return this.items[e];
        }
        unregister(e) {
            const n = this.items, i = e.id, r = this.scope;
            i in n && delete n[i], r && i in se[r] && (delete se[r][i], this.override && delete Mn[i]);
        }
    }
    function E_(t, e, n) {
        const i = mr(Object.create(null), [
            n ? se.get(n) : {},
            se.get(e),
            t.defaults
        ]);
        se.set(e, i), t.defaultRoutes && P_(e, t.defaultRoutes), t.descriptors && se.describe(e, t.descriptors);
    }
    function P_(t, e) {
        Object.keys(e).forEach((n)=>{
            const i = n.split("."), r = i.pop(), s = [
                t
            ].concat(i).join("."), o = e[n].split("."), l = o.pop(), a = o.join(".");
            se.route(s, r, a, l);
        });
    }
    function D_(t) {
        return "id" in t && "defaults" in t;
    }
    class T_ {
        constructor(){
            this.controllers = new qr(gu, "datasets", !0), this.elements = new qr(Tn, "elements"), this.plugins = new qr(Object, "plugins"), this.scales = new qr(gi, "scales"), this._typedRegistries = [
                this.controllers,
                this.scales,
                this.elements
            ];
        }
        add(...e) {
            this._each("register", e);
        }
        remove(...e) {
            this._each("unregister", e);
        }
        addControllers(...e) {
            this._each("register", e, this.controllers);
        }
        addElements(...e) {
            this._each("register", e, this.elements);
        }
        addPlugins(...e) {
            this._each("register", e, this.plugins);
        }
        addScales(...e) {
            this._each("register", e, this.scales);
        }
        getController(e) {
            return this._get(e, this.controllers, "controller");
        }
        getElement(e) {
            return this._get(e, this.elements, "element");
        }
        getPlugin(e) {
            return this._get(e, this.plugins, "plugin");
        }
        getScale(e) {
            return this._get(e, this.scales, "scale");
        }
        removeControllers(...e) {
            this._each("unregister", e, this.controllers);
        }
        removeElements(...e) {
            this._each("unregister", e, this.elements);
        }
        removePlugins(...e) {
            this._each("unregister", e, this.plugins);
        }
        removeScales(...e) {
            this._each("unregister", e, this.scales);
        }
        _each(e, n, i) {
            [
                ...n
            ].forEach((r)=>{
                const s = i || this._getRegistryForType(r);
                i || s.isForType(r) || s === this.plugins && r.id ? this._exec(e, s, r) : B(r, (o)=>{
                    const l = i || this._getRegistryForType(o);
                    this._exec(e, l, o);
                });
            });
        }
        _exec(e, n, i) {
            const r = ru(e);
            Q(i["before" + r], [], i), n[e](i), Q(i["after" + r], [], i);
        }
        _getRegistryForType(e) {
            for(let n = 0; n < this._typedRegistries.length; n++){
                const i = this._typedRegistries[n];
                if (i.isForType(e)) return i;
            }
            return this.plugins;
        }
        _get(e, n, i) {
            const r = n.get(e);
            if (r === void 0) throw new Error('"' + e + '" is not a registered ' + i + ".");
            return r;
        }
    }
    var ht = new T_;
    class j_ {
        constructor(){
            this._init = void 0;
        }
        notify(e, n, i, r) {
            if (n === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0) return;
            const s = r ? this._descriptors(e).filter(r) : this._descriptors(e), o = this._notify(s, e, n, i);
            return n === "afterDestroy" && (this._notify(s, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), o;
        }
        _notify(e, n, i, r) {
            r = r || {};
            for (const s of e){
                const o = s.plugin, l = o[i], a = [
                    n,
                    r,
                    s.options
                ];
                if (Q(l, a, o) === !1 && r.cancelable) return !1;
            }
            return !0;
        }
        invalidate() {
            V(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
        }
        _descriptors(e) {
            if (this._cache) return this._cache;
            const n = this._cache = this._createDescriptors(e);
            return this._notifyStateChanges(e), n;
        }
        _createDescriptors(e, n) {
            const i = e && e.config, r = I(i.options && i.options.plugins, {}), s = O_(i);
            return r === !1 && !n ? [] : L_(e, s, r, n);
        }
        _notifyStateChanges(e) {
            const n = this._oldCache || [], i = this._cache, r = (s, o)=>s.filter((l)=>!o.some((a)=>l.plugin.id === a.plugin.id));
            this._notify(r(n, i), e, "stop"), this._notify(r(i, n), e, "start");
        }
    }
    function O_(t) {
        const e = {}, n = [], i = Object.keys(ht.plugins.items);
        for(let s = 0; s < i.length; s++)n.push(ht.getPlugin(i[s]));
        const r = t.plugins || [];
        for(let s = 0; s < r.length; s++){
            const o = r[s];
            n.indexOf(o) === -1 && (n.push(o), e[o.id] = !0);
        }
        return {
            plugins: n,
            localIds: e
        };
    }
    function R_(t, e) {
        return !e && t === !1 ? null : t === !0 ? {} : t;
    }
    function L_(t, { plugins: e, localIds: n }, i, r) {
        const s = [], o = t.getContext();
        for (const l of e){
            const a = l.id, u = R_(i[a], r);
            u !== null && s.push({
                plugin: l,
                options: z_(t.config, {
                    plugin: l,
                    local: n[a]
                }, u, o)
            });
        }
        return s;
    }
    function z_(t, { plugin: e, local: n }, i, r) {
        const s = t.pluginScopeKeys(e), o = t.getOptionScopes(i, s);
        return n && e.defaults && o.push(e.defaults), t.createResolver(o, r, [
            ""
        ], {
            scriptable: !1,
            indexable: !1,
            allKeys: !0
        });
    }
    function ia(t, e) {
        const n = se.datasets[t] || {};
        return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || n.indexAxis || "x";
    }
    function I_(t, e) {
        let n = t;
        return t === "_index_" ? n = e : t === "_value_" && (n = e === "x" ? "y" : "x"), n;
    }
    function N_(t, e) {
        return t === e ? "_index_" : "_value_";
    }
    function Sd(t) {
        if (t === "x" || t === "y" || t === "r") return t;
    }
    function F_(t) {
        if (t === "top" || t === "bottom") return "x";
        if (t === "left" || t === "right") return "y";
    }
    function ra(t, ...e) {
        if (Sd(t)) return t;
        for (const n of e){
            const i = n.axis || F_(n.position) || t.length > 1 && Sd(t[0].toLowerCase());
            if (i) return i;
        }
        throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
    }
    function wd(t, e, n) {
        if (n[e + "AxisID"] === t) return {
            axis: e
        };
    }
    function A_(t, e) {
        if (e.data && e.data.datasets) {
            const n = e.data.datasets.filter((i)=>i.xAxisID === t || i.yAxisID === t);
            if (n.length) return wd(t, "x", n[0]) || wd(t, "y", n[0]);
        }
        return {};
    }
    function B_(t, e) {
        const n = Mn[t.type] || {
            scales: {}
        }, i = e.scales || {}, r = ia(t.type, e), s = Object.create(null);
        return Object.keys(i).forEach((o)=>{
            const l = i[o];
            if (!F(l)) return console.error(`Invalid scale configuration for scale: ${o}`);
            if (l._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
            const a = ra(o, l, A_(o, t), se.scales[l.type]), u = N_(a, r), c = n.scales || {};
            s[o] = Yi(Object.create(null), [
                {
                    axis: a
                },
                l,
                c[a],
                c[u]
            ]);
        }), t.data.datasets.forEach((o)=>{
            const l = o.type || t.type, a = o.indexAxis || ia(l, e), c = (Mn[l] || {}).scales || {};
            Object.keys(c).forEach((d)=>{
                const f = I_(d, a), p = o[f + "AxisID"] || f;
                s[p] = s[p] || Object.create(null), Yi(s[p], [
                    {
                        axis: f
                    },
                    i[p],
                    c[d]
                ]);
            });
        }), Object.keys(s).forEach((o)=>{
            const l = s[o];
            Yi(l, [
                se.scales[l.type],
                se.scale
            ]);
        }), s;
    }
    function Yp(t) {
        const e = t.options || (t.options = {});
        e.plugins = I(e.plugins, {}), e.scales = B_(t, e);
    }
    function Xp(t) {
        return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
    }
    function H_(t) {
        return t = t || {}, t.data = Xp(t.data), Yp(t), t;
    }
    const kd = new Map, Qp = new Set;
    function es(t, e) {
        let n = kd.get(t);
        return n || (n = e(), kd.set(t, n), Qp.add(n)), n;
    }
    const Pi = (t, e, n)=>{
        const i = $s(e, n);
        i !== void 0 && t.add(i);
    };
    class W_ {
        constructor(e){
            this._config = H_(e), this._scopeCache = new Map, this._resolverCache = new Map;
        }
        get platform() {
            return this._config.platform;
        }
        get type() {
            return this._config.type;
        }
        set type(e) {
            this._config.type = e;
        }
        get data() {
            return this._config.data;
        }
        set data(e) {
            this._config.data = Xp(e);
        }
        get options() {
            return this._config.options;
        }
        set options(e) {
            this._config.options = e;
        }
        get plugins() {
            return this._config.plugins;
        }
        update() {
            const e = this._config;
            this.clearCache(), Yp(e);
        }
        clearCache() {
            this._scopeCache.clear(), this._resolverCache.clear();
        }
        datasetScopeKeys(e) {
            return es(e, ()=>[
                    [
                        `datasets.${e}`,
                        ""
                    ]
                ]);
        }
        datasetAnimationScopeKeys(e, n) {
            return es(`${e}.transition.${n}`, ()=>[
                    [
                        `datasets.${e}.transitions.${n}`,
                        `transitions.${n}`
                    ],
                    [
                        `datasets.${e}`,
                        ""
                    ]
                ]);
        }
        datasetElementScopeKeys(e, n) {
            return es(`${e}-${n}`, ()=>[
                    [
                        `datasets.${e}.elements.${n}`,
                        `datasets.${e}`,
                        `elements.${n}`,
                        ""
                    ]
                ]);
        }
        pluginScopeKeys(e) {
            const n = e.id, i = this.type;
            return es(`${i}-plugin-${n}`, ()=>[
                    [
                        `plugins.${n}`,
                        ...e.additionalOptionScopes || []
                    ]
                ]);
        }
        _cachedScopes(e, n) {
            const i = this._scopeCache;
            let r = i.get(e);
            return (!r || n) && (r = new Map, i.set(e, r)), r;
        }
        getOptionScopes(e, n, i) {
            const { options: r, type: s } = this, o = this._cachedScopes(e, i), l = o.get(n);
            if (l) return l;
            const a = new Set;
            n.forEach((c)=>{
                e && (a.add(e), c.forEach((d)=>Pi(a, e, d))), c.forEach((d)=>Pi(a, r, d)), c.forEach((d)=>Pi(a, Mn[s] || {}, d)), c.forEach((d)=>Pi(a, se, d)), c.forEach((d)=>Pi(a, ea, d));
            });
            const u = Array.from(a);
            return u.length === 0 && u.push(Object.create(null)), Qp.has(n) && o.set(n, u), u;
        }
        chartOptionScopes() {
            const { options: e, type: n } = this;
            return [
                e,
                Mn[n] || {},
                se.datasets[n] || {},
                {
                    type: n
                },
                se,
                ea
            ];
        }
        resolveNamedOptions(e, n, i, r = [
            ""
        ]) {
            const s = {
                $shared: !0
            }, { resolver: o, subPrefixes: l } = bd(this._resolverCache, e, r);
            let a = o;
            if (U_(o, n)) {
                s.$shared = !1, i = en(i) ? i() : i;
                const u = this.createResolver(e, i, l);
                a = ui(o, i, u);
            }
            for (const u of n)s[u] = a[u];
            return s;
        }
        createResolver(e, n, i = [
            ""
        ], r) {
            const { resolver: s } = bd(this._resolverCache, e, i);
            return F(n) ? ui(s, n, void 0, r) : s;
        }
    }
    function bd(t, e, n) {
        let i = t.get(e);
        i || (i = new Map, t.set(e, i));
        const r = n.join();
        let s = i.get(r);
        return s || (s = {
            resolver: cu(e, n),
            subPrefixes: n.filter((l)=>!l.toLowerCase().includes("hover"))
        }, i.set(r, s)), s;
    }
    const V_ = (t)=>F(t) && Object.getOwnPropertyNames(t).some((e)=>en(t[e]));
    function U_(t, e) {
        const { isScriptable: n, isIndexable: i } = jp(t);
        for (const r of e){
            const s = n(r), o = i(r), l = (o || s) && t[r];
            if (s && (en(l) || V_(l)) || o && ce(l)) return !0;
        }
        return !1;
    }
    var $_ = "4.5.1";
    const Y_ = [
        "top",
        "bottom",
        "left",
        "right",
        "chartArea"
    ];
    function Cd(t, e) {
        return t === "top" || t === "bottom" || Y_.indexOf(t) === -1 && e === "x";
    }
    function Md(t, e) {
        return function(n, i) {
            return n[t] === i[t] ? n[e] - i[e] : n[t] - i[t];
        };
    }
    function Ed(t) {
        const e = t.chart, n = e.options.animation;
        e.notifyPlugins("afterRender"), Q(n && n.onComplete, [
            t
        ], e);
    }
    function X_(t) {
        const e = t.chart, n = e.options.animation;
        Q(n && n.onProgress, [
            t
        ], e);
    }
    function Kp(t) {
        return hu() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
    }
    const ys = {}, Pd = (t)=>{
        const e = Kp(t);
        return Object.values(ys).filter((n)=>n.canvas === e).pop();
    };
    function Q_(t, e, n) {
        const i = Object.keys(t);
        for (const r of i){
            const s = +r;
            if (s >= e) {
                const o = t[r];
                delete t[r], (n > 0 || s > e) && (t[s + n] = o);
            }
        }
    }
    function K_(t, e, n, i) {
        return !n || t.type === "mouseout" ? null : i ? e : t;
    }
    let jn = class {
        static defaults = se;
        static instances = ys;
        static overrides = Mn;
        static registry = ht;
        static version = $_;
        static getChart = Pd;
        static register(...e) {
            ht.add(...e), Dd();
        }
        static unregister(...e) {
            ht.remove(...e), Dd();
        }
        constructor(e, n){
            const i = this.config = new W_(n), r = Kp(e), s = Pd(r);
            if (s) throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
            const o = i.createResolver(i.chartOptionScopes(), this.getContext());
            this.platform = new (i.platform || h_(r)), this.platform.updateConfig(i);
            const l = this.platform.acquireContext(r, o.aspectRatio), a = l && l.canvas, u = a && a.height, c = a && a.width;
            if (this.id = Jv(), this.ctx = l, this.canvas = a, this.width = c, this.height = u, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new j_, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = x0((d)=>this.update(d), o.resizeDelay || 0), this._dataChanges = [], ys[this.id] = this, !l || !a) {
                console.error("Failed to create chart: can't acquire context from the given item");
                return;
            }
            _t.listen(this, "complete", Ed), _t.listen(this, "progress", X_), this._initialize(), this.attached && this.update();
        }
        get aspectRatio() {
            const { options: { aspectRatio: e, maintainAspectRatio: n }, width: i, height: r, _aspectRatio: s } = this;
            return V(e) ? n && s ? s : r ? i / r : null : e;
        }
        get data() {
            return this.config.data;
        }
        set data(e) {
            this.config.data = e;
        }
        get options() {
            return this._options;
        }
        set options(e) {
            this.config.options = e;
        }
        get registry() {
            return ht;
        }
        _initialize() {
            return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ed(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
        }
        clear() {
            return Zc(this.canvas, this.ctx), this;
        }
        stop() {
            return _t.stop(this), this;
        }
        resize(e, n) {
            _t.running(this) ? this._resizeBeforeDraw = {
                width: e,
                height: n
            } : this._resize(e, n);
        }
        _resize(e, n) {
            const i = this.options, r = this.canvas, s = i.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(r, e, n, s), l = i.devicePixelRatio || this.platform.getDevicePixelRatio(), a = this.width ? "resize" : "attach";
            this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, ed(this, l, !0) && (this.notifyPlugins("resize", {
                size: o
            }), Q(i.onResize, [
                this,
                o
            ], this), this.attached && this._doResize(a) && this.render());
        }
        ensureScalesHaveIDs() {
            const n = this.options.scales || {};
            B(n, (i, r)=>{
                i.id = r;
            });
        }
        buildOrUpdateScales() {
            const e = this.options, n = e.scales, i = this.scales, r = Object.keys(i).reduce((o, l)=>(o[l] = !1, o), {});
            let s = [];
            n && (s = s.concat(Object.keys(n).map((o)=>{
                const l = n[o], a = ra(o, l), u = a === "r", c = a === "x";
                return {
                    options: l,
                    dposition: u ? "chartArea" : c ? "bottom" : "left",
                    dtype: u ? "radialLinear" : c ? "category" : "linear"
                };
            }))), B(s, (o)=>{
                const l = o.options, a = l.id, u = ra(a, l), c = I(l.type, o.dtype);
                (l.position === void 0 || Cd(l.position, u) !== Cd(o.dposition)) && (l.position = o.dposition), r[a] = !0;
                let d = null;
                if (a in i && i[a].type === c) d = i[a];
                else {
                    const f = ht.getScale(c);
                    d = new f({
                        id: a,
                        type: c,
                        ctx: this.ctx,
                        chart: this
                    }), i[d.id] = d;
                }
                d.init(l, e);
            }), B(r, (o, l)=>{
                o || delete i[l];
            }), B(i, (o)=>{
                Qe.configure(this, o, o.options), Qe.addBox(this, o);
            });
        }
        _updateMetasets() {
            const e = this._metasets, n = this.data.datasets.length, i = e.length;
            if (e.sort((r, s)=>r.index - s.index), i > n) {
                for(let r = n; r < i; ++r)this._destroyDatasetMeta(r);
                e.splice(n, i - n);
            }
            this._sortedMetasets = e.slice(0).sort(Md("order", "index"));
        }
        _removeUnreferencedMetasets() {
            const { _metasets: e, data: { datasets: n } } = this;
            e.length > n.length && delete this._stacks, e.forEach((i, r)=>{
                n.filter((s)=>s === i._dataset).length === 0 && this._destroyDatasetMeta(r);
            });
        }
        buildOrUpdateControllers() {
            const e = [], n = this.data.datasets;
            let i, r;
            for(this._removeUnreferencedMetasets(), i = 0, r = n.length; i < r; i++){
                const s = n[i];
                let o = this.getDatasetMeta(i);
                const l = s.type || this.config.type;
                if (o.type && o.type !== l && (this._destroyDatasetMeta(i), o = this.getDatasetMeta(i)), o.type = l, o.indexAxis = s.indexAxis || ia(l, this.options), o.order = s.order || 0, o.index = i, o.label = "" + s.label, o.visible = this.isDatasetVisible(i), o.controller) o.controller.updateIndex(i), o.controller.linkScales();
                else {
                    const a = ht.getController(l), { datasetElementType: u, dataElementType: c } = se.datasets[l];
                    Object.assign(a, {
                        dataElementType: ht.getElement(c),
                        datasetElementType: u && ht.getElement(u)
                    }), o.controller = new a(this, i), e.push(o.controller);
                }
            }
            return this._updateMetasets(), e;
        }
        _resetElements() {
            B(this.data.datasets, (e, n)=>{
                this.getDatasetMeta(n).controller.reset();
            }, this);
        }
        reset() {
            this._resetElements(), this.notifyPlugins("reset");
        }
        update(e) {
            const n = this.config;
            n.update();
            const i = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !i.animation;
            if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
                mode: e,
                cancelable: !0
            }) === !1) return;
            const s = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let o = 0;
            for(let u = 0, c = this.data.datasets.length; u < c; u++){
                const { controller: d } = this.getDatasetMeta(u), f = !r && s.indexOf(d) === -1;
                d.buildOrUpdateElements(f), o = Math.max(+d.getMaxOverflow(), o);
            }
            o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), r || B(s, (u)=>{
                u.reset();
            }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
                mode: e
            }), this._layers.sort(Md("z", "_idx"));
            const { _active: l, _lastEvent: a } = this;
            a ? this._eventHandler(a, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
        }
        _updateScales() {
            B(this.scales, (e)=>{
                Qe.removeBox(this, e);
            }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
        }
        _checkEventBindings() {
            const e = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(e.events);
            (!Hc(n, i) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
        }
        _updateHiddenIndices() {
            const { _hiddenIndices: e } = this, n = this._getUniformDataChanges() || [];
            for (const { method: i, start: r, count: s } of n){
                const o = i === "_removeElements" ? -s : s;
                Q_(e, r, o);
            }
        }
        _getUniformDataChanges() {
            const e = this._dataChanges;
            if (!e || !e.length) return;
            this._dataChanges = [];
            const n = this.data.datasets.length, i = (s)=>new Set(e.filter((o)=>o[0] === s).map((o, l)=>l + "," + o.splice(1).join(","))), r = i(0);
            for(let s = 1; s < n; s++)if (!Hc(r, i(s))) return;
            return Array.from(r).map((s)=>s.split(",")).map((s)=>({
                    method: s[1],
                    start: +s[2],
                    count: +s[3]
                }));
        }
        _updateLayout(e) {
            if (this.notifyPlugins("beforeLayout", {
                cancelable: !0
            }) === !1) return;
            Qe.update(this, this.width, this.height, e);
            const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
            this._layers = [], B(this.boxes, (r)=>{
                i && r.position === "chartArea" || (r.configure && r.configure(), this._layers.push(...r._layers()));
            }, this), this._layers.forEach((r, s)=>{
                r._idx = s;
            }), this.notifyPlugins("afterLayout");
        }
        _updateDatasets(e) {
            if (this.notifyPlugins("beforeDatasetsUpdate", {
                mode: e,
                cancelable: !0
            }) !== !1) {
                for(let n = 0, i = this.data.datasets.length; n < i; ++n)this.getDatasetMeta(n).controller.configure();
                for(let n = 0, i = this.data.datasets.length; n < i; ++n)this._updateDataset(n, en(e) ? e({
                    datasetIndex: n
                }) : e);
                this.notifyPlugins("afterDatasetsUpdate", {
                    mode: e
                });
            }
        }
        _updateDataset(e, n) {
            const i = this.getDatasetMeta(e), r = {
                meta: i,
                index: e,
                mode: n,
                cancelable: !0
            };
            this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (i.controller._update(n), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
        }
        render() {
            this.notifyPlugins("beforeRender", {
                cancelable: !0
            }) !== !1 && (_t.has(this) ? this.attached && !_t.running(this) && _t.start(this) : (this.draw(), Ed({
                chart: this
            })));
        }
        draw() {
            let e;
            if (this._resizeBeforeDraw) {
                const { width: i, height: r } = this._resizeBeforeDraw;
                this._resizeBeforeDraw = null, this._resize(i, r);
            }
            if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
                cancelable: !0
            }) === !1) return;
            const n = this._layers;
            for(e = 0; e < n.length && n[e].z <= 0; ++e)n[e].draw(this.chartArea);
            for(this._drawDatasets(); e < n.length; ++e)n[e].draw(this.chartArea);
            this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(e) {
            const n = this._sortedMetasets, i = [];
            let r, s;
            for(r = 0, s = n.length; r < s; ++r){
                const o = n[r];
                (!e || o.visible) && i.push(o);
            }
            return i;
        }
        getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(!0);
        }
        _drawDatasets() {
            if (this.notifyPlugins("beforeDatasetsDraw", {
                cancelable: !0
            }) === !1) return;
            const e = this.getSortedVisibleDatasetMetas();
            for(let n = e.length - 1; n >= 0; --n)this._drawDataset(e[n]);
            this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(e) {
            const n = this.ctx, i = {
                meta: e,
                index: e.index,
                cancelable: !0
            }, r = bx(this, e);
            this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (r && au(n, r), e.controller.draw(), r && uu(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
        }
        isPointInArea(e) {
            return yr(e, this.chartArea, this._minPadding);
        }
        getElementsAtEventForMode(e, n, i, r) {
            const s = Yx.modes[n];
            return typeof s == "function" ? s(this, e, i, r) : [];
        }
        getDatasetMeta(e) {
            const n = this.data.datasets[e], i = this._metasets;
            let r = i.filter((s)=>s && s._dataset === n).pop();
            return r || (r = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: n && n.order || 0,
                index: e,
                _dataset: n,
                _parsed: [],
                _sorted: !1
            }, i.push(r)), r;
        }
        getContext() {
            return this.$context || (this.$context = Dn(null, {
                chart: this,
                type: "chart"
            }));
        }
        getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(e) {
            const n = this.data.datasets[e];
            if (!n) return !1;
            const i = this.getDatasetMeta(e);
            return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
        }
        setDatasetVisibility(e, n) {
            const i = this.getDatasetMeta(e);
            i.hidden = !n;
        }
        toggleDataVisibility(e) {
            this._hiddenIndices[e] = !this._hiddenIndices[e];
        }
        getDataVisibility(e) {
            return !this._hiddenIndices[e];
        }
        _updateVisibility(e, n, i) {
            const r = i ? "show" : "hide", s = this.getDatasetMeta(e), o = s.controller._resolveAnimations(void 0, r);
            Ys(n) ? (s.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(e, i), o.update(s, {
                visible: i
            }), this.update((l)=>l.datasetIndex === e ? r : void 0));
        }
        hide(e, n) {
            this._updateVisibility(e, n, !1);
        }
        show(e, n) {
            this._updateVisibility(e, n, !0);
        }
        _destroyDatasetMeta(e) {
            const n = this._metasets[e];
            n && n.controller && n.controller._destroy(), delete this._metasets[e];
        }
        _stop() {
            let e, n;
            for(this.stop(), _t.remove(this), e = 0, n = this.data.datasets.length; e < n; ++e)this._destroyDatasetMeta(e);
        }
        destroy() {
            this.notifyPlugins("beforeDestroy");
            const { canvas: e, ctx: n } = this;
            this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Zc(e, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ys[this.id], this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...e) {
            return this.canvas.toDataURL(...e);
        }
        bindEvents() {
            this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
        }
        bindUserEvents() {
            const e = this._listeners, n = this.platform, i = (s, o)=>{
                n.addEventListener(this, s, o), e[s] = o;
            }, r = (s, o, l)=>{
                s.offsetX = o, s.offsetY = l, this._eventHandler(s);
            };
            B(this.options.events, (s)=>i(s, r));
        }
        bindResponsiveEvents() {
            this._responsiveListeners || (this._responsiveListeners = {});
            const e = this._responsiveListeners, n = this.platform, i = (a, u)=>{
                n.addEventListener(this, a, u), e[a] = u;
            }, r = (a, u)=>{
                e[a] && (n.removeEventListener(this, a, u), delete e[a]);
            }, s = (a, u)=>{
                this.canvas && this.resize(a, u);
            };
            let o;
            const l = ()=>{
                r("attach", l), this.attached = !0, this.resize(), i("resize", s), i("detach", o);
            };
            o = ()=>{
                this.attached = !1, r("resize", s), this._stop(), this._resize(0, 0), i("attach", l);
            }, n.isAttached(this.canvas) ? l() : o();
        }
        unbindEvents() {
            B(this._listeners, (e, n)=>{
                this.platform.removeEventListener(this, n, e);
            }), this._listeners = {}, B(this._responsiveListeners, (e, n)=>{
                this.platform.removeEventListener(this, n, e);
            }), this._responsiveListeners = void 0;
        }
        updateHoverStyle(e, n, i) {
            const r = i ? "set" : "remove";
            let s, o, l, a;
            for(n === "dataset" && (s = this.getDatasetMeta(e[0].datasetIndex), s.controller["_" + r + "DatasetHoverStyle"]()), l = 0, a = e.length; l < a; ++l){
                o = e[l];
                const u = o && this.getDatasetMeta(o.datasetIndex).controller;
                u && u[r + "HoverStyle"](o.element, o.datasetIndex, o.index);
            }
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(e) {
            const n = this._active || [], i = e.map(({ datasetIndex: s, index: o })=>{
                const l = this.getDatasetMeta(s);
                if (!l) throw new Error("No dataset found at index " + s);
                return {
                    datasetIndex: s,
                    element: l.data[o],
                    index: o
                };
            });
            !Vs(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
        }
        notifyPlugins(e, n, i) {
            return this._plugins.notify(this, e, n, i);
        }
        isPluginEnabled(e) {
            return this._plugins._cache.filter((n)=>n.plugin.id === e).length === 1;
        }
        _updateHoverStyles(e, n, i) {
            const r = this.options.hover, s = (a, u)=>a.filter((c)=>!u.some((d)=>c.datasetIndex === d.datasetIndex && c.index === d.index)), o = s(n, e), l = i ? e : s(e, n);
            o.length && this.updateHoverStyle(o, r.mode, !1), l.length && r.mode && this.updateHoverStyle(l, r.mode, !0);
        }
        _eventHandler(e, n) {
            const i = {
                event: e,
                replay: n,
                cancelable: !0,
                inChartArea: this.isPointInArea(e)
            }, r = (o)=>(o.options.events || this.options.events).includes(e.native.type);
            if (this.notifyPlugins("beforeEvent", i, r) === !1) return;
            const s = this._handleEvent(e, n, i.inChartArea);
            return i.cancelable = !1, this.notifyPlugins("afterEvent", i, r), (s || i.changed) && this.render(), this;
        }
        _handleEvent(e, n, i) {
            const { _active: r = [], options: s } = this, o = n, l = this._getActiveElements(e, r, i, o), a = r0(e), u = K_(e, this._lastEvent, i, a);
            i && (this._lastEvent = null, Q(s.onHover, [
                e,
                l,
                this
            ], this), a && Q(s.onClick, [
                e,
                l,
                this
            ], this));
            const c = !Vs(l, r);
            return (c || n) && (this._active = l, this._updateHoverStyles(l, r, n)), this._lastEvent = u, c;
        }
        _getActiveElements(e, n, i, r) {
            if (e.type === "mouseout") return [];
            if (!i) return n;
            const s = this.options.hover;
            return this.getElementsAtEventForMode(e, s.mode, s, r);
        }
    };
    function Dd() {
        return B(jn.instances, (t)=>t._plugins.invalidate());
    }
    function Gp(t, e, n = e) {
        t.lineCap = I(n.borderCapStyle, e.borderCapStyle), t.setLineDash(I(n.borderDash, e.borderDash)), t.lineDashOffset = I(n.borderDashOffset, e.borderDashOffset), t.lineJoin = I(n.borderJoinStyle, e.borderJoinStyle), t.lineWidth = I(n.borderWidth, e.borderWidth), t.strokeStyle = I(n.borderColor, e.borderColor);
    }
    function G_(t, e, n) {
        t.lineTo(n.x, n.y);
    }
    function Z_(t) {
        return t.stepped ? j0 : t.tension || t.cubicInterpolationMode === "monotone" ? O0 : G_;
    }
    function Zp(t, e, n = {}) {
        const i = t.length, { start: r = 0, end: s = i - 1 } = n, { start: o, end: l } = e, a = Math.max(r, o), u = Math.min(s, l), c = r < o && s < o || r > l && s > l;
        return {
            count: i,
            start: a,
            loop: e.loop,
            ilen: u < a && !c ? i + u - a : u - a
        };
    }
    function J_(t, e, n, i) {
        const { points: r, options: s } = e, { count: o, start: l, loop: a, ilen: u } = Zp(r, n, i), c = Z_(s);
        let { move: d = !0, reverse: f } = i || {}, p, y, v;
        for(p = 0; p <= u; ++p)y = r[(l + (f ? u - p : p)) % o], !y.skip && (d ? (t.moveTo(y.x, y.y), d = !1) : c(t, v, y, f, s.stepped), v = y);
        return a && (y = r[(l + (f ? u : 0)) % o], c(t, v, y, f, s.stepped)), !!a;
    }
    function q_(t, e, n, i) {
        const r = e.points, { count: s, start: o, ilen: l } = Zp(r, n, i), { move: a = !0, reverse: u } = i || {};
        let c = 0, d = 0, f, p, y, v, _, m;
        const h = (S)=>(o + (u ? l - S : S)) % s, x = ()=>{
            v !== _ && (t.lineTo(c, _), t.lineTo(c, v), t.lineTo(c, m));
        };
        for(a && (p = r[h(0)], t.moveTo(p.x, p.y)), f = 0; f <= l; ++f){
            if (p = r[h(f)], p.skip) continue;
            const S = p.x, w = p.y, C = S | 0;
            C === y ? (w < v ? v = w : w > _ && (_ = w), c = (d * c + S) / ++d) : (x(), t.lineTo(S, w), y = C, d = 0, v = _ = w), m = w;
        }
        x();
    }
    function sa(t) {
        const e = t.options, n = e.borderDash && e.borderDash.length;
        return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !n ? q_ : J_;
    }
    function e1(t) {
        return t.stepped ? dx : t.tension || t.cubicInterpolationMode === "monotone" ? fx : dn;
    }
    function t1(t, e, n, i) {
        let r = e._path;
        r || (r = e._path = new Path2D, e.path(r, n, i) && r.closePath()), Gp(t, e.options), t.stroke(r);
    }
    function n1(t, e, n, i) {
        const { segments: r, options: s } = e, o = sa(e);
        for (const l of r)Gp(t, s, l.style), t.beginPath(), o(t, e, l, {
            start: n,
            end: n + i - 1
        }) && t.closePath(), t.stroke();
    }
    const i1 = typeof Path2D == "function";
    function r1(t, e, n, i) {
        i1 && !e.options.segment ? t1(t, e, n, i) : n1(t, e, n, i);
    }
    class yo extends Tn {
        static id = "line";
        static defaults = {
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: !0,
            cubicInterpolationMode: "default",
            fill: !1,
            spanGaps: !1,
            stepped: !1,
            tension: 0
        };
        static defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        static descriptors = {
            _scriptable: !0,
            _indexable: (e)=>e !== "borderDash" && e !== "fill"
        };
        constructor(e){
            super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
        }
        updateControlPoints(e, n) {
            const i = this.options;
            if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
                const r = i.spanGaps ? this._loop : this._fullLoop;
                ix(this._points, i, e, r, n), this._pointsUpdated = !0;
            }
        }
        set points(e) {
            this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
        }
        get points() {
            return this._points;
        }
        get segments() {
            return this._segments || (this._segments = _x(this, this.options.segment));
        }
        first() {
            const e = this.segments, n = this.points;
            return e.length && n[e[0].start];
        }
        last() {
            const e = this.segments, n = this.points, i = e.length;
            return i && n[e[i - 1].end];
        }
        interpolate(e, n) {
            const i = this.options, r = e[n], s = this.points, o = yx(this, {
                property: n,
                start: r,
                end: r
            });
            if (!o.length) return;
            const l = [], a = e1(i);
            let u, c;
            for(u = 0, c = o.length; u < c; ++u){
                const { start: d, end: f } = o[u], p = s[d], y = s[f];
                if (p === y) {
                    l.push(p);
                    continue;
                }
                const v = Math.abs((r - p[n]) / (y[n] - p[n])), _ = a(p, y, v, i.stepped);
                _[n] = e[n], l.push(_);
            }
            return l.length === 1 ? l[0] : l;
        }
        pathSegment(e, n, i) {
            return sa(this)(e, this, n, i);
        }
        path(e, n, i) {
            const r = this.segments, s = sa(this);
            let o = this._loop;
            n = n || 0, i = i || this.points.length - n;
            for (const l of r)o &= s(e, this, l, {
                start: n,
                end: n + i - 1
            });
            return !!o;
        }
        draw(e, n, i, r) {
            const s = this.options || {};
            (this.points || []).length && s.borderWidth && (e.save(), r1(e, this, i, r), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
        }
    }
    function Td(t, e, n, i) {
        const r = t.options, { [n]: s } = t.getProps([
            n
        ], i);
        return Math.abs(e - s) < r.radius + r.hitRadius;
    }
    class vo extends Tn {
        static id = "point";
        parsed;
        skip;
        stop;
        static defaults = {
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0
        };
        static defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        constructor(e){
            super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
        }
        inRange(e, n, i) {
            const r = this.options, { x: s, y: o } = this.getProps([
                "x",
                "y"
            ], i);
            return Math.pow(e - s, 2) + Math.pow(n - o, 2) < Math.pow(r.hitRadius + r.radius, 2);
        }
        inXRange(e, n) {
            return Td(this, e, "x", n);
        }
        inYRange(e, n) {
            return Td(this, e, "y", n);
        }
        getCenterPoint(e) {
            const { x: n, y: i } = this.getProps([
                "x",
                "y"
            ], e);
            return {
                x: n,
                y: i
            };
        }
        size(e) {
            e = e || this.options || {};
            let n = e.radius || 0;
            n = Math.max(n, n && e.hoverRadius || 0);
            const i = n && e.borderWidth || 0;
            return (n + i) * 2;
        }
        draw(e, n) {
            const i = this.options;
            this.skip || i.radius < .1 || !yr(this, n, this.size(i) / 2) || (e.strokeStyle = i.borderColor, e.lineWidth = i.borderWidth, e.fillStyle = i.backgroundColor, ta(e, i, this.x, this.y));
        }
        getRange() {
            const e = this.options || {};
            return e.radius + e.hitRadius;
        }
    }
    const jd = (t, e)=>{
        let { boxHeight: n = e, boxWidth: i = e } = t;
        return t.usePointStyle && (n = Math.min(n, e), i = t.pointStyleWidth || Math.min(i, e)), {
            boxWidth: i,
            boxHeight: n,
            itemHeight: Math.max(e, n)
        };
    }, s1 = (t, e)=>t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
    class Od extends Tn {
        constructor(e){
            super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
        }
        update(e, n, i) {
            this.maxWidth = e, this.maxHeight = n, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit();
        }
        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
        }
        buildLabels() {
            const e = this.options.labels || {};
            let n = Q(e.generateLabels, [
                this.chart
            ], this) || [];
            e.filter && (n = n.filter((i)=>e.filter(i, this.chart.data))), e.sort && (n = n.sort((i, r)=>e.sort(i, r, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
        }
        fit() {
            const { options: e, ctx: n } = this;
            if (!e.display) {
                this.width = this.height = 0;
                return;
            }
            const i = e.labels, r = we(i.font), s = r.size, o = this._computeTitleHeight(), { boxWidth: l, itemHeight: a } = jd(i, s);
            let u, c;
            n.font = r.string, this.isHorizontal() ? (u = this.maxWidth, c = this._fitRows(o, s, l, a) + 10) : (c = this.maxHeight, u = this._fitCols(o, r, l, a) + 10), this.width = Math.min(u, e.maxWidth || this.maxWidth), this.height = Math.min(c, e.maxHeight || this.maxHeight);
        }
        _fitRows(e, n, i, r) {
            const { ctx: s, maxWidth: o, options: { labels: { padding: l } } } = this, a = this.legendHitBoxes = [], u = this.lineWidths = [
                0
            ], c = r + l;
            let d = e;
            s.textAlign = "left", s.textBaseline = "middle";
            let f = -1, p = -c;
            return this.legendItems.forEach((y, v)=>{
                const _ = i + n / 2 + s.measureText(y.text).width;
                (v === 0 || u[u.length - 1] + _ + 2 * l > o) && (d += c, u[u.length - (v > 0 ? 0 : 1)] = 0, p += c, f++), a[v] = {
                    left: 0,
                    top: p,
                    row: f,
                    width: _,
                    height: r
                }, u[u.length - 1] += _ + l;
            }), d;
        }
        _fitCols(e, n, i, r) {
            const { ctx: s, maxHeight: o, options: { labels: { padding: l } } } = this, a = this.legendHitBoxes = [], u = this.columnSizes = [], c = o - e;
            let d = l, f = 0, p = 0, y = 0, v = 0;
            return this.legendItems.forEach((_, m)=>{
                const { itemWidth: h, itemHeight: x } = o1(i, n, s, _, r);
                m > 0 && p + x + 2 * l > c && (d += f + l, u.push({
                    width: f,
                    height: p
                }), y += f + l, v++, f = p = 0), a[m] = {
                    left: y,
                    top: p,
                    col: v,
                    width: h,
                    height: x
                }, f = Math.max(f, h), p += x + l;
            }), d += f, u.push({
                width: f,
                height: p
            }), d;
        }
        adjustHitBoxes() {
            if (!this.options.display) return;
            const e = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: r }, rtl: s } } = this, o = Jn(s, this.left, this.width);
            if (this.isHorizontal()) {
                let l = 0, a = _e(i, this.left + r, this.right - this.lineWidths[l]);
                for (const u of n)l !== u.row && (l = u.row, a = _e(i, this.left + r, this.right - this.lineWidths[l])), u.top += this.top + e + r, u.left = o.leftForLtr(o.x(a), u.width), a += u.width + r;
            } else {
                let l = 0, a = _e(i, this.top + e + r, this.bottom - this.columnSizes[l].height);
                for (const u of n)u.col !== l && (l = u.col, a = _e(i, this.top + e + r, this.bottom - this.columnSizes[l].height)), u.top = a, u.left += this.left + r, u.left = o.leftForLtr(o.x(u.left), u.width), a += u.height + r;
            }
        }
        isHorizontal() {
            return this.options.position === "top" || this.options.position === "bottom";
        }
        draw() {
            if (this.options.display) {
                const e = this.ctx;
                au(e, this), this._draw(), uu(e);
            }
        }
        _draw() {
            const { options: e, columnSizes: n, lineWidths: i, ctx: r } = this, { align: s, labels: o } = e, l = se.color, a = Jn(e.rtl, this.left, this.width), u = we(o.font), { padding: c } = o, d = u.size, f = d / 2;
            let p;
            this.drawTitle(), r.textAlign = a.textAlign("left"), r.textBaseline = "middle", r.lineWidth = .5, r.font = u.string;
            const { boxWidth: y, boxHeight: v, itemHeight: _ } = jd(o, d), m = function(C, k, b) {
                if (isNaN(y) || y <= 0 || isNaN(v) || v < 0) return;
                r.save();
                const E = I(b.lineWidth, 1);
                if (r.fillStyle = I(b.fillStyle, l), r.lineCap = I(b.lineCap, "butt"), r.lineDashOffset = I(b.lineDashOffset, 0), r.lineJoin = I(b.lineJoin, "miter"), r.lineWidth = E, r.strokeStyle = I(b.strokeStyle, l), r.setLineDash(I(b.lineDash, [])), o.usePointStyle) {
                    const P = {
                        radius: v * Math.SQRT2 / 2,
                        pointStyle: b.pointStyle,
                        rotation: b.rotation,
                        borderWidth: E
                    }, j = a.xPlus(C, y / 2), L = k + f;
                    Dp(r, P, j, L, o.pointStyleWidth && y);
                } else {
                    const P = k + Math.max((d - v) / 2, 0), j = a.leftForLtr(C, y), L = Gi(b.borderRadius);
                    r.beginPath(), Object.values(L).some((W)=>W !== 0) ? na(r, {
                        x: j,
                        y: P,
                        w: y,
                        h: v,
                        radius: L
                    }) : r.rect(j, P, y, v), r.fill(), E !== 0 && r.stroke();
                }
                r.restore();
            }, h = function(C, k, b) {
                vr(r, b.text, C, k + _ / 2, u, {
                    strikethrough: b.hidden,
                    textAlign: a.textAlign(b.textAlign)
                });
            }, x = this.isHorizontal(), S = this._computeTitleHeight();
            x ? p = {
                x: _e(s, this.left + c, this.right - i[0]),
                y: this.top + c + S,
                line: 0
            } : p = {
                x: this.left + c,
                y: _e(s, this.top + S + c, this.bottom - n[0].height),
                line: 0
            }, Ip(this.ctx, e.textDirection);
            const w = _ + c;
            this.legendItems.forEach((C, k)=>{
                r.strokeStyle = C.fontColor, r.fillStyle = C.fontColor;
                const b = r.measureText(C.text).width, E = a.textAlign(C.textAlign || (C.textAlign = o.textAlign)), P = y + f + b;
                let j = p.x, L = p.y;
                a.setWidth(this.width), x ? k > 0 && j + P + c > this.right && (L = p.y += w, p.line++, j = p.x = _e(s, this.left + c, this.right - i[p.line])) : k > 0 && L + w > this.bottom && (j = p.x = j + n[p.line].width + c, p.line++, L = p.y = _e(s, this.top + S + c, this.bottom - n[p.line].height));
                const W = a.x(j);
                if (m(W, L, C), j = _0(E, j + y + f, x ? j + P : this.right, e.rtl), h(a.x(j), L, C), x) p.x += P + c;
                else if (typeof C.text != "string") {
                    const he = u.lineHeight;
                    p.y += Jp(C, he) + c;
                } else p.y += w;
            }), Np(this.ctx, e.textDirection);
        }
        drawTitle() {
            const e = this.options, n = e.title, i = we(n.font), r = qe(n.padding);
            if (!n.display) return;
            const s = Jn(e.rtl, this.left, this.width), o = this.ctx, l = n.position, a = i.size / 2, u = r.top + a;
            let c, d = this.left, f = this.width;
            if (this.isHorizontal()) f = Math.max(...this.lineWidths), c = this.top + u, d = _e(e.align, d, this.right - f);
            else {
                const y = this.columnSizes.reduce((v, _)=>Math.max(v, _.height), 0);
                c = u + _e(e.align, this.top, this.bottom - y - e.labels.padding - this._computeTitleHeight());
            }
            const p = _e(l, d, d + f);
            o.textAlign = s.textAlign(ou(l)), o.textBaseline = "middle", o.strokeStyle = n.color, o.fillStyle = n.color, o.font = i.string, vr(o, n.text, p, c, i);
        }
        _computeTitleHeight() {
            const e = this.options.title, n = we(e.font), i = qe(e.padding);
            return e.display ? n.lineHeight + i.height : 0;
        }
        _getLegendItemAt(e, n) {
            let i, r, s;
            if (Li(e, this.left, this.right) && Li(n, this.top, this.bottom)) {
                for(s = this.legendHitBoxes, i = 0; i < s.length; ++i)if (r = s[i], Li(e, r.left, r.left + r.width) && Li(n, r.top, r.top + r.height)) return this.legendItems[i];
            }
            return null;
        }
        handleEvent(e) {
            const n = this.options;
            if (!u1(e.type, n)) return;
            const i = this._getLegendItemAt(e.x, e.y);
            if (e.type === "mousemove" || e.type === "mouseout") {
                const r = this._hoveredItem, s = s1(r, i);
                r && !s && Q(n.onLeave, [
                    e,
                    r,
                    this
                ], this), this._hoveredItem = i, i && !s && Q(n.onHover, [
                    e,
                    i,
                    this
                ], this);
            } else i && Q(n.onClick, [
                e,
                i,
                this
            ], this);
        }
    }
    function o1(t, e, n, i, r) {
        const s = l1(i, t, e, n), o = a1(r, i, e.lineHeight);
        return {
            itemWidth: s,
            itemHeight: o
        };
    }
    function l1(t, e, n, i) {
        let r = t.text;
        return r && typeof r != "string" && (r = r.reduce((s, o)=>s.length > o.length ? s : o)), e + n.size / 2 + i.measureText(r).width;
    }
    function a1(t, e, n) {
        let i = t;
        return typeof e.text != "string" && (i = Jp(e, n)), i;
    }
    function Jp(t, e) {
        const n = t.text ? t.text.length : 0;
        return e * n;
    }
    function u1(t, e) {
        return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
    }
    var xo = {
        id: "legend",
        _element: Od,
        start (t, e, n) {
            const i = t.legend = new Od({
                ctx: t.ctx,
                options: n,
                chart: t
            });
            Qe.configure(t, i, n), Qe.addBox(t, i);
        },
        stop (t) {
            Qe.removeBox(t, t.legend), delete t.legend;
        },
        beforeUpdate (t, e, n) {
            const i = t.legend;
            Qe.configure(t, i, n), i.options = n;
        },
        afterUpdate (t) {
            const e = t.legend;
            e.buildLabels(), e.adjustHitBoxes();
        },
        afterEvent (t, e) {
            e.replay || t.legend.handleEvent(e.event);
        },
        defaults: {
            display: !0,
            position: "top",
            align: "center",
            fullSize: !0,
            reverse: !1,
            weight: 1e3,
            onClick (t, e, n) {
                const i = e.datasetIndex, r = n.chart;
                r.isDatasetVisible(i) ? (r.hide(i), e.hidden = !0) : (r.show(i), e.hidden = !1);
            },
            onHover: null,
            onLeave: null,
            labels: {
                color: (t)=>t.chart.options.color,
                boxWidth: 40,
                padding: 10,
                generateLabels (t) {
                    const e = t.data.datasets, { labels: { usePointStyle: n, pointStyle: i, textAlign: r, color: s, useBorderRadius: o, borderRadius: l } } = t.legend.options;
                    return t._getSortedDatasetMetas().map((a)=>{
                        const u = a.controller.getStyle(n ? 0 : void 0), c = qe(u.borderWidth);
                        return {
                            text: e[a.index].label,
                            fillStyle: u.backgroundColor,
                            fontColor: s,
                            hidden: !a.visible,
                            lineCap: u.borderCapStyle,
                            lineDash: u.borderDash,
                            lineDashOffset: u.borderDashOffset,
                            lineJoin: u.borderJoinStyle,
                            lineWidth: (c.width + c.height) / 4,
                            strokeStyle: u.borderColor,
                            pointStyle: i || u.pointStyle,
                            rotation: u.rotation,
                            textAlign: r || u.textAlign,
                            borderRadius: o && (l || u.borderRadius),
                            datasetIndex: a.index
                        };
                    }, this);
                }
            },
            title: {
                color: (t)=>t.chart.options.color,
                display: !1,
                position: "center",
                text: ""
            }
        },
        descriptors: {
            _scriptable: (t)=>!t.startsWith("on"),
            labels: {
                _scriptable: (t)=>![
                        "generateLabels",
                        "filter",
                        "sort"
                    ].includes(t)
            }
        }
    };
    class qp extends Tn {
        constructor(e){
            super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
        }
        update(e, n) {
            const i = this.options;
            if (this.left = 0, this.top = 0, !i.display) {
                this.width = this.height = this.right = this.bottom = 0;
                return;
            }
            this.width = this.right = e, this.height = this.bottom = n;
            const r = ce(i.text) ? i.text.length : 1;
            this._padding = qe(i.padding);
            const s = r * we(i.font).lineHeight + this._padding.height;
            this.isHorizontal() ? this.height = s : this.width = s;
        }
        isHorizontal() {
            const e = this.options.position;
            return e === "top" || e === "bottom";
        }
        _drawArgs(e) {
            const { top: n, left: i, bottom: r, right: s, options: o } = this, l = o.align;
            let a = 0, u, c, d;
            return this.isHorizontal() ? (c = _e(l, i, s), d = n + e, u = s - i) : (o.position === "left" ? (c = i + e, d = _e(l, r, n), a = fe * -.5) : (c = s - e, d = _e(l, n, r), a = fe * .5), u = r - n), {
                titleX: c,
                titleY: d,
                maxWidth: u,
                rotation: a
            };
        }
        draw() {
            const e = this.ctx, n = this.options;
            if (!n.display) return;
            const i = we(n.font), s = i.lineHeight / 2 + this._padding.top, { titleX: o, titleY: l, maxWidth: a, rotation: u } = this._drawArgs(s);
            vr(e, n.text, 0, 0, i, {
                color: n.color,
                maxWidth: a,
                rotation: u,
                textAlign: ou(n.align),
                textBaseline: "middle",
                translation: [
                    o,
                    l
                ]
            });
        }
    }
    function c1(t, e) {
        const n = new qp({
            ctx: t.ctx,
            options: e,
            chart: t
        });
        Qe.configure(t, n, e), Qe.addBox(t, n), t.titleBlock = n;
    }
    var yu = {
        id: "title",
        _element: qp,
        start (t, e, n) {
            c1(t, n);
        },
        stop (t) {
            const e = t.titleBlock;
            Qe.removeBox(t, e), delete t.titleBlock;
        },
        beforeUpdate (t, e, n) {
            const i = t.titleBlock;
            Qe.configure(t, i, n), i.options = n;
        },
        defaults: {
            align: "center",
            display: !1,
            font: {
                weight: "bold"
            },
            fullSize: !0,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        },
        defaultRoutes: {
            color: "color"
        },
        descriptors: {
            _scriptable: !0,
            _indexable: !1
        }
    };
    const Ii = {
        average (t) {
            if (!t.length) return !1;
            let e, n, i = new Set, r = 0, s = 0;
            for(e = 0, n = t.length; e < n; ++e){
                const l = t[e].element;
                if (l && l.hasValue()) {
                    const a = l.tooltipPosition();
                    i.add(a.x), r += a.y, ++s;
                }
            }
            return s === 0 || i.size === 0 ? !1 : {
                x: [
                    ...i
                ].reduce((l, a)=>l + a) / i.size,
                y: r / s
            };
        },
        nearest (t, e) {
            if (!t.length) return !1;
            let n = e.x, i = e.y, r = Number.POSITIVE_INFINITY, s, o, l;
            for(s = 0, o = t.length; s < o; ++s){
                const a = t[s].element;
                if (a && a.hasValue()) {
                    const u = a.getCenterPoint(), c = ql(e, u);
                    c < r && (r = c, l = a);
                }
            }
            if (l) {
                const a = l.tooltipPosition();
                n = a.x, i = a.y;
            }
            return {
                x: n,
                y: i
            };
        }
    };
    function dt(t, e) {
        return e && (ce(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
    }
    function St(t) {
        return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
    }
    function d1(t, e) {
        const { element: n, datasetIndex: i, index: r } = e, s = t.getDatasetMeta(i).controller, { label: o, value: l } = s.getLabelAndValue(r);
        return {
            chart: t,
            label: o,
            parsed: s.getParsed(r),
            raw: t.data.datasets[i].data[r],
            formattedValue: l,
            dataset: s.getDataset(),
            dataIndex: r,
            datasetIndex: i,
            element: n
        };
    }
    function Rd(t, e) {
        const n = t.chart.ctx, { body: i, footer: r, title: s } = t, { boxWidth: o, boxHeight: l } = e, a = we(e.bodyFont), u = we(e.titleFont), c = we(e.footerFont), d = s.length, f = r.length, p = i.length, y = qe(e.padding);
        let v = y.height, _ = 0, m = i.reduce((S, w)=>S + w.before.length + w.lines.length + w.after.length, 0);
        if (m += t.beforeBody.length + t.afterBody.length, d && (v += d * u.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom), m) {
            const S = e.displayColors ? Math.max(l, a.lineHeight) : a.lineHeight;
            v += p * S + (m - p) * a.lineHeight + (m - 1) * e.bodySpacing;
        }
        f && (v += e.footerMarginTop + f * c.lineHeight + (f - 1) * e.footerSpacing);
        let h = 0;
        const x = function(S) {
            _ = Math.max(_, n.measureText(S).width + h);
        };
        return n.save(), n.font = u.string, B(t.title, x), n.font = a.string, B(t.beforeBody.concat(t.afterBody), x), h = e.displayColors ? o + 2 + e.boxPadding : 0, B(i, (S)=>{
            B(S.before, x), B(S.lines, x), B(S.after, x);
        }), h = 0, n.font = c.string, B(t.footer, x), n.restore(), _ += y.width, {
            width: _,
            height: v
        };
    }
    function f1(t, e) {
        const { y: n, height: i } = e;
        return n < i / 2 ? "top" : n > t.height - i / 2 ? "bottom" : "center";
    }
    function h1(t, e, n, i) {
        const { x: r, width: s } = i, o = n.caretSize + n.caretPadding;
        if (t === "left" && r + s + o > e.width || t === "right" && r - s - o < 0) return !0;
    }
    function p1(t, e, n, i) {
        const { x: r, width: s } = n, { width: o, chartArea: { left: l, right: a } } = t;
        let u = "center";
        return i === "center" ? u = r <= (l + a) / 2 ? "left" : "right" : r <= s / 2 ? u = "left" : r >= o - s / 2 && (u = "right"), h1(u, t, e, n) && (u = "center"), u;
    }
    function Ld(t, e, n) {
        const i = n.yAlign || e.yAlign || f1(t, n);
        return {
            xAlign: n.xAlign || e.xAlign || p1(t, e, n, i),
            yAlign: i
        };
    }
    function g1(t, e) {
        let { x: n, width: i } = t;
        return e === "right" ? n -= i : e === "center" && (n -= i / 2), n;
    }
    function m1(t, e, n) {
        let { y: i, height: r } = t;
        return e === "top" ? i += n : e === "bottom" ? i -= r + n : i -= r / 2, i;
    }
    function zd(t, e, n, i) {
        const { caretSize: r, caretPadding: s, cornerRadius: o } = t, { xAlign: l, yAlign: a } = n, u = r + s, { topLeft: c, topRight: d, bottomLeft: f, bottomRight: p } = Gi(o);
        let y = g1(e, l);
        const v = m1(e, a, u);
        return a === "center" ? l === "left" ? y += u : l === "right" && (y -= u) : l === "left" ? y -= Math.max(c, f) + r : l === "right" && (y += Math.max(d, p) + r), {
            x: Xe(y, 0, i.width - e.width),
            y: Xe(v, 0, i.height - e.height)
        };
    }
    function ts(t, e, n) {
        const i = qe(n.padding);
        return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - i.right : t.x + i.left;
    }
    function Id(t) {
        return dt([], St(t));
    }
    function y1(t, e, n) {
        return Dn(t, {
            tooltip: e,
            tooltipItems: n,
            type: "tooltip"
        });
    }
    function Nd(t, e) {
        const n = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
        return n ? t.override(n) : t;
    }
    const eg = {
        beforeTitle: xt,
        title (t) {
            if (t.length > 0) {
                const e = t[0], n = e.chart.data.labels, i = n ? n.length : 0;
                if (this && this.options && this.options.mode === "dataset") return e.dataset.label || "";
                if (e.label) return e.label;
                if (i > 0 && e.dataIndex < i) return n[e.dataIndex];
            }
            return "";
        },
        afterTitle: xt,
        beforeBody: xt,
        beforeLabel: xt,
        label (t) {
            if (this && this.options && this.options.mode === "dataset") return t.label + ": " + t.formattedValue || t.formattedValue;
            let e = t.dataset.label || "";
            e && (e += ": ");
            const n = t.formattedValue;
            return V(n) || (e += n), e;
        },
        labelColor (t) {
            const n = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
            return {
                borderColor: n.borderColor,
                backgroundColor: n.backgroundColor,
                borderWidth: n.borderWidth,
                borderDash: n.borderDash,
                borderDashOffset: n.borderDashOffset,
                borderRadius: 0
            };
        },
        labelTextColor () {
            return this.options.bodyColor;
        },
        labelPointStyle (t) {
            const n = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
            return {
                pointStyle: n.pointStyle,
                rotation: n.rotation
            };
        },
        afterLabel: xt,
        afterBody: xt,
        beforeFooter: xt,
        footer: xt,
        afterFooter: xt
    };
    function Te(t, e, n, i) {
        const r = t[e].call(n, i);
        return typeof r > "u" ? eg[e].call(n, i) : r;
    }
    class Fd extends Tn {
        static positioners = Ii;
        constructor(e){
            super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
        }
        initialize(e) {
            this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
        }
        _resolveAnimations() {
            const e = this._cachedAnimations;
            if (e) return e;
            const n = this.chart, i = this.options.setContext(this.getContext()), r = i.enabled && n.options.animation && i.animations, s = new Ap(this.chart, r);
            return r._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
        }
        getContext() {
            return this.$context || (this.$context = y1(this.chart.getContext(), this, this._tooltipItems));
        }
        getTitle(e, n) {
            const { callbacks: i } = n, r = Te(i, "beforeTitle", this, e), s = Te(i, "title", this, e), o = Te(i, "afterTitle", this, e);
            let l = [];
            return l = dt(l, St(r)), l = dt(l, St(s)), l = dt(l, St(o)), l;
        }
        getBeforeBody(e, n) {
            return Id(Te(n.callbacks, "beforeBody", this, e));
        }
        getBody(e, n) {
            const { callbacks: i } = n, r = [];
            return B(e, (s)=>{
                const o = {
                    before: [],
                    lines: [],
                    after: []
                }, l = Nd(i, s);
                dt(o.before, St(Te(l, "beforeLabel", this, s))), dt(o.lines, Te(l, "label", this, s)), dt(o.after, St(Te(l, "afterLabel", this, s))), r.push(o);
            }), r;
        }
        getAfterBody(e, n) {
            return Id(Te(n.callbacks, "afterBody", this, e));
        }
        getFooter(e, n) {
            const { callbacks: i } = n, r = Te(i, "beforeFooter", this, e), s = Te(i, "footer", this, e), o = Te(i, "afterFooter", this, e);
            let l = [];
            return l = dt(l, St(r)), l = dt(l, St(s)), l = dt(l, St(o)), l;
        }
        _createItems(e) {
            const n = this._active, i = this.chart.data, r = [], s = [], o = [];
            let l = [], a, u;
            for(a = 0, u = n.length; a < u; ++a)l.push(d1(this.chart, n[a]));
            return e.filter && (l = l.filter((c, d, f)=>e.filter(c, d, f, i))), e.itemSort && (l = l.sort((c, d)=>e.itemSort(c, d, i))), B(l, (c)=>{
                const d = Nd(e.callbacks, c);
                r.push(Te(d, "labelColor", this, c)), s.push(Te(d, "labelPointStyle", this, c)), o.push(Te(d, "labelTextColor", this, c));
            }), this.labelColors = r, this.labelPointStyles = s, this.labelTextColors = o, this.dataPoints = l, l;
        }
        update(e, n) {
            const i = this.options.setContext(this.getContext()), r = this._active;
            let s, o = [];
            if (!r.length) this.opacity !== 0 && (s = {
                opacity: 0
            });
            else {
                const l = Ii[i.position].call(this, r, this._eventPosition);
                o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
                const a = this._size = Rd(this, i), u = Object.assign({}, l, a), c = Ld(this.chart, i, u), d = zd(i, u, c, this.chart);
                this.xAlign = c.xAlign, this.yAlign = c.yAlign, s = {
                    opacity: 1,
                    x: d.x,
                    y: d.y,
                    width: a.width,
                    height: a.height,
                    caretX: l.x,
                    caretY: l.y
                };
            }
            this._tooltipItems = o, this.$context = void 0, s && this._resolveAnimations().update(this, s), e && i.external && i.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay: n
            });
        }
        drawCaret(e, n, i, r) {
            const s = this.getCaretPosition(e, i, r);
            n.lineTo(s.x1, s.y1), n.lineTo(s.x2, s.y2), n.lineTo(s.x3, s.y3);
        }
        getCaretPosition(e, n, i) {
            const { xAlign: r, yAlign: s } = this, { caretSize: o, cornerRadius: l } = i, { topLeft: a, topRight: u, bottomLeft: c, bottomRight: d } = Gi(l), { x: f, y: p } = e, { width: y, height: v } = n;
            let _, m, h, x, S, w;
            return s === "center" ? (S = p + v / 2, r === "left" ? (_ = f, m = _ - o, x = S + o, w = S - o) : (_ = f + y, m = _ + o, x = S - o, w = S + o), h = _) : (r === "left" ? m = f + Math.max(a, c) + o : r === "right" ? m = f + y - Math.max(u, d) - o : m = this.caretX, s === "top" ? (x = p, S = x - o, _ = m - o, h = m + o) : (x = p + v, S = x + o, _ = m + o, h = m - o), w = x), {
                x1: _,
                x2: m,
                x3: h,
                y1: x,
                y2: S,
                y3: w
            };
        }
        drawTitle(e, n, i) {
            const r = this.title, s = r.length;
            let o, l, a;
            if (s) {
                const u = Jn(i.rtl, this.x, this.width);
                for(e.x = ts(this, i.titleAlign, i), n.textAlign = u.textAlign(i.titleAlign), n.textBaseline = "middle", o = we(i.titleFont), l = i.titleSpacing, n.fillStyle = i.titleColor, n.font = o.string, a = 0; a < s; ++a)n.fillText(r[a], u.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + l, a + 1 === s && (e.y += i.titleMarginBottom - l);
            }
        }
        _drawColorBox(e, n, i, r, s) {
            const o = this.labelColors[i], l = this.labelPointStyles[i], { boxHeight: a, boxWidth: u } = s, c = we(s.bodyFont), d = ts(this, "left", s), f = r.x(d), p = a < c.lineHeight ? (c.lineHeight - a) / 2 : 0, y = n.y + p;
            if (s.usePointStyle) {
                const v = {
                    radius: Math.min(u, a) / 2,
                    pointStyle: l.pointStyle,
                    rotation: l.rotation,
                    borderWidth: 1
                }, _ = r.leftForLtr(f, u) + u / 2, m = y + a / 2;
                e.strokeStyle = s.multiKeyBackground, e.fillStyle = s.multiKeyBackground, ta(e, v, _, m), e.strokeStyle = o.borderColor, e.fillStyle = o.backgroundColor, ta(e, v, _, m);
            } else {
                e.lineWidth = F(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, e.strokeStyle = o.borderColor, e.setLineDash(o.borderDash || []), e.lineDashOffset = o.borderDashOffset || 0;
                const v = r.leftForLtr(f, u), _ = r.leftForLtr(r.xPlus(f, 1), u - 2), m = Gi(o.borderRadius);
                Object.values(m).some((h)=>h !== 0) ? (e.beginPath(), e.fillStyle = s.multiKeyBackground, na(e, {
                    x: v,
                    y,
                    w: u,
                    h: a,
                    radius: m
                }), e.fill(), e.stroke(), e.fillStyle = o.backgroundColor, e.beginPath(), na(e, {
                    x: _,
                    y: y + 1,
                    w: u - 2,
                    h: a - 2,
                    radius: m
                }), e.fill()) : (e.fillStyle = s.multiKeyBackground, e.fillRect(v, y, u, a), e.strokeRect(v, y, u, a), e.fillStyle = o.backgroundColor, e.fillRect(_, y + 1, u - 2, a - 2));
            }
            e.fillStyle = this.labelTextColors[i];
        }
        drawBody(e, n, i) {
            const { body: r } = this, { bodySpacing: s, bodyAlign: o, displayColors: l, boxHeight: a, boxWidth: u, boxPadding: c } = i, d = we(i.bodyFont);
            let f = d.lineHeight, p = 0;
            const y = Jn(i.rtl, this.x, this.width), v = function(b) {
                n.fillText(b, y.x(e.x + p), e.y + f / 2), e.y += f + s;
            }, _ = y.textAlign(o);
            let m, h, x, S, w, C, k;
            for(n.textAlign = o, n.textBaseline = "middle", n.font = d.string, e.x = ts(this, _, i), n.fillStyle = i.bodyColor, B(this.beforeBody, v), p = l && _ !== "right" ? o === "center" ? u / 2 + c : u + 2 + c : 0, S = 0, C = r.length; S < C; ++S){
                for(m = r[S], h = this.labelTextColors[S], n.fillStyle = h, B(m.before, v), x = m.lines, l && x.length && (this._drawColorBox(n, e, S, y, i), f = Math.max(d.lineHeight, a)), w = 0, k = x.length; w < k; ++w)v(x[w]), f = d.lineHeight;
                B(m.after, v);
            }
            p = 0, f = d.lineHeight, B(this.afterBody, v), e.y -= s;
        }
        drawFooter(e, n, i) {
            const r = this.footer, s = r.length;
            let o, l;
            if (s) {
                const a = Jn(i.rtl, this.x, this.width);
                for(e.x = ts(this, i.footerAlign, i), e.y += i.footerMarginTop, n.textAlign = a.textAlign(i.footerAlign), n.textBaseline = "middle", o = we(i.footerFont), n.fillStyle = i.footerColor, n.font = o.string, l = 0; l < s; ++l)n.fillText(r[l], a.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + i.footerSpacing;
            }
        }
        drawBackground(e, n, i, r) {
            const { xAlign: s, yAlign: o } = this, { x: l, y: a } = e, { width: u, height: c } = i, { topLeft: d, topRight: f, bottomLeft: p, bottomRight: y } = Gi(r.cornerRadius);
            n.fillStyle = r.backgroundColor, n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.beginPath(), n.moveTo(l + d, a), o === "top" && this.drawCaret(e, n, i, r), n.lineTo(l + u - f, a), n.quadraticCurveTo(l + u, a, l + u, a + f), o === "center" && s === "right" && this.drawCaret(e, n, i, r), n.lineTo(l + u, a + c - y), n.quadraticCurveTo(l + u, a + c, l + u - y, a + c), o === "bottom" && this.drawCaret(e, n, i, r), n.lineTo(l + p, a + c), n.quadraticCurveTo(l, a + c, l, a + c - p), o === "center" && s === "left" && this.drawCaret(e, n, i, r), n.lineTo(l, a + d), n.quadraticCurveTo(l, a, l + d, a), n.closePath(), n.fill(), r.borderWidth > 0 && n.stroke();
        }
        _updateAnimationTarget(e) {
            const n = this.chart, i = this.$animations, r = i && i.x, s = i && i.y;
            if (r || s) {
                const o = Ii[e.position].call(this, this._active, this._eventPosition);
                if (!o) return;
                const l = this._size = Rd(this, e), a = Object.assign({}, o, this._size), u = Ld(n, e, a), c = zd(e, a, u, n);
                (r._to !== c.x || s._to !== c.y) && (this.xAlign = u.xAlign, this.yAlign = u.yAlign, this.width = l.width, this.height = l.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, c));
            }
        }
        _willRender() {
            return !!this.opacity;
        }
        draw(e) {
            const n = this.options.setContext(this.getContext());
            let i = this.opacity;
            if (!i) return;
            this._updateAnimationTarget(n);
            const r = {
                width: this.width,
                height: this.height
            }, s = {
                x: this.x,
                y: this.y
            };
            i = Math.abs(i) < .001 ? 0 : i;
            const o = qe(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            n.enabled && l && (e.save(), e.globalAlpha = i, this.drawBackground(s, e, r, n), Ip(e, n.textDirection), s.y += o.top, this.drawTitle(s, e, n), this.drawBody(s, e, n), this.drawFooter(s, e, n), Np(e, n.textDirection), e.restore());
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(e, n) {
            const i = this._active, r = e.map(({ datasetIndex: l, index: a })=>{
                const u = this.chart.getDatasetMeta(l);
                if (!u) throw new Error("Cannot find a dataset at index " + l);
                return {
                    datasetIndex: l,
                    element: u.data[a],
                    index: a
                };
            }), s = !Vs(i, r), o = this._positionChanged(r, n);
            (s || o) && (this._active = r, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
        }
        handleEvent(e, n, i = !0) {
            if (n && this._ignoreReplayEvents) return !1;
            this._ignoreReplayEvents = !1;
            const r = this.options, s = this._active || [], o = this._getActiveElements(e, s, n, i), l = this._positionChanged(o, e), a = n || !Vs(o, s) || l;
            return a && (this._active = o, (r.enabled || r.external) && (this._eventPosition = {
                x: e.x,
                y: e.y
            }, this.update(!0, n))), a;
        }
        _getActiveElements(e, n, i, r) {
            const s = this.options;
            if (e.type === "mouseout") return [];
            if (!r) return n.filter((l)=>this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
            const o = this.chart.getElementsAtEventForMode(e, s.mode, s, i);
            return s.reverse && o.reverse(), o;
        }
        _positionChanged(e, n) {
            const { caretX: i, caretY: r, options: s } = this, o = Ii[s.position].call(this, e, n);
            return o !== !1 && (i !== o.x || r !== o.y);
        }
    }
    var _o = {
        id: "tooltip",
        _element: Fd,
        positioners: Ii,
        afterInit (t, e, n) {
            n && (t.tooltip = new Fd({
                chart: t,
                options: n
            }));
        },
        beforeUpdate (t, e, n) {
            t.tooltip && t.tooltip.initialize(n);
        },
        reset (t, e, n) {
            t.tooltip && t.tooltip.initialize(n);
        },
        afterDraw (t) {
            const e = t.tooltip;
            if (e && e._willRender()) {
                const n = {
                    tooltip: e
                };
                if (t.notifyPlugins("beforeTooltipDraw", {
                    ...n,
                    cancelable: !0
                }) === !1) return;
                e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", n);
            }
        },
        afterEvent (t, e) {
            if (t.tooltip) {
                const n = e.replay;
                t.tooltip.handleEvent(e.event, n, e.inChartArea) && (e.changed = !0);
            }
        },
        defaults: {
            enabled: !0,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {
                weight: "bold"
            },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {
                weight: "bold"
            },
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (t, e)=>e.bodyFont.size,
            boxWidth: (t, e)=>e.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: !0,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {
                duration: 400,
                easing: "easeOutQuart"
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [
                        "x",
                        "y",
                        "width",
                        "height",
                        "caretX",
                        "caretY"
                    ]
                },
                opacity: {
                    easing: "linear",
                    duration: 200
                }
            },
            callbacks: eg
        },
        defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font"
        },
        descriptors: {
            _scriptable: (t)=>t !== "filter" && t !== "itemSort" && t !== "external",
            _indexable: !1,
            callbacks: {
                _scriptable: !1,
                _indexable: !1
            },
            animation: {
                _fallback: !1
            },
            animations: {
                _fallback: "animation"
            }
        },
        additionalOptionScopes: [
            "interaction"
        ]
    };
    const v1 = (t, e, n, i)=>(typeof e == "string" ? (n = t.push(e) - 1, i.unshift({
            index: n,
            label: e
        })) : isNaN(e) && (n = null), n);
    function x1(t, e, n, i) {
        const r = t.indexOf(e);
        if (r === -1) return v1(t, e, n, i);
        const s = t.lastIndexOf(e);
        return r !== s ? n : r;
    }
    const _1 = (t, e)=>t === null ? null : Xe(Math.round(t), 0, e);
    function Ad(t) {
        const e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
    }
    class vu extends gi {
        static id = "category";
        static defaults = {
            ticks: {
                callback: Ad
            }
        };
        constructor(e){
            super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
        }
        init(e) {
            const n = this._addedLabels;
            if (n.length) {
                const i = this.getLabels();
                for (const { index: r, label: s } of n)i[r] === s && i.splice(r, 1);
                this._addedLabels = [];
            }
            super.init(e);
        }
        parse(e, n) {
            if (V(e)) return null;
            const i = this.getLabels();
            return n = isFinite(n) && i[n] === e ? n : x1(i, e, I(n, e), this._addedLabels), _1(n, i.length - 1);
        }
        determineDataLimits() {
            const { minDefined: e, maxDefined: n } = this.getUserBounds();
            let { min: i, max: r } = this.getMinMax(!0);
            this.options.bounds === "ticks" && (e || (i = 0), n || (r = this.getLabels().length - 1)), this.min = i, this.max = r;
        }
        buildTicks() {
            const e = this.min, n = this.max, i = this.options.offset, r = [];
            let s = this.getLabels();
            s = e === 0 && n === s.length - 1 ? s : s.slice(e, n + 1), this._valueRange = Math.max(s.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? .5 : 0);
            for(let o = e; o <= n; o++)r.push({
                value: o
            });
            return r;
        }
        getLabelForValue(e) {
            return Ad.call(this, e);
        }
        configure() {
            super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
        }
        getPixelForValue(e) {
            return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
        }
        getPixelForTick(e) {
            const n = this.ticks;
            return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
        }
        getValueForPixel(e) {
            return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
        }
        getBasePixel() {
            return this.bottom;
        }
    }
    function S1(t, e) {
        const n = [], { bounds: r, step: s, min: o, max: l, precision: a, count: u, maxTicks: c, maxDigits: d, includeBounds: f } = t, p = s || 1, y = c - 1, { min: v, max: _ } = e, m = !V(o), h = !V(l), x = !V(u), S = (_ - v) / (d + 1);
        let w = Vc((_ - v) / y / p) * p, C, k, b, E;
        if (w < 1e-14 && !m && !h) return [
            {
                value: v
            },
            {
                value: _
            }
        ];
        E = Math.ceil(_ / w) - Math.floor(v / w), E > y && (w = Vc(E * w / y / p) * p), V(a) || (C = Math.pow(10, a), w = Math.ceil(w * C) / C), r === "ticks" ? (k = Math.floor(v / w) * w, b = Math.ceil(_ / w) * w) : (k = v, b = _), m && h && s && u0((l - o) / s, w / 1e3) ? (E = Math.round(Math.min((l - o) / w, c)), w = (l - o) / E, k = o, b = l) : x ? (k = m ? o : k, b = h ? l : b, E = u - 1, w = (b - k) / E) : (E = (b - k) / w, Xi(E, Math.round(E), w / 1e3) ? E = Math.round(E) : E = Math.ceil(E));
        const P = Math.max(Uc(w), Uc(k));
        C = Math.pow(10, V(a) ? P : a), k = Math.round(k * C) / C, b = Math.round(b * C) / C;
        let j = 0;
        for(m && (f && k !== o ? (n.push({
            value: o
        }), k < o && j++, Xi(Math.round((k + j * w) * C) / C, o, Bd(o, S, t)) && j++) : k < o && j++); j < E; ++j){
            const L = Math.round((k + j * w) * C) / C;
            if (h && L > l) break;
            n.push({
                value: L
            });
        }
        return h && f && b !== l ? n.length && Xi(n[n.length - 1].value, l, Bd(l, S, t)) ? n[n.length - 1].value = l : n.push({
            value: l
        }) : (!h || b === l) && n.push({
            value: b
        }), n;
    }
    function Bd(t, e, { horizontal: n, minRotation: i }) {
        const r = mn(i), s = (n ? Math.sin(r) : Math.cos(r)) || .001, o = .75 * e * ("" + t).length;
        return Math.min(e / s, o);
    }
    class w1 extends gi {
        constructor(e){
            super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
        }
        parse(e, n) {
            return V(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
        }
        handleTickRangeOptions() {
            const { beginAtZero: e } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
            let { min: r, max: s } = this;
            const o = (a)=>r = n ? r : a, l = (a)=>s = i ? s : a;
            if (e) {
                const a = li(r), u = li(s);
                a < 0 && u < 0 ? l(0) : a > 0 && u > 0 && o(0);
            }
            if (r === s) {
                let a = s === 0 ? 1 : Math.abs(s * .05);
                l(s + a), e || o(r - a);
            }
            this.min = r, this.max = s;
        }
        getTickLimit() {
            const e = this.options.ticks;
            let { maxTicksLimit: n, stepSize: i } = e, r;
            return i ? (r = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, r > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`), r = 1e3)) : (r = this.computeTickLimit(), n = n || 11), n && (r = Math.min(n, r)), r;
        }
        computeTickLimit() {
            return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
            const e = this.options, n = e.ticks;
            let i = this.getTickLimit();
            i = Math.max(2, i);
            const r = {
                maxTicks: i,
                bounds: e.bounds,
                min: e.min,
                max: e.max,
                precision: n.precision,
                step: n.stepSize,
                count: n.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: n.minRotation || 0,
                includeBounds: n.includeBounds !== !1
            }, s = this._range || this, o = S1(r, s);
            return e.bounds === "ticks" && c0(o, this, "value"), e.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
        }
        configure() {
            const e = this.ticks;
            let n = this.min, i = this.max;
            if (super.configure(), this.options.offset && e.length) {
                const r = (i - n) / Math.max(e.length - 1, 1) / 2;
                n -= r, i += r;
            }
            this._startValue = n, this._endValue = i, this._valueRange = i - n;
        }
        getLabelForValue(e) {
            return Ep(e, this.chart.options.locale, this.options.ticks.format);
        }
    }
    class So extends w1 {
        static id = "linear";
        static defaults = {
            ticks: {
                callback: Pp.formatters.numeric
            }
        };
        determineDataLimits() {
            const { min: e, max: n } = this.getMinMax(!0);
            this.min = Je(e) ? e : 0, this.max = Je(n) ? n : 1, this.handleTickRangeOptions();
        }
        computeTickLimit() {
            const e = this.isHorizontal(), n = e ? this.width : this.height, i = mn(this.options.ticks.minRotation), r = (e ? Math.sin(i) : Math.cos(i)) || .001, s = this._resolveTickFontOptions(0);
            return Math.ceil(n / Math.min(40, s.lineHeight / r));
        }
        getPixelForValue(e) {
            return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
        }
        getValueForPixel(e) {
            return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
        }
    }
    const wo = {
        millisecond: {
            common: !0,
            size: 1,
            steps: 1e3
        },
        second: {
            common: !0,
            size: 1e3,
            steps: 60
        },
        minute: {
            common: !0,
            size: 6e4,
            steps: 60
        },
        hour: {
            common: !0,
            size: 36e5,
            steps: 24
        },
        day: {
            common: !0,
            size: 864e5,
            steps: 30
        },
        week: {
            common: !1,
            size: 6048e5,
            steps: 4
        },
        month: {
            common: !0,
            size: 2628e6,
            steps: 12
        },
        quarter: {
            common: !1,
            size: 7884e6,
            steps: 4
        },
        year: {
            common: !0,
            size: 3154e7
        }
    }, Oe = Object.keys(wo);
    function Hd(t, e) {
        return t - e;
    }
    function Wd(t, e) {
        if (V(e)) return null;
        const n = t._adapter, { parser: i, round: r, isoWeekday: s } = t._parseOpts;
        let o = e;
        return typeof i == "function" && (o = i(o)), Je(o) || (o = typeof i == "string" ? n.parse(o, i) : n.parse(o)), o === null ? null : (r && (o = r === "week" && (ai(s) || s === !0) ? n.startOf(o, "isoWeek", s) : n.startOf(o, r)), +o);
    }
    function Vd(t, e, n, i) {
        const r = Oe.length;
        for(let s = Oe.indexOf(t); s < r - 1; ++s){
            const o = wo[Oe[s]], l = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
            if (o.common && Math.ceil((n - e) / (l * o.size)) <= i) return Oe[s];
        }
        return Oe[r - 1];
    }
    function k1(t, e, n, i, r) {
        for(let s = Oe.length - 1; s >= Oe.indexOf(n); s--){
            const o = Oe[s];
            if (wo[o].common && t._adapter.diff(r, i, o) >= e - 1) return o;
        }
        return Oe[n ? Oe.indexOf(n) : 0];
    }
    function b1(t) {
        for(let e = Oe.indexOf(t) + 1, n = Oe.length; e < n; ++e)if (wo[Oe[e]].common) return Oe[e];
    }
    function Ud(t, e, n) {
        if (!n) t[e] = !0;
        else if (n.length) {
            const { lo: i, hi: r } = su(n, e), s = n[i] >= e ? n[i] : n[r];
            t[s] = !0;
        }
    }
    function C1(t, e, n, i) {
        const r = t._adapter, s = +r.startOf(e[0].value, i), o = e[e.length - 1].value;
        let l, a;
        for(l = s; l <= o; l = +r.add(l, 1, i))a = n[l], a >= 0 && (e[a].major = !0);
        return e;
    }
    function $d(t, e, n) {
        const i = [], r = {}, s = e.length;
        let o, l;
        for(o = 0; o < s; ++o)l = e[o], r[l] = o, i.push({
            value: l,
            major: !1
        });
        return s === 0 || !n ? i : C1(t, i, r, n);
    }
    class Yd extends gi {
        static id = "time";
        static defaults = {
            bounds: "data",
            adapters: {},
            time: {
                parser: !1,
                unit: !1,
                round: !1,
                isoWeekday: !1,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                source: "auto",
                callback: !1,
                major: {
                    enabled: !1
                }
            }
        };
        constructor(e){
            super(e), this._cache = {
                data: [],
                labels: [],
                all: []
            }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
        }
        init(e, n = {}) {
            const i = e.time || (e.time = {}), r = this._adapter = new Hx._date(e.adapters.date);
            r.init(n), Yi(i.displayFormats, r.formats()), this._parseOpts = {
                parser: i.parser,
                round: i.round,
                isoWeekday: i.isoWeekday
            }, super.init(e), this._normalized = n.normalized;
        }
        parse(e, n) {
            return e === void 0 ? null : Wd(this, e);
        }
        beforeLayout() {
            super.beforeLayout(), this._cache = {
                data: [],
                labels: [],
                all: []
            };
        }
        determineDataLimits() {
            const e = this.options, n = this._adapter, i = e.time.unit || "day";
            let { min: r, max: s, minDefined: o, maxDefined: l } = this.getUserBounds();
            function a(u) {
                !o && !isNaN(u.min) && (r = Math.min(r, u.min)), !l && !isNaN(u.max) && (s = Math.max(s, u.max));
            }
            (!o || !l) && (a(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && a(this.getMinMax(!1))), r = Je(r) && !isNaN(r) ? r : +n.startOf(Date.now(), i), s = Je(s) && !isNaN(s) ? s : +n.endOf(Date.now(), i) + 1, this.min = Math.min(r, s - 1), this.max = Math.max(r + 1, s);
        }
        _getLabelBounds() {
            const e = this.getLabelTimestamps();
            let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
            return e.length && (n = e[0], i = e[e.length - 1]), {
                min: n,
                max: i
            };
        }
        buildTicks() {
            const e = this.options, n = e.time, i = e.ticks, r = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
            e.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
            const s = this.min, o = this.max, l = m0(r, s, o);
            return this._unit = n.unit || (i.autoSkip ? Vd(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : k1(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : b1(this._unit), this.initOffsets(r), e.reverse && l.reverse(), $d(this, l, this._majorUnit);
        }
        afterAutoSkip() {
            this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e)=>+e.value));
        }
        initOffsets(e = []) {
            let n = 0, i = 0, r, s;
            this.options.offset && e.length && (r = this.getDecimalForValue(e[0]), e.length === 1 ? n = 1 - r : n = (this.getDecimalForValue(e[1]) - r) / 2, s = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? i = s : i = (s - this.getDecimalForValue(e[e.length - 2])) / 2);
            const o = e.length < 3 ? .5 : .25;
            n = Xe(n, 0, o), i = Xe(i, 0, o), this._offsets = {
                start: n,
                end: i,
                factor: 1 / (n + 1 + i)
            };
        }
        _generate() {
            const e = this._adapter, n = this.min, i = this.max, r = this.options, s = r.time, o = s.unit || Vd(s.minUnit, n, i, this._getLabelCapacity(n)), l = I(r.ticks.stepSize, 1), a = o === "week" ? s.isoWeekday : !1, u = ai(a) || a === !0, c = {};
            let d = n, f, p;
            if (u && (d = +e.startOf(d, "isoWeek", a)), d = +e.startOf(d, u ? "day" : o), e.diff(i, n, o) > 1e5 * l) throw new Error(n + " and " + i + " are too far apart with stepSize of " + l + " " + o);
            const y = r.ticks.source === "data" && this.getDataTimestamps();
            for(f = d, p = 0; f < i; f = +e.add(f, l, o), p++)Ud(c, f, y);
            return (f === i || r.bounds === "ticks" || p === 1) && Ud(c, f, y), Object.keys(c).sort(Hd).map((v)=>+v);
        }
        getLabelForValue(e) {
            const n = this._adapter, i = this.options.time;
            return i.tooltipFormat ? n.format(e, i.tooltipFormat) : n.format(e, i.displayFormats.datetime);
        }
        format(e, n) {
            const r = this.options.time.displayFormats, s = this._unit, o = n || r[s];
            return this._adapter.format(e, o);
        }
        _tickFormatFunction(e, n, i, r) {
            const s = this.options, o = s.ticks.callback;
            if (o) return Q(o, [
                e,
                n,
                i
            ], this);
            const l = s.time.displayFormats, a = this._unit, u = this._majorUnit, c = a && l[a], d = u && l[u], f = i[n], p = u && d && f && f.major;
            return this._adapter.format(e, r || (p ? d : c));
        }
        generateTickLabels(e) {
            let n, i, r;
            for(n = 0, i = e.length; n < i; ++n)r = e[n], r.label = this._tickFormatFunction(r.value, n, e);
        }
        getDecimalForValue(e) {
            return e === null ? NaN : (e - this.min) / (this.max - this.min);
        }
        getPixelForValue(e) {
            const n = this._offsets, i = this.getDecimalForValue(e);
            return this.getPixelForDecimal((n.start + i) * n.factor);
        }
        getValueForPixel(e) {
            const n = this._offsets, i = this.getDecimalForPixel(e) / n.factor - n.end;
            return this.min + i * (this.max - this.min);
        }
        _getLabelSize(e) {
            const n = this.options.ticks, i = this.ctx.measureText(e).width, r = mn(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(r), o = Math.sin(r), l = this._resolveTickFontOptions(0).size;
            return {
                w: i * s + l * o,
                h: i * o + l * s
            };
        }
        _getLabelCapacity(e) {
            const n = this.options.time, i = n.displayFormats, r = i[n.unit] || i.millisecond, s = this._tickFormatFunction(e, 0, $d(this, [
                e
            ], this._majorUnit), r), o = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
            return l > 0 ? l : 1;
        }
        getDataTimestamps() {
            let e = this._cache.data || [], n, i;
            if (e.length) return e;
            const r = this.getMatchingVisibleMetas();
            if (this._normalized && r.length) return this._cache.data = r[0].controller.getAllParsedValues(this);
            for(n = 0, i = r.length; n < i; ++n)e = e.concat(r[n].controller.getAllParsedValues(this));
            return this._cache.data = this.normalize(e);
        }
        getLabelTimestamps() {
            const e = this._cache.labels || [];
            let n, i;
            if (e.length) return e;
            const r = this.getLabels();
            for(n = 0, i = r.length; n < i; ++n)e.push(Wd(this, r[n]));
            return this._cache.labels = this._normalized ? e : this.normalize(e);
        }
        normalize(e) {
            return v0(e.sort(Hd));
        }
    }
    function ns(t, e, n) {
        let i = 0, r = t.length - 1, s, o, l, a;
        n ? (e >= t[i].pos && e <= t[r].pos && ({ lo: i, hi: r } = yn(t, "pos", e)), { pos: s, time: l } = t[i], { pos: o, time: a } = t[r]) : (e >= t[i].time && e <= t[r].time && ({ lo: i, hi: r } = yn(t, "time", e)), { time: s, pos: l } = t[i], { time: o, pos: a } = t[r]);
        const u = o - s;
        return u ? l + (a - l) * (e - s) / u : l;
    }
    class U1 extends Yd {
        static id = "timeseries";
        static defaults = Yd.defaults;
        constructor(e){
            super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
        }
        initOffsets() {
            const e = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(e);
            this._minPos = ns(n, this.min), this._tableRange = ns(n, this.max) - this._minPos, super.initOffsets(e);
        }
        buildLookupTable(e) {
            const { min: n, max: i } = this, r = [], s = [];
            let o, l, a, u, c;
            for(o = 0, l = e.length; o < l; ++o)u = e[o], u >= n && u <= i && r.push(u);
            if (r.length < 2) return [
                {
                    time: n,
                    pos: 0
                },
                {
                    time: i,
                    pos: 1
                }
            ];
            for(o = 0, l = r.length; o < l; ++o)c = r[o + 1], a = r[o - 1], u = r[o], Math.round((c + a) / 2) !== u && s.push({
                time: u,
                pos: o / (l - 1)
            });
            return s;
        }
        _generate() {
            const e = this.min, n = this.max;
            let i = super.getDataTimestamps();
            return (!i.includes(e) || !i.length) && i.splice(0, 0, e), (!i.includes(n) || i.length === 1) && i.push(n), i.sort((r, s)=>r - s);
        }
        _getTimestampsForTable() {
            let e = this._cache.all || [];
            if (e.length) return e;
            const n = this.getDataTimestamps(), i = this.getLabelTimestamps();
            return n.length && i.length ? e = this.normalize(n.concat(i)) : e = n.length ? n : i, e = this._cache.all = e, e;
        }
        getDecimalForValue(e) {
            return (ns(this._table, e) - this._minPos) / this._tableRange;
        }
        getValueForPixel(e) {
            const n = this._offsets, i = this.getDecimalForPixel(e) / n.factor - n.end;
            return ns(this._table, i * this._tableRange + this._minPos, !0);
        }
    }
    const tg = "label";
    function Xd(t, e) {
        typeof t == "function" ? t(e) : t && (t.current = e);
    }
    function M1(t, e) {
        const n = t.options;
        n && e && Object.assign(n, e);
    }
    function ng(t, e) {
        t.labels = e;
    }
    function ig(t, e, n = tg) {
        const i = [];
        t.datasets = e.map((r)=>{
            const s = t.datasets.find((o)=>o[n] === r[n]);
            return !s || !r.data || i.includes(s) ? {
                ...r
            } : (i.push(s), Object.assign(s, r), s);
        });
    }
    function E1(t, e = tg) {
        const n = {
            labels: [],
            datasets: []
        };
        return ng(n, t.labels), ig(n, t.datasets, e), n;
    }
    function P1(t, e) {
        const { height: n = 150, width: i = 300, redraw: r = !1, datasetIdKey: s, type: o, data: l, options: a, plugins: u = [], fallbackContent: c, updateMode: d, ...f } = t, p = A.useRef(null), y = A.useRef(null), v = ()=>{
            p.current && (y.current = new jn(p.current, {
                type: o,
                data: E1(l, s),
                options: a && {
                    ...a
                },
                plugins: u
            }), Xd(e, y.current));
        }, _ = ()=>{
            Xd(e, null), y.current && (y.current.destroy(), y.current = null);
        };
        return A.useEffect(()=>{
            !r && y.current && a && M1(y.current, a);
        }, [
            r,
            a
        ]), A.useEffect(()=>{
            !r && y.current && ng(y.current.config.data, l.labels);
        }, [
            r,
            l.labels
        ]), A.useEffect(()=>{
            !r && y.current && l.datasets && ig(y.current.config.data, l.datasets, s);
        }, [
            r,
            l.datasets
        ]), A.useEffect(()=>{
            y.current && (r ? (_(), setTimeout(v)) : y.current.update(d));
        }, [
            r,
            a,
            l.labels,
            l.datasets,
            d
        ]), A.useEffect(()=>{
            y.current && (_(), setTimeout(v));
        }, [
            o
        ]), A.useEffect(()=>(v(), ()=>_()), []), g.jsx("canvas", {
            ref: p,
            role: "img",
            height: n,
            width: i,
            ...f,
            children: c
        });
    }
    const D1 = A.forwardRef(P1);
    function rg(t, e) {
        return jn.register(e), A.forwardRef((n, i)=>g.jsx(D1, {
                ...n,
                ref: i,
                type: t
            }));
    }
    const xu = rg("line", Ax), T1 = rg("scatter", Bx);
    jn.register(vu, So, vo, yo, yu, _o, xo);
    function j1({ pHitByRange: t }) {
        const e = A.useMemo(()=>{
            const i = Object.keys(t).sort((s, o)=>Number(s) - Number(o)), r = i.map((s)=>(t[Number(s)] * 100).toFixed(1));
            return {
                labels: i,
                datasets: [
                    {
                        label: "Probability of Hit (%)",
                        data: r,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        tension: .1
                    }
                ]
            };
        }, [
            t
        ]), n = {
            responsive: !0,
            maintainAspectRatio: !0,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: !0,
                    text: "Hit Probability vs Range"
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: !0,
                        text: "P(hit) %"
                    }
                },
                x: {
                    title: {
                        display: !0,
                        text: "Range (yards)"
                    }
                }
            }
        };
        return g.jsx(xu, {
            options: n,
            data: e
        });
    }
    jn.register(So, vo, yo, _o, xo);
    function Qd({ impactPoints: t, targetWidth: e, targetHeight: n, meanX: i, meanY: r, maxRange: s, pHitAtMaxRange: o }) {
        const { chartData: l, axisLimit: a } = A.useMemo(()=>{
            const c = t.map((S)=>({
                    x: S.x - i,
                    y: S.y - r
                })), d = e / 2, f = n / 2, p = [
                {
                    x: -d,
                    y: f
                },
                {
                    x: d,
                    y: f
                },
                {
                    x: d,
                    y: -f
                },
                {
                    x: -d,
                    y: -f
                },
                {
                    x: -d,
                    y: f
                }
            ], y = [
                {
                    x: 0,
                    y: 0
                }
            ], v = [
                ...c.map((S)=>Math.abs(S.x)),
                d
            ], _ = [
                ...c.map((S)=>Math.abs(S.y)),
                f
            ], m = Math.max(...v), h = Math.max(..._), x = Math.max(m, h) * 1.2;
            return {
                chartData: {
                    datasets: [
                        {
                            label: "Target Outline",
                            data: p,
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.1)",
                            showLine: !0,
                            fill: !1,
                            pointRadius: 0,
                            borderWidth: 2
                        },
                        {
                            label: "Impact Points",
                            data: c,
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                            borderColor: "rgba(53, 162, 235, 0.8)",
                            pointRadius: 3,
                            pointHoverRadius: 5
                        },
                        {
                            label: "Mean Point of Impact",
                            data: y,
                            backgroundColor: "rgb(255, 206, 86)",
                            borderColor: "rgb(255, 159, 64)",
                            pointRadius: 15,
                            pointStyle: "crossRot",
                            pointHoverRadius: 18,
                            borderWidth: 4
                        }
                    ]
                },
                axisLimit: x
            };
        }, [
            t,
            e,
            n,
            i,
            r
        ]), u = {
            responsive: !0,
            maintainAspectRatio: !0,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: !0,
                    text: s && o !== void 0 ? `Impact Distribution at ${s} yards - P(hit) = ${(o * 100).toFixed(1)}%` : "Impact Distribution at Target"
                },
                tooltip: {
                    callbacks: {
                        label: function(c) {
                            return c.dataset.label === "Impact Points" && c.parsed.x !== null && c.parsed.y !== null ? `(${c.parsed.x.toFixed(1)}", ${c.parsed.y.toFixed(1)}")` : c.dataset.label || "";
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                    min: -a,
                    max: a,
                    title: {
                        display: !0,
                        text: "Horizontal Displacement (inches)"
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                },
                y: {
                    type: "linear",
                    min: -a,
                    max: a,
                    title: {
                        display: !0,
                        text: "Vertical Displacement (inches)"
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            }
        };
        return g.jsx(T1, {
            options: u,
            data: l
        });
    }
    function O1() {
        const { simulationResult: t, simulationProgress: e, isSimulating: n, monteCarloConfig: i } = pi(), r = ()=>{
            if (!t) return;
            const u = new Date().toISOString().split("T")[0];
            bv(t, {
                width: i.target.width,
                height: i.target.height
            }, `monte-carlo-${u}.csv`);
        };
        if (n && e) return g.jsxs("div", {
            className: "simulation-results",
            children: [
                g.jsx("h2", {
                    children: "Running Simulation..."
                }),
                g.jsx("div", {
                    className: "progress-bar",
                    children: g.jsx("div", {
                        className: "progress-fill",
                        style: {
                            width: `${e.percentage}%`
                        }
                    })
                }),
                g.jsxs("p", {
                    children: [
                        e.completed,
                        " / ",
                        e.total,
                        " iterations (",
                        e.percentage.toFixed(1),
                        "%)"
                    ]
                })
            ]
        });
        if (!t) return g.jsx("div", {
            className: "simulation-results",
            children: g.jsx("p", {
                children: "No simulation data. Run Monte Carlo simulation to see results."
            })
        });
        const s = i.maxRange, o = t.pHitByRange[s], a = (()=>{
            const u = i.target.width / 2, c = i.target.height / 2, d = t.ballisticImpactPoints.filter((v)=>Math.abs(v.range - s) < i.rangeStep / 2);
            if (d.length === 0) return 0;
            const f = t.statisticsBallisticOnly.mean.x, p = t.statisticsBallisticOnly.mean.y;
            return d.filter((v)=>{
                const _ = v.x - f, m = v.y - p;
                return Math.abs(_) <= u && Math.abs(m) <= c;
            }).length / d.length;
        })();
        return g.jsxs("div", {
            className: "simulation-results",
            children: [
                g.jsx("h2", {
                    children: "Simulation Results"
                }),
                g.jsxs("div", {
                    className: "charts-grid",
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                        gap: "20px",
                        marginBottom: "20px"
                    },
                    children: [
                        g.jsxs("div", {
                            className: "chart-container",
                            children: [
                                g.jsx("h3", {
                                    children: "External Ballistic Uncertainties"
                                }),
                                g.jsx("p", {
                                    style: {
                                        fontSize: "0.9em",
                                        color: "#666",
                                        marginBottom: "10px"
                                    },
                                    children: "Wind, velocity, range, BC, (minus rifle precision)"
                                }),
                                g.jsx(Qd, {
                                    impactPoints: t.ballisticImpactPoints,
                                    targetWidth: i.target.width,
                                    targetHeight: i.target.height,
                                    meanX: t.statisticsBallisticOnly.mean.x,
                                    meanY: t.statisticsBallisticOnly.mean.y,
                                    maxRange: s,
                                    pHitAtMaxRange: a
                                })
                            ]
                        }),
                        g.jsxs("div", {
                            className: "chart-container",
                            children: [
                                g.jsx("h3", {
                                    children: "Total Dispersion"
                                }),
                                g.jsx("p", {
                                    style: {
                                        fontSize: "0.9em",
                                        color: "#666",
                                        marginBottom: "10px"
                                    },
                                    children: "Ballistic uncertainties + rifle precision (Mean Radius)"
                                }),
                                g.jsx(Qd, {
                                    impactPoints: t.impactPoints,
                                    targetWidth: i.target.width,
                                    targetHeight: i.target.height,
                                    meanX: t.statistics.mean.x,
                                    meanY: t.statistics.mean.y,
                                    maxRange: s,
                                    pHitAtMaxRange: o
                                })
                            ]
                        }),
                        g.jsxs("div", {
                            className: "chart-container",
                            children: [
                                g.jsx("h3", {
                                    children: "Hit Probability vs Range"
                                }),
                                g.jsx("p", {
                                    style: {
                                        fontSize: "0.9em",
                                        color: "#666",
                                        marginBottom: "10px"
                                    },
                                    children: "Probability of hitting target at different ranges"
                                }),
                                g.jsx(j1, {
                                    pHitByRange: t.pHitByRange
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "phit-table",
                    children: [
                        g.jsx("h3", {
                            children: "Probability of Hit by Range"
                        }),
                        g.jsxs("table", {
                            children: [
                                g.jsx("thead", {
                                    children: g.jsxs("tr", {
                                        children: [
                                            g.jsx("th", {
                                                children: "Range (yards)"
                                            }),
                                            g.jsx("th", {
                                                children: "P(hit) %"
                                            })
                                        ]
                                    })
                                }),
                                g.jsx("tbody", {
                                    children: Object.keys(t.pHitByRange).sort((u, c)=>Number(u) - Number(c)).map((u)=>g.jsxs("tr", {
                                            children: [
                                                g.jsx("td", {
                                                    children: u
                                                }),
                                                g.jsxs("td", {
                                                    children: [
                                                        (t.pHitByRange[Number(u)] * 100).toFixed(1),
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        }, u))
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "stats-text",
                    children: [
                        g.jsx("h3", {
                            children: "Statistical Summary"
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Computation Time:"
                                }),
                                " ",
                                (t.computationTime / 1e3).toFixed(2),
                                "s"
                            ]
                        }),
                        g.jsx("h4", {
                            children: "External Ballistic Uncertainties:"
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Mean Impact X:"
                                }),
                                " ",
                                t.statisticsBallisticOnly.mean.x.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Mean Impact Y:"
                                }),
                                " ",
                                t.statisticsBallisticOnly.mean.y.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Std Dev X (horizontal):"
                                }),
                                " ",
                                t.statisticsBallisticOnly.standardDeviation.x.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Std Dev Y (vertical):"
                                }),
                                " ",
                                t.statisticsBallisticOnly.standardDeviation.y.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsx("h4", {
                            children: "Total Dispersion (Ballistic + Rifle Precision):"
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Mean Impact X:"
                                }),
                                " ",
                                t.statistics.mean.x.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Mean Impact Y:"
                                }),
                                " ",
                                t.statistics.mean.y.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Std Dev X (horizontal):"
                                }),
                                " ",
                                t.statistics.standardDeviation.x.toFixed(2),
                                " in"
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Std Dev Y (vertical):"
                                }),
                                " ",
                                t.statistics.standardDeviation.y.toFixed(2),
                                " in"
                            ]
                        })
                    ]
                }),
                g.jsx("div", {
                    style: {
                        marginTop: "2rem",
                        textAlign: "center"
                    },
                    children: g.jsx("button", {
                        onClick: r,
                        style: {
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: 600
                        },
                        children: "Export CSV"
                    })
                })
            ]
        });
    }
    function R1() {
        return g.jsxs("div", {
            className: "information-content",
            children: [
                g.jsx("h2", {
                    children: "OpenWEZ - Ballistic Modeling Tool"
                }),
                g.jsxs("section", {
                    className: "info-section",
                    children: [
                        g.jsx("h3", {
                            children: "Tool Overview"
                        }),
                        g.jsx("p", {
                            children: "OpenWEZ is a ballistic modeling tool that calculates projectile trajectories and estimates weapon employment zones through Monte Carlo simulation. The tool accounts for environmental conditions, projectile characteristics, and various sources of uncertainty."
                        })
                    ]
                }),
                g.jsxs("section", {
                    className: "info-section disclaimer",
                    children: [
                        g.jsx("h3", {
                            children: "⚠️ Disclaimer"
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "This tool is provided for educational and informational purposes only."
                                }),
                                " OpenWEZ is experimental software developed for learning ballistics modeling techniques and should not be used as the sole basis for critical shooting applications."
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "No Warranty:"
                                }),
                                " The developers make no guarantees regarding the accuracy, reliability, or correctness of the ballistic calculations or simulation results. Output values may contain errors or deviate from real-world performance due to model simplifications, numerical approximations, or implementation limitations."
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Validation Required:"
                                }),
                                " Users are strongly encouraged to validate all outputs against established commercial ballistic software (such as Applied Ballistics, Strelok Pro, or JBM Ballistics) and real-world field testing. Do not rely on OpenWEZ predictions for hunting, competition, or tactical applications without independent verification."
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "User Responsibility:"
                                }),
                                " Safe firearm handling, proper ballistic data collection, and verification of trajectory predictions are the sole responsibility of the user. Always follow established safety protocols and use multiple sources of data for important applications."
                            ]
                        })
                    ]
                }),
                g.jsxs("section", {
                    className: "info-section",
                    children: [
                        g.jsx("h3", {
                            children: "Using the Tool"
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Trajectory Calculator:"
                                }),
                                ' Computes a single trajectory based on your inputs. Enter projectile characteristics (weight, ballistic coefficient, muzzle velocity), environmental conditions (temperature, pressure, wind), and rifle settings (zero range, sight height). Click "Calculate Trajectory" to see the ballistic path.'
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Trajectory Comparison:"
                                }),
                                " Compare up to 4 different loads side-by-side using the same environmental conditions and rifle settings. This tool helps you visualize how different bullet weights, velocities, and ballistic coefficients affect trajectory, drift, velocity retention, and energy delivery at various ranges."
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Monte Carlo Simulation:"
                                }),
                                ' Runs multiple trajectory simulations with random variations in wind, velocity, and range to estimate hit probability on a target. Configure the number of iterations, uncertainties, target size, and rifle precision (Mean Radius), then click "Run Monte Carlo" to see probabilistic results.'
                            ]
                        })
                    ]
                }),
                g.jsxs("section", {
                    className: "info-section",
                    children: [
                        g.jsx("h3", {
                            children: "Wind Convention"
                        }),
                        g.jsx("p", {
                            children: "Wind direction is specified using the following convention:"
                        }),
                        g.jsxs("ul", {
                            children: [
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "0 degrees"
                                        }),
                                        " = Headwind (wind from shooter to target)"
                                    ]
                                }),
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "90 degrees"
                                        }),
                                        " = Right-to-left crosswind"
                                    ]
                                }),
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "180 degrees"
                                        }),
                                        " = Tailwind (wind from target to shooter)"
                                    ]
                                }),
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "270 degrees"
                                        }),
                                        " = Left-to-right crosswind"
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("section", {
                    className: "info-section",
                    children: [
                        g.jsx("h3", {
                            children: "Default Parameters"
                        }),
                        g.jsxs("ul", {
                            children: [
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "Sight Height (Height Over Bore):"
                                        }),
                                        " Default is 1.5 inches. This represents the vertical distance from the center of the bore to the center of the scope or sights. Adjust this value if your rifle has a different configuration (higher scope mounts, offset iron sights, or chassis systems with raised optics)."
                                    ]
                                }),
                                g.jsxs("li", {
                                    children: [
                                        g.jsx("strong", {
                                            children: "Relative Humidity:"
                                        }),
                                        " Fixed at 50% for all calculations. Humidity has a negligible effect on trajectory compared to other atmospheric variables like temperature and pressure. Even across the full range from 0% to 100% humidity, the impact on air density is less than 7%, which translates to minimal changes in bullet drop and drift. To simplify the interface and reduce unnecessary input complexity, humidity is held constant at a typical mid-range value. This assumption does not meaningfully affect ballistic accuracy for practical shooting applications."
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                g.jsxs("section", {
                    className: "info-section",
                    children: [
                        g.jsx("h3", {
                            children: "Rifle Precision: Mean Radius (MR)"
                        }),
                        g.jsx("p", {
                            children: "Mean Radius (MR) is a measure of rifle/ammunition precision that represents the average distance of shot impacts from the group center. Unlike other metrics (like group size or MOA), MR provides a more robust statistical measure of dispersion that is less sensitive to outliers and works well for modeling random shot placement in Monte Carlo simulations."
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Obtaining MR:"
                                }),
                                " Ideally, Mean Radius should be determined from actual shooting tests with your specific rifle and ammunition. Calculate it by measuring the distance of each shot from the group center and taking the average of those distances."
                            ]
                        }),
                        g.jsxs("p", {
                            children: [
                                g.jsx("strong", {
                                    children: "Approximate Conversion:"
                                }),
                                " If you only have Extreme Spread (ES) data, you can use this rough approximation:"
                            ]
                        }),
                        g.jsx("div", {
                            className: "conversion-formula",
                            children: g.jsx("strong", {
                                children: "MR ≈ ES × 0.3"
                            })
                        }),
                        g.jsx("p", {
                            className: "note",
                            children: "Note: This conversion factor is approximate and assumes a normal distribution. Actual testing is recommended for accurate results."
                        })
                    ]
                })
            ]
        });
    }
    const L1 = "modulepreload", z1 = function(t) {
        return "/OpenWEZ/" + t;
    }, Kd = {}, I1 = function(e, n, i) {
        let r = Promise.resolve();
        if (n && n.length > 0) {
            document.getElementsByTagName("link");
            const o = document.querySelector("meta[property=csp-nonce]"), l = o?.nonce || o?.getAttribute("nonce");
            r = Promise.allSettled(n.map((a)=>{
                if (a = z1(a), a in Kd) return;
                Kd[a] = !0;
                const u = a.endsWith(".css"), c = u ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${a}"]${c}`)) return;
                const d = document.createElement("link");
                if (d.rel = u ? "stylesheet" : L1, u || (d.as = "script"), d.crossOrigin = "", d.href = a, l && d.setAttribute("nonce", l), document.head.appendChild(d), u) return new Promise((f, p)=>{
                    d.addEventListener("load", f), d.addEventListener("error", ()=>p(new Error(`Unable to preload CSS for ${a}`)));
                });
            }));
        }
        function s(o) {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = o, window.dispatchEvent(l), !l.defaultPrevented) throw o;
        }
        return r.then((o)=>{
            for (const l of o || [])l.status === "rejected" && s(l.reason);
            return e().catch(s);
        });
    };
    let Gs = null;
    async function sg() {
        if (!Gs) try {
            console.log("Starting WASM initialization..."), console.log("Importing WASM module...");
            const t = await I1(()=>import("./wasm_ballistics-C_pcjIA-.js"), []);
            console.log("WASM module imported:", t), console.log("Calling wasm.default() to load binary..."), await t.default(), console.log("WASM binary loaded successfully"), console.log("Calling wasm.initialize()..."), t.initialize(), console.log("WASM initialize() called"), Gs = t, console.log("WASM ballistic engine initialized successfully!");
        } catch (t) {
            throw console.error("WASM initialization error details:", t), console.error("Error type:", typeof t), console.error("Error message:", t instanceof Error ? t.message : String(t)), console.error("Error stack:", t instanceof Error ? t.stack : "No stack"), t;
        }
    }
    async function og(t, e = 1e3, n = 50) {
        Gs || await sg();
        try {
            return Gs.compute_trajectory(t, e, n);
        } catch (i) {
            throw console.error("WASM trajectory computation failed:", i), new Error(`Ballistic calculation failed: ${i}`);
        }
    }
    function N1(t) {
        const e = (t - 32) * 5 / 9 + 273.15;
        return Math.sqrt(1.4 * 287.058 * e) * 3.28084;
    }
    jn.register(vu, So, vo, yo, yu, _o, xo);
    const F1 = [
        {
            label: "Load 1",
            bulletWeight: 168,
            muzzleVelocity: 2800,
            bc: .243,
            dragModel: "G7",
            enabled: !0
        },
        {
            label: "Load 2",
            bulletWeight: 175,
            muzzleVelocity: 2650,
            bc: .262,
            dragModel: "G7",
            enabled: !1
        },
        {
            label: "Load 3",
            bulletWeight: 155,
            muzzleVelocity: 2950,
            bc: .23,
            dragModel: "G7",
            enabled: !1
        },
        {
            label: "Load 4",
            bulletWeight: 150,
            muzzleVelocity: 3e3,
            bc: .225,
            dragModel: "G7",
            enabled: !1
        }
    ], is = [
        {
            border: "rgb(255, 99, 132)",
            bg: "rgba(255, 99, 132, 0.5)"
        },
        {
            border: "rgb(53, 162, 235)",
            bg: "rgba(53, 162, 235, 0.5)"
        },
        {
            border: "rgb(75, 192, 75)",
            bg: "rgba(75, 192, 75, 0.5)"
        },
        {
            border: "rgb(255, 159, 64)",
            bg: "rgba(255, 159, 64, 0.5)"
        }
    ];
    function A1() {
        const { ballisticInputs: t, maxRange: e, rangeStep: n, setError: i } = pi(), [r, s] = A.useState(F1), [o, l] = A.useState([]), [a, u] = A.useState(!1), [c, d] = A.useState("drop"), f = (h, x)=>{
            s((S)=>{
                const w = [
                    ...S
                ];
                return w[h] = {
                    ...w[h],
                    ...x
                }, w;
            });
        }, p = async ()=>{
            u(!0), i(null), await new Promise((h)=>setTimeout(h, 0));
            try {
                const h = r.filter((S)=>S.enabled);
                if (h.length === 0) {
                    i("Please enable at least one load to compare"), u(!1);
                    return;
                }
                const x = await Promise.all(h.map(async (S)=>{
                    const w = {
                        ...t,
                        bulletWeight: S.bulletWeight,
                        muzzleVelocity: S.muzzleVelocity,
                        bc: {
                            value: S.bc,
                            dragModel: S.dragModel
                        }
                    }, C = await og(w, e, n);
                    return {
                        label: S.label,
                        data: C
                    };
                }));
                console.log("Computed trajectories:", x), console.log("Number of loads computed:", x.length), x.length > 0 && (console.log("First trajectory data points:", x[0].data.length), console.log("Sample point:", x[0].data[0])), l(x);
            } catch (h) {
                i(h instanceof Error ? h.message : "Comparison failed");
            } finally{
                u(!1);
            }
        }, y = ()=>{
            const h = new Date().toISOString().split("T")[0];
            Mv(o, `trajectory-comparison-${h}.csv`);
        }, v = {
            labels: o[0]?.data.map((h)=>h.range.toFixed(0)) || [],
            datasets: o.map((h, x)=>{
                let S;
                switch(c){
                    case "drop":
                        S = h.data.map((w)=>w.drop);
                        break;
                    case "drift":
                        S = h.data.map((w)=>w.drift);
                        break;
                    case "velocity":
                        S = h.data.map((w)=>w.velocity);
                        break;
                    case "energy":
                        S = h.data.map((w)=>w.energy);
                        break;
                    default:
                        S = h.data.map((w)=>w.drop);
                }
                return {
                    label: h.label,
                    data: S,
                    borderColor: is[x % is.length].border,
                    backgroundColor: is[x % is.length].bg,
                    borderWidth: 2,
                    pointRadius: 0
                };
            })
        }, _ = ()=>{
            switch(c){
                case "drop":
                    return "Drop (inches)";
                case "drift":
                    return "Drift (inches)";
                case "velocity":
                    return "Velocity (fps)";
                case "energy":
                    return "Energy (ft-lbs)";
            }
        }, m = {
            responsive: !0,
            maintainAspectRatio: !1,
            interaction: {
                mode: "index",
                intersect: !1
            },
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: !0,
                    text: `Load Comparison - ${c.charAt(0).toUpperCase() + c.slice(1)}`
                }
            },
            scales: {
                y: {
                    type: "linear",
                    display: !0,
                    position: "left",
                    title: {
                        display: !0,
                        text: _()
                    }
                },
                x: {
                    title: {
                        display: !0,
                        text: "Range (yards)"
                    }
                }
            }
        };
        return g.jsxs("div", {
            className: "trajectory-comparison",
            children: [
                g.jsxs("div", {
                    className: "comparison-controls",
                    children: [
                        g.jsx("h2", {
                            children: "Load Configurations"
                        }),
                        g.jsx("p", {
                            className: "info-text",
                            children: "Configure up to 4 different loads to compare. Environmental conditions and zero range are shared from the main inputs."
                        }),
                        g.jsx("div", {
                            className: "loads-grid",
                            children: r.map((h, x)=>g.jsxs("div", {
                                    className: `load-config ${h.enabled ? "enabled" : "disabled"}`,
                                    children: [
                                        g.jsxs("div", {
                                            className: "load-header",
                                            children: [
                                                g.jsx("input", {
                                                    type: "checkbox",
                                                    checked: h.enabled,
                                                    onChange: (S)=>f(x, {
                                                            enabled: S.target.checked
                                                        }),
                                                    id: `load-${x}-enabled`
                                                }),
                                                g.jsx("input", {
                                                    type: "text",
                                                    className: "load-label",
                                                    value: h.label,
                                                    onChange: (S)=>f(x, {
                                                            label: S.target.value
                                                        }),
                                                    placeholder: `Load ${x + 1}`
                                                })
                                            ]
                                        }),
                                        h.enabled && g.jsxs("div", {
                                            className: "load-inputs",
                                            children: [
                                                g.jsxs("div", {
                                                    className: "form-group",
                                                    children: [
                                                        g.jsx("label", {
                                                            children: "Bullet Weight (grains)"
                                                        }),
                                                        g.jsx("input", {
                                                            type: "number",
                                                            value: h.bulletWeight,
                                                            onChange: (S)=>{
                                                                const w = S.target.value;
                                                                f(x, {
                                                                    bulletWeight: w === "" ? 0 : Number(w)
                                                                });
                                                            },
                                                            onFocus: (S)=>S.target.select(),
                                                            onBlur: (S)=>{
                                                                (S.target.value === "" || isNaN(Number(S.target.value))) && f(x, {
                                                                    bulletWeight: 168
                                                                });
                                                            }
                                                        })
                                                    ]
                                                }),
                                                g.jsxs("div", {
                                                    className: "form-group",
                                                    children: [
                                                        g.jsx("label", {
                                                            children: "Muzzle Velocity (fps)"
                                                        }),
                                                        g.jsx("input", {
                                                            type: "number",
                                                            value: h.muzzleVelocity,
                                                            onChange: (S)=>{
                                                                const w = S.target.value;
                                                                f(x, {
                                                                    muzzleVelocity: w === "" ? 0 : Number(w)
                                                                });
                                                            },
                                                            onFocus: (S)=>S.target.select(),
                                                            onBlur: (S)=>{
                                                                (S.target.value === "" || isNaN(Number(S.target.value))) && f(x, {
                                                                    muzzleVelocity: 2800
                                                                });
                                                            }
                                                        })
                                                    ]
                                                }),
                                                g.jsxs("div", {
                                                    className: "form-group",
                                                    children: [
                                                        g.jsx("label", {
                                                            children: "Drag Model"
                                                        }),
                                                        g.jsxs("select", {
                                                            value: h.dragModel,
                                                            onChange: (S)=>f(x, {
                                                                    dragModel: S.target.value
                                                                }),
                                                            children: [
                                                                g.jsx("option", {
                                                                    value: "G1",
                                                                    children: "G1 (Standard)"
                                                                }),
                                                                g.jsx("option", {
                                                                    value: "G7",
                                                                    children: "G7 (Boat Tail)"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                g.jsxs("div", {
                                                    className: "form-group",
                                                    children: [
                                                        g.jsxs("label", {
                                                            children: [
                                                                "BC (",
                                                                h.dragModel,
                                                                ")"
                                                            ]
                                                        }),
                                                        g.jsx("input", {
                                                            type: "number",
                                                            step: "0.001",
                                                            value: h.bc,
                                                            onChange: (S)=>{
                                                                const w = S.target.value;
                                                                f(x, {
                                                                    bc: w === "" ? 0 : Number(w)
                                                                });
                                                            },
                                                            onFocus: (S)=>S.target.select(),
                                                            onBlur: (S)=>{
                                                                (S.target.value === "" || isNaN(Number(S.target.value))) && f(x, {
                                                                    bc: .243
                                                                });
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, x))
                        }),
                        g.jsxs("div", {
                            className: "shared-params",
                            children: [
                                g.jsx("h3", {
                                    children: "Shared Parameters"
                                }),
                                g.jsxs("p", {
                                    children: [
                                        "Zero Range: ",
                                        t.zeroRange,
                                        " yards | Sight Height: ",
                                        t.sightHeight,
                                        '" | Wind: ',
                                        t.environment.windSpeed,
                                        " mph @ ",
                                        t.environment.windDirection,
                                        "° | Max Range: ",
                                        e,
                                        " yards | Step: ",
                                        n,
                                        " yards"
                                    ]
                                }),
                                g.jsx("p", {
                                    className: "note",
                                    children: "Modify these in the Trajectory Calculator tab"
                                })
                            ]
                        }),
                        g.jsx("button", {
                            onClick: p,
                            disabled: a,
                            children: a ? "Computing..." : "Compare Trajectories"
                        })
                    ]
                }),
                o.length > 0 && g.jsxs("div", {
                    className: "comparison-results",
                    children: [
                        g.jsxs("div", {
                            className: "metric-selector",
                            children: [
                                g.jsx("button", {
                                    className: c === "drop" ? "active" : "",
                                    onClick: ()=>d("drop"),
                                    children: "Drop"
                                }),
                                g.jsx("button", {
                                    className: c === "drift" ? "active" : "",
                                    onClick: ()=>d("drift"),
                                    children: "Drift"
                                }),
                                g.jsx("button", {
                                    className: c === "velocity" ? "active" : "",
                                    onClick: ()=>d("velocity"),
                                    children: "Velocity"
                                }),
                                g.jsx("button", {
                                    className: c === "energy" ? "active" : "",
                                    onClick: ()=>d("energy"),
                                    children: "Energy"
                                })
                            ]
                        }),
                        g.jsx("div", {
                            className: "chart-container",
                            children: g.jsx(xu, {
                                options: m,
                                data: v
                            }, c)
                        }),
                        g.jsxs("div", {
                            className: "comparison-table",
                            children: [
                                g.jsx("h3", {
                                    children: "Detailed Comparison"
                                }),
                                g.jsx("div", {
                                    className: "table-wrapper",
                                    children: g.jsxs("table", {
                                        children: [
                                            g.jsxs("thead", {
                                                children: [
                                                    g.jsxs("tr", {
                                                        children: [
                                                            g.jsx("th", {
                                                                children: "Range (yd)"
                                                            }),
                                                            o.map((h, x)=>g.jsx("th", {
                                                                    colSpan: 4,
                                                                    style: {
                                                                        borderLeft: "2px solid #ccc"
                                                                    },
                                                                    children: h.label
                                                                }, x))
                                                        ]
                                                    }),
                                                    g.jsxs("tr", {
                                                        children: [
                                                            g.jsx("th", {}),
                                                            o.map((h, x)=>g.jsxs(vs.Fragment, {
                                                                    children: [
                                                                        g.jsx("th", {
                                                                            children: "Drop"
                                                                        }),
                                                                        g.jsx("th", {
                                                                            children: "Drift"
                                                                        }),
                                                                        g.jsx("th", {
                                                                            children: "Vel"
                                                                        }),
                                                                        g.jsx("th", {
                                                                            style: {
                                                                                borderRight: "2px solid #ccc"
                                                                            },
                                                                            children: "Energy"
                                                                        })
                                                                    ]
                                                                }, `${h.label}-header-${x}`))
                                                        ]
                                                    })
                                                ]
                                            }),
                                            g.jsx("tbody", {
                                                children: (()=>{
                                                    const h = N1(t.environment.temperature), x = h * 1.2, S = h * 1, w = o.map((C)=>{
                                                        let k = null, b = null;
                                                        return C.data.forEach((E)=>{
                                                            E.velocity >= x && (k === null || E.range > k) && (k = E.range), E.velocity >= S && (b === null || E.range > b) && (b = E.range);
                                                        }), {
                                                            lastTransonic: k,
                                                            lastSubsonic: b
                                                        };
                                                    });
                                                    return o[0]?.data.map((C, k)=>{
                                                        const b = o[0].data[k].range, E = o[0].data[k + 1]?.range;
                                                        return g.jsxs("tr", {
                                                            children: [
                                                                g.jsx("td", {
                                                                    style: {
                                                                        fontWeight: 600
                                                                    },
                                                                    children: b.toFixed(0)
                                                                }),
                                                                o.map((P, j)=>{
                                                                    const L = P.data?.[k];
                                                                    if (!L) return null;
                                                                    const W = w[j];
                                                                    let he = {};
                                                                    return W.lastTransonic !== null && b <= W.lastTransonic && (!E || E > W.lastTransonic) ? he = {
                                                                        backgroundColor: "#ffcc80"
                                                                    } : W.lastSubsonic !== null && b <= W.lastSubsonic && (!E || E > W.lastSubsonic) && (he = {
                                                                        backgroundColor: "#ef9a9a"
                                                                    }), g.jsxs(vs.Fragment, {
                                                                        children: [
                                                                            g.jsxs("td", {
                                                                                children: [
                                                                                    L.drop.toFixed(1),
                                                                                    '"'
                                                                                ]
                                                                            }),
                                                                            g.jsxs("td", {
                                                                                children: [
                                                                                    L.drift.toFixed(1),
                                                                                    '"'
                                                                                ]
                                                                            }),
                                                                            g.jsx("td", {
                                                                                style: he,
                                                                                children: L.velocity.toFixed(0)
                                                                            }),
                                                                            g.jsx("td", {
                                                                                style: {
                                                                                    borderRight: "2px solid #ccc"
                                                                                },
                                                                                children: L.energy.toFixed(0)
                                                                            })
                                                                        ]
                                                                    }, `${P.label}-${k}-${j}`);
                                                                })
                                                            ]
                                                        }, k);
                                                    });
                                                })()
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        g.jsx("div", {
                            style: {
                                marginTop: "2rem",
                                textAlign: "center"
                            },
                            children: g.jsx("button", {
                                onClick: y,
                                style: {
                                    padding: "0.75rem 1.5rem",
                                    fontSize: "1rem",
                                    backgroundColor: "#2196F3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: 600
                                },
                                children: "Export CSV"
                            })
                        })
                    ]
                })
            ]
        });
    }
    let fn = null;
    function lg() {
        fn || (console.log("[Monte Carlo Agent] Initializing worker..."), fn = new Worker(new URL("/OpenWEZ/assets/monte-carlo.worker-C0EaMiqe.js", import.meta.url), {
            type: "module"
        }), console.log("[Monte Carlo Agent] Worker initialized"));
    }
    async function B1(t, e, n = {}) {
        return fn || lg(), new Promise((i, r)=>{
            if (!fn) {
                r(new Error("Worker not initialized"));
                return;
            }
            console.log("[Monte Carlo Agent] Starting simulation with config:", e), fn.onmessage = (s)=>{
                const { type: o, payload: l } = s.data;
                switch(o){
                    case "PROGRESS_UPDATE":
                        console.log(`[Monte Carlo Agent] Progress: ${l.percentage.toFixed(1)}%`), n.onProgress?.(l);
                        break;
                    case "SIMULATION_COMPLETE":
                        console.log("[Monte Carlo Agent] Simulation complete"), n.onComplete?.(l), i(l);
                        break;
                    case "SIMULATION_ERROR":
                        console.error("[Monte Carlo Agent] Simulation error:", l), n.onError?.(l), r(new Error(l));
                        break;
                }
            }, fn.onerror = (s)=>{
                const o = "Worker error: " + s.message;
                console.error("[Monte Carlo Agent]", o), n.onError?.(o), r(new Error(o));
            }, fn.postMessage({
                type: "RUN_SIMULATION",
                payload: {
                    baseInputs: t,
                    config: e
                }
            });
        });
    }
    jn.register(vu, So, vo, yo, yu, _o, xo);
    function H1({ trajectory: t }) {
        const e = A.useMemo(()=>{
            const i = t.map((l)=>l.range.toFixed(0)), r = t.map((l)=>l.drop), s = t.map((l)=>l.drift), o = t.map((l)=>l.velocity);
            return {
                labels: i,
                datasets: [
                    {
                        label: "Bullet Drop (inches)",
                        data: r,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        yAxisID: "y"
                    },
                    {
                        label: "Wind Drift (inches)",
                        data: s,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        yAxisID: "y"
                    },
                    {
                        label: "Velocity (fps)",
                        data: o,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        yAxisID: "y1"
                    }
                ]
            };
        }, [
            t
        ]), n = {
            responsive: !0,
            interaction: {
                mode: "index",
                intersect: !1
            },
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: !0,
                    text: "Ballistic Trajectory"
                }
            },
            scales: {
                y: {
                    type: "linear",
                    display: !0,
                    position: "left",
                    title: {
                        display: !0,
                        text: "Drop / Drift (inches)"
                    }
                },
                y1: {
                    type: "linear",
                    display: !0,
                    position: "right",
                    title: {
                        display: !0,
                        text: "Velocity (fps)"
                    },
                    grid: {
                        drawOnChartArea: !1
                    }
                }
            }
        };
        return g.jsx(xu, {
            options: n,
            data: e
        });
    }
    function W1() {
        const [t, e] = A.useState(!1), [n, i] = A.useState("trajectory"), { ballisticInputs: r, trajectory: s, setTrajectory: o, setComputing: l, setError: a, isComputing: u, maxRange: c, rangeStep: d, monteCarloConfig: f, setSimulationResult: p, setSimulationProgress: y, setSimulating: v, isSimulating: _ } = pi();
        A.useEffect(()=>{
            sg().then(()=>e(!0)).catch((x)=>console.error("WASM init failed:", x)), lg();
        }, []);
        const m = async ()=>{
            if (!t) {
                a("WASM engine not ready");
                return;
            }
            l(!0), a(null);
            try {
                const x = await og(r, c, d);
                o(x);
            } catch (x) {
                a(x instanceof Error ? x.message : "Calculation failed");
            } finally{
                l(!1);
            }
        }, h = async ()=>{
            if (!t) {
                a("WASM engine not ready");
                return;
            }
            v(!0), a(null), y(null);
            try {
                const x = await B1(r, f, {
                    onProgress: (S)=>y(S)
                });
                p(x);
            } catch (x) {
                a(x instanceof Error ? x.message : "Simulation failed");
            } finally{
                v(!1), y(null);
            }
        };
        return g.jsxs("div", {
            className: "app",
            children: [
                g.jsxs("header", {
                    children: [
                        g.jsx("h1", {
                            children: "OpenWEZ"
                        }),
                        g.jsx("p", {
                            children: "Weapon Employment Zone Ballistic Modeling"
                        }),
                        !t && g.jsx("p", {
                            className: "warning",
                            children: "Loading ballistic engine..."
                        })
                    ]
                }),
                g.jsxs("div", {
                    className: "tabs",
                    children: [
                        g.jsx("button", {
                            className: n === "trajectory" ? "active" : "",
                            onClick: ()=>i("trajectory"),
                            children: "Trajectory Calculator"
                        }),
                        g.jsx("button", {
                            className: n === "comparison" ? "active" : "",
                            onClick: ()=>i("comparison"),
                            children: "Trajectory Comparison"
                        }),
                        g.jsx("button", {
                            className: n === "monte-carlo" ? "active" : "",
                            onClick: ()=>i("monte-carlo"),
                            children: "Monte Carlo Simulation"
                        }),
                        g.jsx("button", {
                            className: n === "information" ? "active" : "",
                            onClick: ()=>i("information"),
                            children: "Information"
                        })
                    ]
                }),
                g.jsx("main", {
                    children: n === "trajectory" ? g.jsxs(g.Fragment, {
                        children: [
                            g.jsxs("div", {
                                className: "controls",
                                children: [
                                    g.jsx(Oc, {}),
                                    g.jsx("button", {
                                        onClick: m,
                                        disabled: u || !t,
                                        children: u ? "Computing..." : "Calculate Trajectory"
                                    })
                                ]
                            }),
                            g.jsxs("div", {
                                className: "results",
                                children: [
                                    s && s.length > 0 && g.jsxs(g.Fragment, {
                                        children: [
                                            g.jsx(H1, {
                                                trajectory: s
                                            }),
                                            g.jsx(Pv, {})
                                        ]
                                    }),
                                    !s && g.jsx("p", {
                                        children: 'No trajectory data. Click "Calculate" to compute.'
                                    })
                                ]
                            })
                        ]
                    }) : n === "comparison" ? g.jsx("div", {
                        className: "comparison-tab",
                        children: g.jsx(A1, {})
                    }) : n === "monte-carlo" ? g.jsxs(g.Fragment, {
                        children: [
                            g.jsxs("div", {
                                className: "controls",
                                children: [
                                    g.jsx(Oc, {}),
                                    g.jsx(Dv, {}),
                                    g.jsx("button", {
                                        onClick: h,
                                        disabled: _ || !t,
                                        children: _ ? "Simulating..." : "Run Monte Carlo"
                                    })
                                ]
                            }),
                            g.jsx("div", {
                                className: "results",
                                children: g.jsx(O1, {})
                            })
                        ]
                    }) : g.jsx("div", {
                        className: "information-tab",
                        children: g.jsx(R1, {})
                    })
                })
            ]
        });
    }
    sl.createRoot(document.getElementById("root")).render(g.jsx(vs.StrictMode, {
        children: g.jsx(W1, {})
    }));
})();
