(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.4.19
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function cs(e, t) {
  const n = new Set(e.split(","));
  return t ? (s) => n.has(s.toLowerCase()) : (s) => n.has(s);
}
const G = {},
  ft = [],
  de = () => {},
  Zo = () => !1,
  cn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  us = (e) => e.startsWith("onUpdate:"),
  re = Object.assign,
  fs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ei = Object.prototype.hasOwnProperty,
  D = (e, t) => ei.call(e, t),
  I = Array.isArray,
  at = (e) => un(e) === "[object Map]",
  Pr = (e) => un(e) === "[object Set]",
  N = (e) => typeof e == "function",
  ee = (e) => typeof e == "string",
  yt = (e) => typeof e == "symbol",
  Y = (e) => e !== null && typeof e == "object",
  Ir = (e) => (Y(e) || N(e)) && N(e.then) && N(e.catch),
  Nr = Object.prototype.toString,
  un = (e) => Nr.call(e),
  ti = (e) => un(e).slice(8, -1),
  Lr = (e) => un(e) === "[object Object]",
  as = (e) =>
    ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ot = cs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  fn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  ni = /-(\w)/g,
  Re = fn((e) => e.replace(ni, (t, n) => (n ? n.toUpperCase() : ""))),
  si = /\B([A-Z])/g,
  _t = fn((e) => e.replace(si, "-$1").toLowerCase()),
  an = fn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Pn = fn((e) => (e ? `on${an(e)}` : "")),
  qe = (e, t) => !Object.is(e, t),
  In = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  tn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ri = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let $s;
const Fr = () =>
  $s ||
  ($s =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function ds(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ee(s) ? ci(s) : ds(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (ee(e) || Y(e)) return e;
}
const oi = /;(?![^(]*\))/g,
  ii = /:([^]+)/,
  li = /\/\*[^]*?\*\//g;
function ci(e) {
  const t = {};
  return (
    e
      .replace(li, "")
      .split(oi)
      .forEach((n) => {
        if (n) {
          const s = n.split(ii);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Rt(e) {
  let t = "";
  if (ee(e)) t = e;
  else if (I(e))
    for (let n = 0; n < e.length; n++) {
      const s = Rt(e[n]);
      s && (t += s + " ");
    }
  else if (Y(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ui =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  fi = cs(ui);
function Mr(e) {
  return !!e || e === "";
}
const ct = (e) =>
    ee(e)
      ? e
      : e == null
        ? ""
        : I(e) || (Y(e) && (e.toString === Nr || !N(e.toString)))
          ? JSON.stringify(e, kr, 2)
          : String(e),
  kr = (e, t) =>
    t && t.__v_isRef
      ? kr(e, t.value)
      : at(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], o) => ((n[Nn(s, o) + " =>"] = r), n),
              {}
            ),
          }
        : Pr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Nn(n)) }
          : yt(t)
            ? Nn(t)
            : Y(t) && !I(t) && !Lr(t)
              ? String(t)
              : t,
  Nn = (e, t = "") => {
    var n;
    return yt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.19
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let me;
class ai {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = me),
      !t && me && (this.index = (me.scopes || (me.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = me;
      try {
        return (me = this), t();
      } finally {
        me = n;
      }
    }
  }
  on() {
    me = this;
  }
  off() {
    me = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function di(e, t = me) {
  t && t.active && t.effects.push(e);
}
function hi() {
  return me;
}
let tt;
class hs {
  constructor(t, n, s, r) {
    (this.fn = t),
      (this.trigger = n),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      di(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      (this._dirtyLevel = 1), rt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (pi(n.computed), this._dirtyLevel >= 4)) break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), ot();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let t = Ve,
      n = tt;
    try {
      return (Ve = !0), (tt = this), this._runnings++, Ds(this), this.fn();
    } finally {
      Hs(this), this._runnings--, (tt = n), (Ve = t);
    }
  }
  stop() {
    var t;
    this.active &&
      (Ds(this),
      Hs(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1));
  }
}
function pi(e) {
  return e.value;
}
function Ds(e) {
  e._trackId++, (e._depsLength = 0);
}
function Hs(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Ur(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Ur(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let Ve = !0,
  Kn = 0;
const jr = [];
function rt() {
  jr.push(Ve), (Ve = !1);
}
function ot() {
  const e = jr.pop();
  Ve = e === void 0 ? !0 : e;
}
function ps() {
  Kn++;
}
function ms() {
  for (Kn--; !Kn && qn.length; ) qn.shift()();
}
function Br(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && Ur(s, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const qn = [];
function $r(e, t, n) {
  ps();
  for (const s of e.keys()) {
    let r;
    s._dirtyLevel < t &&
      (r ?? (r = e.get(s) === s._trackId)) &&
      (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0),
      (s._dirtyLevel = t)),
      s._shouldSchedule &&
        (r ?? (r = e.get(s) === s._trackId)) &&
        (s.trigger(),
        (!s._runnings || s.allowRecurse) &&
          s._dirtyLevel !== 2 &&
          ((s._shouldSchedule = !1), s.scheduler && qn.push(s.scheduler)));
  }
  ms();
}
const Dr = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  zn = new WeakMap(),
  nt = Symbol(""),
  Wn = Symbol("");
function ce(e, t, n) {
  if (Ve && tt) {
    let s = zn.get(e);
    s || zn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Dr(() => s.delete(n)))), Br(tt, r);
  }
}
function Fe(e, t, n, s, r, o) {
  const i = zn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && I(e)) {
    const u = Number(s);
    i.forEach((a, d) => {
      (d === "length" || (!yt(d) && d >= u)) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        I(e)
          ? as(n) && l.push(i.get("length"))
          : (l.push(i.get(nt)), at(e) && l.push(i.get(Wn)));
        break;
      case "delete":
        I(e) || (l.push(i.get(nt)), at(e) && l.push(i.get(Wn)));
        break;
      case "set":
        at(e) && l.push(i.get(nt));
        break;
    }
  ps();
  for (const u of l) u && $r(u, 4);
  ms();
}
const mi = cs("__proto__,__v_isRef,__isVue"),
  Hr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(yt)
  ),
  Vs = gi();
function gi() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = V(this);
        for (let o = 0, i = this.length; o < i; o++) ce(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(V)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        rt(), ps();
        const s = V(this)[t].apply(this, n);
        return ms(), ot(), s;
      };
    }),
    e
  );
}
function yi(e) {
  const t = V(this);
  return ce(t, "has", e), t.hasOwnProperty(e);
}
class Vr {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, s) {
    const r = this._isReadonly,
      o = this._shallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (r ? (o ? Pi : Wr) : o ? zr : qr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = I(t);
    if (!r) {
      if (i && D(Vs, n)) return Reflect.get(Vs, n, s);
      if (n === "hasOwnProperty") return yi;
    }
    const l = Reflect.get(t, n, s);
    return (yt(n) ? Hr.has(n) : mi(n)) || (r || ce(t, "get", n), o)
      ? l
      : ue(l)
        ? i && as(n)
          ? l
          : l.value
        : Y(l)
          ? r
            ? Jr(l)
            : _s(l)
          : l;
  }
}
class Kr extends Vr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._shallow) {
      const u = pt(o);
      if (
        (!nn(s) && !pt(s) && ((o = V(o)), (s = V(s))), !I(t) && ue(o) && !ue(s))
      )
        return u ? !1 : ((o.value = s), !0);
    }
    const i = I(t) && as(n) ? Number(n) < t.length : D(t, n),
      l = Reflect.set(t, n, s, r);
    return (
      t === V(r) && (i ? qe(s, o) && Fe(t, "set", n, s) : Fe(t, "add", n, s)), l
    );
  }
  deleteProperty(t, n) {
    const s = D(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Fe(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!yt(n) || !Hr.has(n)) && ce(t, "has", n), s;
  }
  ownKeys(t) {
    return ce(t, "iterate", I(t) ? "length" : nt), Reflect.ownKeys(t);
  }
}
class _i extends Vr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const bi = new Kr(),
  wi = new _i(),
  xi = new Kr(!0),
  gs = (e) => e,
  dn = (e) => Reflect.getPrototypeOf(e);
function Ht(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = V(e),
    o = V(t);
  n || (qe(t, o) && ce(r, "get", t), ce(r, "get", o));
  const { has: i } = dn(r),
    l = s ? gs : n ? ws : Pt;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function Vt(e, t = !1) {
  const n = this.__v_raw,
    s = V(n),
    r = V(e);
  return (
    t || (qe(e, r) && ce(s, "has", e), ce(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Kt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ce(V(e), "iterate", nt), Reflect.get(e, "size", e)
  );
}
function Ks(e) {
  e = V(e);
  const t = V(this);
  return dn(t).has.call(t, e) || (t.add(e), Fe(t, "add", e, e)), this;
}
function qs(e, t) {
  t = V(t);
  const n = V(this),
    { has: s, get: r } = dn(n);
  let o = s.call(n, e);
  o || ((e = V(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? qe(t, i) && Fe(n, "set", e, t) : Fe(n, "add", e, t), this
  );
}
function zs(e) {
  const t = V(this),
    { has: n, get: s } = dn(t);
  let r = n.call(t, e);
  r || ((e = V(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Fe(t, "delete", e, void 0), o;
}
function Ws() {
  const e = V(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Fe(e, "clear", void 0, void 0), n;
}
function qt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = V(i),
      u = t ? gs : e ? ws : Pt;
    return (
      !e && ce(l, "iterate", nt), i.forEach((a, d) => s.call(r, u(a), u(d), o))
    );
  };
}
function zt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = V(r),
      i = at(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      a = r[e](...s),
      d = n ? gs : t ? ws : Pt;
    return (
      !t && ce(o, "iterate", u ? Wn : nt),
      {
        next() {
          const { value: h, done: x } = a.next();
          return x
            ? { value: h, done: x }
            : { value: l ? [d(h[0]), d(h[1])] : d(h), done: x };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ue(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ei() {
  const e = {
      get(o) {
        return Ht(this, o);
      },
      get size() {
        return Kt(this);
      },
      has: Vt,
      add: Ks,
      set: qs,
      delete: zs,
      clear: Ws,
      forEach: qt(!1, !1),
    },
    t = {
      get(o) {
        return Ht(this, o, !1, !0);
      },
      get size() {
        return Kt(this);
      },
      has: Vt,
      add: Ks,
      set: qs,
      delete: zs,
      clear: Ws,
      forEach: qt(!1, !0),
    },
    n = {
      get(o) {
        return Ht(this, o, !0);
      },
      get size() {
        return Kt(this, !0);
      },
      has(o) {
        return Vt.call(this, o, !0);
      },
      add: Ue("add"),
      set: Ue("set"),
      delete: Ue("delete"),
      clear: Ue("clear"),
      forEach: qt(!0, !1),
    },
    s = {
      get(o) {
        return Ht(this, o, !0, !0);
      },
      get size() {
        return Kt(this, !0);
      },
      has(o) {
        return Vt.call(this, o, !0);
      },
      add: Ue("add"),
      set: Ue("set"),
      delete: Ue("delete"),
      clear: Ue("clear"),
      forEach: qt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = zt(o, !1, !1)),
        (n[o] = zt(o, !0, !1)),
        (t[o] = zt(o, !1, !0)),
        (s[o] = zt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [vi, Si, Oi, Ti] = Ei();
function ys(e, t) {
  const n = t ? (e ? Ti : Oi) : e ? Si : vi;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(D(n, r) && r in s ? n : s, r, o);
}
const Ci = { get: ys(!1, !1) },
  Ai = { get: ys(!1, !0) },
  Ri = { get: ys(!0, !1) },
  qr = new WeakMap(),
  zr = new WeakMap(),
  Wr = new WeakMap(),
  Pi = new WeakMap();
function Ii(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ni(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ii(ti(e));
}
function _s(e) {
  return pt(e) ? e : bs(e, !1, bi, Ci, qr);
}
function Li(e) {
  return bs(e, !1, xi, Ai, zr);
}
function Jr(e) {
  return bs(e, !0, wi, Ri, Wr);
}
function bs(e, t, n, s, r) {
  if (!Y(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = Ni(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function dt(e) {
  return pt(e) ? dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
function nn(e) {
  return !!(e && e.__v_isShallow);
}
function Gr(e) {
  return dt(e) || pt(e);
}
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function Xr(e) {
  return Object.isExtensible(e) && tn(e, "__v_skip", !0), e;
}
const Pt = (e) => (Y(e) ? _s(e) : e),
  ws = (e) => (Y(e) ? Jr(e) : e);
class Yr {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new hs(
        () => t(this._value),
        () => Jt(this, this.effect._dirtyLevel === 2 ? 2 : 3)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = V(this);
    return (
      (!t._cacheable || t.effect.dirty) &&
        qe(t._value, (t._value = t.effect.run())) &&
        Jt(t, 4),
      Qr(t),
      t.effect._dirtyLevel >= 2 && Jt(t, 2),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
}
function Fi(e, t, n = !1) {
  let s, r;
  const o = N(e);
  return (
    o ? ((s = e), (r = de)) : ((s = e.get), (r = e.set)),
    new Yr(s, r, o || !r, n)
  );
}
function Qr(e) {
  var t;
  Ve &&
    tt &&
    ((e = V(e)),
    Br(
      tt,
      (t = e.dep) != null
        ? t
        : (e.dep = Dr(() => (e.dep = void 0), e instanceof Yr ? e : void 0))
    ));
}
function Jt(e, t = 4, n) {
  e = V(e);
  const s = e.dep;
  s && $r(s, t);
}
function ue(e) {
  return !!(e && e.__v_isRef === !0);
}
function ge(e) {
  return Mi(e, !1);
}
function Mi(e, t) {
  return ue(e) ? e : new ki(e, t);
}
class ki {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : V(t)),
      (this._value = n ? t : Pt(t));
  }
  get value() {
    return Qr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || nn(t) || pt(t);
    (t = n ? t : V(t)),
      qe(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Pt(t)), Jt(this, 4));
  }
}
function Ui(e) {
  return ue(e) ? e.value : e;
}
const ji = {
  get: (e, t, n) => Ui(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ue(r) && !ue(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Zr(e) {
  return dt(e) ? e : new Proxy(e, ji);
}
/**
 * @vue/runtime-core v3.4.19
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Ke(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    hn(r, t, n);
  }
}
function be(e, t, n, s) {
  if (N(e)) {
    const o = Ke(e, t, n, s);
    return (
      o &&
        Ir(o) &&
        o.catch((i) => {
          hn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(be(e[o], t, n, s));
  return r;
}
function hn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ke(u, null, 10, [e, i, l]);
      return;
    }
  }
  Bi(e, n, r, s);
}
function Bi(e, t, n, s = !0) {
  console.error(e);
}
let It = !1,
  Jn = !1;
const ne = [];
let Te = 0;
const ht = [];
let Be = null,
  et = 0;
const eo = Promise.resolve();
let xs = null;
function $i(e) {
  const t = xs || eo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Di(e) {
  let t = Te + 1,
    n = ne.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = ne[s],
      o = Nt(r);
    o < e || (o === e && r.pre) ? (t = s + 1) : (n = s);
  }
  return t;
}
function Es(e) {
  (!ne.length || !ne.includes(e, It && e.allowRecurse ? Te + 1 : Te)) &&
    (e.id == null ? ne.push(e) : ne.splice(Di(e.id), 0, e), to());
}
function to() {
  !It && !Jn && ((Jn = !0), (xs = eo.then(so)));
}
function Hi(e) {
  const t = ne.indexOf(e);
  t > Te && ne.splice(t, 1);
}
function Vi(e) {
  I(e)
    ? ht.push(...e)
    : (!Be || !Be.includes(e, e.allowRecurse ? et + 1 : et)) && ht.push(e),
    to();
}
function Js(e, t, n = It ? Te + 1 : 0) {
  for (; n < ne.length; n++) {
    const s = ne[n];
    if (s && s.pre) {
      if (e && s.id !== e.uid) continue;
      ne.splice(n, 1), n--, s();
    }
  }
}
function no(e) {
  if (ht.length) {
    const t = [...new Set(ht)].sort((n, s) => Nt(n) - Nt(s));
    if (((ht.length = 0), Be)) {
      Be.push(...t);
      return;
    }
    for (Be = t, et = 0; et < Be.length; et++) Be[et]();
    (Be = null), (et = 0);
  }
}
const Nt = (e) => (e.id == null ? 1 / 0 : e.id),
  Ki = (e, t) => {
    const n = Nt(e) - Nt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function so(e) {
  (Jn = !1), (It = !0), ne.sort(Ki);
  try {
    for (Te = 0; Te < ne.length; Te++) {
      const t = ne[Te];
      t && t.active !== !1 && Ke(t, null, 14);
    }
  } finally {
    (Te = 0),
      (ne.length = 0),
      no(),
      (It = !1),
      (xs = null),
      (ne.length || ht.length) && so();
  }
}
function qi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || G;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: x } = s[d] || G;
    x && (r = n.map((C) => (ee(C) ? C.trim() : C))), h && (r = n.map(ri));
  }
  let l,
    u = s[(l = Pn(t))] || s[(l = Pn(Re(t)))];
  !u && o && (u = s[(l = Pn(_t(t)))]), u && be(u, e, 6, r);
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), be(a, e, 6, r);
  }
}
function ro(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!N(e)) {
    const u = (a) => {
      const d = ro(a, t, !0);
      d && ((l = !0), re(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (Y(e) && s.set(e, null), null)
    : (I(o) ? o.forEach((u) => (i[u] = null)) : re(i, o),
      Y(e) && s.set(e, i),
      i);
}
function pn(e, t) {
  return !e || !cn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      D(e, t[0].toLowerCase() + t.slice(1)) || D(e, _t(t)) || D(e, t));
}
let ye = null,
  mn = null;
function sn(e) {
  const t = ye;
  return (ye = e), (mn = (e && e.type.__scopeId) || null), t;
}
function oo(e) {
  mn = e;
}
function io() {
  mn = null;
}
function zi(e, t = ye, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && ir(-1);
    const o = sn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      sn(o), s._d && ir(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Ln(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: a,
    render: d,
    renderCache: h,
    data: x,
    setupState: C,
    ctx: S,
    inheritAttrs: E,
  } = e;
  let F, U;
  const Z = sn(e);
  try {
    if (n.shapeFlag & 4) {
      const Q = r || s,
        ae = Q;
      (F = Oe(d.call(ae, Q, h, o, C, x, S))), (U = u);
    } else {
      const Q = t;
      (F = Oe(
        Q.length > 1 ? Q(o, { attrs: u, slots: l, emit: a }) : Q(o, null)
      )),
        (U = t.props ? u : Wi(u));
    }
  } catch (Q) {
    (At.length = 0), hn(Q, e, 1), (F = Ae(st));
  }
  let j = F;
  if (U && E !== !1) {
    const Q = Object.keys(U),
      { shapeFlag: ae } = j;
    Q.length && ae & 7 && (i && Q.some(us) && (U = Ji(U, i)), (j = mt(j, U)));
  }
  return (
    n.dirs && ((j = mt(j)), (j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (j.transition = n.transition),
    (F = j),
    sn(Z),
    F
  );
}
const Wi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || cn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ji = (e, t) => {
    const n = {};
    for (const s in e) (!us(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Gi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? Gs(s, i, a) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const x = d[h];
        if (i[x] !== s[x] && !pn(a, x)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? Gs(s, i, a)
            : !0
          : !!i;
  return !1;
}
function Gs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !pn(n, o)) return !0;
  }
  return !1;
}
function Xi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const lo = "components",
  co = Symbol.for("v-ndc");
function Xs(e) {
  return ee(e) ? Yi(lo, e, !1) || e : e || co;
}
function Yi(e, t, n = !0, s = !1) {
  const r = ye || se;
  if (r) {
    const o = r.type;
    if (e === lo) {
      const l = ql(o, !1);
      if (l && (l === t || l === Re(t) || l === an(Re(t)))) return o;
    }
    const i = Ys(r[e] || o[e], t) || Ys(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Ys(e, t) {
  return e && (e[t] || e[Re(t)] || e[an(Re(t))]);
}
const Qi = (e) => e.__isSuspense;
function Zi(e, t) {
  t && t.pendingBranch
    ? I(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Vi(e);
}
const el = Symbol.for("v-scx"),
  tl = () => Xt(el),
  Wt = {};
function Fn(e, t, n) {
  return uo(e, t, n);
}
function uo(
  e,
  t,
  { immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: l } = G
) {
  if (t && o) {
    const H = t;
    t = (...Ne) => {
      H(...Ne), ae();
    };
  }
  const u = se,
    a = (H) => (s === !0 ? H : ut(H, s === !1 ? 1 : void 0));
  let d,
    h = !1,
    x = !1;
  if (
    (ue(e)
      ? ((d = () => e.value), (h = nn(e)))
      : dt(e)
        ? ((d = () => a(e)), (h = !0))
        : I(e)
          ? ((x = !0),
            (h = e.some((H) => dt(H) || nn(H))),
            (d = () =>
              e.map((H) => {
                if (ue(H)) return H.value;
                if (dt(H)) return a(H);
                if (N(H)) return Ke(H, u, 2);
              })))
          : N(e)
            ? t
              ? (d = () => Ke(e, u, 2))
              : (d = () => (C && C(), be(e, u, 3, [S])))
            : (d = de),
    t && s)
  ) {
    const H = d;
    d = () => ut(H());
  }
  let C,
    S = (H) => {
      C = j.onStop = () => {
        Ke(H, u, 4), (C = j.onStop = void 0);
      };
    },
    E;
  if (bn)
    if (
      ((S = de),
      t ? n && be(t, u, 3, [d(), x ? [] : void 0, S]) : d(),
      r === "sync")
    ) {
      const H = tl();
      E = H.__watcherHandles || (H.__watcherHandles = []);
    } else return de;
  let F = x ? new Array(e.length).fill(Wt) : Wt;
  const U = () => {
    if (!(!j.active || !j.dirty))
      if (t) {
        const H = j.run();
        (s || h || (x ? H.some((Ne, we) => qe(Ne, F[we])) : qe(H, F))) &&
          (C && C(),
          be(t, u, 3, [H, F === Wt ? void 0 : x && F[0] === Wt ? [] : F, S]),
          (F = H));
      } else j.run();
  };
  U.allowRecurse = !!t;
  let Z;
  r === "sync"
    ? (Z = U)
    : r === "post"
      ? (Z = () => le(U, u && u.suspense))
      : ((U.pre = !0), u && (U.id = u.uid), (Z = () => Es(U)));
  const j = new hs(d, de, Z),
    Q = hi(),
    ae = () => {
      j.stop(), Q && fs(Q.effects, j);
    };
  return (
    t
      ? n
        ? U()
        : (F = j.run())
      : r === "post"
        ? le(j.run.bind(j), u && u.suspense)
        : j.run(),
    E && E.push(ae),
    ae
  );
}
function nl(e, t, n) {
  const s = this.proxy,
    r = ee(e) ? (e.includes(".") ? fo(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  N(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Mt(this),
    l = uo(r, o.bind(s), n);
  return i(), l;
}
function fo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function ut(e, t, n = 0, s) {
  if (!Y(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++;
  }
  if (((s = s || new Set()), s.has(e))) return e;
  if ((s.add(e), ue(e))) ut(e.value, t, n, s);
  else if (I(e)) for (let r = 0; r < e.length; r++) ut(e[r], t, n, s);
  else if (Pr(e) || at(e))
    e.forEach((r) => {
      ut(r, t, n, s);
    });
  else if (Lr(e)) for (const r in e) ut(e[r], t, n, s);
  return e;
}
function Qe(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let u = l.dir[s];
    u && (rt(), be(u, n, 8, [e.el, l, e, t]), ot());
  }
}
const Gt = (e) => !!e.type.__asyncLoader,
  ao = (e) => e.type.__isKeepAlive;
function sl(e, t) {
  ho(e, "a", t);
}
function rl(e, t) {
  ho(e, "da", t);
}
function ho(e, t, n = se) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((gn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      ao(r.parent.vnode) && ol(s, t, n, r), (r = r.parent);
  }
}
function ol(e, t, n, s) {
  const r = gn(t, e, s, !0);
  mo(() => {
    fs(s[t], r);
  }, n);
}
function gn(e, t, n = se, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          rt();
          const l = Mt(n),
            u = be(t, n, e, i);
          return l(), ot(), u;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const ke =
    (e) =>
    (t, n = se) =>
      (!bn || e === "sp") && gn(e, (...s) => t(...s), n),
  il = ke("bm"),
  po = ke("m"),
  ll = ke("bu"),
  cl = ke("u"),
  ul = ke("bum"),
  mo = ke("um"),
  fl = ke("sp"),
  al = ke("rtg"),
  dl = ke("rtc");
function hl(e, t = se) {
  gn("ec", e, t);
}
const Gn = (e) => (e ? (Co(e) ? Ts(e) || e.proxy : Gn(e.parent)) : null),
  Tt = re(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Gn(e.parent),
    $root: (e) => Gn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => vs(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), Es(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = $i.bind(e.proxy)),
    $watch: (e) => nl.bind(e),
  }),
  Mn = (e, t) => e !== G && !e.__isScriptSetup && D(e, t),
  pl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: u,
      } = e;
      let a;
      if (t[0] !== "$") {
        const C = i[t];
        if (C !== void 0)
          switch (C) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Mn(s, t)) return (i[t] = 1), s[t];
          if (r !== G && D(r, t)) return (i[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && D(a, t)) return (i[t] = 3), o[t];
          if (n !== G && D(n, t)) return (i[t] = 4), n[t];
          Xn && (i[t] = 0);
        }
      }
      const d = Tt[t];
      let h, x;
      if (d) return t === "$attrs" && ce(e, "get", t), d(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== G && D(n, t)) return (i[t] = 4), n[t];
      if (((x = u.config.globalProperties), D(x, t))) return x[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Mn(r, t)
        ? ((r[t] = n), !0)
        : s !== G && D(s, t)
          ? ((s[t] = n), !0)
          : D(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== G && D(e, i)) ||
        Mn(t, i) ||
        ((l = o[0]) && D(l, i)) ||
        D(s, i) ||
        D(Tt, i) ||
        D(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : D(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Qs(e) {
  return I(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Xn = !0;
function ml(e) {
  const t = vs(e),
    n = e.proxy,
    s = e.ctx;
  (Xn = !1), t.beforeCreate && Zs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: a,
    created: d,
    beforeMount: h,
    mounted: x,
    beforeUpdate: C,
    updated: S,
    activated: E,
    deactivated: F,
    beforeDestroy: U,
    beforeUnmount: Z,
    destroyed: j,
    unmounted: Q,
    render: ae,
    renderTracked: H,
    renderTriggered: Ne,
    errorCaptured: we,
    serverPrefetch: On,
    expose: Ge,
    inheritAttrs: wt,
    components: jt,
    directives: Bt,
    filters: Tn,
  } = t;
  if ((a && gl(a, s, null), i))
    for (const X in i) {
      const W = i[X];
      N(W) && (s[X] = W.bind(n));
    }
  if (r) {
    const X = r.call(n, n);
    Y(X) && (e.data = _s(X));
  }
  if (((Xn = !0), o))
    for (const X in o) {
      const W = o[X],
        Xe = N(W) ? W.bind(n, n) : N(W.get) ? W.get.bind(n, n) : de,
        $t = !N(W) && N(W.set) ? W.set.bind(n) : de,
        Ye = Wl({ get: Xe, set: $t });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: (xe) => (Ye.value = xe),
      });
    }
  if (l) for (const X in l) go(l[X], s, n, X);
  if (u) {
    const X = N(u) ? u.call(n) : u;
    Reflect.ownKeys(X).forEach((W) => {
      El(W, X[W]);
    });
  }
  d && Zs(d, e, "c");
  function oe(X, W) {
    I(W) ? W.forEach((Xe) => X(Xe.bind(n))) : W && X(W.bind(n));
  }
  if (
    (oe(il, h),
    oe(po, x),
    oe(ll, C),
    oe(cl, S),
    oe(sl, E),
    oe(rl, F),
    oe(hl, we),
    oe(dl, H),
    oe(al, Ne),
    oe(ul, Z),
    oe(mo, Q),
    oe(fl, On),
    I(Ge))
  )
    if (Ge.length) {
      const X = e.exposed || (e.exposed = {});
      Ge.forEach((W) => {
        Object.defineProperty(X, W, {
          get: () => n[W],
          set: (Xe) => (n[W] = Xe),
        });
      });
    } else e.exposed || (e.exposed = {});
  ae && e.render === de && (e.render = ae),
    wt != null && (e.inheritAttrs = wt),
    jt && (e.components = jt),
    Bt && (e.directives = Bt);
}
function gl(e, t, n = de) {
  I(e) && (e = Yn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    Y(r)
      ? "default" in r
        ? (o = Xt(r.from || s, r.default, !0))
        : (o = Xt(r.from || s))
      : (o = Xt(r)),
      ue(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function Zs(e, t, n) {
  be(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function go(e, t, n, s) {
  const r = s.includes(".") ? fo(n, s) : () => n[s];
  if (ee(e)) {
    const o = t[e];
    N(o) && Fn(r, o);
  } else if (N(e)) Fn(r, e.bind(n));
  else if (Y(e))
    if (I(e)) e.forEach((o) => go(o, t, n, s));
    else {
      const o = N(e.handler) ? e.handler.bind(n) : t[e.handler];
      N(o) && Fn(r, o, e);
    }
}
function vs(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let u;
  return (
    l
      ? (u = l)
      : !r.length && !n && !s
        ? (u = t)
        : ((u = {}),
          r.length && r.forEach((a) => rn(u, a, i, !0)),
          rn(u, t, i)),
    Y(t) && o.set(t, u),
    u
  );
}
function rn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && rn(e, o, n, !0), r && r.forEach((i) => rn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = yl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const yl = {
  data: er,
  props: tr,
  emits: tr,
  methods: St,
  computed: St,
  beforeCreate: ie,
  created: ie,
  beforeMount: ie,
  mounted: ie,
  beforeUpdate: ie,
  updated: ie,
  beforeDestroy: ie,
  beforeUnmount: ie,
  destroyed: ie,
  unmounted: ie,
  activated: ie,
  deactivated: ie,
  errorCaptured: ie,
  serverPrefetch: ie,
  components: St,
  directives: St,
  watch: bl,
  provide: er,
  inject: _l,
};
function er(e, t) {
  return t
    ? e
      ? function () {
          return re(
            N(e) ? e.call(this, this) : e,
            N(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function _l(e, t) {
  return St(Yn(e), Yn(t));
}
function Yn(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function St(e, t) {
  return e ? re(Object.create(null), e, t) : t;
}
function tr(e, t) {
  return e
    ? I(e) && I(t)
      ? [...new Set([...e, ...t])]
      : re(Object.create(null), Qs(e), Qs(t ?? {}))
    : t;
}
function bl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = re(Object.create(null), e);
  for (const s in t) n[s] = ie(e[s], t[s]);
  return n;
}
function yo() {
  return {
    app: null,
    config: {
      isNativeTag: Zo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let wl = 0;
function xl(e, t) {
  return function (s, r = null) {
    N(s) || (s = re({}, s)), r != null && !Y(r) && (r = null);
    const o = yo(),
      i = new WeakSet();
    let l = !1;
    const u = (o.app = {
      _uid: wl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Jl,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && N(a.install)
              ? (i.add(a), a.install(u, ...d))
              : N(a) && (i.add(a), a(u, ...d))),
          u
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), u;
      },
      component(a, d) {
        return d ? ((o.components[a] = d), u) : o.components[a];
      },
      directive(a, d) {
        return d ? ((o.directives[a] = d), u) : o.directives[a];
      },
      mount(a, d, h) {
        if (!l) {
          const x = Ae(s, r);
          return (
            (x.appContext = o),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            d && t ? t(x, a) : e(x, a, h),
            (l = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            Ts(x.component) || x.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, d) {
        return (o.provides[a] = d), u;
      },
      runWithContext(a) {
        const d = Ct;
        Ct = u;
        try {
          return a();
        } finally {
          Ct = d;
        }
      },
    });
    return u;
  };
}
let Ct = null;
function El(e, t) {
  if (se) {
    let n = se.provides;
    const s = se.parent && se.parent.provides;
    s === n && (n = se.provides = Object.create(s)), (n[e] = t);
  }
}
function Xt(e, t, n = !1) {
  const s = se || ye;
  if (s || Ct) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Ct._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && N(t) ? t.call(s && s.proxy) : t;
  }
}
function vl(e, t, n, s = !1) {
  const r = {},
    o = {};
  tn(o, _n, 1), (e.propsDefaults = Object.create(null)), _o(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : Li(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Sl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = V(r),
    [u] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let x = d[h];
        if (pn(e.emitsOptions, x)) continue;
        const C = t[x];
        if (u)
          if (D(o, x)) C !== o[x] && ((o[x] = C), (a = !0));
          else {
            const S = Re(x);
            r[S] = Qn(u, l, S, C, e, !1);
          }
        else C !== o[x] && ((o[x] = C), (a = !0));
      }
    }
  } else {
    _o(e, t, r, o) && (a = !0);
    let d;
    for (const h in l)
      (!t || (!D(t, h) && ((d = _t(h)) === h || !D(t, d)))) &&
        (u
          ? n &&
            (n[h] !== void 0 || n[d] !== void 0) &&
            (r[h] = Qn(u, l, h, void 0, e, !0))
          : delete r[h]);
    if (o !== l) for (const h in o) (!t || !D(t, h)) && (delete o[h], (a = !0));
  }
  a && Fe(e, "set", "$attrs");
}
function _o(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (Ot(u)) continue;
      const a = t[u];
      let d;
      r && D(r, (d = Re(u)))
        ? !o || !o.includes(d)
          ? (n[d] = a)
          : ((l || (l = {}))[d] = a)
        : pn(e.emitsOptions, u) ||
          ((!(u in s) || a !== s[u]) && ((s[u] = a), (i = !0)));
    }
  if (o) {
    const u = V(n),
      a = l || G;
    for (let d = 0; d < o.length; d++) {
      const h = o[d];
      n[h] = Qn(r, u, h, a[h], e, !D(a, h));
    }
  }
  return i;
}
function Qn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = D(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && N(u)) {
        const { propsDefaults: a } = r;
        if (n in a) s = a[n];
        else {
          const d = Mt(r);
          (s = a[n] = u.call(null, t)), d();
        }
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === _t(n)) && (s = !0));
  }
  return s;
}
function bo(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!N(e)) {
    const d = (h) => {
      u = !0;
      const [x, C] = bo(h, t, !0);
      re(i, x), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!o && !u) return Y(e) && s.set(e, ft), ft;
  if (I(o))
    for (let d = 0; d < o.length; d++) {
      const h = Re(o[d]);
      nr(h) && (i[h] = G);
    }
  else if (o)
    for (const d in o) {
      const h = Re(d);
      if (nr(h)) {
        const x = o[d],
          C = (i[h] = I(x) || N(x) ? { type: x } : re({}, x));
        if (C) {
          const S = or(Boolean, C.type),
            E = or(String, C.type);
          (C[0] = S > -1),
            (C[1] = E < 0 || S < E),
            (S > -1 || D(C, "default")) && l.push(h);
        }
      }
    }
  const a = [i, l];
  return Y(e) && s.set(e, a), a;
}
function nr(e) {
  return e[0] !== "$" && !Ot(e);
}
function sr(e) {
  return e === null
    ? "null"
    : typeof e == "function"
      ? e.name || ""
      : (typeof e == "object" && e.constructor && e.constructor.name) || "";
}
function rr(e, t) {
  return sr(e) === sr(t);
}
function or(e, t) {
  return I(t) ? t.findIndex((n) => rr(n, e)) : N(t) && rr(t, e) ? 0 : -1;
}
const wo = (e) => e[0] === "_" || e === "$stable",
  Ss = (e) => (I(e) ? e.map(Oe) : [Oe(e)]),
  Ol = (e, t, n) => {
    if (t._n) return t;
    const s = zi((...r) => Ss(t(...r)), n);
    return (s._c = !1), s;
  },
  xo = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (wo(r)) continue;
      const o = e[r];
      if (N(o)) t[r] = Ol(r, o, s);
      else if (o != null) {
        const i = Ss(o);
        t[r] = () => i;
      }
    }
  },
  Eo = (e, t) => {
    const n = Ss(t);
    e.slots.default = () => n;
  },
  Tl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = V(t)), tn(t, "_", n)) : xo(t, (e.slots = {}));
    } else (e.slots = {}), t && Eo(e, t);
    tn(e.slots, _n, 1);
  },
  Cl = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = G;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (re(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), xo(t, r)),
        (i = t);
    } else t && (Eo(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !wo(l) && i[l] == null && delete r[l];
  };
function Zn(e, t, n, s, r = !1) {
  if (I(e)) {
    e.forEach((x, C) => Zn(x, t && (I(t) ? t[C] : t), n, s, r));
    return;
  }
  if (Gt(s) && !r) return;
  const o = s.shapeFlag & 4 ? Ts(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    a = t && t.r,
    d = l.refs === G ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (a != null &&
      a !== u &&
      (ee(a)
        ? ((d[a] = null), D(h, a) && (h[a] = null))
        : ue(a) && (a.value = null)),
    N(u))
  )
    Ke(u, l, 12, [i, d]);
  else {
    const x = ee(u),
      C = ue(u);
    if (x || C) {
      const S = () => {
        if (e.f) {
          const E = x ? (D(h, u) ? h[u] : d[u]) : u.value;
          r
            ? I(E) && fs(E, o)
            : I(E)
              ? E.includes(o) || E.push(o)
              : x
                ? ((d[u] = [o]), D(h, u) && (h[u] = d[u]))
                : ((u.value = [o]), e.k && (d[e.k] = u.value));
        } else
          x
            ? ((d[u] = i), D(h, u) && (h[u] = i))
            : C && ((u.value = i), e.k && (d[e.k] = i));
      };
      i ? ((S.id = -1), le(S, n)) : S();
    }
  }
}
const le = Zi;
function Al(e) {
  return Rl(e);
}
function Rl(e, t) {
  const n = Fr();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: a,
      setElementText: d,
      parentNode: h,
      nextSibling: x,
      setScopeId: C = de,
      insertStaticContent: S,
    } = e,
    E = (
      c,
      f,
      p,
      g = null,
      y = null,
      w = null,
      O = void 0,
      b = null,
      v = !!f.dynamicChildren
    ) => {
      if (c === f) return;
      c && !Et(c, f) && ((g = Dt(c)), xe(c, y, w, !0), (c = null)),
        f.patchFlag === -2 && ((v = !1), (f.dynamicChildren = null));
      const { type: _, ref: T, shapeFlag: R } = f;
      switch (_) {
        case yn:
          F(c, f, p, g);
          break;
        case st:
          U(c, f, p, g);
          break;
        case Un:
          c == null && Z(f, p, g, O);
          break;
        case Se:
          jt(c, f, p, g, y, w, O, b, v);
          break;
        default:
          R & 1
            ? ae(c, f, p, g, y, w, O, b, v)
            : R & 6
              ? Bt(c, f, p, g, y, w, O, b, v)
              : (R & 64 || R & 128) && _.process(c, f, p, g, y, w, O, b, v, it);
      }
      T != null && y && Zn(T, c && c.ref, w, f || c, !f);
    },
    F = (c, f, p, g) => {
      if (c == null) s((f.el = l(f.children)), p, g);
      else {
        const y = (f.el = c.el);
        f.children !== c.children && a(y, f.children);
      }
    },
    U = (c, f, p, g) => {
      c == null ? s((f.el = u(f.children || "")), p, g) : (f.el = c.el);
    },
    Z = (c, f, p, g) => {
      [c.el, c.anchor] = S(c.children, f, p, g, c.el, c.anchor);
    },
    j = ({ el: c, anchor: f }, p, g) => {
      let y;
      for (; c && c !== f; ) (y = x(c)), s(c, p, g), (c = y);
      s(f, p, g);
    },
    Q = ({ el: c, anchor: f }) => {
      let p;
      for (; c && c !== f; ) (p = x(c)), r(c), (c = p);
      r(f);
    },
    ae = (c, f, p, g, y, w, O, b, v) => {
      f.type === "svg" ? (O = "svg") : f.type === "math" && (O = "mathml"),
        c == null ? H(f, p, g, y, w, O, b, v) : On(c, f, y, w, O, b, v);
    },
    H = (c, f, p, g, y, w, O, b) => {
      let v, _;
      const { props: T, shapeFlag: R, transition: A, dirs: P } = c;
      if (
        ((v = c.el = i(c.type, w, T && T.is, T)),
        R & 8
          ? d(v, c.children)
          : R & 16 && we(c.children, v, null, g, y, kn(c, w), O, b),
        P && Qe(c, null, g, "created"),
        Ne(v, c, c.scopeId, O, g),
        T)
      ) {
        for (const q in T)
          q !== "value" &&
            !Ot(q) &&
            o(v, q, null, T[q], w, c.children, g, y, Le);
        "value" in T && o(v, "value", null, T.value, w),
          (_ = T.onVnodeBeforeMount) && ve(_, g, c);
      }
      P && Qe(c, null, g, "beforeMount");
      const M = Pl(y, A);
      M && A.beforeEnter(v),
        s(v, f, p),
        ((_ = T && T.onVnodeMounted) || M || P) &&
          le(() => {
            _ && ve(_, g, c), M && A.enter(v), P && Qe(c, null, g, "mounted");
          }, y);
    },
    Ne = (c, f, p, g, y) => {
      if ((p && C(c, p), g)) for (let w = 0; w < g.length; w++) C(c, g[w]);
      if (y) {
        let w = y.subTree;
        if (f === w) {
          const O = y.vnode;
          Ne(c, O, O.scopeId, O.slotScopeIds, y.parent);
        }
      }
    },
    we = (c, f, p, g, y, w, O, b, v = 0) => {
      for (let _ = v; _ < c.length; _++) {
        const T = (c[_] = b ? $e(c[_]) : Oe(c[_]));
        E(null, T, f, p, g, y, w, O, b);
      }
    },
    On = (c, f, p, g, y, w, O) => {
      const b = (f.el = c.el);
      let { patchFlag: v, dynamicChildren: _, dirs: T } = f;
      v |= c.patchFlag & 16;
      const R = c.props || G,
        A = f.props || G;
      let P;
      if (
        (p && Ze(p, !1),
        (P = A.onVnodeBeforeUpdate) && ve(P, p, f, c),
        T && Qe(f, c, p, "beforeUpdate"),
        p && Ze(p, !0),
        _
          ? Ge(c.dynamicChildren, _, b, p, g, kn(f, y), w)
          : O || W(c, f, b, null, p, g, kn(f, y), w, !1),
        v > 0)
      ) {
        if (v & 16) wt(b, f, R, A, p, g, y);
        else if (
          (v & 2 && R.class !== A.class && o(b, "class", null, A.class, y),
          v & 4 && o(b, "style", R.style, A.style, y),
          v & 8)
        ) {
          const M = f.dynamicProps;
          for (let q = 0; q < M.length; q++) {
            const J = M[q],
              te = R[J],
              pe = A[J];
            (pe !== te || J === "value") &&
              o(b, J, te, pe, y, c.children, p, g, Le);
          }
        }
        v & 1 && c.children !== f.children && d(b, f.children);
      } else !O && _ == null && wt(b, f, R, A, p, g, y);
      ((P = A.onVnodeUpdated) || T) &&
        le(() => {
          P && ve(P, p, f, c), T && Qe(f, c, p, "updated");
        }, g);
    },
    Ge = (c, f, p, g, y, w, O) => {
      for (let b = 0; b < f.length; b++) {
        const v = c[b],
          _ = f[b],
          T =
            v.el && (v.type === Se || !Et(v, _) || v.shapeFlag & 70)
              ? h(v.el)
              : p;
        E(v, _, T, null, g, y, w, O, !0);
      }
    },
    wt = (c, f, p, g, y, w, O) => {
      if (p !== g) {
        if (p !== G)
          for (const b in p)
            !Ot(b) && !(b in g) && o(c, b, p[b], null, O, f.children, y, w, Le);
        for (const b in g) {
          if (Ot(b)) continue;
          const v = g[b],
            _ = p[b];
          v !== _ && b !== "value" && o(c, b, _, v, O, f.children, y, w, Le);
        }
        "value" in g && o(c, "value", p.value, g.value, O);
      }
    },
    jt = (c, f, p, g, y, w, O, b, v) => {
      const _ = (f.el = c ? c.el : l("")),
        T = (f.anchor = c ? c.anchor : l(""));
      let { patchFlag: R, dynamicChildren: A, slotScopeIds: P } = f;
      P && (b = b ? b.concat(P) : P),
        c == null
          ? (s(_, p, g), s(T, p, g), we(f.children || [], p, T, y, w, O, b, v))
          : R > 0 && R & 64 && A && c.dynamicChildren
            ? (Ge(c.dynamicChildren, A, p, y, w, O, b),
              (f.key != null || (y && f === y.subTree)) && vo(c, f, !0))
            : W(c, f, p, T, y, w, O, b, v);
    },
    Bt = (c, f, p, g, y, w, O, b, v) => {
      (f.slotScopeIds = b),
        c == null
          ? f.shapeFlag & 512
            ? y.ctx.activate(f, p, g, O, v)
            : Tn(f, p, g, y, w, O, v)
          : Fs(c, f, v);
    },
    Tn = (c, f, p, g, y, w, O) => {
      const b = (c.component = $l(c, g, y));
      if ((ao(c) && (b.ctx.renderer = it), Dl(b), b.asyncDep)) {
        if ((y && y.registerDep(b, oe), !c.el)) {
          const v = (b.subTree = Ae(st));
          U(null, v, f, p);
        }
      } else oe(b, c, f, p, y, w, O);
    },
    Fs = (c, f, p) => {
      const g = (f.component = c.component);
      if (Gi(c, f, p))
        if (g.asyncDep && !g.asyncResolved) {
          X(g, f, p);
          return;
        } else (g.next = f), Hi(g.update), (g.effect.dirty = !0), g.update();
      else (f.el = c.el), (g.vnode = f);
    },
    oe = (c, f, p, g, y, w, O) => {
      const b = () => {
          if (c.isMounted) {
            let { next: T, bu: R, u: A, parent: P, vnode: M } = c;
            {
              const lt = So(c);
              if (lt) {
                T && ((T.el = M.el), X(c, T, O)),
                  lt.asyncDep.then(() => {
                    c.isUnmounted || b();
                  });
                return;
              }
            }
            let q = T,
              J;
            Ze(c, !1),
              T ? ((T.el = M.el), X(c, T, O)) : (T = M),
              R && In(R),
              (J = T.props && T.props.onVnodeBeforeUpdate) && ve(J, P, T, M),
              Ze(c, !0);
            const te = Ln(c),
              pe = c.subTree;
            (c.subTree = te),
              E(pe, te, h(pe.el), Dt(pe), c, y, w),
              (T.el = te.el),
              q === null && Xi(c, te.el),
              A && le(A, y),
              (J = T.props && T.props.onVnodeUpdated) &&
                le(() => ve(J, P, T, M), y);
          } else {
            let T;
            const { el: R, props: A } = f,
              { bm: P, m: M, parent: q } = c,
              J = Gt(f);
            if (
              (Ze(c, !1),
              P && In(P),
              !J && (T = A && A.onVnodeBeforeMount) && ve(T, q, f),
              Ze(c, !0),
              R && Rn)
            ) {
              const te = () => {
                (c.subTree = Ln(c)), Rn(R, c.subTree, c, y, null);
              };
              J
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && te())
                : te();
            } else {
              const te = (c.subTree = Ln(c));
              E(null, te, p, g, c, y, w), (f.el = te.el);
            }
            if ((M && le(M, y), !J && (T = A && A.onVnodeMounted))) {
              const te = f;
              le(() => ve(T, q, te), y);
            }
            (f.shapeFlag & 256 ||
              (q && Gt(q.vnode) && q.vnode.shapeFlag & 256)) &&
              c.a &&
              le(c.a, y),
              (c.isMounted = !0),
              (f = p = g = null);
          }
        },
        v = (c.effect = new hs(b, de, () => Es(_), c.scope)),
        _ = (c.update = () => {
          v.dirty && v.run();
        });
      (_.id = c.uid), Ze(c, !0), _();
    },
    X = (c, f, p) => {
      f.component = c;
      const g = c.vnode.props;
      (c.vnode = f),
        (c.next = null),
        Sl(c, f.props, g, p),
        Cl(c, f.children, p),
        rt(),
        Js(c),
        ot();
    },
    W = (c, f, p, g, y, w, O, b, v = !1) => {
      const _ = c && c.children,
        T = c ? c.shapeFlag : 0,
        R = f.children,
        { patchFlag: A, shapeFlag: P } = f;
      if (A > 0) {
        if (A & 128) {
          $t(_, R, p, g, y, w, O, b, v);
          return;
        } else if (A & 256) {
          Xe(_, R, p, g, y, w, O, b, v);
          return;
        }
      }
      P & 8
        ? (T & 16 && Le(_, y, w), R !== _ && d(p, R))
        : T & 16
          ? P & 16
            ? $t(_, R, p, g, y, w, O, b, v)
            : Le(_, y, w, !0)
          : (T & 8 && d(p, ""), P & 16 && we(R, p, g, y, w, O, b, v));
    },
    Xe = (c, f, p, g, y, w, O, b, v) => {
      (c = c || ft), (f = f || ft);
      const _ = c.length,
        T = f.length,
        R = Math.min(_, T);
      let A;
      for (A = 0; A < R; A++) {
        const P = (f[A] = v ? $e(f[A]) : Oe(f[A]));
        E(c[A], P, p, null, y, w, O, b, v);
      }
      _ > T ? Le(c, y, w, !0, !1, R) : we(f, p, g, y, w, O, b, v, R);
    },
    $t = (c, f, p, g, y, w, O, b, v) => {
      let _ = 0;
      const T = f.length;
      let R = c.length - 1,
        A = T - 1;
      for (; _ <= R && _ <= A; ) {
        const P = c[_],
          M = (f[_] = v ? $e(f[_]) : Oe(f[_]));
        if (Et(P, M)) E(P, M, p, null, y, w, O, b, v);
        else break;
        _++;
      }
      for (; _ <= R && _ <= A; ) {
        const P = c[R],
          M = (f[A] = v ? $e(f[A]) : Oe(f[A]));
        if (Et(P, M)) E(P, M, p, null, y, w, O, b, v);
        else break;
        R--, A--;
      }
      if (_ > R) {
        if (_ <= A) {
          const P = A + 1,
            M = P < T ? f[P].el : g;
          for (; _ <= A; )
            E(null, (f[_] = v ? $e(f[_]) : Oe(f[_])), p, M, y, w, O, b, v), _++;
        }
      } else if (_ > A) for (; _ <= R; ) xe(c[_], y, w, !0), _++;
      else {
        const P = _,
          M = _,
          q = new Map();
        for (_ = M; _ <= A; _++) {
          const fe = (f[_] = v ? $e(f[_]) : Oe(f[_]));
          fe.key != null && q.set(fe.key, _);
        }
        let J,
          te = 0;
        const pe = A - M + 1;
        let lt = !1,
          Us = 0;
        const xt = new Array(pe);
        for (_ = 0; _ < pe; _++) xt[_] = 0;
        for (_ = P; _ <= R; _++) {
          const fe = c[_];
          if (te >= pe) {
            xe(fe, y, w, !0);
            continue;
          }
          let Ee;
          if (fe.key != null) Ee = q.get(fe.key);
          else
            for (J = M; J <= A; J++)
              if (xt[J - M] === 0 && Et(fe, f[J])) {
                Ee = J;
                break;
              }
          Ee === void 0
            ? xe(fe, y, w, !0)
            : ((xt[Ee - M] = _ + 1),
              Ee >= Us ? (Us = Ee) : (lt = !0),
              E(fe, f[Ee], p, null, y, w, O, b, v),
              te++);
        }
        const js = lt ? Il(xt) : ft;
        for (J = js.length - 1, _ = pe - 1; _ >= 0; _--) {
          const fe = M + _,
            Ee = f[fe],
            Bs = fe + 1 < T ? f[fe + 1].el : g;
          xt[_] === 0
            ? E(null, Ee, p, Bs, y, w, O, b, v)
            : lt && (J < 0 || _ !== js[J] ? Ye(Ee, p, Bs, 2) : J--);
        }
      }
    },
    Ye = (c, f, p, g, y = null) => {
      const { el: w, type: O, transition: b, children: v, shapeFlag: _ } = c;
      if (_ & 6) {
        Ye(c.component.subTree, f, p, g);
        return;
      }
      if (_ & 128) {
        c.suspense.move(f, p, g);
        return;
      }
      if (_ & 64) {
        O.move(c, f, p, it);
        return;
      }
      if (O === Se) {
        s(w, f, p);
        for (let R = 0; R < v.length; R++) Ye(v[R], f, p, g);
        s(c.anchor, f, p);
        return;
      }
      if (O === Un) {
        j(c, f, p);
        return;
      }
      if (g !== 2 && _ & 1 && b)
        if (g === 0) b.beforeEnter(w), s(w, f, p), le(() => b.enter(w), y);
        else {
          const { leave: R, delayLeave: A, afterLeave: P } = b,
            M = () => s(w, f, p),
            q = () => {
              R(w, () => {
                M(), P && P();
              });
            };
          A ? A(w, M, q) : q();
        }
      else s(w, f, p);
    },
    xe = (c, f, p, g = !1, y = !1) => {
      const {
        type: w,
        props: O,
        ref: b,
        children: v,
        dynamicChildren: _,
        shapeFlag: T,
        patchFlag: R,
        dirs: A,
      } = c;
      if ((b != null && Zn(b, null, p, c, !0), T & 256)) {
        f.ctx.deactivate(c);
        return;
      }
      const P = T & 1 && A,
        M = !Gt(c);
      let q;
      if ((M && (q = O && O.onVnodeBeforeUnmount) && ve(q, f, c), T & 6))
        Qo(c.component, p, g);
      else {
        if (T & 128) {
          c.suspense.unmount(p, g);
          return;
        }
        P && Qe(c, null, f, "beforeUnmount"),
          T & 64
            ? c.type.remove(c, f, p, y, it, g)
            : _ && (w !== Se || (R > 0 && R & 64))
              ? Le(_, f, p, !1, !0)
              : ((w === Se && R & 384) || (!y && T & 16)) && Le(v, f, p),
          g && Ms(c);
      }
      ((M && (q = O && O.onVnodeUnmounted)) || P) &&
        le(() => {
          q && ve(q, f, c), P && Qe(c, null, f, "unmounted");
        }, p);
    },
    Ms = (c) => {
      const { type: f, el: p, anchor: g, transition: y } = c;
      if (f === Se) {
        Yo(p, g);
        return;
      }
      if (f === Un) {
        Q(c);
        return;
      }
      const w = () => {
        r(p), y && !y.persisted && y.afterLeave && y.afterLeave();
      };
      if (c.shapeFlag & 1 && y && !y.persisted) {
        const { leave: O, delayLeave: b } = y,
          v = () => O(p, w);
        b ? b(c.el, w, v) : v();
      } else w();
    },
    Yo = (c, f) => {
      let p;
      for (; c !== f; ) (p = x(c)), r(c), (c = p);
      r(f);
    },
    Qo = (c, f, p) => {
      const { bum: g, scope: y, update: w, subTree: O, um: b } = c;
      g && In(g),
        y.stop(),
        w && ((w.active = !1), xe(O, c, f, p)),
        b && le(b, f),
        le(() => {
          c.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    Le = (c, f, p, g = !1, y = !1, w = 0) => {
      for (let O = w; O < c.length; O++) xe(c[O], f, p, g, y);
    },
    Dt = (c) =>
      c.shapeFlag & 6
        ? Dt(c.component.subTree)
        : c.shapeFlag & 128
          ? c.suspense.next()
          : x(c.anchor || c.el);
  let Cn = !1;
  const ks = (c, f, p) => {
      c == null
        ? f._vnode && xe(f._vnode, null, null, !0)
        : E(f._vnode || null, c, f, null, null, null, p),
        Cn || ((Cn = !0), Js(), no(), (Cn = !1)),
        (f._vnode = c);
    },
    it = {
      p: E,
      um: xe,
      m: Ye,
      r: Ms,
      mt: Tn,
      mc: we,
      pc: W,
      pbc: Ge,
      n: Dt,
      o: e,
    };
  let An, Rn;
  return (
    t && ([An, Rn] = t(it)), { render: ks, hydrate: An, createApp: xl(ks, An) }
  );
}
function kn({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function Ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Pl(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function vo(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (I(s) && I(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = $e(r[o])), (l.el = i.el)),
        n || vo(i, l)),
        l.type === yn && (l.el = i.el);
    }
}
function Il(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l);
      a < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
function So(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : So(t);
}
const Nl = (e) => e.__isTeleport,
  Se = Symbol.for("v-fgt"),
  yn = Symbol.for("v-txt"),
  st = Symbol.for("v-cmt"),
  Un = Symbol.for("v-stc"),
  At = [];
let _e = null;
function k(e = !1) {
  At.push((_e = e ? null : []));
}
function Ll() {
  At.pop(), (_e = At[At.length - 1] || null);
}
let Lt = 1;
function ir(e) {
  Lt += e;
}
function Oo(e) {
  return (
    (e.dynamicChildren = Lt > 0 ? _e || ft : null),
    Ll(),
    Lt > 0 && _e && _e.push(e),
    e
  );
}
function $(e, t, n, s, r, o) {
  return Oo(L(e, t, n, s, r, o, !0));
}
function es(e, t, n, s, r) {
  return Oo(Ae(e, t, n, s, r, !0));
}
function Fl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const _n = "__vInternal",
  To = ({ key: e }) => e ?? null,
  Yt = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ee(e) || ue(e) || N(e)
        ? { i: ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function L(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Se ? 0 : 1,
  i = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && To(t),
    ref: t && Yt(t),
    scopeId: mn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ye,
  };
  return (
    l
      ? (Os(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= ee(n) ? 8 : 16),
    Lt > 0 &&
      !i &&
      _e &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      _e.push(u),
    u
  );
}
const Ae = Ml;
function Ml(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === co) && (e = st), Fl(e))) {
    const l = mt(e, t, !0);
    return (
      n && Os(l, n),
      Lt > 0 &&
        !o &&
        _e &&
        (l.shapeFlag & 6 ? (_e[_e.indexOf(e)] = l) : _e.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((zl(e) && (e = e.__vccOpts), t)) {
    t = kl(t);
    let { class: l, style: u } = t;
    l && !ee(l) && (t.class = Rt(l)),
      Y(u) && (Gr(u) && !I(u) && (u = re({}, u)), (t.style = ds(u)));
  }
  const i = ee(e) ? 1 : Qi(e) ? 128 : Nl(e) ? 64 : Y(e) ? 4 : N(e) ? 2 : 0;
  return L(e, t, n, s, r, i, o, !0);
}
function kl(e) {
  return e ? (Gr(e) || _n in e ? re({}, e) : e) : null;
}
function mt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? Ul(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && To(l),
    ref:
      t && t.ref ? (n && r ? (I(r) ? r.concat(Yt(t)) : [r, Yt(t)]) : Yt(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Se ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function He(e = " ", t = 0) {
  return Ae(yn, null, e, t);
}
function K(e = "", t = !1) {
  return t ? (k(), es(st, null, e)) : Ae(st, null, e);
}
function Oe(e) {
  return e == null || typeof e == "boolean"
    ? Ae(st)
    : I(e)
      ? Ae(Se, null, e.slice())
      : typeof e == "object"
        ? $e(e)
        : Ae(yn, null, String(e));
}
function $e(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e);
}
function Os(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (I(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Os(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(_n in t)
        ? (t._ctx = ye)
        : r === 3 &&
          ye &&
          (ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    N(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [He(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ul(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Rt([t.class, s.class]));
      else if (r === "style") t.style = ds([t.style, s.style]);
      else if (cn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(I(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function ve(e, t, n, s = null) {
  be(e, t, 7, [n, s]);
}
const jl = yo();
let Bl = 0;
function $l(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || jl,
    o = {
      uid: Bl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ai(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: bo(s, r),
      emitsOptions: ro(s, r),
      emit: null,
      emitted: null,
      propsDefaults: G,
      inheritAttrs: s.inheritAttrs,
      ctx: G,
      data: G,
      props: G,
      attrs: G,
      slots: G,
      refs: G,
      setupState: G,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = qi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let se = null,
  on,
  ts;
{
  const e = Fr(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  (on = t("__VUE_INSTANCE_SETTERS__", (n) => (se = n))),
    (ts = t("__VUE_SSR_SETTERS__", (n) => (bn = n)));
}
const Mt = (e) => {
    const t = se;
    return (
      on(e),
      e.scope.on(),
      () => {
        e.scope.off(), on(t);
      }
    );
  },
  lr = () => {
    se && se.scope.off(), on(null);
  };
function Co(e) {
  return e.vnode.shapeFlag & 4;
}
let bn = !1;
function Dl(e, t = !1) {
  t && ts(t);
  const { props: n, children: s } = e.vnode,
    r = Co(e);
  vl(e, n, r, t), Tl(e, s);
  const o = r ? Hl(e, t) : void 0;
  return t && ts(!1), o;
}
function Hl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Xr(new Proxy(e.ctx, pl)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Kl(e) : null),
      o = Mt(e);
    rt();
    const i = Ke(s, e, 0, [e.props, r]);
    if ((ot(), o(), Ir(i))) {
      if ((i.then(lr, lr), t))
        return i
          .then((l) => {
            cr(e, l, t);
          })
          .catch((l) => {
            hn(l, e, 0);
          });
      e.asyncDep = i;
    } else cr(e, i, t);
  } else Ao(e, t);
}
function cr(e, t, n) {
  N(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Y(t) && (e.setupState = Zr(t)),
    Ao(e, n);
}
let ur;
function Ao(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ur && !s.render) {
      const r = s.template || vs(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          a = re(re({ isCustomElement: o, delimiters: l }, i), u);
        s.render = ur(r, a);
      }
    }
    e.render = s.render || de;
  }
  {
    const r = Mt(e);
    rt();
    try {
      ml(e);
    } finally {
      ot(), r();
    }
  }
}
function Vl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return ce(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Kl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Vl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Ts(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Zr(Xr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Tt) return Tt[n](e);
        },
        has(t, n) {
          return n in t || n in Tt;
        },
      }))
    );
}
function ql(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function zl(e) {
  return N(e) && "__vccOpts" in e;
}
const Wl = (e, t) => Fi(e, t, bn),
  Jl = "3.4.19";
/**
 * @vue/runtime-dom v3.4.19
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Gl = "http://www.w3.org/2000/svg",
  Xl = "http://www.w3.org/1998/Math/MathML",
  De = typeof document < "u" ? document : null,
  fr = De && De.createElement("template"),
  Yl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === "svg"
          ? De.createElementNS(Gl, e)
          : t === "mathml"
            ? De.createElementNS(Xl, e)
            : De.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => De.createTextNode(e),
    createComment: (e) => De.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => De.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        fr.innerHTML =
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e;
        const l = fr.content;
        if (s === "svg" || s === "mathml") {
          const u = l.firstChild;
          for (; u.firstChild; ) l.appendChild(u.firstChild);
          l.removeChild(u);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Ql = Symbol("_vtc");
function Zl(e, t, n) {
  const s = e[Ql];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t);
}
const ar = Symbol("_vod"),
  ec = Symbol(""),
  tc = /(^|;)\s*display\s*:/;
function nc(e, t, n) {
  const s = e.style,
    r = ee(n),
    o = s.display;
  let i = !1;
  if (n && !r) {
    if (t && !ee(t)) for (const l in t) n[l] == null && ns(s, l, "");
    for (const l in n) l === "display" && (i = !0), ns(s, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = s[ec];
      l && (n += ";" + l), (s.cssText = n), (i = tc.test(n));
    }
  } else t && e.removeAttribute("style");
  ar in e && ((e[ar] = i ? s.display : ""), (s.display = o));
}
const dr = /\s*!important$/;
function ns(e, t, n) {
  if (I(n)) n.forEach((s) => ns(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = sc(e, t);
    dr.test(n)
      ? e.setProperty(_t(s), n.replace(dr, ""), "important")
      : (e[s] = n);
  }
}
const hr = ["Webkit", "Moz", "ms"],
  jn = {};
function sc(e, t) {
  const n = jn[t];
  if (n) return n;
  let s = Re(t);
  if (s !== "filter" && s in e) return (jn[t] = s);
  s = an(s);
  for (let r = 0; r < hr.length; r++) {
    const o = hr[r] + s;
    if (o in e) return (jn[t] = o);
  }
  return t;
}
const pr = "http://www.w3.org/1999/xlink";
function rc(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(pr, t.slice(6, t.length))
      : e.setAttributeNS(pr, t, n);
  else {
    const o = fi(t);
    n == null || (o && !Mr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function oc(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      d = n ?? "";
    a !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = Mr(n))
      : n == null && a === "string"
        ? ((n = ""), (u = !0))
        : a === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
function ic(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function lc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const mr = Symbol("_vei");
function cc(e, t, n, s, r = null) {
  const o = e[mr] || (e[mr] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = uc(t);
    if (s) {
      const a = (o[t] = dc(s, r));
      ic(e, l, a, u);
    } else i && (lc(e, l, i, u), (o[t] = void 0));
  }
}
const gr = /(?:Once|Passive|Capture)$/;
function uc(e) {
  let t;
  if (gr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(gr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : _t(e.slice(2)), t];
}
let Bn = 0;
const fc = Promise.resolve(),
  ac = () => Bn || (fc.then(() => (Bn = 0)), (Bn = Date.now()));
function dc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    be(hc(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = ac()), n;
}
function hc(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const yr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  pc = (e, t, n, s, r, o, i, l, u) => {
    const a = r === "svg";
    t === "class"
      ? Zl(e, s, a)
      : t === "style"
        ? nc(e, n, s)
        : cn(t)
          ? us(t) || cc(e, t, n, s, i)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : mc(e, t, s, a)
              )
            ? oc(e, t, s, o, i, l, u)
            : (t === "true-value"
                ? (e._trueValue = s)
                : t === "false-value" && (e._falseValue = s),
              rc(e, t, s, a));
  };
function mc(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && yr(t) && N(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return yr(t) && ee(n) ? !1 : t in e;
}
const gc = re({ patchProp: pc }, Yl);
let _r;
function yc() {
  return _r || (_r = Al(gc));
}
const _c = (...e) => {
  const t = yc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = wc(s);
      if (!r) return;
      const o = t._component;
      !N(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, bc(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function bc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function wc(e) {
  return ee(e) ? document.querySelector(e) : e;
}
function Ro(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: xc } = Object.prototype,
  { getPrototypeOf: Cs } = Object,
  wn = ((e) => (t) => {
    const n = xc.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Pe = (e) => ((e = e.toLowerCase()), (t) => wn(t) === e),
  xn = (e) => (t) => typeof t === e,
  { isArray: bt } = Array,
  Ft = xn("undefined");
function Ec(e) {
  return (
    e !== null &&
    !Ft(e) &&
    e.constructor !== null &&
    !Ft(e.constructor) &&
    he(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Po = Pe("ArrayBuffer");
function vc(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Po(e.buffer)),
    t
  );
}
const Sc = xn("string"),
  he = xn("function"),
  Io = xn("number"),
  En = (e) => e !== null && typeof e == "object",
  Oc = (e) => e === !0 || e === !1,
  Qt = (e) => {
    if (wn(e) !== "object") return !1;
    const t = Cs(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  Tc = Pe("Date"),
  Cc = Pe("File"),
  Ac = Pe("Blob"),
  Rc = Pe("FileList"),
  Pc = (e) => En(e) && he(e.pipe),
  Ic = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (he(e.append) &&
          ((t = wn(e)) === "formdata" ||
            (t === "object" &&
              he(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  Nc = Pe("URLSearchParams"),
  Lc = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function kt(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let s, r;
  if ((typeof e != "object" && (e = [e]), bt(e)))
    for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let l;
    for (s = 0; s < i; s++) (l = o[s]), t.call(null, e[l], l, e);
  }
}
function No(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length,
    r;
  for (; s-- > 0; ) if (((r = n[s]), t === r.toLowerCase())) return r;
  return null;
}
const Lo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Fo = (e) => !Ft(e) && e !== Lo;
function ss() {
  const { caseless: e } = (Fo(this) && this) || {},
    t = {},
    n = (s, r) => {
      const o = (e && No(t, r)) || r;
      Qt(t[o]) && Qt(s)
        ? (t[o] = ss(t[o], s))
        : Qt(s)
          ? (t[o] = ss({}, s))
          : bt(s)
            ? (t[o] = s.slice())
            : (t[o] = s);
    };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && kt(arguments[s], n);
  return t;
}
const Fc = (e, t, n, { allOwnKeys: s } = {}) => (
    kt(
      t,
      (r, o) => {
        n && he(r) ? (e[o] = Ro(r, n)) : (e[o] = r);
      },
      { allOwnKeys: s }
    ),
    e
  ),
  Mc = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  kc = (e, t, n, s) => {
    (e.prototype = Object.create(t.prototype, s)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  Uc = (e, t, n, s) => {
    let r, o, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
        (i = r[o]), (!s || s(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0));
      e = n !== !1 && Cs(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  jc = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const s = e.indexOf(t, n);
    return s !== -1 && s === n;
  },
  Bc = (e) => {
    if (!e) return null;
    if (bt(e)) return e;
    let t = e.length;
    if (!Io(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  $c = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Cs(Uint8Array)),
  Dc = (e, t) => {
    const s = (e && e[Symbol.iterator]).call(e);
    let r;
    for (; (r = s.next()) && !r.done; ) {
      const o = r.value;
      t.call(e, o[0], o[1]);
    }
  },
  Hc = (e, t) => {
    let n;
    const s = [];
    for (; (n = e.exec(t)) !== null; ) s.push(n);
    return s;
  },
  Vc = Pe("HTMLFormElement"),
  Kc = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, r) {
      return s.toUpperCase() + r;
    }),
  br = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  qc = Pe("RegExp"),
  Mo = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      s = {};
    kt(n, (r, o) => {
      let i;
      (i = t(r, o, e)) !== !1 && (s[o] = i || r);
    }),
      Object.defineProperties(e, s);
  },
  zc = (e) => {
    Mo(e, (t, n) => {
      if (he(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const s = e[n];
      if (he(s)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Wc = (e, t) => {
    const n = {},
      s = (r) => {
        r.forEach((o) => {
          n[o] = !0;
        });
      };
    return bt(e) ? s(e) : s(String(e).split(t)), n;
  },
  Jc = () => {},
  Gc = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  $n = "abcdefghijklmnopqrstuvwxyz",
  wr = "0123456789",
  ko = { DIGIT: wr, ALPHA: $n, ALPHA_DIGIT: $n + $n.toUpperCase() + wr },
  Xc = (e = 16, t = ko.ALPHA_DIGIT) => {
    let n = "";
    const { length: s } = t;
    for (; e--; ) n += t[(Math.random() * s) | 0];
    return n;
  };
function Yc(e) {
  return !!(
    e &&
    he(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const Qc = (e) => {
    const t = new Array(10),
      n = (s, r) => {
        if (En(s)) {
          if (t.indexOf(s) >= 0) return;
          if (!("toJSON" in s)) {
            t[r] = s;
            const o = bt(s) ? [] : {};
            return (
              kt(s, (i, l) => {
                const u = n(i, r + 1);
                !Ft(u) && (o[l] = u);
              }),
              (t[r] = void 0),
              o
            );
          }
        }
        return s;
      };
    return n(e, 0);
  },
  Zc = Pe("AsyncFunction"),
  eu = (e) => e && (En(e) || he(e)) && he(e.then) && he(e.catch),
  m = {
    isArray: bt,
    isArrayBuffer: Po,
    isBuffer: Ec,
    isFormData: Ic,
    isArrayBufferView: vc,
    isString: Sc,
    isNumber: Io,
    isBoolean: Oc,
    isObject: En,
    isPlainObject: Qt,
    isUndefined: Ft,
    isDate: Tc,
    isFile: Cc,
    isBlob: Ac,
    isRegExp: qc,
    isFunction: he,
    isStream: Pc,
    isURLSearchParams: Nc,
    isTypedArray: $c,
    isFileList: Rc,
    forEach: kt,
    merge: ss,
    extend: Fc,
    trim: Lc,
    stripBOM: Mc,
    inherits: kc,
    toFlatObject: Uc,
    kindOf: wn,
    kindOfTest: Pe,
    endsWith: jc,
    toArray: Bc,
    forEachEntry: Dc,
    matchAll: Hc,
    isHTMLForm: Vc,
    hasOwnProperty: br,
    hasOwnProp: br,
    reduceDescriptors: Mo,
    freezeMethods: zc,
    toObjectSet: Wc,
    toCamelCase: Kc,
    noop: Jc,
    toFiniteNumber: Gc,
    findKey: No,
    global: Lo,
    isContextDefined: Fo,
    ALPHABET: ko,
    generateString: Xc,
    isSpecCompliantForm: Yc,
    toJSONObject: Qc,
    isAsyncFn: Zc,
    isThenable: eu,
  };
function B(e, t, n, s, r) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    s && (this.request = s),
    r && (this.response = r);
}
m.inherits(B, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: m.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Uo = B.prototype,
  jo = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  jo[e] = { value: e };
});
Object.defineProperties(B, jo);
Object.defineProperty(Uo, "isAxiosError", { value: !0 });
B.from = (e, t, n, s, r, o) => {
  const i = Object.create(Uo);
  return (
    m.toFlatObject(
      e,
      i,
      function (u) {
        return u !== Error.prototype;
      },
      (l) => l !== "isAxiosError"
    ),
    B.call(i, e.message, t, n, s, r),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const tu = null;
function rs(e) {
  return m.isPlainObject(e) || m.isArray(e);
}
function Bo(e) {
  return m.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function xr(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (r, o) {
          return (r = Bo(r)), !n && o ? "[" + r + "]" : r;
        })
        .join(n ? "." : "")
    : t;
}
function nu(e) {
  return m.isArray(e) && !e.some(rs);
}
const su = m.toFlatObject(m, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function vn(e, t, n) {
  if (!m.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = m.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (E, F) {
        return !m.isUndefined(F[E]);
      }
    ));
  const s = n.metaTokens,
    r = n.visitor || d,
    o = n.dots,
    i = n.indexes,
    u = (n.Blob || (typeof Blob < "u" && Blob)) && m.isSpecCompliantForm(t);
  if (!m.isFunction(r)) throw new TypeError("visitor must be a function");
  function a(S) {
    if (S === null) return "";
    if (m.isDate(S)) return S.toISOString();
    if (!u && m.isBlob(S))
      throw new B("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(S) || m.isTypedArray(S)
      ? u && typeof Blob == "function"
        ? new Blob([S])
        : Buffer.from(S)
      : S;
  }
  function d(S, E, F) {
    let U = S;
    if (S && !F && typeof S == "object") {
      if (m.endsWith(E, "{}"))
        (E = s ? E : E.slice(0, -2)), (S = JSON.stringify(S));
      else if (
        (m.isArray(S) && nu(S)) ||
        ((m.isFileList(S) || m.endsWith(E, "[]")) && (U = m.toArray(S)))
      )
        return (
          (E = Bo(E)),
          U.forEach(function (j, Q) {
            !(m.isUndefined(j) || j === null) &&
              t.append(
                i === !0 ? xr([E], Q, o) : i === null ? E : E + "[]",
                a(j)
              );
          }),
          !1
        );
    }
    return rs(S) ? !0 : (t.append(xr(F, E, o), a(S)), !1);
  }
  const h = [],
    x = Object.assign(su, {
      defaultVisitor: d,
      convertValue: a,
      isVisitable: rs,
    });
  function C(S, E) {
    if (!m.isUndefined(S)) {
      if (h.indexOf(S) !== -1)
        throw Error("Circular reference detected in " + E.join("."));
      h.push(S),
        m.forEach(S, function (U, Z) {
          (!(m.isUndefined(U) || U === null) &&
            r.call(t, U, m.isString(Z) ? Z.trim() : Z, E, x)) === !0 &&
            C(U, E ? E.concat(Z) : [Z]);
        }),
        h.pop();
    }
  }
  if (!m.isObject(e)) throw new TypeError("data must be an object");
  return C(e), t;
}
function Er(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
    return t[s];
  });
}
function As(e, t) {
  (this._pairs = []), e && vn(e, this, t);
}
const $o = As.prototype;
$o.append = function (t, n) {
  this._pairs.push([t, n]);
};
$o.toString = function (t) {
  const n = t
    ? function (s) {
        return t.call(this, s, Er);
      }
    : Er;
  return this._pairs
    .map(function (r) {
      return n(r[0]) + "=" + n(r[1]);
    }, "")
    .join("&");
};
function ru(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Do(e, t, n) {
  if (!t) return e;
  const s = (n && n.encode) || ru,
    r = n && n.serialize;
  let o;
  if (
    (r
      ? (o = r(t, n))
      : (o = m.isURLSearchParams(t) ? t.toString() : new As(t, n).toString(s)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class vr {
  constructor() {
    this.handlers = [];
  }
  use(t, n, s) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    m.forEach(this.handlers, function (s) {
      s !== null && t(s);
    });
  }
}
const Ho = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  ou = typeof URLSearchParams < "u" ? URLSearchParams : As,
  iu = typeof FormData < "u" ? FormData : null,
  lu = typeof Blob < "u" ? Blob : null,
  cu = {
    isBrowser: !0,
    classes: { URLSearchParams: ou, FormData: iu, Blob: lu },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Vo = typeof window < "u" && typeof document < "u",
  uu = ((e) => Vo && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
    typeof navigator < "u" && navigator.product
  ),
  fu =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  au = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Vo,
        hasStandardBrowserEnv: uu,
        hasStandardBrowserWebWorkerEnv: fu,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ce = { ...au, ...cu };
function du(e, t) {
  return vn(
    e,
    new Ce.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, s, r, o) {
          return Ce.isNode && m.isBuffer(n)
            ? (this.append(s, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function hu(e) {
  return m
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function pu(e) {
  const t = {},
    n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++) (o = n[s]), (t[o] = e[o]);
  return t;
}
function Ko(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i),
      u = o >= n.length;
    return (
      (i = !i && m.isArray(r) ? r.length : i),
      u
        ? (m.hasOwnProp(r, i) ? (r[i] = [r[i], s]) : (r[i] = s), !l)
        : ((!r[i] || !m.isObject(r[i])) && (r[i] = []),
          t(n, s, r[i], o) && m.isArray(r[i]) && (r[i] = pu(r[i])),
          !l)
    );
  }
  if (m.isFormData(e) && m.isFunction(e.entries)) {
    const n = {};
    return (
      m.forEachEntry(e, (s, r) => {
        t(hu(s), r, n, 0);
      }),
      n
    );
  }
  return null;
}
function mu(e, t, n) {
  if (m.isString(e))
    try {
      return (t || JSON.parse)(e), m.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (n || JSON.stringify)(e);
}
const Rs = {
  transitional: Ho,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const s = n.getContentType() || "",
        r = s.indexOf("application/json") > -1,
        o = m.isObject(t);
      if ((o && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t)))
        return r ? JSON.stringify(Ko(t)) : t;
      if (
        m.isArrayBuffer(t) ||
        m.isBuffer(t) ||
        m.isStream(t) ||
        m.isFile(t) ||
        m.isBlob(t)
      )
        return t;
      if (m.isArrayBufferView(t)) return t.buffer;
      if (m.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let l;
      if (o) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return du(t, this.formSerializer).toString();
        if ((l = m.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return vn(
            l ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || r ? (n.setContentType("application/json", !1), mu(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Rs.transitional,
        s = n && n.forcedJSONParsing,
        r = this.responseType === "json";
      if (t && m.isString(t) && ((s && !this.responseType) || r)) {
        const i = !(n && n.silentJSONParsing) && r;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? B.from(l, B.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ce.classes.FormData, Blob: Ce.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
m.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Rs.headers[e] = {};
});
const Ps = Rs,
  gu = m.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  yu = (e) => {
    const t = {};
    let n, s, r;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (r = i.indexOf(":")),
              (n = i.substring(0, r).trim().toLowerCase()),
              (s = i.substring(r + 1).trim()),
              !(!n || (t[n] && gu[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(s)
                    : (t[n] = [s])
                  : (t[n] = t[n] ? t[n] + ", " + s : s));
          }),
      t
    );
  },
  Sr = Symbol("internals");
function vt(e) {
  return e && String(e).trim().toLowerCase();
}
function Zt(e) {
  return e === !1 || e == null ? e : m.isArray(e) ? e.map(Zt) : String(e);
}
function _u(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = n.exec(e)); ) t[s[1]] = s[2];
  return t;
}
const bu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Dn(e, t, n, s, r) {
  if (m.isFunction(s)) return s.call(this, t, n);
  if ((r && (t = n), !!m.isString(t))) {
    if (m.isString(s)) return t.indexOf(s) !== -1;
    if (m.isRegExp(s)) return s.test(t);
  }
}
function wu(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function xu(e, t) {
  const n = m.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function (r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0,
    });
  });
}
class Sn {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(l, u, a) {
      const d = vt(u);
      if (!d) throw new Error("header name must be a non-empty string");
      const h = m.findKey(r, d);
      (!h || r[h] === void 0 || a === !0 || (a === void 0 && r[h] !== !1)) &&
        (r[h || u] = Zt(l));
    }
    const i = (l, u) => m.forEach(l, (a, d) => o(a, d, u));
    return (
      m.isPlainObject(t) || t instanceof this.constructor
        ? i(t, n)
        : m.isString(t) && (t = t.trim()) && !bu(t)
          ? i(yu(t), n)
          : t != null && o(n, t, s),
      this
    );
  }
  get(t, n) {
    if (((t = vt(t)), t)) {
      const s = m.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n) return r;
        if (n === !0) return _u(r);
        if (m.isFunction(n)) return n.call(this, r, s);
        if (m.isRegExp(n)) return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = vt(t)), t)) {
      const s = m.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || Dn(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (((i = vt(i)), i)) {
        const l = m.findKey(s, i);
        l && (!n || Dn(s, s[l], l, n)) && (delete s[l], (r = !0));
      }
    }
    return m.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length,
      r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || Dn(this, this[o], o, t, !0)) && (delete this[o], (r = !0));
    }
    return r;
  }
  normalize(t) {
    const n = this,
      s = {};
    return (
      m.forEach(this, (r, o) => {
        const i = m.findKey(s, o);
        if (i) {
          (n[i] = Zt(r)), delete n[o];
          return;
        }
        const l = t ? wu(o) : String(o).trim();
        l !== o && delete n[o], (n[l] = Zt(r)), (s[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      m.forEach(this, (s, r) => {
        s != null && s !== !1 && (n[r] = t && m.isArray(s) ? s.join(", ") : s);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[Sr] = this[Sr] = { accessors: {} }).accessors,
      r = this.prototype;
    function o(i) {
      const l = vt(i);
      s[l] || (xu(r, i), (s[l] = !0));
    }
    return m.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Sn.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
m.reduceDescriptors(Sn.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    },
  };
});
m.freezeMethods(Sn);
const Me = Sn;
function Hn(e, t) {
  const n = this || Ps,
    s = t || n,
    r = Me.from(s.headers);
  let o = s.data;
  return (
    m.forEach(e, function (l) {
      o = l.call(n, o, r.normalize(), t ? t.status : void 0);
    }),
    r.normalize(),
    o
  );
}
function qo(e) {
  return !!(e && e.__CANCEL__);
}
function Ut(e, t, n) {
  B.call(this, e ?? "canceled", B.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
m.inherits(Ut, B, { __CANCEL__: !0 });
function Eu(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status)
    ? e(n)
    : t(
        new B(
          "Request failed with status code " + n.status,
          [B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const vu = Ce.hasStandardBrowserEnv
  ? {
      write(e, t, n, s, r, o) {
        const i = [e + "=" + encodeURIComponent(t)];
        m.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
          m.isString(s) && i.push("path=" + s),
          m.isString(r) && i.push("domain=" + r),
          o === !0 && i.push("secure"),
          (document.cookie = i.join("; "));
      },
      read(e) {
        const t = document.cookie.match(
          new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
        );
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove(e) {
        this.write(e, "", Date.now() - 864e5);
      },
    }
  : {
      write() {},
      read() {
        return null;
      },
      remove() {},
    };
function Su(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ou(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function zo(e, t) {
  return e && !Su(t) ? Ou(e, t) : t;
}
const Tu = Ce.hasStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let s;
      function r(o) {
        let i = o;
        return (
          t && (n.setAttribute("href", i), (i = n.href)),
          n.setAttribute("href", i),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (s = r(window.location.href)),
        function (i) {
          const l = m.isString(i) ? r(i) : i;
          return l.protocol === s.protocol && l.host === s.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function Cu(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function Au(e, t) {
  e = e || 10;
  const n = new Array(e),
    s = new Array(e);
  let r = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const a = Date.now(),
        d = s[o];
      i || (i = a), (n[r] = u), (s[r] = a);
      let h = o,
        x = 0;
      for (; h !== r; ) (x += n[h++]), (h = h % e);
      if (((r = (r + 1) % e), r === o && (o = (o + 1) % e), a - i < t)) return;
      const C = d && a - d;
      return C ? Math.round((x * 1e3) / C) : void 0;
    }
  );
}
function Or(e, t) {
  let n = 0;
  const s = Au(50, 250);
  return (r) => {
    const o = r.loaded,
      i = r.lengthComputable ? r.total : void 0,
      l = o - n,
      u = s(l),
      a = o <= i;
    n = o;
    const d = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && i && a ? (i - o) / u : void 0,
      event: r,
    };
    (d[t ? "download" : "upload"] = !0), e(d);
  };
}
const Ru = typeof XMLHttpRequest < "u",
  Pu =
    Ru &&
    function (e) {
      return new Promise(function (n, s) {
        let r = e.data;
        const o = Me.from(e.headers).normalize();
        let { responseType: i, withXSRFToken: l } = e,
          u;
        function a() {
          e.cancelToken && e.cancelToken.unsubscribe(u),
            e.signal && e.signal.removeEventListener("abort", u);
        }
        let d;
        if (m.isFormData(r)) {
          if (Ce.hasStandardBrowserEnv || Ce.hasStandardBrowserWebWorkerEnv)
            o.setContentType(!1);
          else if ((d = o.getContentType()) !== !1) {
            const [E, ...F] = d
              ? d
                  .split(";")
                  .map((U) => U.trim())
                  .filter(Boolean)
              : [];
            o.setContentType([E || "multipart/form-data", ...F].join("; "));
          }
        }
        let h = new XMLHttpRequest();
        if (e.auth) {
          const E = e.auth.username || "",
            F = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          o.set("Authorization", "Basic " + btoa(E + ":" + F));
        }
        const x = zo(e.baseURL, e.url);
        h.open(e.method.toUpperCase(), Do(x, e.params, e.paramsSerializer), !0),
          (h.timeout = e.timeout);
        function C() {
          if (!h) return;
          const E = Me.from(
              "getAllResponseHeaders" in h && h.getAllResponseHeaders()
            ),
            U = {
              data:
                !i || i === "text" || i === "json"
                  ? h.responseText
                  : h.response,
              status: h.status,
              statusText: h.statusText,
              headers: E,
              config: e,
              request: h,
            };
          Eu(
            function (j) {
              n(j), a();
            },
            function (j) {
              s(j), a();
            },
            U
          ),
            (h = null);
        }
        if (
          ("onloadend" in h
            ? (h.onloadend = C)
            : (h.onreadystatechange = function () {
                !h ||
                  h.readyState !== 4 ||
                  (h.status === 0 &&
                    !(h.responseURL && h.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(C);
              }),
          (h.onabort = function () {
            h &&
              (s(new B("Request aborted", B.ECONNABORTED, e, h)), (h = null));
          }),
          (h.onerror = function () {
            s(new B("Network Error", B.ERR_NETWORK, e, h)), (h = null);
          }),
          (h.ontimeout = function () {
            let F = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const U = e.transitional || Ho;
            e.timeoutErrorMessage && (F = e.timeoutErrorMessage),
              s(
                new B(
                  F,
                  U.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
                  e,
                  h
                )
              ),
              (h = null);
          }),
          Ce.hasStandardBrowserEnv &&
            (l && m.isFunction(l) && (l = l(e)), l || (l !== !1 && Tu(x))))
        ) {
          const E =
            e.xsrfHeaderName && e.xsrfCookieName && vu.read(e.xsrfCookieName);
          E && o.set(e.xsrfHeaderName, E);
        }
        r === void 0 && o.setContentType(null),
          "setRequestHeader" in h &&
            m.forEach(o.toJSON(), function (F, U) {
              h.setRequestHeader(U, F);
            }),
          m.isUndefined(e.withCredentials) ||
            (h.withCredentials = !!e.withCredentials),
          i && i !== "json" && (h.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            h.addEventListener("progress", Or(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            h.upload &&
            h.upload.addEventListener("progress", Or(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((u = (E) => {
              h &&
                (s(!E || E.type ? new Ut(null, e, h) : E),
                h.abort(),
                (h = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(u),
            e.signal &&
              (e.signal.aborted ? u() : e.signal.addEventListener("abort", u)));
        const S = Cu(x);
        if (S && Ce.protocols.indexOf(S) === -1) {
          s(new B("Unsupported protocol " + S + ":", B.ERR_BAD_REQUEST, e));
          return;
        }
        h.send(r || null);
      });
    },
  os = { http: tu, xhr: Pu };
m.forEach(os, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Tr = (e) => `- ${e}`,
  Iu = (e) => m.isFunction(e) || e === null || e === !1,
  Wo = {
    getAdapter: (e) => {
      e = m.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, s;
      const r = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((s = n),
          !Iu(n) && ((s = os[(i = String(n)).toLowerCase()]), s === void 0))
        )
          throw new B(`Unknown adapter '${i}'`);
        if (s) break;
        r[i || "#" + o] = s;
      }
      if (!s) {
        const o = Object.entries(r).map(
          ([l, u]) =>
            `adapter ${l} ` +
            (u === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(Tr).join(`
`)
            : " " + Tr(o[0])
          : "as no adapter specified";
        throw new B(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return s;
    },
    adapters: os,
  };
function Vn(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ut(null, e);
}
function Cr(e) {
  return (
    Vn(e),
    (e.headers = Me.from(e.headers)),
    (e.data = Hn.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Wo.getAdapter(e.adapter || Ps.adapter)(e).then(
      function (s) {
        return (
          Vn(e),
          (s.data = Hn.call(e, e.transformResponse, s)),
          (s.headers = Me.from(s.headers)),
          s
        );
      },
      function (s) {
        return (
          qo(s) ||
            (Vn(e),
            s &&
              s.response &&
              ((s.response.data = Hn.call(e, e.transformResponse, s.response)),
              (s.response.headers = Me.from(s.response.headers)))),
          Promise.reject(s)
        );
      }
    )
  );
}
const Ar = (e) => (e instanceof Me ? e.toJSON() : e);
function gt(e, t) {
  t = t || {};
  const n = {};
  function s(a, d, h) {
    return m.isPlainObject(a) && m.isPlainObject(d)
      ? m.merge.call({ caseless: h }, a, d)
      : m.isPlainObject(d)
        ? m.merge({}, d)
        : m.isArray(d)
          ? d.slice()
          : d;
  }
  function r(a, d, h) {
    if (m.isUndefined(d)) {
      if (!m.isUndefined(a)) return s(void 0, a, h);
    } else return s(a, d, h);
  }
  function o(a, d) {
    if (!m.isUndefined(d)) return s(void 0, d);
  }
  function i(a, d) {
    if (m.isUndefined(d)) {
      if (!m.isUndefined(a)) return s(void 0, a);
    } else return s(void 0, d);
  }
  function l(a, d, h) {
    if (h in t) return s(a, d);
    if (h in e) return s(void 0, a);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (a, d) => r(Ar(a), Ar(d), !0),
  };
  return (
    m.forEach(Object.keys(Object.assign({}, e, t)), function (d) {
      const h = u[d] || r,
        x = h(e[d], t[d], d);
      (m.isUndefined(x) && h !== l) || (n[d] = x);
    }),
    n
  );
}
const Jo = "1.6.7",
  Is = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Is[e] = function (s) {
      return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Rr = {};
Is.transitional = function (t, n, s) {
  function r(o, i) {
    return (
      "[Axios v" +
      Jo +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (s ? ". " + s : "")
    );
  }
  return (o, i, l) => {
    if (t === !1)
      throw new B(
        r(i, " has been removed" + (n ? " in " + n : "")),
        B.ERR_DEPRECATED
      );
    return (
      n &&
        !Rr[i] &&
        ((Rr[i] = !0),
        console.warn(
          r(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, l) : !0
    );
  };
};
function Nu(e, t, n) {
  if (typeof e != "object")
    throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r],
      i = t[o];
    if (i) {
      const l = e[o],
        u = l === void 0 || i(l, o, e);
      if (u !== !0)
        throw new B("option " + o + " must be " + u, B.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new B("Unknown option " + o, B.ERR_BAD_OPTION);
  }
}
const is = { assertOptions: Nu, validators: Is },
  je = is.validators;
class ln {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new vr(), response: new vr() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r;
        Error.captureStackTrace
          ? Error.captureStackTrace((r = {}))
          : (r = new Error());
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        s.stack
          ? o &&
            !String(s.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
            (s.stack +=
              `
` + o)
          : (s.stack = o);
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = gt(this.defaults, n));
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 &&
      is.assertOptions(
        s,
        {
          silentJSONParsing: je.transitional(je.boolean),
          forcedJSONParsing: je.transitional(je.boolean),
          clarifyTimeoutError: je.transitional(je.boolean),
        },
        !1
      ),
      r != null &&
        (m.isFunction(r)
          ? (n.paramsSerializer = { serialize: r })
          : is.assertOptions(
              r,
              { encode: je.function, serialize: je.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = o && m.merge(o.common, o[n.method]);
    o &&
      m.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (S) => {
          delete o[S];
        }
      ),
      (n.headers = Me.concat(i, o));
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function (E) {
      (typeof E.runWhen == "function" && E.runWhen(n) === !1) ||
        ((u = u && E.synchronous), l.unshift(E.fulfilled, E.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function (E) {
      a.push(E.fulfilled, E.rejected);
    });
    let d,
      h = 0,
      x;
    if (!u) {
      const S = [Cr.bind(this), void 0];
      for (
        S.unshift.apply(S, l),
          S.push.apply(S, a),
          x = S.length,
          d = Promise.resolve(n);
        h < x;

      )
        d = d.then(S[h++], S[h++]);
      return d;
    }
    x = l.length;
    let C = n;
    for (h = 0; h < x; ) {
      const S = l[h++],
        E = l[h++];
      try {
        C = S(C);
      } catch (F) {
        E.call(this, F);
        break;
      }
    }
    try {
      d = Cr.call(this, C);
    } catch (S) {
      return Promise.reject(S);
    }
    for (h = 0, x = a.length; h < x; ) d = d.then(a[h++], a[h++]);
    return d;
  }
  getUri(t) {
    t = gt(this.defaults, t);
    const n = zo(t.baseURL, t.url);
    return Do(n, t.params, t.paramsSerializer);
  }
}
m.forEach(["delete", "get", "head", "options"], function (t) {
  ln.prototype[t] = function (n, s) {
    return this.request(
      gt(s || {}, { method: t, url: n, data: (s || {}).data })
    );
  };
});
m.forEach(["post", "put", "patch"], function (t) {
  function n(s) {
    return function (o, i, l) {
      return this.request(
        gt(l || {}, {
          method: t,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (ln.prototype[t] = n()), (ln.prototype[t + "Form"] = n(!0));
});
const en = ln;
class Ns {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0; ) s._listeners[o](r);
      s._listeners = null;
    }),
      (this.promise.then = (r) => {
        let o;
        const i = new Promise((l) => {
          s.subscribe(l), (o = l);
        }).then(r);
        return (
          (i.cancel = function () {
            s.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, l) {
        s.reason || ((s.reason = new Ut(o, i, l)), n(s.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new Ns(function (r) {
        t = r;
      }),
      cancel: t,
    };
  }
}
const Lu = Ns;
function Fu(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Mu(e) {
  return m.isObject(e) && e.isAxiosError === !0;
}
const ls = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(ls).forEach(([e, t]) => {
  ls[t] = e;
});
const ku = ls;
function Go(e) {
  const t = new en(e),
    n = Ro(en.prototype.request, t);
  return (
    m.extend(n, en.prototype, t, { allOwnKeys: !0 }),
    m.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (r) {
      return Go(gt(e, r));
    }),
    n
  );
}
const z = Go(Ps);
z.Axios = en;
z.CanceledError = Ut;
z.CancelToken = Lu;
z.isCancel = qo;
z.VERSION = Jo;
z.toFormData = vn;
z.AxiosError = B;
z.Cancel = z.CanceledError;
z.all = function (t) {
  return Promise.all(t);
};
z.spread = Fu;
z.isAxiosError = Mu;
z.mergeConfig = gt;
z.AxiosHeaders = Me;
z.formToJSON = (e) => Ko(m.isHTMLForm(e) ? new FormData(e) : e);
z.getAdapter = Wo.getAdapter;
z.HttpStatusCode = ku;
z.default = z;
const Ls = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Xo = (e) => (oo("data-v-51a235fe"), (e = e()), io(), e),
  Uu = {
    class:
      "bg-gradient-to-b from-[#a100ffff] to-[#71c4ffff] max-[400px]:w-full max-w-[384px]:h-full w-96 h-[700px] bg-slate-300 relative flex items-center justify-center flex-col gap-4 p-16 rounded [&>input]:rounded [&>input]:w-full [&>input]:px-2 [&>input]:bg-slate-200 [&>input]:placeholder:text-slate-500",
  },
  ju = {
    class:
      "flex w-full justify-between h-8 [&>span]:flex items-center rounded transition-all cursor-pointer p-4 text-slate-700 [&>span]:transition-all",
    id: "sign",
  },
  Bu = Xo(() =>
    L(
      "input",
      {
        type: "text",
        id: "login",
        placeholder: "Логин",
        class: "outline-none bg-slate-200 family-sans-serif",
      },
      null,
      -1
    )
  ),
  $u = Xo(() =>
    L(
      "input",
      {
        type: "text",
        id: "password",
        placeholder: "Пароль",
        class: "outline-none bg-slate-200 family-sans-serif",
      },
      null,
      -1
    )
  ),
  Du = {
    key: 0,
    placeholder: "Повторите пароль",
    type: "text",
    id: "repeatPassword",
    class:
      "transition animate-[inputCreate_1s_ease-in-out] outline-none bg-slate-200 family-sans-serif",
  },
  Hu = { key: 0 },
  Vu = { key: 1 },
  Ku = {
    __name: "SignUp",
    props: { isAuth: Function, setIdUser: Function },
    setup(e) {
      const t = e,
        n = ge("reg"),
        s = () => {
          const o = document.getElementById("login").value,
            i = document.getElementById("password").value;
          if (n.value != "reg") {
            const l = document.getElementById("repeatPassword").value;
            i != l
              ? alert("Пароли не совпадают")
              : o == "" || i == "" || l == ""
                ? alert("Заполните все поля")
                : o.length < 5 || i.length < 5
                  ? alert("Логин или пароль слишком короткие")
                  : (z.post("https://a1d710d803a84bf6.mokky.dev/users", {
                      login: o,
                      pass: i,
                      money: 0,
                      multiTaps: 1,
                      priceMultiTap: 200,
                      autoClickerLevel: 0,
                      priceClickerLevel: 1e3,
                      icon: "btc",
                    }),
                    (n.value = "reg"));
          } else
            n.value == "reg" &&
              z.get("https://a1d710d803a84bf6.mokky.dev/users").then((l) => {
                if (o == "" || i == "") alert("Заполните все поля");
                else {
                  const u = l.data;
                  for (let a = 0; a < u.length; a++)
                    if (u[a].login == o && u[a].pass == i) {
                      t.isAuth(!0), t.setIdUser(u[a].id);
                      break;
                    } else t.isAuth(!1);
                }
              });
        },
        r = (o) => {
          o == "in"
            ? (document
                .getElementById("sign")
                .classList.add("animate-[editColorL_2s_ease-in-out]"),
              (n.value = "reg"))
            : o == "reg" &&
              (document
                .getElementById("sign")
                .classList.add("animate-[editColorR_2s_ease-in-out]"),
              (n.value = "in"));
        };
      return (o, i) => (
        k(),
        $("div", Uu, [
          L("div", ju, [
            L(
              "span",
              {
                onClick: i[0] || (i[0] = (l) => r("reg")),
                class: Rt([n.value == "in" ? "border-b-2 text-black" : ""]),
              },
              "Регистрация",
              2
            ),
            L(
              "span",
              {
                onClick: i[1] || (i[1] = (l) => r("in")),
                class: Rt([n.value == "reg" ? "border-b-2 text-black" : ""]),
              },
              "Войти",
              2
            ),
          ]),
          Bu,
          $u,
          n.value != "reg" ? (k(), $("input", Du)) : K("", !0),
          L(
            "button",
            { class: "p-2 text-white bg-slate-700 rounded", onClick: s },
            [
              n.value == "in"
                ? (k(), $("span", Hu, "Зарегистрироваться"))
                : (k(), $("span", Vu, "Войти")),
            ]
          ),
        ])
      );
    },
  },
  qu = Ls(Ku, [["__scopeId", "data-v-51a235fe"]]),
  ze = "bitcoin.svg",
  We = "eth.svg",
  Je = "doge.svg",
  zu = "exit.svg",
  Wu = "tap-finger-svgrepo-com.svg",
  Ju = "bot-svgrepo-com.svg",
  Gu = "shop.svg",
  Ie = (e) => (oo("data-v-5baaccbf"), (e = e()), io(), e),
  Xu = { key: 0, class: "background" },
  Yu = {
    class: "flex items-center justify-center flex-col w-full h-screen absolute",
  },
  Qu = Ie(() =>
    L("span", { class: "text-xs text-gray-100" }, "Твои деньги", -1)
  ),
  Zu = {
    id: "money",
    class:
      "text-6xl text-white font-bold flex h-16 [&>*]:h-14 items-center justify-center",
  },
  ef = { key: 0, src: ze, alt: "money" },
  tf = { key: 1, src: We, alt: "money" },
  nf = { key: 2, src: Je, alt: "money" },
  sf = { class: "flex items-center justify-center" },
  rf = {
    class:
      "flex items-end justify-end flex-col w-full h-auto gap-4 absolute bottom-0",
  },
  of = {
    class:
      "w-full h-auto bottom-0 flex flex-col [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:cursor-pointer [&>span]:transition-all",
  },
  lf = Ie(() =>
    L("img", { src: Wu, alt: "finger", class: "w-12 h-12" }, null, -1)
  ),
  cf = { class: "flex items-center justify-between flex-col" },
  uf = Ie(() =>
    L("span", { class: "text-xs text-gray-100" }, "Мультиклик", -1)
  ),
  ff = { class: "flex items-center justify-center font-bold text-white" },
  af = { key: 0, src: ze, alt: "money", class: "w-8 h-8" },
  df = { key: 1, src: We, alt: "money", class: "w-8 h-8" },
  hf = { key: 2, src: Je, alt: "money", class: "w-8 h-8" },
  pf = { class: "text-xs ml-2 transition", id: "multiTap" },
  mf = Ie(() =>
    L("img", { src: Ju, alt: "finger", class: "w-12 h-12" }, null, -1)
  ),
  gf = { class: "flex items-center justify-between flex-col" },
  yf = Ie(() =>
    L("span", { class: "text-xs text-gray-100" }, "Автокликер", -1)
  ),
  _f = { class: "flex items-center justify-center font-bold text-white" },
  bf = { key: 0, src: ze, alt: "money", class: "w-8 h-8" },
  wf = { key: 1, src: We, alt: "money", class: "w-8 h-8" },
  xf = { key: 2, src: Je, alt: "money", class: "w-8 h-8" },
  Ef = { class: "text-xs ml-2 transition", id: "autoClicker" },
  vf = Ie(() => L("span", { class: "w-full h-[50px]" }, null, -1)),
  Sf = Ie(() =>
    L("img", { src: We, alt: "money", class: "w-8 h-8" }, null, -1)
  ),
  Of = { key: 0, src: ze, alt: "money", class: "h-8 w-8" },
  Tf = { key: 1, src: We, alt: "money", class: "h-8 w-8" },
  Cf = { key: 2, src: Je, alt: "money", class: "h-8 w-8" },
  Af = Ie(() =>
    L("img", { src: Je, alt: "money", class: "w-8 h-8" }, null, -1)
  ),
  Rf = { key: 0, src: ze, alt: "money", class: "h-8 w-8" },
  Pf = { key: 1, src: We, alt: "money", class: "h-8 w-8" },
  If = { key: 2, src: Je, alt: "money", class: "h-8 w-8" },
  Nf = Ie(() =>
    L("img", { src: ze, alt: "money", class: "w-8 h-8" }, null, -1)
  ),
  Lf = { key: 0, src: ze, alt: "money", class: "h-8 w-8" },
  Ff = { key: 1, src: We, alt: "money", class: "h-8 w-8" },
  Mf = { key: 2, src: Je, alt: "money", class: "h-8 w-8" },
  kf = {
    key: 1,
    class:
      "z-10 absolute w-auto h-11 bg-[#ffffff4d] rounded-xl bottom-4 right-4 [&>div]:w-1/3 [&>div]:h-full flex items-center justify-center gap-4 [&>div]:flex [&>div]:cursor-pointer [&>div]:justify-center [&>div]:items-center",
  },
  Uf = Ie(() =>
    L("img", { src: Gu, alt: "shop", class: "w-20 h-20" }, null, -1)
  ),
  jf = [Uf],
  Bf = {
    __name: "shopOpen",
    props: {
      money: String,
      buyMultiTap: Function,
      priceMultiTap: String,
      buyAutoClicker: Function,
      priceAutoClicker: String,
      multiTapLevel: String,
      autoClickerLevel: String,
      buyIcon: Function,
      setIcon: String,
    },
    setup(e) {
      const t = ge(!1);
      return (n, s) => (
        k(),
        $(
          Se,
          null,
          [
            t.value
              ? (k(),
                $("div", Xu, [
                  L("img", {
                    src: zu,
                    class:
                      "absolute top-2 left-2 w-12 h-12 cursor-pointer z-40",
                    onClick: s[0] || (s[0] = (r) => (t.value = !t.value)),
                  }),
                  L("div", Yu, [
                    Qu,
                    L("span", Zu, [
                      e.setIcon == "btc" ? (k(), $("img", ef)) : K("", !0),
                      e.setIcon == "eth" ? (k(), $("img", tf)) : K("", !0),
                      e.setIcon == "doge" ? (k(), $("img", nf)) : K("", !0),
                      L("span", sf, ct(e.money), 1),
                    ]),
                  ]),
                  L("div", rf, [
                    L("div", of, [
                      L(
                        "span",
                        {
                          class:
                            "w-full h-[70px] bg-[#ffffff4d] hover:bg-[#ffffff4d]",
                          onClick:
                            s[1] ||
                            (s[1] = (...r) =>
                              e.buyMultiTap && e.buyMultiTap(...r)),
                        },
                        [
                          lf,
                          L("div", cf, [
                            uf,
                            L("span", ff, [
                              e.setIcon == "btc"
                                ? (k(), $("img", af))
                                : K("", !0),
                              e.setIcon == "eth"
                                ? (k(), $("img", df))
                                : K("", !0),
                              e.setIcon == "doge"
                                ? (k(), $("img", hf))
                                : K("", !0),
                              He(ct(e.priceMultiTap) + " ", 1),
                              L(
                                "span",
                                pf,
                                ct(e.multiTapLevel) + " уровень",
                                1
                              ),
                            ]),
                          ]),
                        ]
                      ),
                      L(
                        "span",
                        {
                          class:
                            "w-full h-[70px] bg-[#ffffff4d] hover:bg-[#ffffff4d]",
                          onClick:
                            s[2] ||
                            (s[2] = (...r) =>
                              e.buyAutoClicker && e.buyAutoClicker(...r)),
                        },
                        [
                          mf,
                          L("div", gf, [
                            yf,
                            L("span", _f, [
                              e.setIcon == "btc"
                                ? (k(), $("img", bf))
                                : K("", !0),
                              e.setIcon == "eth"
                                ? (k(), $("img", wf))
                                : K("", !0),
                              e.setIcon == "doge"
                                ? (k(), $("img", xf))
                                : K("", !0),
                              He(ct(e.priceAutoClicker) + " ", 1),
                              L(
                                "span",
                                Ef,
                                ct(e.autoClickerLevel) + " уровень",
                                1
                              ),
                            ]),
                          ]),
                        ]
                      ),
                      vf,
                      L(
                        "span",
                        {
                          class:
                            "w-full h-[50px] bg-[#ffffff4d] hover:bg-[#ffffff4d]",
                          onClick: s[3] || (s[3] = (r) => e.buyIcon("eth")),
                        },
                        [
                          Sf,
                          e.setIcon == "btc" ? (k(), $("img", Of)) : K("", !0),
                          e.setIcon == "eth" ? (k(), $("img", Tf)) : K("", !0),
                          e.setIcon == "doge" ? (k(), $("img", Cf)) : K("", !0),
                          He(" 100000 Etherium"),
                        ]
                      ),
                      L(
                        "span",
                        {
                          class:
                            "w-full h-[50px] bg-[#ffffff4d] hover:bg-[#ffffff4d]",
                          onClick: s[4] || (s[4] = (r) => e.buyIcon("doge")),
                        },
                        [
                          Af,
                          e.setIcon == "btc" ? (k(), $("img", Rf)) : K("", !0),
                          e.setIcon == "eth" ? (k(), $("img", Pf)) : K("", !0),
                          e.setIcon == "doge" ? (k(), $("img", If)) : K("", !0),
                          He("100000 Doge"),
                        ]
                      ),
                      L(
                        "span",
                        {
                          class:
                            "w-full h-[50px] bg-[#ffffff4d] hover:bg-[#ffffff4d]",
                          onClick: s[5] || (s[5] = (r) => e.buyIcon("btc")),
                        },
                        [
                          Nf,
                          e.setIcon == "btc" ? (k(), $("img", Lf)) : K("", !0),
                          e.setIcon == "eth" ? (k(), $("img", Ff)) : K("", !0),
                          e.setIcon == "doge" ? (k(), $("img", Mf)) : K("", !0),
                          He("100000 Bitcoin"),
                        ]
                      ),
                    ]),
                  ]),
                ]))
              : K("", !0),
            t.value
              ? K("", !0)
              : (k(),
                $("div", kf, [
                  L(
                    "div",
                    { onClick: s[6] || (s[6] = (r) => (t.value = !t.value)) },
                    jf
                  ),
                ])),
          ],
          64
        )
      );
    },
  },
  $f = Ls(Bf, [["__scopeId", "data-v-5baaccbf"]]),
  Df = { class: "background" },
  Hf = {
    class:
      "w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col",
  },
  Vf = { class: "text-5xl font-bold text-white" },
  Kf = { key: 0 },
  qf = { key: 1 },
  zf = { key: 2 },
  Wf = {
    __name: "mainWindow",
    props: { idUser: String },
    setup(e) {
      const t = e,
        n = ge(),
        s = ge(),
        r = ge(),
        o = ge(),
        i = ge(),
        l = ge("btc"),
        u = ge({});
      po(() => {
        z
          .get("https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser)
          .then((S) => {
            (u.value = S.data),
              (n.value = u.value.money),
              (r.value = u.value.priceMultiTap),
              (s.value = u.value.multiTaps),
              (o.value = u.value.autoClickerLevel),
              (i.value = u.value.priceClickerLevel),
              (l.value = u.value.icon);
          }),
          setInterval(() => {
            (n.value = n.value + s.value * o.value),
              z.patch("https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser, {
                money: n.value,
              });
          }, 1e3);
      });
      let a = !1;
      const d = () => {
          o.value == 10
            ? (document
                .getElementById("autoClicker")
                .classList.add("text-red-600"),
              setTimeout(() => {
                document
                  .getElementById("autoClicker")
                  .classList.remove("text-red-600");
              }, 500))
            : n.value < i.value
              ? a ||
                (document
                  .getElementById("money")
                  .classList.add("animate-[spin_.4s_ease-in-out]"),
                (a = !a),
                setTimeout(() => {
                  document
                    .getElementById("money")
                    .classList.remove("animate-[spin_.4s_ease-in-out]"),
                    (a = !a);
                }, 400))
              : ((n.value -= i.value),
                o.value++,
                (i.value = Math.floor(i.value * 1.5)),
                z.patch(
                  "https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser,
                  { autoClickerLevel: o.value, priceClickerLevel: i.value }
                ));
        },
        h = () => {
          s.value == 10
            ? (document
                .getElementById("multiTap")
                .classList.add("text-red-600"),
              setTimeout(() => {
                document
                  .getElementById("multiTap")
                  .classList.remove("text-red-600");
              }, 500))
            : n.value < r.value
              ? a ||
                (document
                  .getElementById("money")
                  .classList.add("animate-[spin_.4s_ease-in-out]"),
                (a = !a),
                setTimeout(() => {
                  document
                    .getElementById("money")
                    .classList.remove("animate-[spin_.4s_ease-in-out]"),
                    (a = !a);
                }, 400))
              : ((n.value -= r.value),
                s.value++,
                (r.value = Math.floor(r.value * 1.5)),
                z.patch(
                  "https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser,
                  { multiTaps: s.value, priceMultiTap: r.value }
                ));
        },
        x = () => {
          (n.value = n.value + 1 * s.value),
            z.patch("https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser, {
              money: n.value,
            }),
            document.getElementById("bitcoin").classList.add("-translate-y-2"),
            setTimeout(() => {
              document
                .getElementById("bitcoin")
                .classList.remove("-translate-y-2");
            }, 50);
        },
        C = (S) => {
          n.value < 1e5
            ? (document
                .getElementById("money")
                .classList.add("animate-[spin_.4s_ease-in-out]"),
              (a = !a),
              setTimeout(() => {
                document
                  .getElementById("money")
                  .classList.remove("animate-[spin_.4s_ease-in-out]"),
                  (a = !a);
              }, 400))
            : ((n.value -= 1e5),
              z.patch("https://a1d710d803a84bf6.mokky.dev/users/" + t.idUser, {
                icon: S,
                money: n.value,
              }),
              (l.value = S));
        };
      return (S, E) => (
        k(),
        $("div", Df, [
          Ae(
            $f,
            {
              money: n.value,
              buyMultiTap: h,
              priceMultiTap: r.value,
              buyAutoClicker: d,
              priceAutoClicker: i.value,
              multiTapLevel: s.value,
              autoClickerLevel: o.value,
              buyIcon: C,
              setIcon: l.value,
            },
            null,
            8,
            [
              "money",
              "priceMultiTap",
              "priceAutoClicker",
              "multiTapLevel",
              "autoClickerLevel",
              "setIcon",
            ]
          ),
          L("div", Hf, [
            L("span", Vf, [
              He(ct(n.value) + " ", 1),
              l.value == "btc" ? (k(), $("span", Kf, "₿")) : K("", !0),
              He(),
              l.value == "eth" ? (k(), $("span", qf, " Ξ")) : K("", !0),
              l.value == "doge" ? (k(), $("span", zf, "DC")) : K("", !0),
            ]),
            l.value == "btc"
              ? (k(),
                $("img", {
                  key: 0,
                  src: ze,
                  alt: "bitcoin",
                  class: "w-64 h-64 cursor-pointer transition-all",
                  onClick: x,
                  id: "bitcoin",
                }))
              : K("", !0),
            l.value == "eth"
              ? (k(),
                $("img", {
                  key: 1,
                  src: We,
                  alt: "eth",
                  class: "w-64 h-64 cursor-pointer transition-all",
                  onClick: x,
                  id: "bitcoin",
                }))
              : K("", !0),
            l.value == "doge"
              ? (k(),
                $("img", {
                  key: 2,
                  src: Je,
                  alt: "doge",
                  class: "w-64 h-64 cursor-pointer transition-all",
                  onClick: x,
                  id: "bitcoin",
                }))
              : K("", !0),
          ]),
        ])
      );
    },
  },
  Jf = Ls(Wf, [["__scopeId", "data-v-613c06a3"]]),
  Gf = {
    class:
      "w-screen h-auto bg-slate-800 [&>input]:bg-slate-200 [&>input]:p-2 [&>input]:m-2 flex items-center justify-center",
  },
  Xf = {
    __name: "App",
    setup(e) {
      const t = ge(!1),
        n = ge("");
      function s(o) {
        n.value = o;
      }
      function r(o) {
        t.value = o;
      }
      return (o, i) => (
        k(),
        $("div", Gf, [
          t.value
            ? K("", !0)
            : (k(), es(Xs(qu), { key: 0, isAuth: r, setIdUser: s })),
          t.value
            ? (k(),
              es(Xs(Jf), { key: 1, idUser: n.value }, null, 8, ["idUser"]))
            : K("", !0),
        ])
      );
    },
  };
_c(Xf).mount("#app");
