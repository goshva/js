(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ta(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const tt={},Oi=[],hn=()=>{},Ic=()=>!1,Es=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),na=n=>n.startsWith("onUpdate:"),Dt=Object.assign,ia=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Tf=Object.prototype.hasOwnProperty,je=(n,e)=>Tf.call(n,e),Ne=Array.isArray,Bi=n=>ys(n)==="[object Map]",Nc=n=>ys(n)==="[object Set]",Oe=n=>typeof n=="function",ct=n=>typeof n=="string",Kn=n=>typeof n=="symbol",st=n=>n!==null&&typeof n=="object",Fc=n=>(st(n)||Oe(n))&&Oe(n.then)&&Oe(n.catch),Oc=Object.prototype.toString,ys=n=>Oc.call(n),bf=n=>ys(n).slice(8,-1),Bc=n=>ys(n)==="[object Object]",ra=n=>ct(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,or=ta(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ts=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Af=/-\w/g,Kt=Ts(n=>n.replace(Af,e=>e.slice(1).toUpperCase())),Rf=/\B([A-Z])/g,_i=Ts(n=>n.replace(Rf,"-$1").toLowerCase()),bs=Ts(n=>n.charAt(0).toUpperCase()+n.slice(1)),Gs=Ts(n=>n?`on${bs(n)}`:""),Wn=(n,e)=>!Object.is(n,e),Vs=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},zc=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},wf=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Na;const As=()=>Na||(Na=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function sa(n){if(Ne(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=ct(i)?Df(i):sa(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(ct(n)||st(n))return n}const Cf=/;(?![^(]*\))/g,Pf=/:([^]+)/,Lf=/\/\*[^]*?\*\//g;function Df(n){const e={};return n.replace(Lf,"").split(Cf).forEach(t=>{if(t){const i=t.split(Pf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Rs(n){let e="";if(ct(n))e=n;else if(Ne(n))for(let t=0;t<n.length;t++){const i=Rs(n[t]);i&&(e+=i+" ")}else if(st(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Uf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",If=ta(Uf);function Hc(n){return!!n||n===""}const Gc=n=>!!(n&&n.__v_isRef===!0),Vc=n=>ct(n)?n:n==null?"":Ne(n)||st(n)&&(n.toString===Oc||!Oe(n.toString))?Gc(n)?Vc(n.value):JSON.stringify(n,Wc,2):String(n),Wc=(n,e)=>Gc(e)?Wc(n,e.value):Bi(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Ws(i,s)+" =>"]=r,t),{})}:Nc(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ws(t))}:Kn(e)?Ws(e):st(e)&&!Ne(e)&&!Bc(e)?String(e):e,Ws=(n,e="")=>{var t;return Kn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let It;class Nf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=It,!e&&It&&(this.index=(It.scopes||(It.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=It;try{return It=this,e()}finally{It=t}}}on(){++this._on===1&&(this.prevScope=It,It=this)}off(){this._on>0&&--this._on===0&&(It=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Ff(){return It}let et;const ks=new WeakSet;class kc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,It&&It.active&&It.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ks.has(this)&&(ks.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||qc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fa(this),Yc(this);const e=et,t=rn;et=this,rn=!0;try{return this.fn()}finally{jc(this),et=e,rn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)la(e);this.deps=this.depsTail=void 0,Fa(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ks.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Lo(this)&&this.run()}get dirty(){return Lo(this)}}let Xc=0,ar,lr;function qc(n,e=!1){if(n.flags|=8,e){n.next=lr,lr=n;return}n.next=ar,ar=n}function oa(){Xc++}function aa(){if(--Xc>0)return;if(lr){let e=lr;for(lr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;ar;){let e=ar;for(ar=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Yc(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function jc(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),la(i),Of(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function Lo(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Kc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Kc(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===_r)||(n.globalVersion=_r,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Lo(n))))return;n.flags|=2;const e=n.dep,t=et,i=rn;et=n,rn=!0;try{Yc(n);const r=n.fn(n._value);(e.version===0||Wn(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{et=t,rn=i,jc(n),n.flags&=-3}}function la(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)la(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Of(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let rn=!0;const $c=[];function Cn(){$c.push(rn),rn=!1}function Pn(){const n=$c.pop();rn=n===void 0?!0:n}function Fa(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=et;et=void 0;try{e()}finally{et=t}}}let _r=0;class Bf{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ca{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!et||!rn||et===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==et)t=this.activeLink=new Bf(et,this),et.deps?(t.prevDep=et.depsTail,et.depsTail.nextDep=t,et.depsTail=t):et.deps=et.depsTail=t,Zc(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=et.depsTail,t.nextDep=void 0,et.depsTail.nextDep=t,et.depsTail=t,et.deps===t&&(et.deps=i)}return t}trigger(e){this.version++,_r++,this.notify(e)}notify(e){oa();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{aa()}}}function Zc(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Zc(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Do=new WeakMap,ci=Symbol(""),Uo=Symbol(""),gr=Symbol("");function St(n,e,t){if(rn&&et){let i=Do.get(n);i||Do.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new ca),r.map=i,r.key=t),r.track()}}function bn(n,e,t,i,r,s){const a=Do.get(n);if(!a){_r++;return}const o=l=>{l&&l.trigger()};if(oa(),e==="clear")a.forEach(o);else{const l=Ne(n),c=l&&ra(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,d)=>{(d==="length"||d===gr||!Kn(d)&&d>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(gr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(ci)),Bi(n)&&o(a.get(Uo)));break;case"delete":l||(o(a.get(ci)),Bi(n)&&o(a.get(Uo)));break;case"set":Bi(n)&&o(a.get(ci));break}}aa()}function gi(n){const e=Ye(n);return e===n?e:(St(e,"iterate",gr),sn(n)?e:e.map(Ct))}function ua(n){return St(n=Ye(n),"iterate",gr),n}const zf={__proto__:null,[Symbol.iterator](){return Xs(this,Symbol.iterator,Ct)},concat(...n){return gi(this).concat(...n.map(e=>Ne(e)?gi(e):e))},entries(){return Xs(this,"entries",n=>(n[1]=Ct(n[1]),n))},every(n,e){return _n(this,"every",n,e,void 0,arguments)},filter(n,e){return _n(this,"filter",n,e,t=>t.map(Ct),arguments)},find(n,e){return _n(this,"find",n,e,Ct,arguments)},findIndex(n,e){return _n(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return _n(this,"findLast",n,e,Ct,arguments)},findLastIndex(n,e){return _n(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return _n(this,"forEach",n,e,void 0,arguments)},includes(...n){return qs(this,"includes",n)},indexOf(...n){return qs(this,"indexOf",n)},join(n){return gi(this).join(n)},lastIndexOf(...n){return qs(this,"lastIndexOf",n)},map(n,e){return _n(this,"map",n,e,void 0,arguments)},pop(){return Ji(this,"pop")},push(...n){return Ji(this,"push",n)},reduce(n,...e){return Oa(this,"reduce",n,e)},reduceRight(n,...e){return Oa(this,"reduceRight",n,e)},shift(){return Ji(this,"shift")},some(n,e){return _n(this,"some",n,e,void 0,arguments)},splice(...n){return Ji(this,"splice",n)},toReversed(){return gi(this).toReversed()},toSorted(n){return gi(this).toSorted(n)},toSpliced(...n){return gi(this).toSpliced(...n)},unshift(...n){return Ji(this,"unshift",n)},values(){return Xs(this,"values",Ct)}};function Xs(n,e,t){const i=ua(n),r=i[e]();return i!==n&&!sn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Hf=Array.prototype;function _n(n,e,t,i,r,s){const a=ua(n),o=a!==n&&!sn(n),l=a[e];if(l!==Hf[e]){const f=l.apply(n,s);return o?Ct(f):f}let c=t;a!==n&&(o?c=function(f,d){return t.call(this,Ct(f),d,n)}:t.length>2&&(c=function(f,d){return t.call(this,f,d,n)}));const u=l.call(a,c,i);return o&&r?r(u):u}function Oa(n,e,t,i){const r=ua(n);let s=t;return r!==n&&(sn(n)?t.length>3&&(s=function(a,o,l){return t.call(this,a,o,l,n)}):s=function(a,o,l){return t.call(this,a,Ct(o),l,n)}),r[e](s,...i)}function qs(n,e,t){const i=Ye(n);St(i,"iterate",gr);const r=i[e](...t);return(r===-1||r===!1)&&pa(t[0])?(t[0]=Ye(t[0]),i[e](...t)):r}function Ji(n,e,t=[]){Cn(),oa();const i=Ye(n)[e].apply(n,t);return aa(),Pn(),i}const Gf=ta("__proto__,__v_isRef,__isVue"),Jc=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Kn));function Vf(n){Kn(n)||(n=String(n));const e=Ye(this);return St(e,"has",n),e.hasOwnProperty(n)}class Qc{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Jf:iu:s?nu:tu).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Ne(e);if(!r){let l;if(a&&(l=zf[t]))return l;if(t==="hasOwnProperty")return Vf}const o=Reflect.get(e,t,yt(e)?e:i);if((Kn(t)?Jc.has(t):Gf(t))||(r||St(e,"get",t),s))return o;if(yt(o)){const l=a&&ra(t)?o:o.value;return r&&st(l)?No(l):l}return st(o)?r?No(o):ha(o):o}}class eu extends Qc{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._isShallow){const l=di(s);if(!sn(i)&&!di(i)&&(s=Ye(s),i=Ye(i)),!Ne(e)&&yt(s)&&!yt(i))return l||(s.value=i),!0}const a=Ne(e)&&ra(t)?Number(t)<e.length:je(e,t),o=Reflect.set(e,t,i,yt(e)?e:r);return e===Ye(r)&&(a?Wn(i,s)&&bn(e,"set",t,i):bn(e,"add",t,i)),o}deleteProperty(e,t){const i=je(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&bn(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!Kn(t)||!Jc.has(t))&&St(e,"has",t),i}ownKeys(e){return St(e,"iterate",Ne(e)?"length":ci),Reflect.ownKeys(e)}}class Wf extends Qc{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const kf=new eu,Xf=new Wf,qf=new eu(!0);const Io=n=>n,Dr=n=>Reflect.getPrototypeOf(n);function Yf(n,e,t){return function(...i){const r=this.__v_raw,s=Ye(r),a=Bi(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=t?Io:e?Fo:Ct;return!e&&St(s,"iterate",l?Uo:ci),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:o?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function Ur(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function jf(n,e){const t={get(r){const s=this.__v_raw,a=Ye(s),o=Ye(r);n||(Wn(r,o)&&St(a,"get",r),St(a,"get",o));const{has:l}=Dr(a),c=e?Io:n?Fo:Ct;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!n&&St(Ye(r),"iterate",ci),r.size},has(r){const s=this.__v_raw,a=Ye(s),o=Ye(r);return n||(Wn(r,o)&&St(a,"has",r),St(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=Ye(o),c=e?Io:n?Fo:Ct;return!n&&St(l,"iterate",ci),o.forEach((u,f)=>r.call(s,c(u),c(f),a))}};return Dt(t,n?{add:Ur("add"),set:Ur("set"),delete:Ur("delete"),clear:Ur("clear")}:{add(r){!e&&!sn(r)&&!di(r)&&(r=Ye(r));const s=Ye(this);return Dr(s).has.call(s,r)||(s.add(r),bn(s,"add",r,r)),this},set(r,s){!e&&!sn(s)&&!di(s)&&(s=Ye(s));const a=Ye(this),{has:o,get:l}=Dr(a);let c=o.call(a,r);c||(r=Ye(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?Wn(s,u)&&bn(a,"set",r,s):bn(a,"add",r,s),this},delete(r){const s=Ye(this),{has:a,get:o}=Dr(s);let l=a.call(s,r);l||(r=Ye(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&bn(s,"delete",r,void 0),c},clear(){const r=Ye(this),s=r.size!==0,a=r.clear();return s&&bn(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Yf(r,n,e)}),t}function fa(n,e){const t=jf(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(je(t,r)&&r in i?t:i,r,s)}const Kf={get:fa(!1,!1)},$f={get:fa(!1,!0)},Zf={get:fa(!0,!1)};const tu=new WeakMap,nu=new WeakMap,iu=new WeakMap,Jf=new WeakMap;function Qf(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function eh(n){return n.__v_skip||!Object.isExtensible(n)?0:Qf(bf(n))}function ha(n){return di(n)?n:da(n,!1,kf,Kf,tu)}function th(n){return da(n,!1,qf,$f,nu)}function No(n){return da(n,!0,Xf,Zf,iu)}function da(n,e,t,i,r){if(!st(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=eh(n);if(s===0)return n;const a=r.get(n);if(a)return a;const o=new Proxy(n,s===2?i:t);return r.set(n,o),o}function cr(n){return di(n)?cr(n.__v_raw):!!(n&&n.__v_isReactive)}function di(n){return!!(n&&n.__v_isReadonly)}function sn(n){return!!(n&&n.__v_isShallow)}function pa(n){return n?!!n.__v_raw:!1}function Ye(n){const e=n&&n.__v_raw;return e?Ye(e):n}function nh(n){return!je(n,"__v_skip")&&Object.isExtensible(n)&&zc(n,"__v_skip",!0),n}const Ct=n=>st(n)?ha(n):n,Fo=n=>st(n)?No(n):n;function yt(n){return n?n.__v_isRef===!0:!1}function Ba(n){return ih(n,!1)}function ih(n,e){return yt(n)?n:new rh(n,e)}class rh{constructor(e,t){this.dep=new ca,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Ye(e),this._value=t?e:Ct(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||sn(e)||di(e);e=i?e:Ye(e),Wn(e,t)&&(this._rawValue=e,this._value=i?e:Ct(e),this.dep.trigger())}}function sh(n){return yt(n)?n.value:n}const oh={get:(n,e,t)=>e==="__v_raw"?n:sh(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return yt(r)&&!yt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function ru(n){return cr(n)?n:new Proxy(n,oh)}class ah{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ca(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=_r-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&et!==this)return qc(this,!0),!0}get value(){const e=this.dep.track();return Kc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function lh(n,e,t=!1){let i,r;return Oe(n)?i=n:(i=n.get,r=n.set),new ah(i,r,t)}const Ir={},us=new WeakMap;let ri;function ch(n,e=!1,t=ri){if(t){let i=us.get(t);i||us.set(t,i=[]),i.push(n)}}function uh(n,e,t=tt){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=T=>r?T:sn(T)||r===!1||r===0?Hn(T,1):Hn(T);let u,f,d,m,x=!1,M=!1;if(yt(n)?(f=()=>n.value,x=sn(n)):cr(n)?(f=()=>c(n),x=!0):Ne(n)?(M=!0,x=n.some(T=>cr(T)||sn(T)),f=()=>n.map(T=>{if(yt(T))return T.value;if(cr(T))return c(T);if(Oe(T))return l?l(T,2):T()})):Oe(n)?e?f=l?()=>l(n,2):n:f=()=>{if(d){Cn();try{d()}finally{Pn()}}const T=ri;ri=u;try{return l?l(n,3,[m]):n(m)}finally{ri=T}}:f=hn,e&&r){const T=f,U=r===!0?1/0:r;f=()=>Hn(T(),U)}const p=Ff(),h=()=>{u.stop(),p&&p.active&&ia(p.effects,u)};if(s&&e){const T=e;e=(...U)=>{T(...U),h()}}let b=M?new Array(n.length).fill(Ir):Ir;const E=T=>{if(!(!(u.flags&1)||!u.dirty&&!T))if(e){const U=u.run();if(r||x||(M?U.some((C,w)=>Wn(C,b[w])):Wn(U,b))){d&&d();const C=ri;ri=u;try{const w=[U,b===Ir?void 0:M&&b[0]===Ir?[]:b,m];b=U,l?l(e,3,w):e(...w)}finally{ri=C}}}else u.run()};return o&&o(E),u=new kc(f),u.scheduler=a?()=>a(E,!1):E,m=T=>ch(T,!1,u),d=u.onStop=()=>{const T=us.get(u);if(T){if(l)l(T,4);else for(const U of T)U();us.delete(u)}},e?i?E(!0):b=u.run():a?a(E.bind(null,!0),!0):u.run(),h.pause=u.pause.bind(u),h.resume=u.resume.bind(u),h.stop=h,h}function Hn(n,e=1/0,t){if(e<=0||!st(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,yt(n))Hn(n.value,e,t);else if(Ne(n))for(let i=0;i<n.length;i++)Hn(n[i],e,t);else if(Nc(n)||Bi(n))n.forEach(i=>{Hn(i,e,t)});else if(Bc(n)){for(const i in n)Hn(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Hn(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function yr(n,e,t,i){try{return i?n(...i):n()}catch(r){ws(r,e,t)}}function pn(n,e,t,i){if(Oe(n)){const r=yr(n,e,t,i);return r&&Fc(r)&&r.catch(s=>{ws(s,e,t)}),r}if(Ne(n)){const r=[];for(let s=0;s<n.length;s++)r.push(pn(n[s],e,t,i));return r}}function ws(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||tt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(s){Cn(),yr(s,null,10,[n,l,c]),Pn();return}}fh(n,t,r,i,a)}function fh(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const Pt=[];let cn=-1;const zi=[];let Bn=null,Ii=0;const su=Promise.resolve();let fs=null;function hh(n){const e=fs||su;return n?e.then(this?n.bind(this):n):e}function dh(n){let e=cn+1,t=Pt.length;for(;e<t;){const i=e+t>>>1,r=Pt[i],s=vr(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function ma(n){if(!(n.flags&1)){const e=vr(n),t=Pt[Pt.length-1];!t||!(n.flags&2)&&e>=vr(t)?Pt.push(n):Pt.splice(dh(e),0,n),n.flags|=1,ou()}}function ou(){fs||(fs=su.then(lu))}function ph(n){Ne(n)?zi.push(...n):Bn&&n.id===-1?Bn.splice(Ii+1,0,n):n.flags&1||(zi.push(n),n.flags|=1),ou()}function za(n,e,t=cn+1){for(;t<Pt.length;t++){const i=Pt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Pt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function au(n){if(zi.length){const e=[...new Set(zi)].sort((t,i)=>vr(t)-vr(i));if(zi.length=0,Bn){Bn.push(...e);return}for(Bn=e,Ii=0;Ii<Bn.length;Ii++){const t=Bn[Ii];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Bn=null,Ii=0}}const vr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function lu(n){try{for(cn=0;cn<Pt.length;cn++){const e=Pt[cn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),yr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;cn<Pt.length;cn++){const e=Pt[cn];e&&(e.flags&=-2)}cn=-1,Pt.length=0,au(),fs=null,(Pt.length||zi.length)&&lu()}}let nn=null,cu=null;function hs(n){const e=nn;return nn=n,cu=n&&n.type.__scopeId||null,e}function mh(n,e=nn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&$a(-1);const s=hs(e);let a;try{a=n(...r)}finally{hs(s),i._d&&$a(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Jn(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(Cn(),pn(l,t,8,[n.el,o,n,e]),Pn())}}const _h=Symbol("_vte"),gh=n=>n.__isTeleport,vh=Symbol("_leaveCb");function _a(n,e){n.shapeFlag&6&&n.component?(n.transition=e,_a(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function uu(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const ds=new WeakMap;function ur(n,e,t,i,r=!1){if(Ne(n)){n.forEach((x,M)=>ur(x,e&&(Ne(e)?e[M]:e),t,i,r));return}if(fr(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ur(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?Sa(i.component):i.el,a=r?null:s,{i:o,r:l}=n,c=e&&e.r,u=o.refs===tt?o.refs={}:o.refs,f=o.setupState,d=Ye(f),m=f===tt?Ic:x=>je(d,x);if(c!=null&&c!==l){if(Ha(e),ct(c))u[c]=null,m(c)&&(f[c]=null);else if(yt(c)){c.value=null;const x=e;x.k&&(u[x.k]=null)}}if(Oe(l))yr(l,o,12,[a,u]);else{const x=ct(l),M=yt(l);if(x||M){const p=()=>{if(n.f){const h=x?m(l)?f[l]:u[l]:l.value;if(r)Ne(h)&&ia(h,s);else if(Ne(h))h.includes(s)||h.push(s);else if(x)u[l]=[s],m(l)&&(f[l]=u[l]);else{const b=[s];l.value=b,n.k&&(u[n.k]=b)}}else x?(u[l]=a,m(l)&&(f[l]=a)):M&&(l.value=a,n.k&&(u[n.k]=a))};if(a){const h=()=>{p(),ds.delete(n)};h.id=-1,ds.set(n,h),Gt(h,t)}else Ha(n),p()}}}function Ha(n){const e=ds.get(n);e&&(e.flags|=8,ds.delete(n))}As().requestIdleCallback;As().cancelIdleCallback;const fr=n=>!!n.type.__asyncLoader,fu=n=>n.type.__isKeepAlive;function xh(n,e){hu(n,"a",e)}function Mh(n,e){hu(n,"da",e)}function hu(n,e,t=Et){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Cs(e,i,t),t){let r=t.parent;for(;r&&r.parent;)fu(r.parent.vnode)&&Sh(i,e,t,r),r=r.parent}}function Sh(n,e,t,i){const r=Cs(e,n,i,!0);ga(()=>{ia(i[e],r)},t)}function Cs(n,e,t=Et,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...a)=>{Cn();const o=Tr(t),l=pn(e,t,n,a);return o(),Pn(),l});return i?r.unshift(s):r.push(s),s}}const Dn=n=>(e,t=Et)=>{(!Mr||n==="sp")&&Cs(n,(...i)=>e(...i),t)},Eh=Dn("bm"),du=Dn("m"),yh=Dn("bu"),Th=Dn("u"),bh=Dn("bum"),ga=Dn("um"),Ah=Dn("sp"),Rh=Dn("rtg"),wh=Dn("rtc");function Ch(n,e=Et){Cs("ec",n,e)}const Ph="components";function Lh(n,e){return Uh(Ph,n,!0,e)||n}const Dh=Symbol.for("v-ndc");function Uh(n,e,t=!0,i=!1){const r=nn||Et;if(r){const s=r.type;{const o=bd(s,!1);if(o&&(o===e||o===Kt(e)||o===bs(Kt(e))))return s}const a=Ga(r[n]||s[n],e)||Ga(r.appContext[n],e);return!a&&i?s:a}}function Ga(n,e){return n&&(n[e]||n[Kt(e)]||n[bs(Kt(e))])}const Oo=n=>n?Nu(n)?Sa(n):Oo(n.parent):null,hr=Dt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Oo(n.parent),$root:n=>Oo(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>mu(n),$forceUpdate:n=>n.f||(n.f=()=>{ma(n.update)}),$nextTick:n=>n.n||(n.n=hh.bind(n.proxy)),$watch:n=>td.bind(n)}),Ys=(n,e)=>n!==tt&&!n.__isScriptSetup&&je(n,e),Ih={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const m=a[e];if(m!==void 0)switch(m){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Ys(i,e))return a[e]=1,i[e];if(r!==tt&&je(r,e))return a[e]=2,r[e];if((c=n.propsOptions[0])&&je(c,e))return a[e]=3,s[e];if(t!==tt&&je(t,e))return a[e]=4,t[e];Bo&&(a[e]=0)}}const u=hr[e];let f,d;if(u)return e==="$attrs"&&St(n.attrs,"get",""),u(n);if((f=o.__cssModules)&&(f=f[e]))return f;if(t!==tt&&je(t,e))return a[e]=4,t[e];if(d=l.config.globalProperties,je(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Ys(r,e)?(r[e]=t,!0):i!==tt&&je(i,e)?(i[e]=t,!0):je(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s,type:a}},o){let l,c;return!!(t[o]||n!==tt&&o[0]!=="$"&&je(n,o)||Ys(e,o)||(l=s[0])&&je(l,o)||je(i,o)||je(hr,o)||je(r.config.globalProperties,o)||(c=a.__cssModules)&&c[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:je(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Va(n){return Ne(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Bo=!0;function Nh(n){const e=mu(n),t=n.proxy,i=n.ctx;Bo=!1,e.beforeCreate&&Wa(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:m,updated:x,activated:M,deactivated:p,beforeDestroy:h,beforeUnmount:b,destroyed:E,unmounted:T,render:U,renderTracked:C,renderTriggered:w,errorCaptured:re,serverPrefetch:y,expose:A,inheritAttrs:Z,components:j,directives:ce,filters:D}=e;if(c&&Fh(c,i,null),a)for(const $ in a){const B=a[$];Oe(B)&&(i[$]=B.bind(t))}if(r){const $=r.call(t,t);st($)&&(n.data=ha($))}if(Bo=!0,s)for(const $ in s){const B=s[$],Q=Oe(B)?B.bind(t,t):Oe(B.get)?B.get.bind(t,t):hn,ie=!Oe(B)&&Oe(B.set)?B.set.bind(t):hn,ae=Rd({get:Q,set:ie});Object.defineProperty(i,$,{enumerable:!0,configurable:!0,get:()=>ae.value,set:le=>ae.value=le})}if(o)for(const $ in o)pu(o[$],i,t,$);if(l){const $=Oe(l)?l.call(t):l;Reflect.ownKeys($).forEach(B=>{Vh(B,$[B])})}u&&Wa(u,n,"c");function X($,B){Ne(B)?B.forEach(Q=>$(Q.bind(t))):B&&$(B.bind(t))}if(X(Eh,f),X(du,d),X(yh,m),X(Th,x),X(xh,M),X(Mh,p),X(Ch,re),X(wh,C),X(Rh,w),X(bh,b),X(ga,T),X(Ah,y),Ne(A))if(A.length){const $=n.exposed||(n.exposed={});A.forEach(B=>{Object.defineProperty($,B,{get:()=>t[B],set:Q=>t[B]=Q,enumerable:!0})})}else n.exposed||(n.exposed={});U&&n.render===hn&&(n.render=U),Z!=null&&(n.inheritAttrs=Z),j&&(n.components=j),ce&&(n.directives=ce),y&&uu(n)}function Fh(n,e,t=hn){Ne(n)&&(n=zo(n));for(const i in n){const r=n[i];let s;st(r)?"default"in r?s=os(r.from||i,r.default,!0):s=os(r.from||i):s=os(r),yt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function Wa(n,e,t){pn(Ne(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function pu(n,e,t,i){let r=i.includes(".")?wu(t,i):()=>t[i];if(ct(n)){const s=e[n];Oe(s)&&Ks(r,s)}else if(Oe(n))Ks(r,n.bind(t));else if(st(n))if(Ne(n))n.forEach(s=>pu(s,e,t,i));else{const s=Oe(n.handler)?n.handler.bind(t):e[n.handler];Oe(s)&&Ks(r,s,n)}}function mu(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>ps(l,c,a,!0)),ps(l,e,a)),st(e)&&s.set(e,l),l}function ps(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&ps(n,s,t,!0),r&&r.forEach(a=>ps(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=Oh[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const Oh={data:ka,props:Xa,emits:Xa,methods:sr,computed:sr,beforeCreate:At,created:At,beforeMount:At,mounted:At,beforeUpdate:At,updated:At,beforeDestroy:At,beforeUnmount:At,destroyed:At,unmounted:At,activated:At,deactivated:At,errorCaptured:At,serverPrefetch:At,components:sr,directives:sr,watch:zh,provide:ka,inject:Bh};function ka(n,e){return e?n?function(){return Dt(Oe(n)?n.call(this,this):n,Oe(e)?e.call(this,this):e)}:e:n}function Bh(n,e){return sr(zo(n),zo(e))}function zo(n){if(Ne(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function At(n,e){return n?[...new Set([].concat(n,e))]:e}function sr(n,e){return n?Dt(Object.create(null),n,e):e}function Xa(n,e){return n?Ne(n)&&Ne(e)?[...new Set([...n,...e])]:Dt(Object.create(null),Va(n),Va(e??{})):e}function zh(n,e){if(!n)return e;if(!e)return n;const t=Dt(Object.create(null),n);for(const i in e)t[i]=At(n[i],e[i]);return t}function _u(){return{app:null,config:{isNativeTag:Ic,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Hh=0;function Gh(n,e){return function(i,r=null){Oe(i)||(i=Dt({},i)),r!=null&&!st(r)&&(r=null);const s=_u(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:Hh++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:wd,get config(){return s.config},set config(u){},use(u,...f){return a.has(u)||(u&&Oe(u.install)?(a.add(u),u.install(c,...f)):Oe(u)&&(a.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const m=c._ceVNode||kn(i,r);return m.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),n(m,u,d),l=!0,c._container=u,u.__vue_app__=c,Sa(m.component)}},onUnmount(u){o.push(u)},unmount(){l&&(pn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Hi;Hi=c;try{return u()}finally{Hi=f}}};return c}}let Hi=null;function Vh(n,e){if(Et){let t=Et.provides;const i=Et.parent&&Et.parent.provides;i===t&&(t=Et.provides=Object.create(i)),t[n]=e}}function os(n,e,t=!1){const i=Md();if(i||Hi){let r=Hi?Hi._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Oe(e)?e.call(i&&i.proxy):e}}const gu={},vu=()=>Object.create(gu),xu=n=>Object.getPrototypeOf(n)===gu;function Wh(n,e,t,i=!1){const r={},s=vu();n.propsDefaults=Object.create(null),Mu(n,e,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);t?n.props=i?r:th(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function kh(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=Ye(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Ps(n.emitsOptions,d))continue;const m=e[d];if(l)if(je(s,d))m!==s[d]&&(s[d]=m,c=!0);else{const x=Kt(d);r[x]=Ho(l,o,x,m,n,!1)}else m!==s[d]&&(s[d]=m,c=!0)}}}else{Mu(n,e,r,s)&&(c=!0);let u;for(const f in o)(!e||!je(e,f)&&((u=_i(f))===f||!je(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Ho(l,o,f,void 0,n,!0)):delete r[f]);if(s!==o)for(const f in s)(!e||!je(e,f))&&(delete s[f],c=!0)}c&&bn(n.attrs,"set","")}function Mu(n,e,t,i){const[r,s]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(or(l))continue;const c=e[l];let u;r&&je(r,u=Kt(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:Ps(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=Ye(t),c=o||tt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Ho(r,l,f,c[f],n,!je(c,f))}}return a}function Ho(n,e,t,i,r,s){const a=n[t];if(a!=null){const o=je(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Oe(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=Tr(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===_i(t))&&(i=!0))}return i}const Xh=new WeakMap;function Su(n,e,t=!1){const i=t?Xh:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!Oe(n)){const u=f=>{l=!0;const[d,m]=Su(f,e,!0);Dt(a,d),m&&o.push(...m)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return st(n)&&i.set(n,Oi),Oi;if(Ne(s))for(let u=0;u<s.length;u++){const f=Kt(s[u]);qa(f)&&(a[f]=tt)}else if(s)for(const u in s){const f=Kt(u);if(qa(f)){const d=s[u],m=a[f]=Ne(d)||Oe(d)?{type:d}:Dt({},d),x=m.type;let M=!1,p=!0;if(Ne(x))for(let h=0;h<x.length;++h){const b=x[h],E=Oe(b)&&b.name;if(E==="Boolean"){M=!0;break}else E==="String"&&(p=!1)}else M=Oe(x)&&x.name==="Boolean";m[0]=M,m[1]=p,(M||je(m,"default"))&&o.push(f)}}const c=[a,o];return st(n)&&i.set(n,c),c}function qa(n){return n[0]!=="$"&&!or(n)}const va=n=>n==="_"||n==="_ctx"||n==="$stable",xa=n=>Ne(n)?n.map(un):[un(n)],qh=(n,e,t)=>{if(e._n)return e;const i=mh((...r)=>xa(e(...r)),t);return i._c=!1,i},Eu=(n,e,t)=>{const i=n._ctx;for(const r in n){if(va(r))continue;const s=n[r];if(Oe(s))e[r]=qh(r,s,i);else if(s!=null){const a=xa(s);e[r]=()=>a}}},yu=(n,e)=>{const t=xa(e);n.slots.default=()=>t},Tu=(n,e,t)=>{for(const i in e)(t||!va(i))&&(n[i]=e[i])},Yh=(n,e,t)=>{const i=n.slots=vu();if(n.vnode.shapeFlag&32){const r=e._;r?(Tu(i,e,t),t&&zc(i,"_",r,!0)):Eu(e,i)}else e&&yu(n,e)},jh=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,a=tt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:Tu(r,e,t):(s=!e.$stable,Eu(e,r)),a=e}else e&&(yu(n,e),a={default:1});if(s)for(const o in r)!va(o)&&a[o]==null&&delete r[o]},Gt=cd;function Kh(n){return $h(n)}function $h(n,e){const t=As();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:m=hn,insertStaticContent:x}=n,M=(g,P,I,q=null,O=null,J=null,ee=void 0,v=null,_=!!P.dynamicChildren)=>{if(g===P)return;g&&!Qi(g,P)&&(q=Me(g),le(g,O,J,!0),g=null),P.patchFlag===-2&&(_=!1,P.dynamicChildren=null);const{type:R,ref:G,shapeFlag:N}=P;switch(R){case Ls:p(g,P,I,q);break;case Wi:h(g,P,I,q);break;case $s:g==null&&b(P,I,q,ee);break;case Tn:j(g,P,I,q,O,J,ee,v,_);break;default:N&1?U(g,P,I,q,O,J,ee,v,_):N&6?ce(g,P,I,q,O,J,ee,v,_):(N&64||N&128)&&R.process(g,P,I,q,O,J,ee,v,_,Te)}G!=null&&O?ur(G,g&&g.ref,J,P||g,!P):G==null&&g&&g.ref!=null&&ur(g.ref,null,J,g,!0)},p=(g,P,I,q)=>{if(g==null)i(P.el=o(P.children),I,q);else{const O=P.el=g.el;P.children!==g.children&&c(O,P.children)}},h=(g,P,I,q)=>{g==null?i(P.el=l(P.children||""),I,q):P.el=g.el},b=(g,P,I,q)=>{[g.el,g.anchor]=x(g.children,P,I,q,g.el,g.anchor)},E=({el:g,anchor:P},I,q)=>{let O;for(;g&&g!==P;)O=d(g),i(g,I,q),g=O;i(P,I,q)},T=({el:g,anchor:P})=>{let I;for(;g&&g!==P;)I=d(g),r(g),g=I;r(P)},U=(g,P,I,q,O,J,ee,v,_)=>{P.type==="svg"?ee="svg":P.type==="math"&&(ee="mathml"),g==null?C(P,I,q,O,J,ee,v,_):y(g,P,O,J,ee,v,_)},C=(g,P,I,q,O,J,ee,v)=>{let _,R;const{props:G,shapeFlag:N,transition:z,dirs:se}=g;if(_=g.el=a(g.type,J,G&&G.is,G),N&8?u(_,g.children):N&16&&re(g.children,_,null,q,O,js(g,J),ee,v),se&&Jn(g,null,q,"created"),w(_,g,g.scopeId,ee,q),G){for(const ue in G)ue!=="value"&&!or(ue)&&s(_,ue,null,G[ue],J,q);"value"in G&&s(_,"value",null,G.value,J),(R=G.onVnodeBeforeMount)&&ln(R,q,g)}se&&Jn(g,null,q,"beforeMount");const ne=Zh(O,z);ne&&z.beforeEnter(_),i(_,P,I),((R=G&&G.onVnodeMounted)||ne||se)&&Gt(()=>{R&&ln(R,q,g),ne&&z.enter(_),se&&Jn(g,null,q,"mounted")},O)},w=(g,P,I,q,O)=>{if(I&&m(g,I),q)for(let J=0;J<q.length;J++)m(g,q[J]);if(O){let J=O.subTree;if(P===J||Pu(J.type)&&(J.ssContent===P||J.ssFallback===P)){const ee=O.vnode;w(g,ee,ee.scopeId,ee.slotScopeIds,O.parent)}}},re=(g,P,I,q,O,J,ee,v,_=0)=>{for(let R=_;R<g.length;R++){const G=g[R]=v?zn(g[R]):un(g[R]);M(null,G,P,I,q,O,J,ee,v)}},y=(g,P,I,q,O,J,ee)=>{const v=P.el=g.el;let{patchFlag:_,dynamicChildren:R,dirs:G}=P;_|=g.patchFlag&16;const N=g.props||tt,z=P.props||tt;let se;if(I&&Qn(I,!1),(se=z.onVnodeBeforeUpdate)&&ln(se,I,P,g),G&&Jn(P,g,I,"beforeUpdate"),I&&Qn(I,!0),(N.innerHTML&&z.innerHTML==null||N.textContent&&z.textContent==null)&&u(v,""),R?A(g.dynamicChildren,R,v,I,q,js(P,O),J):ee||B(g,P,v,null,I,q,js(P,O),J,!1),_>0){if(_&16)Z(v,N,z,I,O);else if(_&2&&N.class!==z.class&&s(v,"class",null,z.class,O),_&4&&s(v,"style",N.style,z.style,O),_&8){const ne=P.dynamicProps;for(let ue=0;ue<ne.length;ue++){const de=ne[ue],Ee=N[de],te=z[de];(te!==Ee||de==="value")&&s(v,de,Ee,te,O,I)}}_&1&&g.children!==P.children&&u(v,P.children)}else!ee&&R==null&&Z(v,N,z,I,O);((se=z.onVnodeUpdated)||G)&&Gt(()=>{se&&ln(se,I,P,g),G&&Jn(P,g,I,"updated")},q)},A=(g,P,I,q,O,J,ee)=>{for(let v=0;v<P.length;v++){const _=g[v],R=P[v],G=_.el&&(_.type===Tn||!Qi(_,R)||_.shapeFlag&198)?f(_.el):I;M(_,R,G,null,q,O,J,ee,!0)}},Z=(g,P,I,q,O)=>{if(P!==I){if(P!==tt)for(const J in P)!or(J)&&!(J in I)&&s(g,J,P[J],null,O,q);for(const J in I){if(or(J))continue;const ee=I[J],v=P[J];ee!==v&&J!=="value"&&s(g,J,v,ee,O,q)}"value"in I&&s(g,"value",P.value,I.value,O)}},j=(g,P,I,q,O,J,ee,v,_)=>{const R=P.el=g?g.el:o(""),G=P.anchor=g?g.anchor:o("");let{patchFlag:N,dynamicChildren:z,slotScopeIds:se}=P;se&&(v=v?v.concat(se):se),g==null?(i(R,I,q),i(G,I,q),re(P.children||[],I,G,O,J,ee,v,_)):N>0&&N&64&&z&&g.dynamicChildren?(A(g.dynamicChildren,z,I,O,J,ee,v),(P.key!=null||O&&P===O.subTree)&&bu(g,P,!0)):B(g,P,I,G,O,J,ee,v,_)},ce=(g,P,I,q,O,J,ee,v,_)=>{P.slotScopeIds=v,g==null?P.shapeFlag&512?O.ctx.activate(P,I,q,ee,_):D(P,I,q,O,J,ee,_):H(g,P,_)},D=(g,P,I,q,O,J,ee)=>{const v=g.component=xd(g,q,O);if(fu(g)&&(v.ctx.renderer=Te),Sd(v,!1,ee),v.asyncDep){if(O&&O.registerDep(v,X,ee),!g.el){const _=v.subTree=kn(Wi);h(null,_,P,I),g.placeholder=_.el}}else X(v,g,P,I,O,J,ee)},H=(g,P,I)=>{const q=P.component=g.component;if(ad(g,P,I))if(q.asyncDep&&!q.asyncResolved){$(q,P,I);return}else q.next=P,q.update();else P.el=g.el,q.vnode=P},X=(g,P,I,q,O,J,ee)=>{const v=()=>{if(g.isMounted){let{next:N,bu:z,u:se,parent:ne,vnode:ue}=g;{const Ce=Au(g);if(Ce){N&&(N.el=ue.el,$(g,N,ee)),Ce.asyncDep.then(()=>{g.isUnmounted||v()});return}}let de=N,Ee;Qn(g,!1),N?(N.el=ue.el,$(g,N,ee)):N=ue,z&&Vs(z),(Ee=N.props&&N.props.onVnodeBeforeUpdate)&&ln(Ee,ne,N,ue),Qn(g,!0);const te=ja(g),ze=g.subTree;g.subTree=te,M(ze,te,f(ze.el),Me(ze),g,O,J),N.el=te.el,de===null&&ld(g,te.el),se&&Gt(se,O),(Ee=N.props&&N.props.onVnodeUpdated)&&Gt(()=>ln(Ee,ne,N,ue),O)}else{let N;const{el:z,props:se}=P,{bm:ne,m:ue,parent:de,root:Ee,type:te}=g,ze=fr(P);Qn(g,!1),ne&&Vs(ne),!ze&&(N=se&&se.onVnodeBeforeMount)&&ln(N,de,P),Qn(g,!0);{Ee.ce&&Ee.ce._def.shadowRoot!==!1&&Ee.ce._injectChildStyle(te);const Ce=g.subTree=ja(g);M(null,Ce,I,q,g,O,J),P.el=Ce.el}if(ue&&Gt(ue,O),!ze&&(N=se&&se.onVnodeMounted)){const Ce=P;Gt(()=>ln(N,de,Ce),O)}(P.shapeFlag&256||de&&fr(de.vnode)&&de.vnode.shapeFlag&256)&&g.a&&Gt(g.a,O),g.isMounted=!0,P=I=q=null}};g.scope.on();const _=g.effect=new kc(v);g.scope.off();const R=g.update=_.run.bind(_),G=g.job=_.runIfDirty.bind(_);G.i=g,G.id=g.uid,_.scheduler=()=>ma(G),Qn(g,!0),R()},$=(g,P,I)=>{P.component=g;const q=g.vnode.props;g.vnode=P,g.next=null,kh(g,P.props,q,I),jh(g,P.children,I),Cn(),za(g),Pn()},B=(g,P,I,q,O,J,ee,v,_=!1)=>{const R=g&&g.children,G=g?g.shapeFlag:0,N=P.children,{patchFlag:z,shapeFlag:se}=P;if(z>0){if(z&128){ie(R,N,I,q,O,J,ee,v,_);return}else if(z&256){Q(R,N,I,q,O,J,ee,v,_);return}}se&8?(G&16&&xe(R,O,J),N!==R&&u(I,N)):G&16?se&16?ie(R,N,I,q,O,J,ee,v,_):xe(R,O,J,!0):(G&8&&u(I,""),se&16&&re(N,I,q,O,J,ee,v,_))},Q=(g,P,I,q,O,J,ee,v,_)=>{g=g||Oi,P=P||Oi;const R=g.length,G=P.length,N=Math.min(R,G);let z;for(z=0;z<N;z++){const se=P[z]=_?zn(P[z]):un(P[z]);M(g[z],se,I,null,O,J,ee,v,_)}R>G?xe(g,O,J,!0,!1,N):re(P,I,q,O,J,ee,v,_,N)},ie=(g,P,I,q,O,J,ee,v,_)=>{let R=0;const G=P.length;let N=g.length-1,z=G-1;for(;R<=N&&R<=z;){const se=g[R],ne=P[R]=_?zn(P[R]):un(P[R]);if(Qi(se,ne))M(se,ne,I,null,O,J,ee,v,_);else break;R++}for(;R<=N&&R<=z;){const se=g[N],ne=P[z]=_?zn(P[z]):un(P[z]);if(Qi(se,ne))M(se,ne,I,null,O,J,ee,v,_);else break;N--,z--}if(R>N){if(R<=z){const se=z+1,ne=se<G?P[se].el:q;for(;R<=z;)M(null,P[R]=_?zn(P[R]):un(P[R]),I,ne,O,J,ee,v,_),R++}}else if(R>z)for(;R<=N;)le(g[R],O,J,!0),R++;else{const se=R,ne=R,ue=new Map;for(R=ne;R<=z;R++){const pe=P[R]=_?zn(P[R]):un(P[R]);pe.key!=null&&ue.set(pe.key,R)}let de,Ee=0;const te=z-ne+1;let ze=!1,Ce=0;const Ae=new Array(te);for(R=0;R<te;R++)Ae[R]=0;for(R=se;R<=N;R++){const pe=g[R];if(Ee>=te){le(pe,O,J,!0);continue}let be;if(pe.key!=null)be=ue.get(pe.key);else for(de=ne;de<=z;de++)if(Ae[de-ne]===0&&Qi(pe,P[de])){be=de;break}be===void 0?le(pe,O,J,!0):(Ae[be-ne]=R+1,be>=Ce?Ce=be:ze=!0,M(pe,P[be],I,null,O,J,ee,v,_),Ee++)}const ye=ze?Jh(Ae):Oi;for(de=ye.length-1,R=te-1;R>=0;R--){const pe=ne+R,be=P[pe],qe=P[pe+1],nt=pe+1<G?qe.el||qe.placeholder:q;Ae[R]===0?M(null,be,I,nt,O,J,ee,v,_):ze&&(de<0||R!==ye[de]?ae(be,I,nt,2):de--)}}},ae=(g,P,I,q,O=null)=>{const{el:J,type:ee,transition:v,children:_,shapeFlag:R}=g;if(R&6){ae(g.component.subTree,P,I,q);return}if(R&128){g.suspense.move(P,I,q);return}if(R&64){ee.move(g,P,I,Te);return}if(ee===Tn){i(J,P,I);for(let N=0;N<_.length;N++)ae(_[N],P,I,q);i(g.anchor,P,I);return}if(ee===$s){E(g,P,I);return}if(q!==2&&R&1&&v)if(q===0)v.beforeEnter(J),i(J,P,I),Gt(()=>v.enter(J),O);else{const{leave:N,delayLeave:z,afterLeave:se}=v,ne=()=>{g.ctx.isUnmounted?r(J):i(J,P,I)},ue=()=>{J._isLeaving&&J[vh](!0),N(J,()=>{ne(),se&&se()})};z?z(J,ne,ue):ue()}else i(J,P,I)},le=(g,P,I,q=!1,O=!1)=>{const{type:J,props:ee,ref:v,children:_,dynamicChildren:R,shapeFlag:G,patchFlag:N,dirs:z,cacheIndex:se}=g;if(N===-2&&(O=!1),v!=null&&(Cn(),ur(v,null,I,g,!0),Pn()),se!=null&&(P.renderCache[se]=void 0),G&256){P.ctx.deactivate(g);return}const ne=G&1&&z,ue=!fr(g);let de;if(ue&&(de=ee&&ee.onVnodeBeforeUnmount)&&ln(de,P,g),G&6)ge(g.component,I,q);else{if(G&128){g.suspense.unmount(I,q);return}ne&&Jn(g,null,P,"beforeUnmount"),G&64?g.type.remove(g,P,I,Te,q):R&&!R.hasOnce&&(J!==Tn||N>0&&N&64)?xe(R,P,I,!1,!0):(J===Tn&&N&384||!O&&G&16)&&xe(_,P,I),q&&K(g)}(ue&&(de=ee&&ee.onVnodeUnmounted)||ne)&&Gt(()=>{de&&ln(de,P,g),ne&&Jn(g,null,P,"unmounted")},I)},K=g=>{const{type:P,el:I,anchor:q,transition:O}=g;if(P===Tn){oe(I,q);return}if(P===$s){T(g);return}const J=()=>{r(I),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(g.shapeFlag&1&&O&&!O.persisted){const{leave:ee,delayLeave:v}=O,_=()=>ee(I,J);v?v(g.el,J,_):_()}else J()},oe=(g,P)=>{let I;for(;g!==P;)I=d(g),r(g),g=I;r(P)},ge=(g,P,I)=>{const{bum:q,scope:O,job:J,subTree:ee,um:v,m:_,a:R}=g;Ya(_),Ya(R),q&&Vs(q),O.stop(),J&&(J.flags|=8,le(ee,g,P,I)),v&&Gt(v,P),Gt(()=>{g.isUnmounted=!0},P)},xe=(g,P,I,q=!1,O=!1,J=0)=>{for(let ee=J;ee<g.length;ee++)le(g[ee],P,I,q,O)},Me=g=>{if(g.shapeFlag&6)return Me(g.component.subTree);if(g.shapeFlag&128)return g.suspense.next();const P=d(g.anchor||g.el),I=P&&P[_h];return I?d(I):P};let we=!1;const Ue=(g,P,I)=>{g==null?P._vnode&&le(P._vnode,null,null,!0):M(P._vnode||null,g,P,null,null,null,I),P._vnode=g,we||(we=!0,za(),au(),we=!1)},Te={p:M,um:le,m:ae,r:K,mt:D,mc:re,pc:B,pbc:A,n:Me,o:n};return{render:Ue,hydrate:void 0,createApp:Gh(Ue)}}function js({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Qn({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Zh(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function bu(n,e,t=!1){const i=n.children,r=e.children;if(Ne(i)&&Ne(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=zn(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&bu(a,o)),o.type===Ls&&o.patchFlag!==-1&&(o.el=a.el),o.type===Wi&&!o.el&&(o.el=a.el)}}function Jh(n){const e=n.slice(),t=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,n[t[o]]<c?s=o+1:a=o;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function Au(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Au(e)}function Ya(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Qh=Symbol.for("v-scx"),ed=()=>os(Qh);function Ks(n,e,t){return Ru(n,e,t)}function Ru(n,e,t=tt){const{immediate:i,deep:r,flush:s,once:a}=t,o=Dt({},t),l=e&&i||!e&&s!=="post";let c;if(Mr){if(s==="sync"){const m=ed();c=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=hn,m.resume=hn,m.pause=hn,m}}const u=Et;o.call=(m,x,M)=>pn(m,u,x,M);let f=!1;s==="post"?o.scheduler=m=>{Gt(m,u&&u.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(m,x)=>{x?m():ma(m)}),o.augmentJob=m=>{e&&(m.flags|=4),f&&(m.flags|=2,u&&(m.id=u.uid,m.i=u))};const d=uh(n,e,o);return Mr&&(c?c.push(d):l&&d()),d}function td(n,e,t){const i=this.proxy,r=ct(n)?n.includes(".")?wu(i,n):()=>i[n]:n.bind(i,i);let s;Oe(e)?s=e:(s=e.handler,t=e);const a=Tr(this),o=Ru(r,s.bind(i),t);return a(),o}function wu(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const nd=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Kt(e)}Modifiers`]||n[`${_i(e)}Modifiers`];function id(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||tt;let r=t;const s=e.startsWith("update:"),a=s&&nd(i,e.slice(7));a&&(a.trim&&(r=t.map(u=>ct(u)?u.trim():u)),a.number&&(r=t.map(wf)));let o,l=i[o=Gs(e)]||i[o=Gs(Kt(e))];!l&&s&&(l=i[o=Gs(_i(e))]),l&&pn(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,pn(c,n,6,r)}}const rd=new WeakMap;function Cu(n,e,t=!1){const i=t?rd:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!Oe(n)){const l=c=>{const u=Cu(c,e,!0);u&&(o=!0,Dt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(st(n)&&i.set(n,null),null):(Ne(s)?s.forEach(l=>a[l]=null):Dt(a,s),st(n)&&i.set(n,a),a)}function Ps(n,e){return!n||!Es(e)?!1:(e=e.slice(2).replace(/Once$/,""),je(n,e[0].toLowerCase()+e.slice(1))||je(n,_i(e))||je(n,e))}function ja(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:d,setupState:m,ctx:x,inheritAttrs:M}=n,p=hs(n);let h,b;try{if(t.shapeFlag&4){const T=r||i,U=T;h=un(c.call(U,T,u,f,m,d,x)),b=o}else{const T=e;h=un(T.length>1?T(f,{attrs:o,slots:a,emit:l}):T(f,null)),b=e.props?o:sd(o)}}catch(T){dr.length=0,ws(T,n,1),h=kn(Wi)}let E=h;if(b&&M!==!1){const T=Object.keys(b),{shapeFlag:U}=E;T.length&&U&7&&(s&&T.some(na)&&(b=od(b,s)),E=ki(E,b,!1,!0))}return t.dirs&&(E=ki(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(t.dirs):t.dirs),t.transition&&_a(E,t.transition),h=E,hs(p),h}const sd=n=>{let e;for(const t in n)(t==="class"||t==="style"||Es(t))&&((e||(e={}))[t]=n[t]);return e},od=(n,e)=>{const t={};for(const i in n)(!na(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function ad(n,e,t){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Ka(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(a[d]!==i[d]&&!Ps(c,d))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Ka(i,a,c):!0:!!a;return!1}function Ka(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!Ps(t,s))return!0}return!1}function ld({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Pu=n=>n.__isSuspense;function cd(n,e){e&&e.pendingBranch?Ne(n)?e.effects.push(...n):e.effects.push(n):ph(n)}const Tn=Symbol.for("v-fgt"),Ls=Symbol.for("v-txt"),Wi=Symbol.for("v-cmt"),$s=Symbol.for("v-stc"),dr=[];let Vt=null;function Lu(n=!1){dr.push(Vt=n?null:[])}function ud(){dr.pop(),Vt=dr[dr.length-1]||null}let xr=1;function $a(n,e=!1){xr+=n,n<0&&Vt&&e&&(Vt.hasOnce=!0)}function Du(n){return n.dynamicChildren=xr>0?Vt||Oi:null,ud(),xr>0&&Vt&&Vt.push(n),n}function fd(n,e,t,i,r,s){return Du(pr(n,e,t,i,r,s,!0))}function hd(n,e,t,i,r){return Du(kn(n,e,t,i,r,!0))}function Uu(n){return n?n.__v_isVNode===!0:!1}function Qi(n,e){return n.type===e.type&&n.key===e.key}const Iu=({key:n})=>n??null,as=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?ct(n)||yt(n)||Oe(n)?{i:nn,r:n,k:e,f:!!t}:n:null);function pr(n,e=null,t=null,i=0,r=null,s=n===Tn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Iu(e),ref:e&&as(e),scopeId:cu,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:nn};return o?(Ma(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=ct(t)?8:16),xr>0&&!a&&Vt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Vt.push(l),l}const kn=dd;function dd(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===Dh)&&(n=Wi),Uu(n)){const o=ki(n,e,!0);return t&&Ma(o,t),xr>0&&!s&&Vt&&(o.shapeFlag&6?Vt[Vt.indexOf(n)]=o:Vt.push(o)),o.patchFlag=-2,o}if(Ad(n)&&(n=n.__vccOpts),e){e=pd(e);let{class:o,style:l}=e;o&&!ct(o)&&(e.class=Rs(o)),st(l)&&(pa(l)&&!Ne(l)&&(l=Dt({},l)),e.style=sa(l))}const a=ct(n)?1:Pu(n)?128:gh(n)?64:st(n)?4:Oe(n)?2:0;return pr(n,e,t,i,r,a,s,!0)}function pd(n){return n?pa(n)||xu(n)?Dt({},n):n:null}function ki(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=e?_d(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Iu(c),ref:e&&e.ref?t&&s?Ne(s)?s.concat(as(e)):[s,as(e)]:as(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Tn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ki(n.ssContent),ssFallback:n.ssFallback&&ki(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&_a(u,l.clone(u)),u}function md(n=" ",e=0){return kn(Ls,null,n,e)}function un(n){return n==null||typeof n=="boolean"?kn(Wi):Ne(n)?kn(Tn,null,n.slice()):Uu(n)?zn(n):kn(Ls,null,String(n))}function zn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ki(n)}function Ma(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ne(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Ma(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!xu(e)?e._ctx=nn:r===3&&nn&&(nn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Oe(e)?(e={default:e,_ctx:nn},t=32):(e=String(e),i&64?(t=16,e=[md(e)]):t=8);n.children=e,n.shapeFlag|=t}function _d(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=Rs([e.class,i.class]));else if(r==="style")e.style=sa([e.style,i.style]);else if(Es(r)){const s=e[r],a=i[r];a&&s!==a&&!(Ne(s)&&s.includes(a))&&(e[r]=s?[].concat(s,a):a)}else r!==""&&(e[r]=i[r])}return e}function ln(n,e,t,i=null){pn(n,e,7,[t,i])}const gd=_u();let vd=0;function xd(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||gd,s={uid:vd++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Nf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Su(i,r),emitsOptions:Cu(i,r),emit:null,emitted:null,propsDefaults:tt,inheritAttrs:i.inheritAttrs,ctx:tt,data:tt,props:tt,attrs:tt,slots:tt,refs:tt,setupState:tt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=id.bind(null,s),n.ce&&n.ce(s),s}let Et=null;const Md=()=>Et||nn;let ms,Go;{const n=As(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};ms=e("__VUE_INSTANCE_SETTERS__",t=>Et=t),Go=e("__VUE_SSR_SETTERS__",t=>Mr=t)}const Tr=n=>{const e=Et;return ms(n),n.scope.on(),()=>{n.scope.off(),ms(e)}},Za=()=>{Et&&Et.scope.off(),ms(null)};function Nu(n){return n.vnode.shapeFlag&4}let Mr=!1;function Sd(n,e=!1,t=!1){e&&Go(e);const{props:i,children:r}=n.vnode,s=Nu(n);Wh(n,i,s,e),Yh(n,r,t||e);const a=s?Ed(n,e):void 0;return e&&Go(!1),a}function Ed(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Ih);const{setup:i}=t;if(i){Cn();const r=n.setupContext=i.length>1?Td(n):null,s=Tr(n),a=yr(i,n,0,[n.props,r]),o=Fc(a);if(Pn(),s(),(o||n.sp)&&!fr(n)&&uu(n),o){if(a.then(Za,Za),e)return a.then(l=>{Ja(n,l)}).catch(l=>{ws(l,n,0)});n.asyncDep=a}else Ja(n,a)}else Fu(n)}function Ja(n,e,t){Oe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:st(e)&&(n.setupState=ru(e)),Fu(n)}function Fu(n,e,t){const i=n.type;n.render||(n.render=i.render||hn);{const r=Tr(n);Cn();try{Nh(n)}finally{Pn(),r()}}}const yd={get(n,e){return St(n,"get",""),n[e]}};function Td(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,yd),slots:n.slots,emit:n.emit,expose:e}}function Sa(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(ru(nh(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in hr)return hr[t](n)},has(e,t){return t in e||t in hr}})):n.proxy}function bd(n,e=!0){return Oe(n)?n.displayName||n.name:n.name||e&&n.__name}function Ad(n){return Oe(n)&&"__vccOpts"in n}const Rd=(n,e)=>lh(n,e,Mr),wd="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Vo;const Qa=typeof window<"u"&&window.trustedTypes;if(Qa)try{Vo=Qa.createPolicy("vue",{createHTML:n=>n})}catch{}const Ou=Vo?n=>Vo.createHTML(n):n=>n,Cd="http://www.w3.org/2000/svg",Pd="http://www.w3.org/1998/Math/MathML",yn=typeof document<"u"?document:null,el=yn&&yn.createElement("template"),Ld={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?yn.createElementNS(Cd,n):e==="mathml"?yn.createElementNS(Pd,n):t?yn.createElement(n,{is:t}):yn.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>yn.createTextNode(n),createComment:n=>yn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>yn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{el.innerHTML=Ou(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=el.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Dd=Symbol("_vtc");function Ud(n,e,t){const i=n[Dd];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const tl=Symbol("_vod"),Id=Symbol("_vsh"),Nd=Symbol(""),Fd=/(?:^|;)\s*display\s*:/;function Od(n,e,t){const i=n.style,r=ct(t);let s=!1;if(t&&!r){if(e)if(ct(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&ls(i,o,"")}else for(const a in e)t[a]==null&&ls(i,a,"");for(const a in t)a==="display"&&(s=!0),ls(i,a,t[a])}else if(r){if(e!==t){const a=i[Nd];a&&(t+=";"+a),i.cssText=t,s=Fd.test(t)}}else e&&n.removeAttribute("style");tl in n&&(n[tl]=s?i.display:"",n[Id]&&(i.display="none"))}const nl=/\s*!important$/;function ls(n,e,t){if(Ne(t))t.forEach(i=>ls(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=Bd(n,e);nl.test(t)?n.setProperty(_i(i),t.replace(nl,""),"important"):n[i]=t}}const il=["Webkit","Moz","ms"],Zs={};function Bd(n,e){const t=Zs[e];if(t)return t;let i=Kt(e);if(i!=="filter"&&i in n)return Zs[e]=i;i=bs(i);for(let r=0;r<il.length;r++){const s=il[r]+i;if(s in n)return Zs[e]=s}return e}const rl="http://www.w3.org/1999/xlink";function sl(n,e,t,i,r,s=If(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(rl,e.slice(6,e.length)):n.setAttributeNS(rl,e,t):t==null||s&&!Hc(t)?n.removeAttribute(e):n.setAttribute(e,s?"":Kn(t)?String(t):t)}function ol(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ou(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=Hc(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(r||e)}function zd(n,e,t,i){n.addEventListener(e,t,i)}function Hd(n,e,t,i){n.removeEventListener(e,t,i)}const al=Symbol("_vei");function Gd(n,e,t,i,r=null){const s=n[al]||(n[al]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=Vd(e);if(i){const c=s[e]=Xd(i,r);zd(n,o,c,l)}else a&&(Hd(n,o,a,l),s[e]=void 0)}}const ll=/(?:Once|Passive|Capture)$/;function Vd(n){let e;if(ll.test(n)){e={};let i;for(;i=n.match(ll);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):_i(n.slice(2)),e]}let Js=0;const Wd=Promise.resolve(),kd=()=>Js||(Wd.then(()=>Js=0),Js=Date.now());function Xd(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;pn(qd(i,t.value),e,5,[i])};return t.value=n,t.attached=kd(),t}function qd(n,e){if(Ne(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const cl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Yd=(n,e,t,i,r,s)=>{const a=r==="svg";e==="class"?Ud(n,i,a):e==="style"?Od(n,t,i):Es(e)?na(e)||Gd(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):jd(n,e,i,a))?(ol(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&sl(n,e,i,a,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!ct(i))?ol(n,Kt(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),sl(n,e,i,a))};function jd(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&cl(e)&&Oe(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return cl(e)&&ct(t)?!1:e in n}const Kd=Dt({patchProp:Yd},Ld);let ul;function $d(){return ul||(ul=Kh(Kd))}const Zd=(...n)=>{const e=$d().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=Qd(i);if(!r)return;const s=e._component;!Oe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,Jd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function Jd(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Qd(n){return ct(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ea="160",ep=0,fl=1,tp=2,Bu=1,np=2,En=3,jn=0,Ot=1,An=2,Xn=0,Gi=1,hl=2,dl=3,pl=4,ip=5,ai=100,rp=101,sp=102,ml=103,_l=104,op=200,ap=201,lp=202,cp=203,Wo=204,ko=205,up=206,fp=207,hp=208,dp=209,pp=210,mp=211,_p=212,gp=213,vp=214,xp=0,Mp=1,Sp=2,_s=3,Ep=4,yp=5,Tp=6,bp=7,zu=0,Ap=1,Rp=2,qn=0,wp=1,Cp=2,Pp=3,Lp=4,Dp=5,Up=6,Hu=300,Xi=301,qi=302,Xo=303,qo=304,Ds=306,Yo=1e3,en=1001,jo=1002,wt=1003,gl=1004,Qs=1005,qt=1006,Ip=1007,Sr=1008,Yn=1009,Np=1010,Fp=1011,ya=1012,Gu=1013,Gn=1014,Vn=1015,Er=1016,Vu=1017,Wu=1018,ui=1020,Op=1021,tn=1023,Bp=1024,zp=1025,fi=1026,Yi=1027,Hp=1028,ku=1029,Gp=1030,Xu=1031,qu=1033,eo=33776,to=33777,no=33778,io=33779,vl=35840,xl=35841,Ml=35842,Sl=35843,Yu=36196,El=37492,yl=37496,Tl=37808,bl=37809,Al=37810,Rl=37811,wl=37812,Cl=37813,Pl=37814,Ll=37815,Dl=37816,Ul=37817,Il=37818,Nl=37819,Fl=37820,Ol=37821,ro=36492,Bl=36494,zl=36495,Vp=36283,Hl=36284,Gl=36285,Vl=36286,ju=3e3,hi=3001,Wp=3200,kp=3201,Xp=0,qp=1,jt="",_t="srgb",Ln="srgb-linear",Ta="display-p3",Us="display-p3-linear",gs="linear",it="srgb",vs="rec709",xs="p3",vi=7680,Wl=519,Yp=512,jp=513,Kp=514,Ku=515,$p=516,Zp=517,Jp=518,Qp=519,kl=35044,Xl="300 es",Ko=1035,Rn=2e3,Ms=2001;class Ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,$o=180/Math.PI;function br(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Nt(n,e,t){return Math.max(e,Math.min(t,n))}function em(n,e){return(n%e+e)%e}function oo(n,e,t){return(1-t)*n+t*e}function ql(n){return(n&n-1)===0&&n!==0}function Zo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function er(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,i,r,s,a,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],m=i[5],x=i[8],M=r[0],p=r[3],h=r[6],b=r[1],E=r[4],T=r[7],U=r[2],C=r[5],w=r[8];return s[0]=a*M+o*b+l*U,s[3]=a*p+o*E+l*C,s[6]=a*h+o*T+l*w,s[1]=c*M+u*b+f*U,s[4]=c*p+u*E+f*C,s[7]=c*h+u*T+f*w,s[2]=d*M+m*b+x*U,s[5]=d*p+m*E+x*C,s[8]=d*h+m*T+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,m=c*s-a*l,x=t*f+i*d+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return e[0]=f*M,e[1]=(r*c-u*i)*M,e[2]=(o*i-r*a)*M,e[3]=d*M,e[4]=(u*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=m*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ao.makeScale(e,t)),this}rotate(e){return this.premultiply(ao.makeRotation(-e)),this}translate(e,t){return this.premultiply(ao.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new We;function $u(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function tm(){const n=Ss("canvas");return n.style.display="block",n}const Yl={};function mr(n){n in Yl||(Yl[n]=!0,console.warn(n))}const jl=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kl=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Nr={[Ln]:{transfer:gs,primaries:vs,toReference:n=>n,fromReference:n=>n},[_t]:{transfer:it,primaries:vs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Us]:{transfer:gs,primaries:xs,toReference:n=>n.applyMatrix3(Kl),fromReference:n=>n.applyMatrix3(jl)},[Ta]:{transfer:it,primaries:xs,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Kl),fromReference:n=>n.applyMatrix3(jl).convertLinearToSRGB()}},nm=new Set([Ln,Us]),Ke={enabled:!0,_workingColorSpace:Ln,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!nm.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Nr[e].toReference,r=Nr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Nr[n].primaries},getTransfer:function(n){return n===jt?gs:Nr[n].transfer}};function Vi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function lo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let xi;class Zu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{xi===void 0&&(xi=Ss("canvas")),xi.width=e.width,xi.height=e.height;const i=xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=xi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ss("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Vi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vi(t[i]/255)*255):t[i]=Vi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let im=0;class Ju{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=br(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(co(r[a].image)):s.push(co(r[a]))}else s=co(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function co(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rm=0;class Wt extends Ki{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=en,r=en,s=qt,a=Sr,o=tn,l=Yn,c=Wt.DEFAULT_ANISOTROPY,u=jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=br(),this.name="",this.source=new Ju(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===hi?_t:jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yo:e.x=e.x-Math.floor(e.x);break;case en:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yo:e.y=e.y-Math.floor(e.y);break;case en:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===_t?hi:ju}set encoding(e){mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===hi?_t:jt}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Hu;Wt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],m=l[5],x=l[9],M=l[2],p=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-M)<.01&&Math.abs(x-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+M)<.1&&Math.abs(x+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,T=(m+1)/2,U=(h+1)/2,C=(u+d)/4,w=(f+M)/4,re=(x+p)/4;return E>T&&E>U?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=C/i,s=w/i):T>U?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=C/r,s=re/r):U<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(U),i=w/s,r=re/s),this.set(i,r,s,t),this}let b=Math.sqrt((p-x)*(p-x)+(f-M)*(f-M)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(p-x)/b,this.y=(f-M)/b,this.z=(d-u)/b,this.w=Math.acos((c+m+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sm extends Ki{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(mr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===hi?_t:jt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Wt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ju(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends sm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Qu extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class om extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ar{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],x=s[a+2],M=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=x,e[t+3]=M;return}if(f!==M||l!==d||c!==m||u!==x){let p=1-o;const h=l*d+c*m+u*x+f*M,b=h>=0?1:-1,E=1-h*h;if(E>Number.EPSILON){const U=Math.sqrt(E),C=Math.atan2(U,h*b);p=Math.sin(p*C)/U,o=Math.sin(o*C)/U}const T=o*b;if(l=l*p+d*T,c=c*p+m*T,u=u*p+x*T,f=f*p+M*T,p===1-o){const U=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=U,c*=U,u*=U,f*=U}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*f+l*m-c*d,e[t+1]=l*x+u*d+c*f-o*m,e[t+2]=c*x+u*m+o*d-l*f,e[t+3]=u*x-o*f-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),m=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*m*x,this._y=c*m*f-d*u*x,this._z=c*u*x+d*m*f,this._w=c*u*f-d*m*x;break;case"YXZ":this._x=d*u*f+c*m*x,this._y=c*m*f-d*u*x,this._z=c*u*x-d*m*f,this._w=c*u*f+d*m*x;break;case"ZXY":this._x=d*u*f-c*m*x,this._y=c*m*f+d*u*x,this._z=c*u*x+d*m*f,this._w=c*u*f-d*m*x;break;case"ZYX":this._x=d*u*f-c*m*x,this._y=c*m*f+d*u*x,this._z=c*u*x-d*m*f,this._w=c*u*f+d*m*x;break;case"YZX":this._x=d*u*f+c*m*x,this._y=c*m*f+d*u*x,this._z=c*u*x-d*m*f,this._w=c*u*f-d*m*x;break;case"XZY":this._x=d*u*f-c*m*x,this._y=c*m*f-d*u*x,this._z=c*u*x+d*m*f,this._w=c*u*f+d*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return uo.copy(this).projectOnVector(e),this.sub(uo)}reflect(e){return this.sub(uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const uo=new W,$l=new Ar;class Rr{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$t):$t.fromBufferAttribute(s,a),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fr.copy(i.boundingBox)),Fr.applyMatrix4(e.matrixWorld),this.union(Fr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Or.subVectors(this.max,tr),Mi.subVectors(e.a,tr),Si.subVectors(e.b,tr),Ei.subVectors(e.c,tr),Un.subVectors(Si,Mi),In.subVectors(Ei,Si),ei.subVectors(Mi,Ei);let t=[0,-Un.z,Un.y,0,-In.z,In.y,0,-ei.z,ei.y,Un.z,0,-Un.x,In.z,0,-In.x,ei.z,0,-ei.x,-Un.y,Un.x,0,-In.y,In.x,0,-ei.y,ei.x,0];return!fo(t,Mi,Si,Ei,Or)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,Mi,Si,Ei,Or))?!1:(Br.crossVectors(Un,In),t=[Br.x,Br.y,Br.z],fo(t,Mi,Si,Ei,Or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new W,new W,new W,new W,new W,new W,new W,new W],$t=new W,Fr=new Rr,Mi=new W,Si=new W,Ei=new W,Un=new W,In=new W,ei=new W,tr=new W,Or=new W,Br=new W,ti=new W;function fo(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ti.fromArray(n,s);const o=r.x*Math.abs(ti.x)+r.y*Math.abs(ti.y)+r.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),u=i.dot(ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const am=new Rr,nr=new W,ho=new W;class Is{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):am.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(nr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ho.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(ho)),this.expandByPoint(nr.copy(e.center).sub(ho))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new W,po=new W,zr=new W,Nn=new W,mo=new W,Hr=new W,_o=new W;class ef{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){po.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(po);const s=e.distanceTo(t)*.5,a=-this.direction.dot(zr),o=Nn.dot(this.direction),l=-Nn.dot(zr),c=Nn.lengthSq(),u=Math.abs(1-a*a);let f,d,m,x;if(u>0)if(f=a*l-o,d=a*o-l,x=s*u,f>=0)if(d>=-x)if(d<=x){const M=1/u;f*=M,d*=M,m=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d<=-x?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c):d<=x?(f=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(po).addScaledVector(zr,d),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const i=vn.dot(this.direction),r=vn.dot(vn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,i,r,s){mo.subVectors(t,e),Hr.subVectors(i,e),_o.crossVectors(mo,Hr);let a=this.direction.dot(_o),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Nn.subVectors(this.origin,e);const l=o*this.direction.dot(Hr.crossVectors(Nn,Hr));if(l<0)return null;const c=o*this.direction.dot(mo.cross(Nn));if(c<0||l+c>a)return null;const u=-o*Nn.dot(_o);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,i,r,s,a,o,l,c,u,f,d,m,x,M,p){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,m,x,M,p)}set(e,t,i,r,s,a,o,l,c,u,f,d,m,x,M,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=x,h[11]=M,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/yi.setFromMatrixColumn(e,0).length(),s=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,x=o*u,M=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=m+x*c,t[5]=d-M*c,t[9]=-o*l,t[2]=M-d*c,t[6]=x+m*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,m=l*f,x=c*u,M=c*f;t[0]=d+M*o,t[4]=x*o-m,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=M+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,m=l*f,x=c*u,M=c*f;t[0]=d-M*o,t[4]=-a*f,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=M-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,m=a*f,x=o*u,M=o*f;t[0]=l*u,t[4]=x*c-m,t[8]=d*c+M,t[1]=l*f,t[5]=M*c+d,t[9]=m*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,x=o*l,M=o*c;t[0]=l*u,t[4]=M-d*f,t[8]=x*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*f+x,t[10]=d-M*f}else if(e.order==="XZY"){const d=a*l,m=a*c,x=o*l,M=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+M,t[5]=a*u,t[9]=m*f-x,t[2]=x*f-m,t[6]=o*u,t[10]=M*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lm,e,cm)}lookAt(e,t,i){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Fn.crossVectors(i,zt),Fn.lengthSq()===0&&(Math.abs(i.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Fn.crossVectors(i,zt)),Fn.normalize(),Gr.crossVectors(zt,Fn),r[0]=Fn.x,r[4]=Gr.x,r[8]=zt.x,r[1]=Fn.y,r[5]=Gr.y,r[9]=zt.y,r[2]=Fn.z,r[6]=Gr.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],m=i[13],x=i[2],M=i[6],p=i[10],h=i[14],b=i[3],E=i[7],T=i[11],U=i[15],C=r[0],w=r[4],re=r[8],y=r[12],A=r[1],Z=r[5],j=r[9],ce=r[13],D=r[2],H=r[6],X=r[10],$=r[14],B=r[3],Q=r[7],ie=r[11],ae=r[15];return s[0]=a*C+o*A+l*D+c*B,s[4]=a*w+o*Z+l*H+c*Q,s[8]=a*re+o*j+l*X+c*ie,s[12]=a*y+o*ce+l*$+c*ae,s[1]=u*C+f*A+d*D+m*B,s[5]=u*w+f*Z+d*H+m*Q,s[9]=u*re+f*j+d*X+m*ie,s[13]=u*y+f*ce+d*$+m*ae,s[2]=x*C+M*A+p*D+h*B,s[6]=x*w+M*Z+p*H+h*Q,s[10]=x*re+M*j+p*X+h*ie,s[14]=x*y+M*ce+p*$+h*ae,s[3]=b*C+E*A+T*D+U*B,s[7]=b*w+E*Z+T*H+U*Q,s[11]=b*re+E*j+T*X+U*ie,s[15]=b*y+E*ce+T*$+U*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],m=e[14],x=e[3],M=e[7],p=e[11],h=e[15];return x*(+s*l*f-r*c*f-s*o*d+i*c*d+r*o*m-i*l*m)+M*(+t*l*m-t*c*d+s*a*d-r*a*m+r*c*u-s*l*u)+p*(+t*c*f-t*o*m-s*a*f+i*a*m+s*o*u-i*c*u)+h*(-r*o*u-t*l*f+t*o*d+r*a*f-i*a*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],m=e[11],x=e[12],M=e[13],p=e[14],h=e[15],b=f*p*c-M*d*c+M*l*m-o*p*m-f*l*h+o*d*h,E=x*d*c-u*p*c-x*l*m+a*p*m+u*l*h-a*d*h,T=u*M*c-x*f*c+x*o*m-a*M*m-u*o*h+a*f*h,U=x*f*l-u*M*l-x*o*d+a*M*d+u*o*p-a*f*p,C=t*b+i*E+r*T+s*U;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=b*w,e[1]=(M*d*s-f*p*s-M*r*m+i*p*m+f*r*h-i*d*h)*w,e[2]=(o*p*s-M*l*s+M*r*c-i*p*c-o*r*h+i*l*h)*w,e[3]=(f*l*s-o*d*s-f*r*c+i*d*c+o*r*m-i*l*m)*w,e[4]=E*w,e[5]=(u*p*s-x*d*s+x*r*m-t*p*m-u*r*h+t*d*h)*w,e[6]=(x*l*s-a*p*s-x*r*c+t*p*c+a*r*h-t*l*h)*w,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*m+t*l*m)*w,e[8]=T*w,e[9]=(x*f*s-u*M*s-x*i*m+t*M*m+u*i*h-t*f*h)*w,e[10]=(a*M*s-x*o*s+x*i*c-t*M*c-a*i*h+t*o*h)*w,e[11]=(u*o*s-a*f*s-u*i*c+t*f*c+a*i*m-t*o*m)*w,e[12]=U*w,e[13]=(u*M*r-x*f*r+x*i*d-t*M*d-u*i*p+t*f*p)*w,e[14]=(x*o*r-a*M*r-x*i*l+t*M*l+a*i*p-t*o*p)*w,e[15]=(a*f*r-u*o*r+u*i*l-t*f*l-a*i*d+t*o*d)*w,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,m=s*u,x=s*f,M=a*u,p=a*f,h=o*f,b=l*c,E=l*u,T=l*f,U=i.x,C=i.y,w=i.z;return r[0]=(1-(M+h))*U,r[1]=(m+T)*U,r[2]=(x-E)*U,r[3]=0,r[4]=(m-T)*C,r[5]=(1-(d+h))*C,r[6]=(p+b)*C,r[7]=0,r[8]=(x+E)*w,r[9]=(p-b)*w,r[10]=(1-(d+M))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=yi.set(r[0],r[1],r[2]).length();const a=yi.set(r[4],r[5],r[6]).length(),o=yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Zt.copy(this);const c=1/s,u=1/a,f=1/o;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=f,Zt.elements[9]*=f,Zt.elements[10]*=f,t.setFromRotationMatrix(Zt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Rn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,x;if(o===Rn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Ms)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Rn){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(a-s),d=(t+e)*c,m=(i+r)*u;let x,M;if(o===Rn)x=(a+s)*f,M=-2*f;else if(o===Ms)x=s*f,M=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=M,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const yi=new W,Zt=new mt,lm=new W(0,0,0),cm=new W(1,1,1),Fn=new W,Gr=new W,zt=new W,Zl=new mt,Jl=new Ar;class Ns{constructor(e=0,t=0,i=0,r=Ns.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ns.DEFAULT_ORDER="XYZ";class tf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let um=0;const Ql=new W,Ti=new Ar,xn=new mt,Vr=new W,ir=new W,fm=new W,hm=new Ar,ec=new W(1,0,0),tc=new W(0,1,0),nc=new W(0,0,1),dm={type:"added"},pm={type:"removed"};class Lt extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new W,t=new Ns,i=new Ar,r=new W(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new We}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.premultiply(Ti),this}rotateX(e){return this.rotateOnAxis(ec,e)}rotateY(e){return this.rotateOnAxis(tc,e)}rotateZ(e){return this.rotateOnAxis(nc,e)}translateOnAxis(e,t){return Ql.copy(e).applyQuaternion(this.quaternion),this.position.add(Ql.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ec,e)}translateY(e){return this.translateOnAxis(tc,e)}translateZ(e){return this.translateOnAxis(nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vr.copy(e):Vr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ir,Vr,this.up):xn.lookAt(Vr,ir,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),Ti.setFromRotationMatrix(xn),this.quaternion.premultiply(Ti.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(dm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,fm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,hm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Lt.DEFAULT_UP=new W(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new W,Mn=new W,go=new W,Sn=new W,bi=new W,Ai=new W,ic=new W,vo=new W,xo=new W,Mo=new W;let Wr=!1;class Qt{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Jt.subVectors(r,t),Mn.subVectors(i,t),go.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(Mn),l=Jt.dot(go),c=Mn.dot(Mn),u=Mn.dot(go),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(c*l-o*u)*d,x=(a*u-o*l)*d;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getUV(e,t,i,r,s,a,o,l){return Wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wr=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static isFrontFacing(e,t,i,r){return Jt.subVectors(i,t),Mn.subVectors(e,t),Jt.cross(Mn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Jt.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wr=!0),Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;bi.subVectors(r,i),Ai.subVectors(s,i),vo.subVectors(e,i);const l=bi.dot(vo),c=Ai.dot(vo);if(l<=0&&c<=0)return t.copy(i);xo.subVectors(e,r);const u=bi.dot(xo),f=Ai.dot(xo);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(bi,a);Mo.subVectors(e,s);const m=bi.dot(Mo),x=Ai.dot(Mo);if(x>=0&&m<=x)return t.copy(s);const M=m*c-l*x;if(M<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(Ai,o);const p=u*x-m*f;if(p<=0&&f-u>=0&&m-x>=0)return ic.subVectors(s,r),o=(f-u)/(f-u+(m-x)),t.copy(r).addScaledVector(ic,o);const h=1/(p+M+d);return a=M*h,o=d*h,t.copy(i).addScaledVector(bi,a).addScaledVector(Ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},kr={h:0,s:0,l:0};function So(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=em(e,1),t=Nt(t,0,1),i=Nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=So(a,s,e+1/3),this.g=So(a,s,e),this.b=So(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=_t){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){const i=nf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=lo(e.r),this.g=lo(e.g),this.b=lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return Ke.fromWorkingColorSpace(Mt.copy(this),e),Math.round(Nt(Mt.r*255,0,255))*65536+Math.round(Nt(Mt.g*255,0,255))*256+Math.round(Nt(Mt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Mt.copy(this),t);const i=Mt.r,r=Mt.g,s=Mt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=_t){Ke.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,i=Mt.g,r=Mt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(kr);const i=oo(On.h,kr.h,t),r=oo(On.s,kr.s,t),s=oo(On.l,kr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new Xe;Xe.NAMES=nf;let mm=0;class wr extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=br(),this.name="",this.type="Material",this.blending=Gi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wo,this.blendDst=ko,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(i.blending=this.blending),this.side!==jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wo&&(i.blendSrc=this.blendSrc),this.blendDst!==ko&&(i.blendDst=this.blendDst),this.blendEquation!==ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ba extends wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lt=new W,Xr=new $e;class dn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=kl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xr.fromBufferAttribute(this,t),Xr.applyMatrix3(e),this.setXY(t,Xr.x,Xr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=er(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=er(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=er(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=er(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),r=Ut(r,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==kl&&(e.usage=this.usage),e}}class rf extends dn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class sf extends dn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ft extends dn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let _m=0;const Xt=new mt,Eo=new Lt,Ri=new W,Ht=new Rr,rr=new Rr,pt=new W;class on extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=br(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($u(e)?sf:rf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ht.setFromBufferAttribute(s),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(Ht.min,rr.min),Ht.expandByPoint(pt),pt.addVectors(Ht.max,rr.max),Ht.expandByPoint(pt)):(Ht.expandByPoint(rr.min),Ht.expandByPoint(rr.max))}Ht.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)pt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)pt.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),pt.add(Ri)),r=Math.max(r,i.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let A=0;A<o;A++)c[A]=new W,u[A]=new W;const f=new W,d=new W,m=new W,x=new $e,M=new $e,p=new $e,h=new W,b=new W;function E(A,Z,j){f.fromArray(r,A*3),d.fromArray(r,Z*3),m.fromArray(r,j*3),x.fromArray(a,A*2),M.fromArray(a,Z*2),p.fromArray(a,j*2),d.sub(f),m.sub(f),M.sub(x),p.sub(x);const ce=1/(M.x*p.y-p.x*M.y);isFinite(ce)&&(h.copy(d).multiplyScalar(p.y).addScaledVector(m,-M.y).multiplyScalar(ce),b.copy(m).multiplyScalar(M.x).addScaledVector(d,-p.x).multiplyScalar(ce),c[A].add(h),c[Z].add(h),c[j].add(h),u[A].add(b),u[Z].add(b),u[j].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let A=0,Z=T.length;A<Z;++A){const j=T[A],ce=j.start,D=j.count;for(let H=ce,X=ce+D;H<X;H+=3)E(i[H+0],i[H+1],i[H+2])}const U=new W,C=new W,w=new W,re=new W;function y(A){w.fromArray(s,A*3),re.copy(w);const Z=c[A];U.copy(Z),U.sub(w.multiplyScalar(w.dot(Z))).normalize(),C.crossVectors(re,Z);const ce=C.dot(u[A])<0?-1:1;l[A*4]=U.x,l[A*4+1]=U.y,l[A*4+2]=U.z,l[A*4+3]=ce}for(let A=0,Z=T.length;A<Z;++A){const j=T[A],ce=j.start,D=j.count;for(let H=ce,X=ce+D;H<X;H+=3)y(i[H+0]),y(i[H+1]),y(i[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new W,s=new W,a=new W,o=new W,l=new W,c=new W,u=new W,f=new W;if(e)for(let d=0,m=e.count;d<m;d+=3){const x=e.getX(d+0),M=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let m=0,x=0;for(let M=0,p=l.length;M<p;M++){o.isInterleavedBufferAttribute?m=l[M]*o.data.stride+o.offset:m=l[M]*u;for(let h=0;h<u;h++)d[x++]=c[m++]}return new dn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],m=e(d,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const m=c[f];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new mt,ni=new ef,qr=new Is,sc=new W,wi=new W,Ci=new W,Pi=new W,yo=new W,Yr=new W,jr=new $e,Kr=new $e,$r=new $e,oc=new W,ac=new W,lc=new W,Zr=new W,Jr=new W;class wn extends Lt{constructor(e=new on,t=new ba){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Yr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(yo.fromBufferAttribute(f,e),a?Yr.addScaledVector(yo,u):Yr.addScaledVector(yo.sub(t),u))}t.add(Yr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(s),ni.copy(e.ray).recast(e.near),!(qr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(qr,sc)===null||ni.origin.distanceToSquared(sc)>(e.far-e.near)**2))&&(rc.copy(s).invert(),ni.copy(e.ray).applyMatrix4(rc),!(i.boundingBox!==null&&ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,M=d.length;x<M;x++){const p=d[x],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let T=b,U=E;T<U;T+=3){const C=o.getX(T),w=o.getX(T+1),re=o.getX(T+2);r=Qr(this,h,e,i,c,u,f,C,w,re),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let p=x,h=M;p<h;p+=3){const b=o.getX(p),E=o.getX(p+1),T=o.getX(p+2);r=Qr(this,a,e,i,c,u,f,b,E,T),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,M=d.length;x<M;x++){const p=d[x],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let T=b,U=E;T<U;T+=3){const C=T,w=T+1,re=T+2;r=Qr(this,h,e,i,c,u,f,C,w,re),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let p=x,h=M;p<h;p+=3){const b=p,E=p+1,T=p+2;r=Qr(this,a,e,i,c,u,f,b,E,T),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function gm(n,e,t,i,r,s,a,o){let l;if(e.side===Ot?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===jn,o),l===null)return null;Jr.copy(o),Jr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Jr);return c<t.near||c>t.far?null:{distance:c,point:Jr.clone(),object:n}}function Qr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,wi),n.getVertexPosition(l,Ci),n.getVertexPosition(c,Pi);const u=gm(n,e,t,i,wi,Ci,Pi,Zr);if(u){r&&(jr.fromBufferAttribute(r,o),Kr.fromBufferAttribute(r,l),$r.fromBufferAttribute(r,c),u.uv=Qt.getInterpolation(Zr,wi,Ci,Pi,jr,Kr,$r,new $e)),s&&(jr.fromBufferAttribute(s,o),Kr.fromBufferAttribute(s,l),$r.fromBufferAttribute(s,c),u.uv1=Qt.getInterpolation(Zr,wi,Ci,Pi,jr,Kr,$r,new $e),u.uv2=u.uv1),a&&(oc.fromBufferAttribute(a,o),ac.fromBufferAttribute(a,l),lc.fromBufferAttribute(a,c),u.normal=Qt.getInterpolation(Zr,wi,Ci,Pi,oc,ac,lc,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new W,materialIndex:0};Qt.getNormal(wi,Ci,Pi,f.normal),u.face=f}return u}class Cr extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(f,2));function x(M,p,h,b,E,T,U,C,w,re,y){const A=T/w,Z=U/re,j=T/2,ce=U/2,D=C/2,H=w+1,X=re+1;let $=0,B=0;const Q=new W;for(let ie=0;ie<X;ie++){const ae=ie*Z-ce;for(let le=0;le<H;le++){const K=le*A-j;Q[M]=K*b,Q[p]=ae*E,Q[h]=D,c.push(Q.x,Q.y,Q.z),Q[M]=0,Q[p]=0,Q[h]=C>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(le/w),f.push(1-ie/re),$+=1}}for(let ie=0;ie<re;ie++)for(let ae=0;ae<w;ae++){const le=d+ae+H*ie,K=d+ae+H*(ie+1),oe=d+(ae+1)+H*(ie+1),ge=d+(ae+1)+H*ie;l.push(le,K,ge),l.push(K,oe,ge),B+=6}o.addGroup(m,B,y),m+=B,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ji(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Rt(n){const e={};for(let t=0;t<n.length;t++){const i=ji(n[t]);for(const r in i)e[r]=i[r]}return e}function vm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function of(n){return n.getRenderTarget()===null?n.outputColorSpace:Ke.workingColorSpace}const xm={clone:ji,merge:Rt};var Mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mm,this.fragmentShader=Sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class af extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Yt extends af{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(so*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Li=-90,Di=1;class Em extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Yt(Li,Di,e,t);r.layers=this.layers,this.add(r);const s=new Yt(Li,Di,e,t);s.layers=this.layers,this.add(s);const a=new Yt(Li,Di,e,t);a.layers=this.layers,this.add(a);const o=new Yt(Li,Di,e,t);o.layers=this.layers,this.add(o);const l=new Yt(Li,Di,e,t);l.layers=this.layers,this.add(l);const c=new Yt(Li,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Rn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class lf extends Wt{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Xi,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ym extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(mr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===hi?_t:jt),this.texture=new lf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Cr(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ot,blending:Xn});s.uniforms.tEquirect.value=t;const a=new wn(r,s),o=t.minFilter;return t.minFilter===Sr&&(t.minFilter=qt),new Em(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const To=new W,Tm=new W,bm=new We;class si{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=To.subVectors(i,t).cross(Tm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(To),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||bm.getNormalMatrix(e),r=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Is,es=new W;class cf{constructor(e=new si,t=new si,i=new si,r=new si,s=new si,a=new si){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Rn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],m=r[8],x=r[9],M=r[10],p=r[11],h=r[12],b=r[13],E=r[14],T=r[15];if(i[0].setComponents(l-s,d-c,p-m,T-h).normalize(),i[1].setComponents(l+s,d+c,p+m,T+h).normalize(),i[2].setComponents(l+a,d+u,p+x,T+b).normalize(),i[3].setComponents(l-a,d-u,p-x,T-b).normalize(),i[4].setComponents(l-o,d-f,p-M,T-E).normalize(),t===Rn)i[5].setComponents(l+o,d+f,p+M,T+E).normalize();else if(t===Ms)i[5].setComponents(o,f,M,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(es.x=r.normal.x>0?e.max.x:e.min.x,es.y=r.normal.y>0?e.max.y:e.min.y,es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uf(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Am(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,d=c.usage,m=f.byteLength,x=n.createBuffer();n.bindBuffer(u,x),n.bufferData(u,f,d),c.onUploadCallback();let M;if(f instanceof Float32Array)M=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)M=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)M=n.SHORT;else if(f instanceof Uint32Array)M=n.UNSIGNED_INT;else if(f instanceof Int32Array)M=n.INT;else if(f instanceof Int8Array)M=n.BYTE;else if(f instanceof Uint8Array)M=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)M=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:M,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,u,f){const d=u.array,m=u._updateRange,x=u.updateRanges;if(n.bindBuffer(f,c),m.count===-1&&x.length===0&&n.bufferSubData(f,0,d),x.length!==0){for(let M=0,p=x.length;M<p;M++){const h=x[M];t?n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:a,remove:o,update:l}}class Aa extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,m=[],x=[],M=[],p=[];for(let h=0;h<u;h++){const b=h*d-a;for(let E=0;E<c;E++){const T=E*f-s;x.push(T,-b,0),M.push(0,0,1),p.push(E/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<o;b++){const E=b+c*h,T=b+c*(h+1),U=b+1+c*(h+1),C=b+1+c*h;m.push(E,T,C),m.push(T,U,C)}this.setIndex(m),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.widthSegments,e.heightSegments)}}var Rm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Dm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Um=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Om=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ym=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$m=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,e_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,t_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i_="gl_FragColor = linearToOutputTexel( gl_FragColor );",r_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,s_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,o_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,a_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,l_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,u_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,m_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,__=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,x_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,M_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,S_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,E_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,y_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,T_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,b_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,A_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,R_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,w_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,C_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,P_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,U_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,I_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,N_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,F_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,O_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,V_=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,W_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,k_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,X_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,K_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Z_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,J_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Q_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ag=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_g=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ug=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Ig=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ng=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Og=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$g=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ev=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:Rm,alphahash_pars_fragment:wm,alphamap_fragment:Cm,alphamap_pars_fragment:Pm,alphatest_fragment:Lm,alphatest_pars_fragment:Dm,aomap_fragment:Um,aomap_pars_fragment:Im,batching_pars_vertex:Nm,batching_vertex:Fm,begin_vertex:Om,beginnormal_vertex:Bm,bsdfs:zm,iridescence_fragment:Hm,bumpmap_pars_fragment:Gm,clipping_planes_fragment:Vm,clipping_planes_pars_fragment:Wm,clipping_planes_pars_vertex:km,clipping_planes_vertex:Xm,color_fragment:qm,color_pars_fragment:Ym,color_pars_vertex:jm,color_vertex:Km,common:$m,cube_uv_reflection_fragment:Zm,defaultnormal_vertex:Jm,displacementmap_pars_vertex:Qm,displacementmap_vertex:e_,emissivemap_fragment:t_,emissivemap_pars_fragment:n_,colorspace_fragment:i_,colorspace_pars_fragment:r_,envmap_fragment:s_,envmap_common_pars_fragment:o_,envmap_pars_fragment:a_,envmap_pars_vertex:l_,envmap_physical_pars_fragment:M_,envmap_vertex:c_,fog_vertex:u_,fog_pars_vertex:f_,fog_fragment:h_,fog_pars_fragment:d_,gradientmap_pars_fragment:p_,lightmap_fragment:m_,lightmap_pars_fragment:__,lights_lambert_fragment:g_,lights_lambert_pars_fragment:v_,lights_pars_begin:x_,lights_toon_fragment:S_,lights_toon_pars_fragment:E_,lights_phong_fragment:y_,lights_phong_pars_fragment:T_,lights_physical_fragment:b_,lights_physical_pars_fragment:A_,lights_fragment_begin:R_,lights_fragment_maps:w_,lights_fragment_end:C_,logdepthbuf_fragment:P_,logdepthbuf_pars_fragment:L_,logdepthbuf_pars_vertex:D_,logdepthbuf_vertex:U_,map_fragment:I_,map_pars_fragment:N_,map_particle_fragment:F_,map_particle_pars_fragment:O_,metalnessmap_fragment:B_,metalnessmap_pars_fragment:z_,morphcolor_vertex:H_,morphnormal_vertex:G_,morphtarget_pars_vertex:V_,morphtarget_vertex:W_,normal_fragment_begin:k_,normal_fragment_maps:X_,normal_pars_fragment:q_,normal_pars_vertex:Y_,normal_vertex:j_,normalmap_pars_fragment:K_,clearcoat_normal_fragment_begin:$_,clearcoat_normal_fragment_maps:Z_,clearcoat_pars_fragment:J_,iridescence_pars_fragment:Q_,opaque_fragment:eg,packing:tg,premultiplied_alpha_fragment:ng,project_vertex:ig,dithering_fragment:rg,dithering_pars_fragment:sg,roughnessmap_fragment:og,roughnessmap_pars_fragment:ag,shadowmap_pars_fragment:lg,shadowmap_pars_vertex:cg,shadowmap_vertex:ug,shadowmask_pars_fragment:fg,skinbase_vertex:hg,skinning_pars_vertex:dg,skinning_vertex:pg,skinnormal_vertex:mg,specularmap_fragment:_g,specularmap_pars_fragment:gg,tonemapping_fragment:vg,tonemapping_pars_fragment:xg,transmission_fragment:Mg,transmission_pars_fragment:Sg,uv_pars_fragment:Eg,uv_pars_vertex:yg,uv_vertex:Tg,worldpos_vertex:bg,background_vert:Ag,background_frag:Rg,backgroundCube_vert:wg,backgroundCube_frag:Cg,cube_vert:Pg,cube_frag:Lg,depth_vert:Dg,depth_frag:Ug,distanceRGBA_vert:Ig,distanceRGBA_frag:Ng,equirect_vert:Fg,equirect_frag:Og,linedashed_vert:Bg,linedashed_frag:zg,meshbasic_vert:Hg,meshbasic_frag:Gg,meshlambert_vert:Vg,meshlambert_frag:Wg,meshmatcap_vert:kg,meshmatcap_frag:Xg,meshnormal_vert:qg,meshnormal_frag:Yg,meshphong_vert:jg,meshphong_frag:Kg,meshphysical_vert:$g,meshphysical_frag:Zg,meshtoon_vert:Jg,meshtoon_frag:Qg,points_vert:ev,points_frag:tv,shadow_vert:nv,shadow_frag:iv,sprite_vert:rv,sprite_frag:sv},he={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},fn={basic:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Rt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Rt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Rt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Rt([he.points,he.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Rt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Rt([he.common,he.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Rt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Rt([he.sprite,he.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Rt([he.common,he.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Rt([he.lights,he.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};fn.physical={uniforms:Rt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const ts={r:0,b:0,g:0};function ov(n,e,t,i,r,s,a){const o=new Xe(0);let l=s===!0?0:1,c,u,f=null,d=0,m=null;function x(p,h){let b=!1,E=h.isScene===!0?h.background:null;E&&E.isTexture&&(E=(h.backgroundBlurriness>0?t:e).get(E)),E===null?M(o,l):E&&E.isColor&&(M(E,1),b=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),E&&(E.isCubeTexture||E.mapping===Ds)?(u===void 0&&(u=new wn(new Cr(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:ji(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=Ke.getTransfer(E.colorSpace)!==it,(f!==E||d!==E.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,f=E,d=E.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new wn(new Aa(2,2),new mi({name:"BackgroundMaterial",uniforms:ji(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(E.colorSpace)!==it,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||d!==E.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,f=E,d=E.version,m=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function M(p,h){p.getRGB(ts,of(n)),i.buffers.color.setClear(ts.r,ts.g,ts.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(p,h=1){o.set(p),l=h,M(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,M(o,l)},render:x}}function av(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=p(null);let c=l,u=!1;function f(D,H,X,$,B){let Q=!1;if(a){const ie=M($,X,H);c!==ie&&(c=ie,m(c.object)),Q=h(D,$,X,B),Q&&b(D,$,X,B)}else{const ie=H.wireframe===!0;(c.geometry!==$.id||c.program!==X.id||c.wireframe!==ie)&&(c.geometry=$.id,c.program=X.id,c.wireframe=ie,Q=!0)}B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(Q||u)&&(u=!1,re(D,H,X,$),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(D){return i.isWebGL2?n.bindVertexArray(D):s.bindVertexArrayOES(D)}function x(D){return i.isWebGL2?n.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function M(D,H,X){const $=X.wireframe===!0;let B=o[D.id];B===void 0&&(B={},o[D.id]=B);let Q=B[H.id];Q===void 0&&(Q={},B[H.id]=Q);let ie=Q[$];return ie===void 0&&(ie=p(d()),Q[$]=ie),ie}function p(D){const H=[],X=[],$=[];for(let B=0;B<r;B++)H[B]=0,X[B]=0,$[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:X,attributeDivisors:$,object:D,attributes:{},index:null}}function h(D,H,X,$){const B=c.attributes,Q=H.attributes;let ie=0;const ae=X.getAttributes();for(const le in ae)if(ae[le].location>=0){const oe=B[le];let ge=Q[le];if(ge===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(ge=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(ge=D.instanceColor)),oe===void 0||oe.attribute!==ge||ge&&oe.data!==ge.data)return!0;ie++}return c.attributesNum!==ie||c.index!==$}function b(D,H,X,$){const B={},Q=H.attributes;let ie=0;const ae=X.getAttributes();for(const le in ae)if(ae[le].location>=0){let oe=Q[le];oe===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor));const ge={};ge.attribute=oe,oe&&oe.data&&(ge.data=oe.data),B[le]=ge,ie++}c.attributes=B,c.attributesNum=ie,c.index=$}function E(){const D=c.newAttributes;for(let H=0,X=D.length;H<X;H++)D[H]=0}function T(D){U(D,0)}function U(D,H){const X=c.newAttributes,$=c.enabledAttributes,B=c.attributeDivisors;X[D]=1,$[D]===0&&(n.enableVertexAttribArray(D),$[D]=1),B[D]!==H&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,H),B[D]=H)}function C(){const D=c.newAttributes,H=c.enabledAttributes;for(let X=0,$=H.length;X<$;X++)H[X]!==D[X]&&(n.disableVertexAttribArray(X),H[X]=0)}function w(D,H,X,$,B,Q,ie){ie===!0?n.vertexAttribIPointer(D,H,X,B,Q):n.vertexAttribPointer(D,H,X,$,B,Q)}function re(D,H,X,$){if(i.isWebGL2===!1&&(D.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();const B=$.attributes,Q=X.getAttributes(),ie=H.defaultAttributeValues;for(const ae in Q){const le=Q[ae];if(le.location>=0){let K=B[ae];if(K===void 0&&(ae==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),ae==="instanceColor"&&D.instanceColor&&(K=D.instanceColor)),K!==void 0){const oe=K.normalized,ge=K.itemSize,xe=t.get(K);if(xe===void 0)continue;const Me=xe.buffer,we=xe.type,Ue=xe.bytesPerElement,Te=i.isWebGL2===!0&&(we===n.INT||we===n.UNSIGNED_INT||K.gpuType===Gu);if(K.isInterleavedBufferAttribute){const ke=K.data,g=ke.stride,P=K.offset;if(ke.isInstancedInterleavedBuffer){for(let I=0;I<le.locationSize;I++)U(le.location+I,ke.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ke.meshPerAttribute*ke.count)}else for(let I=0;I<le.locationSize;I++)T(le.location+I);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let I=0;I<le.locationSize;I++)w(le.location+I,ge/le.locationSize,we,oe,g*Ue,(P+ge/le.locationSize*I)*Ue,Te)}else{if(K.isInstancedBufferAttribute){for(let ke=0;ke<le.locationSize;ke++)U(le.location+ke,K.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ke=0;ke<le.locationSize;ke++)T(le.location+ke);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let ke=0;ke<le.locationSize;ke++)w(le.location+ke,ge/le.locationSize,we,oe,ge*Ue,ge/le.locationSize*ke*Ue,Te)}}else if(ie!==void 0){const oe=ie[ae];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(le.location,oe);break;case 3:n.vertexAttrib3fv(le.location,oe);break;case 4:n.vertexAttrib4fv(le.location,oe);break;default:n.vertexAttrib1fv(le.location,oe)}}}}C()}function y(){j();for(const D in o){const H=o[D];for(const X in H){const $=H[X];for(const B in $)x($[B].object),delete $[B];delete H[X]}delete o[D]}}function A(D){if(o[D.id]===void 0)return;const H=o[D.id];for(const X in H){const $=H[X];for(const B in $)x($[B].object),delete $[B];delete H[X]}delete o[D.id]}function Z(D){for(const H in o){const X=o[H];if(X[D.id]===void 0)continue;const $=X[D.id];for(const B in $)x($[B].object),delete $[B];delete X[D.id]}}function j(){ce(),u=!0,c!==l&&(c=l,m(c.object))}function ce(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:j,resetDefaultState:ce,dispose:y,releaseStatesOfGeometry:A,releaseStatesOfProgram:Z,initAttributes:E,enableAttribute:T,disableUnusedAttributes:C}}function lv(n,e,t,i){const r=i.isWebGL2;let s;function a(u){s=u}function o(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,d){if(d===0)return;let m,x;if(r)m=n,x="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[x](s,u,f,d),t.update(f,s,d)}function c(u,f,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<d;x++)this.render(u[x],f[x]);else{m.multiDrawArraysWEBGL(s,u,0,f,0,d);let x=0;for(let M=0;M<d;M++)x+=f[M];t.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function cv(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),M=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=d>0,T=a||e.has("OES_texture_float"),U=E&&T,C=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:x,maxAttributes:M,maxVertexUniforms:p,maxVaryings:h,maxFragmentUniforms:b,vertexTextures:E,floatFragmentTextures:T,floatVertexTextures:U,maxSamples:C}}function uv(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new si,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const x=f.clippingPlanes,M=f.clipIntersection,p=f.clipShadows,h=n.get(f);if(!r||x===null||x.length===0||s&&!p)s?u(null):c();else{const b=s?0:i,E=b*4;let T=h.clippingState||null;l.value=T,T=u(x,d,E,m);for(let U=0;U!==E;++U)T[U]=t[U];h.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,m,x){const M=f!==null?f.length:0;let p=null;if(M!==0){if(p=l.value,x!==!0||p===null){const h=m+M*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<h)&&(p=new Float32Array(h));for(let E=0,T=m;E!==M;++E,T+=4)a.copy(f[E]).applyMatrix4(b,o),a.normal.toArray(p,T),p[T+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}function fv(n){let e=new WeakMap;function t(a,o){return o===Xo?a.mapping=Xi:o===qo&&(a.mapping=qi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Xo||o===qo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ym(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class hv extends af{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,cc=[.125,.215,.35,.446,.526,.582],li=20,bo=new hv,uc=new Xe;let Ao=null,Ro=0,wo=0;const oi=(1+Math.sqrt(5))/2,Ui=1/oi,fc=[new W(1,1,1),new W(-1,1,1),new W(1,1,-1),new W(-1,1,-1),new W(0,oi,Ui),new W(0,oi,-Ui),new W(Ui,0,oi),new W(-Ui,0,oi),new W(oi,Ui,0),new W(-oi,Ui,0)];class hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ao,Ro,wo),e.scissorTest=!1,ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:Er,format:tn,colorSpace:Ln,depthBuffer:!1},r=dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dv(s)),this._blurMaterial=pv(s,e,t)}return r}_compileMaterial(e){const t=new wn(this._lodPlanes[0],e);this._renderer.compile(t,bo)}_sceneToCubeUV(e,t,i,r){const o=new Yt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(uc),u.toneMapping=qn,u.autoClear=!1;const m=new ba({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),x=new wn(new Cr,m);let M=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,M=!0):(m.color.copy(uc),M=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):b===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const E=this._cubeSize;ns(r,b*E,h>2?E:0,E,E),u.setRenderTarget(r),M&&u.render(x,o),u.render(e,o)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Xi||e.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new wn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ns(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,bo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=fc[(r-1)%fc.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new wn(this._lodPlanes[r],c),d=c.uniforms,m=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*li-1),M=s/x,p=isFinite(s)?1+Math.floor(u*M):li;p>li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${li}`);const h=[];let b=0;for(let w=0;w<li;++w){const re=w/M,y=Math.exp(-re*re/2);h.push(y),w===0?b+=y:w<p&&(b+=2*y)}for(let w=0;w<h.length;w++)h[w]=h[w]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=x,d.mipInt.value=E-i;const T=this._sizeLods[r],U=3*T*(r>E-Ni?r-E+Ni:0),C=4*(this._cubeSize-T);ns(t,U,C,3*T,2*T),l.setRenderTarget(t),l.render(f,bo)}}function dv(n){const e=[],t=[],i=[];let r=n;const s=n-Ni+1+cc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Ni?l=cc[a-n+Ni-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,x=6,M=3,p=2,h=1,b=new Float32Array(M*x*m),E=new Float32Array(p*x*m),T=new Float32Array(h*x*m);for(let C=0;C<m;C++){const w=C%3*2/3-1,re=C>2?0:-1,y=[w,re,0,w+2/3,re,0,w+2/3,re+1,0,w,re,0,w+2/3,re+1,0,w,re+1,0];b.set(y,M*x*C),E.set(d,p*x*C);const A=[C,C,C,C,C,C];T.set(A,h*x*C)}const U=new on;U.setAttribute("position",new dn(b,M)),U.setAttribute("uv",new dn(E,p)),U.setAttribute("faceIndex",new dn(T,h)),e.push(U),r>Ni&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function dc(n,e,t){const i=new pi(n,e,t);return i.texture.mapping=Ds,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ns(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function pv(n,e,t){const i=new Float32Array(li),r=new W(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function pc(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function mc(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mv(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xo||l===qo,u=l===Xi||l===qi;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new hc(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new hc(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function _v(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function gv(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);for(const x in d.morphAttributes){const M=d.morphAttributes[x];for(let p=0,h=M.length;p<h;p++)e.remove(M[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const x in d)e.update(d[x],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const x in m){const M=m[x];for(let p=0,h=M.length;p<h;p++)e.update(M[p],n.ARRAY_BUFFER)}}function c(f){const d=[],m=f.index,x=f.attributes.position;let M=0;if(m!==null){const b=m.array;M=m.version;for(let E=0,T=b.length;E<T;E+=3){const U=b[E+0],C=b[E+1],w=b[E+2];d.push(U,C,C,w,w,U)}}else if(x!==void 0){const b=x.array;M=x.version;for(let E=0,T=b.length/3-1;E<T;E+=3){const U=E+0,C=E+1,w=E+2;d.push(U,C,C,w,w,U)}}else return;const p=new($u(d)?sf:rf)(d,1);p.version=M;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function vv(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function u(m,x){n.drawElements(s,x,o,m*l),t.update(x,s,1)}function f(m,x,M){if(M===0)return;let p,h;if(r)p=n,h="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[h](s,x,o,m*l,M),t.update(x,s,M)}function d(m,x,M){if(M===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<M;h++)this.render(m[h]/l,x[h]);else{p.multiDrawElementsWEBGL(s,x,0,o,m,0,M);let h=0;for(let b=0;b<M;b++)h+=x[b];t.update(h,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function xv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Mv(n,e){return n[0]-e[0]}function Sv(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Ev(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new gt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const x=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,M=x!==void 0?x.length:0;let p=s.get(u);if(p===void 0||p.count!==M){let H=function(){ce.dispose(),s.delete(u),u.removeEventListener("dispose",H)};var m=H;p!==void 0&&p.texture.dispose();const E=u.morphAttributes.position!==void 0,T=u.morphAttributes.normal!==void 0,U=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],re=u.morphAttributes.color||[];let y=0;E===!0&&(y=1),T===!0&&(y=2),U===!0&&(y=3);let A=u.attributes.position.count*y,Z=1;A>e.maxTextureSize&&(Z=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const j=new Float32Array(A*Z*4*M),ce=new Qu(j,A,Z,M);ce.type=Vn,ce.needsUpdate=!0;const D=y*4;for(let X=0;X<M;X++){const $=C[X],B=w[X],Q=re[X],ie=A*Z*4*X;for(let ae=0;ae<$.count;ae++){const le=ae*D;E===!0&&(a.fromBufferAttribute($,ae),j[ie+le+0]=a.x,j[ie+le+1]=a.y,j[ie+le+2]=a.z,j[ie+le+3]=0),T===!0&&(a.fromBufferAttribute(B,ae),j[ie+le+4]=a.x,j[ie+le+5]=a.y,j[ie+le+6]=a.z,j[ie+le+7]=0),U===!0&&(a.fromBufferAttribute(Q,ae),j[ie+le+8]=a.x,j[ie+le+9]=a.y,j[ie+le+10]=a.z,j[ie+le+11]=Q.itemSize===4?a.w:1)}}p={count:M,texture:ce,size:new $e(A,Z)},s.set(u,p),u.addEventListener("dispose",H)}let h=0;for(let E=0;E<d.length;E++)h+=d[E];const b=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",b),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const x=d===void 0?0:d.length;let M=i[u.id];if(M===void 0||M.length!==x){M=[];for(let T=0;T<x;T++)M[T]=[T,0];i[u.id]=M}for(let T=0;T<x;T++){const U=M[T];U[0]=T,U[1]=d[T]}M.sort(Sv);for(let T=0;T<8;T++)T<x&&M[T][1]?(o[T][0]=M[T][0],o[T][1]=M[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(Mv);const p=u.morphAttributes.position,h=u.morphAttributes.normal;let b=0;for(let T=0;T<8;T++){const U=o[T],C=U[0],w=U[1];C!==Number.MAX_SAFE_INTEGER&&w?(p&&u.getAttribute("morphTarget"+T)!==p[C]&&u.setAttribute("morphTarget"+T,p[C]),h&&u.getAttribute("morphNormal"+T)!==h[C]&&u.setAttribute("morphNormal"+T,h[C]),r[T]=w,b+=w):(p&&u.hasAttribute("morphTarget"+T)===!0&&u.deleteAttribute("morphTarget"+T),h&&u.hasAttribute("morphNormal"+T)===!0&&u.deleteAttribute("morphNormal"+T),r[T]=0)}const E=u.morphTargetsRelative?1:1-b;f.getUniforms().setValue(n,"morphTargetBaseInfluence",E),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function yv(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class ff extends Wt{constructor(e,t,i,r,s,a,o,l,c,u){if(u=u!==void 0?u:fi,u!==fi&&u!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===fi&&(i=Gn),i===void 0&&u===Yi&&(i=ui),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const hf=new Wt,df=new ff(1,1);df.compareFunction=Ku;const pf=new Qu,mf=new om,_f=new lf,_c=[],gc=[],vc=new Float32Array(16),xc=new Float32Array(9),Mc=new Float32Array(4);function $i(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=_c[r];if(s===void 0&&(s=new Float32Array(r),_c[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Fs(n,e){let t=gc[e];t===void 0&&(t=new Int32Array(e),gc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Tv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2fv(this.addr,e),ft(t,e)}}function Av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;n.uniform3fv(this.addr,e),ft(t,e)}}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4fv(this.addr,e),ft(t,e)}}function wv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,i))return;Mc.set(i),n.uniformMatrix2fv(this.addr,!1,Mc),ft(t,i)}}function Cv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,i))return;xc.set(i),n.uniformMatrix3fv(this.addr,!1,xc),ft(t,i)}}function Pv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,i))return;vc.set(i),n.uniformMatrix4fv(this.addr,!1,vc),ft(t,i)}}function Lv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2iv(this.addr,e),ft(t,e)}}function Uv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;n.uniform3iv(this.addr,e),ft(t,e)}}function Iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4iv(this.addr,e),ft(t,e)}}function Nv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2uiv(this.addr,e),ft(t,e)}}function Ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;n.uniform3uiv(this.addr,e),ft(t,e)}}function Bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4uiv(this.addr,e),ft(t,e)}}function zv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?df:hf;t.setTexture2D(e||s,r)}function Hv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||mf,r)}function Gv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||_f,r)}function Vv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||pf,r)}function Wv(n){switch(n){case 5126:return Tv;case 35664:return bv;case 35665:return Av;case 35666:return Rv;case 35674:return wv;case 35675:return Cv;case 35676:return Pv;case 5124:case 35670:return Lv;case 35667:case 35671:return Dv;case 35668:case 35672:return Uv;case 35669:case 35673:return Iv;case 5125:return Nv;case 36294:return Fv;case 36295:return Ov;case 36296:return Bv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Gv;case 36289:case 36303:case 36311:case 36292:return Vv}}function kv(n,e){n.uniform1fv(this.addr,e)}function Xv(n,e){const t=$i(e,this.size,2);n.uniform2fv(this.addr,t)}function qv(n,e){const t=$i(e,this.size,3);n.uniform3fv(this.addr,t)}function Yv(n,e){const t=$i(e,this.size,4);n.uniform4fv(this.addr,t)}function jv(n,e){const t=$i(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Kv(n,e){const t=$i(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $v(n,e){const t=$i(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Zv(n,e){n.uniform1iv(this.addr,e)}function Jv(n,e){n.uniform2iv(this.addr,e)}function Qv(n,e){n.uniform3iv(this.addr,e)}function ex(n,e){n.uniform4iv(this.addr,e)}function tx(n,e){n.uniform1uiv(this.addr,e)}function nx(n,e){n.uniform2uiv(this.addr,e)}function ix(n,e){n.uniform3uiv(this.addr,e)}function rx(n,e){n.uniform4uiv(this.addr,e)}function sx(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ft(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||hf,s[a])}function ox(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ft(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||mf,s[a])}function ax(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ft(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||_f,s[a])}function lx(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ft(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||pf,s[a])}function cx(n){switch(n){case 5126:return kv;case 35664:return Xv;case 35665:return qv;case 35666:return Yv;case 35674:return jv;case 35675:return Kv;case 35676:return $v;case 5124:case 35670:return Zv;case 35667:case 35671:return Jv;case 35668:case 35672:return Qv;case 35669:case 35673:return ex;case 5125:return tx;case 36294:return nx;case 36295:return ix;case 36296:return rx;case 35678:case 36198:case 36298:case 36306:case 35682:return sx;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return ax;case 36289:case 36303:case 36311:case 36292:return lx}}class ux{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Wv(t.type)}}class fx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cx(t.type)}}class hx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Co=/(\w+)(\])?(\[|\.)?/g;function Sc(n,e){n.seq.push(e),n.map[e.id]=e}function dx(n,e,t){const i=n.name,r=i.length;for(Co.lastIndex=0;;){const s=Co.exec(i),a=Co.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Sc(t,c===void 0?new ux(o,n,e):new fx(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new hx(o),Sc(t,f)),t=f}}}class cs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);dx(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ec(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const px=37297;let mx=0;function _x(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function gx(n){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(n);let i;switch(e===t?i="":e===xs&&t===vs?i="LinearDisplayP3ToLinearSRGB":e===vs&&t===xs&&(i="LinearSRGBToLinearDisplayP3"),n){case Ln:case Us:return[i,"LinearTransferOETF"];case _t:case Ta:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function yc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+_x(n.getShaderSource(e),a)}else return r}function vx(n,e){const t=gx(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function xx(n,e){let t;switch(e){case wp:t="Linear";break;case Cp:t="Reinhard";break;case Pp:t="OptimizedCineon";break;case Lp:t="ACESFilmic";break;case Up:t="AgX";break;case Dp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mx(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fi).join(`
`)}function Sx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Fi).join(`
`)}function Ex(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function yx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Fi(n){return n!==""}function Tc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(n){return n.replace(Tx,Ax)}const bx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ax(n,e){let t=Be[e];if(t===void 0){const i=bx.get(e);if(i!==void 0)t=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Jo(t)}const Rx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ac(n){return n.replace(Rx,wx)}function wx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Rc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Cx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===np?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function Px(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Xi:case qi:e="ENVMAP_TYPE_CUBE";break;case Ds:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case qi:e="ENVMAP_MODE_REFRACTION";break}return e}function Dx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case zu:e="ENVMAP_BLENDING_MULTIPLY";break;case Ap:e="ENVMAP_BLENDING_MIX";break;case Rp:e="ENVMAP_BLENDING_ADD";break}return e}function Ux(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Ix(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Cx(t),c=Px(t),u=Lx(t),f=Dx(t),d=Ux(t),m=t.isWebGL2?"":Mx(t),x=Sx(t),M=Ex(s),p=r.createProgram();let h,b,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Fi).join(`
`),h.length>0&&(h+=`
`),b=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Fi).join(`
`),b.length>0&&(b+=`
`)):(h=[Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fi).join(`
`),b=[m,Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Be.tonemapping_pars_fragment:"",t.toneMapping!==qn?xx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,vx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fi).join(`
`)),a=Jo(a),a=Tc(a,t),a=bc(a,t),o=Jo(o),o=Tc(o,t),o=bc(o,t),a=Ac(a),o=Ac(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,h=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const T=E+h+a,U=E+b+o,C=Ec(r,r.VERTEX_SHADER,T),w=Ec(r,r.FRAGMENT_SHADER,U);r.attachShader(p,C),r.attachShader(p,w),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function re(j){if(n.debug.checkShaderErrors){const ce=r.getProgramInfoLog(p).trim(),D=r.getShaderInfoLog(C).trim(),H=r.getShaderInfoLog(w).trim();let X=!0,$=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,C,w);else{const B=yc(r,C,"vertex"),Q=yc(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+ce+`
`+B+`
`+Q)}else ce!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ce):(D===""||H==="")&&($=!1);$&&(j.diagnostics={runnable:X,programLog:ce,vertexShader:{log:D,prefix:h},fragmentShader:{log:H,prefix:b}})}r.deleteShader(C),r.deleteShader(w),y=new cs(r,p),A=yx(r,p)}let y;this.getUniforms=function(){return y===void 0&&re(this),y};let A;this.getAttributes=function(){return A===void 0&&re(this),A};let Z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Z===!1&&(Z=r.getProgramParameter(p,px)),Z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mx++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=C,this.fragmentShader=w,this}let Nx=0;class Fx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ox(e),t.set(e,i)),i}}class Ox{constructor(e){this.id=Nx++,this.code=e,this.usedTimes=0}}function Bx(n,e,t,i,r,s,a){const o=new tf,l=new Fx,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return y===0?"uv":`uv${y}`}function p(y,A,Z,j,ce){const D=j.fog,H=ce.geometry,X=y.isMeshStandardMaterial?j.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),B=$&&$.mapping===Ds?$.image.height:null,Q=x[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const ie=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=ie!==void 0?ie.length:0;let le=0;H.morphAttributes.position!==void 0&&(le=1),H.morphAttributes.normal!==void 0&&(le=2),H.morphAttributes.color!==void 0&&(le=3);let K,oe,ge,xe;if(Q){const Tt=fn[Q];K=Tt.vertexShader,oe=Tt.fragmentShader}else K=y.vertexShader,oe=y.fragmentShader,l.update(y),ge=l.getVertexShaderID(y),xe=l.getFragmentShaderID(y);const Me=n.getRenderTarget(),we=ce.isInstancedMesh===!0,Ue=ce.isBatchedMesh===!0,Te=!!y.map,ke=!!y.matcap,g=!!$,P=!!y.aoMap,I=!!y.lightMap,q=!!y.bumpMap,O=!!y.normalMap,J=!!y.displacementMap,ee=!!y.emissiveMap,v=!!y.metalnessMap,_=!!y.roughnessMap,R=y.anisotropy>0,G=y.clearcoat>0,N=y.iridescence>0,z=y.sheen>0,se=y.transmission>0,ne=R&&!!y.anisotropyMap,ue=G&&!!y.clearcoatMap,de=G&&!!y.clearcoatNormalMap,Ee=G&&!!y.clearcoatRoughnessMap,te=N&&!!y.iridescenceMap,ze=N&&!!y.iridescenceThicknessMap,Ce=z&&!!y.sheenColorMap,Ae=z&&!!y.sheenRoughnessMap,ye=!!y.specularMap,pe=!!y.specularColorMap,be=!!y.specularIntensityMap,qe=se&&!!y.transmissionMap,nt=se&&!!y.thicknessMap,Ge=!!y.gradientMap,fe=!!y.alphaMap,L=y.alphaTest>0,me=!!y.alphaHash,_e=!!y.extensions,Le=!!H.attributes.uv1,Re=!!H.attributes.uv2,Ze=!!H.attributes.uv3;let Je=qn;return y.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Je=n.toneMapping),{isWebGL2:u,shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:K,fragmentShader:oe,defines:y.defines,customVertexShaderID:ge,customFragmentShaderID:xe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ue,instancing:we,instancingColor:we&&ce.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Me===null?n.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Ln,map:Te,matcap:ke,envMap:g,envMapMode:g&&$.mapping,envMapCubeUVHeight:B,aoMap:P,lightMap:I,bumpMap:q,normalMap:O,displacementMap:d&&J,emissiveMap:ee,normalMapObjectSpace:O&&y.normalMapType===qp,normalMapTangentSpace:O&&y.normalMapType===Xp,metalnessMap:v,roughnessMap:_,anisotropy:R,anisotropyMap:ne,clearcoat:G,clearcoatMap:ue,clearcoatNormalMap:de,clearcoatRoughnessMap:Ee,iridescence:N,iridescenceMap:te,iridescenceThicknessMap:ze,sheen:z,sheenColorMap:Ce,sheenRoughnessMap:Ae,specularMap:ye,specularColorMap:pe,specularIntensityMap:be,transmission:se,transmissionMap:qe,thicknessMap:nt,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===Gi,alphaMap:fe,alphaTest:L,alphaHash:me,combine:y.combine,mapUv:Te&&M(y.map.channel),aoMapUv:P&&M(y.aoMap.channel),lightMapUv:I&&M(y.lightMap.channel),bumpMapUv:q&&M(y.bumpMap.channel),normalMapUv:O&&M(y.normalMap.channel),displacementMapUv:J&&M(y.displacementMap.channel),emissiveMapUv:ee&&M(y.emissiveMap.channel),metalnessMapUv:v&&M(y.metalnessMap.channel),roughnessMapUv:_&&M(y.roughnessMap.channel),anisotropyMapUv:ne&&M(y.anisotropyMap.channel),clearcoatMapUv:ue&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&M(y.sheenRoughnessMap.channel),specularMapUv:ye&&M(y.specularMap.channel),specularColorMapUv:pe&&M(y.specularColorMap.channel),specularIntensityMapUv:be&&M(y.specularIntensityMap.channel),transmissionMapUv:qe&&M(y.transmissionMap.channel),thicknessMapUv:nt&&M(y.thicknessMap.channel),alphaMapUv:fe&&M(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(O||R),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:Le,vertexUv2s:Re,vertexUv3s:Ze,pointsUvs:ce.isPoints===!0&&!!H.attributes.uv&&(Te||fe),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ce.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:le,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&Z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Je,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Te&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===An,flipSided:y.side===Ot,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:_e&&y.extensions.derivatives===!0,extensionFragDepth:_e&&y.extensions.fragDepth===!0,extensionDrawBuffers:_e&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_e&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function h(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const Z in y.defines)A.push(Z),A.push(y.defines[Z]);return y.isRawShaderMaterial===!1&&(b(A,y),E(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function b(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function E(y,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function T(y){const A=x[y.type];let Z;if(A){const j=fn[A];Z=xm.clone(j.uniforms)}else Z=y.uniforms;return Z}function U(y,A){let Z;for(let j=0,ce=c.length;j<ce;j++){const D=c[j];if(D.cacheKey===A){Z=D,++Z.usedTimes;break}}return Z===void 0&&(Z=new Ix(n,A,y,s),c.push(Z)),Z}function C(y){if(--y.usedTimes===0){const A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function re(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:T,acquireProgram:U,releaseProgram:C,releaseShaderCache:w,programs:c,dispose:re}}function zx(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Hx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function wc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,x,M,p){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:x,renderOrder:f.renderOrder,z:M,group:p},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=x,h.renderOrder=f.renderOrder,h.z=M,h.group=p),e++,h}function o(f,d,m,x,M,p){const h=a(f,d,m,x,M,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function l(f,d,m,x,M,p){const h=a(f,d,m,x,M,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,d){t.length>1&&t.sort(f||Hx),i.length>1&&i.sort(d||wc),r.length>1&&r.sort(d||wc)}function u(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Gx(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Cc,n.set(i,[a])):r>=s.length?(a=new Cc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Vx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new Xe};break;case"SpotLight":t={position:new W,direction:new W,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function Wx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let kx=0;function Xx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function qx(n,e){const t=new Vx,i=Wx(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new W);const s=new W,a=new mt,o=new mt;function l(u,f){let d=0,m=0,x=0;for(let j=0;j<9;j++)r.probe[j].set(0,0,0);let M=0,p=0,h=0,b=0,E=0,T=0,U=0,C=0,w=0,re=0,y=0;u.sort(Xx);const A=f===!0?Math.PI:1;for(let j=0,ce=u.length;j<ce;j++){const D=u[j],H=D.color,X=D.intensity,$=D.distance,B=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=H.r*X*A,m+=H.g*X*A,x+=H.b*X*A;else if(D.isLightProbe){for(let Q=0;Q<9;Q++)r.probe[Q].addScaledVector(D.sh.coefficients[Q],X);y++}else if(D.isDirectionalLight){const Q=t.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity*A),D.castShadow){const ie=D.shadow,ae=i.get(D);ae.shadowBias=ie.bias,ae.shadowNormalBias=ie.normalBias,ae.shadowRadius=ie.radius,ae.shadowMapSize=ie.mapSize,r.directionalShadow[M]=ae,r.directionalShadowMap[M]=B,r.directionalShadowMatrix[M]=D.shadow.matrix,T++}r.directional[M]=Q,M++}else if(D.isSpotLight){const Q=t.get(D);Q.position.setFromMatrixPosition(D.matrixWorld),Q.color.copy(H).multiplyScalar(X*A),Q.distance=$,Q.coneCos=Math.cos(D.angle),Q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Q.decay=D.decay,r.spot[h]=Q;const ie=D.shadow;if(D.map&&(r.spotLightMap[w]=D.map,w++,ie.updateMatrices(D),D.castShadow&&re++),r.spotLightMatrix[h]=ie.matrix,D.castShadow){const ae=i.get(D);ae.shadowBias=ie.bias,ae.shadowNormalBias=ie.normalBias,ae.shadowRadius=ie.radius,ae.shadowMapSize=ie.mapSize,r.spotShadow[h]=ae,r.spotShadowMap[h]=B,C++}h++}else if(D.isRectAreaLight){const Q=t.get(D);Q.color.copy(H).multiplyScalar(X),Q.halfWidth.set(D.width*.5,0,0),Q.halfHeight.set(0,D.height*.5,0),r.rectArea[b]=Q,b++}else if(D.isPointLight){const Q=t.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity*A),Q.distance=D.distance,Q.decay=D.decay,D.castShadow){const ie=D.shadow,ae=i.get(D);ae.shadowBias=ie.bias,ae.shadowNormalBias=ie.normalBias,ae.shadowRadius=ie.radius,ae.shadowMapSize=ie.mapSize,ae.shadowCameraNear=ie.camera.near,ae.shadowCameraFar=ie.camera.far,r.pointShadow[p]=ae,r.pointShadowMap[p]=B,r.pointShadowMatrix[p]=D.shadow.matrix,U++}r.point[p]=Q,p++}else if(D.isHemisphereLight){const Q=t.get(D);Q.skyColor.copy(D.color).multiplyScalar(X*A),Q.groundColor.copy(D.groundColor).multiplyScalar(X*A),r.hemi[E]=Q,E++}}b>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=he.LTC_FLOAT_1,r.rectAreaLTC2=he.LTC_FLOAT_2):(r.rectAreaLTC1=he.LTC_HALF_1,r.rectAreaLTC2=he.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=he.LTC_FLOAT_1,r.rectAreaLTC2=he.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=he.LTC_HALF_1,r.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=x;const Z=r.hash;(Z.directionalLength!==M||Z.pointLength!==p||Z.spotLength!==h||Z.rectAreaLength!==b||Z.hemiLength!==E||Z.numDirectionalShadows!==T||Z.numPointShadows!==U||Z.numSpotShadows!==C||Z.numSpotMaps!==w||Z.numLightProbes!==y)&&(r.directional.length=M,r.spot.length=h,r.rectArea.length=b,r.point.length=p,r.hemi.length=E,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=C+w-re,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=re,r.numLightProbes=y,Z.directionalLength=M,Z.pointLength=p,Z.spotLength=h,Z.rectAreaLength=b,Z.hemiLength=E,Z.numDirectionalShadows=T,Z.numPointShadows=U,Z.numSpotShadows=C,Z.numSpotMaps=w,Z.numLightProbes=y,r.version=kx++)}function c(u,f){let d=0,m=0,x=0,M=0,p=0;const h=f.matrixWorldInverse;for(let b=0,E=u.length;b<E;b++){const T=u[b];if(T.isDirectionalLight){const U=r.directional[d];U.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),U.direction.sub(s),U.direction.transformDirection(h),d++}else if(T.isSpotLight){const U=r.spot[x];U.position.setFromMatrixPosition(T.matrixWorld),U.position.applyMatrix4(h),U.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),U.direction.sub(s),U.direction.transformDirection(h),x++}else if(T.isRectAreaLight){const U=r.rectArea[M];U.position.setFromMatrixPosition(T.matrixWorld),U.position.applyMatrix4(h),o.identity(),a.copy(T.matrixWorld),a.premultiply(h),o.extractRotation(a),U.halfWidth.set(T.width*.5,0,0),U.halfHeight.set(0,T.height*.5,0),U.halfWidth.applyMatrix4(o),U.halfHeight.applyMatrix4(o),M++}else if(T.isPointLight){const U=r.point[m];U.position.setFromMatrixPosition(T.matrixWorld),U.position.applyMatrix4(h),m++}else if(T.isHemisphereLight){const U=r.hemi[p];U.direction.setFromMatrixPosition(T.matrixWorld),U.direction.transformDirection(h),p++}}}return{setup:l,setupView:c,state:r}}function Pc(n,e){const t=new qx(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Yx(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Pc(n,e),t.set(s,[l])):a>=o.length?(l=new Pc(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class jx extends wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kx extends wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jx(n,e,t){let i=new cf;const r=new $e,s=new $e,a=new gt,o=new jx({depthPacking:kp}),l=new Kx,c={},u=t.maxTextureSize,f={[jn]:Ot,[Ot]:jn,[An]:An},d=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:$x,fragmentShader:Zx}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const x=new on;x.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new wn(x,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bu;let h=this.type;this.render=function(C,w,re){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const y=n.getRenderTarget(),A=n.getActiveCubeFace(),Z=n.getActiveMipmapLevel(),j=n.state;j.setBlending(Xn),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const ce=h!==En&&this.type===En,D=h===En&&this.type!==En;for(let H=0,X=C.length;H<X;H++){const $=C[H],B=$.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const Q=B.getFrameExtents();if(r.multiply(Q),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,B.mapSize.y=s.y)),B.map===null||ce===!0||D===!0){const ae=this.type!==En?{minFilter:wt,magFilter:wt}:{};B.map!==null&&B.map.dispose(),B.map=new pi(r.x,r.y,ae),B.map.texture.name=$.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const ie=B.getViewportCount();for(let ae=0;ae<ie;ae++){const le=B.getViewport(ae);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),j.viewport(a),B.updateMatrices($,ae),i=B.getFrustum(),T(w,re,B.camera,$,this.type)}B.isPointLightShadow!==!0&&this.type===En&&b(B,re),B.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(y,A,Z)};function b(C,w){const re=e.update(M);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pi(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(w,null,re,d,M,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(w,null,re,m,M,null)}function E(C,w,re,y){let A=null;const Z=re.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(Z!==void 0)A=Z;else if(A=re.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const j=A.uuid,ce=w.uuid;let D=c[j];D===void 0&&(D={},c[j]=D);let H=D[ce];H===void 0&&(H=A.clone(),D[ce]=H,w.addEventListener("dispose",U)),A=H}if(A.visible=w.visible,A.wireframe=w.wireframe,y===En?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:f[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,re.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const j=n.properties.get(A);j.light=re}return A}function T(C,w,re,y,A){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&A===En)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,C.matrixWorld);const ce=e.update(C),D=C.material;if(Array.isArray(D)){const H=ce.groups;for(let X=0,$=H.length;X<$;X++){const B=H[X],Q=D[B.materialIndex];if(Q&&Q.visible){const ie=E(C,Q,y,A);C.onBeforeShadow(n,C,w,re,ce,ie,B),n.renderBufferDirect(re,null,ce,ie,C,B),C.onAfterShadow(n,C,w,re,ce,ie,B)}}}else if(D.visible){const H=E(C,D,y,A);C.onBeforeShadow(n,C,w,re,ce,H,null),n.renderBufferDirect(re,null,ce,H,C,null),C.onAfterShadow(n,C,w,re,ce,H,null)}}const j=C.children;for(let ce=0,D=j.length;ce<D;ce++)T(j[ce],w,re,y,A)}function U(C){C.target.removeEventListener("dispose",U);for(const re in c){const y=c[re],A=C.target.uuid;A in y&&(y[A].dispose(),delete y[A])}}}function Qx(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const me=new gt;let _e=null;const Le=new gt(0,0,0,0);return{setMask:function(Re){_e!==Re&&!L&&(n.colorMask(Re,Re,Re,Re),_e=Re)},setLocked:function(Re){L=Re},setClear:function(Re,Ze,Je,ht,Tt){Tt===!0&&(Re*=ht,Ze*=ht,Je*=ht),me.set(Re,Ze,Je,ht),Le.equals(me)===!1&&(n.clearColor(Re,Ze,Je,ht),Le.copy(me))},reset:function(){L=!1,_e=null,Le.set(-1,0,0,0)}}}function s(){let L=!1,me=null,_e=null,Le=null;return{setTest:function(Re){Re?Ue(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(Re){me!==Re&&!L&&(n.depthMask(Re),me=Re)},setFunc:function(Re){if(_e!==Re){switch(Re){case xp:n.depthFunc(n.NEVER);break;case Mp:n.depthFunc(n.ALWAYS);break;case Sp:n.depthFunc(n.LESS);break;case _s:n.depthFunc(n.LEQUAL);break;case Ep:n.depthFunc(n.EQUAL);break;case yp:n.depthFunc(n.GEQUAL);break;case Tp:n.depthFunc(n.GREATER);break;case bp:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=Re}},setLocked:function(Re){L=Re},setClear:function(Re){Le!==Re&&(n.clearDepth(Re),Le=Re)},reset:function(){L=!1,me=null,_e=null,Le=null}}}function a(){let L=!1,me=null,_e=null,Le=null,Re=null,Ze=null,Je=null,ht=null,Tt=null;return{setTest:function(Qe){L||(Qe?Ue(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(Qe){me!==Qe&&!L&&(n.stencilMask(Qe),me=Qe)},setFunc:function(Qe,bt,an){(_e!==Qe||Le!==bt||Re!==an)&&(n.stencilFunc(Qe,bt,an),_e=Qe,Le=bt,Re=an)},setOp:function(Qe,bt,an){(Ze!==Qe||Je!==bt||ht!==an)&&(n.stencilOp(Qe,bt,an),Ze=Qe,Je=bt,ht=an)},setLocked:function(Qe){L=Qe},setClear:function(Qe){Tt!==Qe&&(n.clearStencil(Qe),Tt=Qe)},reset:function(){L=!1,me=null,_e=null,Le=null,Re=null,Ze=null,Je=null,ht=null,Tt=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,f=new WeakMap;let d={},m={},x=new WeakMap,M=[],p=null,h=!1,b=null,E=null,T=null,U=null,C=null,w=null,re=null,y=new Xe(0,0,0),A=0,Z=!1,j=null,ce=null,D=null,H=null,X=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Q=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ie)[1]),B=Q>=1):ie.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),B=Q>=2);let ae=null,le={};const K=n.getParameter(n.SCISSOR_BOX),oe=n.getParameter(n.VIEWPORT),ge=new gt().fromArray(K),xe=new gt().fromArray(oe);function Me(L,me,_e,Le){const Re=new Uint8Array(4),Ze=n.createTexture();n.bindTexture(L,Ze),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Je=0;Je<_e;Je++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(me,0,n.RGBA,1,1,Le,0,n.RGBA,n.UNSIGNED_BYTE,Re):n.texImage2D(me+Je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Re);return Ze}const we={};we[n.TEXTURE_2D]=Me(n.TEXTURE_2D,n.TEXTURE_2D,1),we[n.TEXTURE_CUBE_MAP]=Me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(we[n.TEXTURE_2D_ARRAY]=Me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),we[n.TEXTURE_3D]=Me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(n.DEPTH_TEST),l.setFunc(_s),ee(!1),v(fl),Ue(n.CULL_FACE),O(Xn);function Ue(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Te(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function ke(L,me){return m[L]!==me?(n.bindFramebuffer(L,me),m[L]=me,i&&(L===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=me),L===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=me)),!0):!1}function g(L,me){let _e=M,Le=!1;if(L)if(_e=x.get(me),_e===void 0&&(_e=[],x.set(me,_e)),L.isWebGLMultipleRenderTargets){const Re=L.texture;if(_e.length!==Re.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let Ze=0,Je=Re.length;Ze<Je;Ze++)_e[Ze]=n.COLOR_ATTACHMENT0+Ze;_e.length=Re.length,Le=!0}}else _e[0]!==n.COLOR_ATTACHMENT0&&(_e[0]=n.COLOR_ATTACHMENT0,Le=!0);else _e[0]!==n.BACK&&(_e[0]=n.BACK,Le=!0);Le&&(t.isWebGL2?n.drawBuffers(_e):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(_e))}function P(L){return p!==L?(n.useProgram(L),p=L,!0):!1}const I={[ai]:n.FUNC_ADD,[rp]:n.FUNC_SUBTRACT,[sp]:n.FUNC_REVERSE_SUBTRACT};if(i)I[ml]=n.MIN,I[_l]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(I[ml]=L.MIN_EXT,I[_l]=L.MAX_EXT)}const q={[op]:n.ZERO,[ap]:n.ONE,[lp]:n.SRC_COLOR,[Wo]:n.SRC_ALPHA,[pp]:n.SRC_ALPHA_SATURATE,[hp]:n.DST_COLOR,[up]:n.DST_ALPHA,[cp]:n.ONE_MINUS_SRC_COLOR,[ko]:n.ONE_MINUS_SRC_ALPHA,[dp]:n.ONE_MINUS_DST_COLOR,[fp]:n.ONE_MINUS_DST_ALPHA,[mp]:n.CONSTANT_COLOR,[_p]:n.ONE_MINUS_CONSTANT_COLOR,[gp]:n.CONSTANT_ALPHA,[vp]:n.ONE_MINUS_CONSTANT_ALPHA};function O(L,me,_e,Le,Re,Ze,Je,ht,Tt,Qe){if(L===Xn){h===!0&&(Te(n.BLEND),h=!1);return}if(h===!1&&(Ue(n.BLEND),h=!0),L!==ip){if(L!==b||Qe!==Z){if((E!==ai||C!==ai)&&(n.blendEquation(n.FUNC_ADD),E=ai,C=ai),Qe)switch(L){case Gi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.ONE,n.ONE);break;case dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Gi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,U=null,w=null,re=null,y.set(0,0,0),A=0,b=L,Z=Qe}return}Re=Re||me,Ze=Ze||_e,Je=Je||Le,(me!==E||Re!==C)&&(n.blendEquationSeparate(I[me],I[Re]),E=me,C=Re),(_e!==T||Le!==U||Ze!==w||Je!==re)&&(n.blendFuncSeparate(q[_e],q[Le],q[Ze],q[Je]),T=_e,U=Le,w=Ze,re=Je),(ht.equals(y)===!1||Tt!==A)&&(n.blendColor(ht.r,ht.g,ht.b,Tt),y.copy(ht),A=Tt),b=L,Z=!1}function J(L,me){L.side===An?Te(n.CULL_FACE):Ue(n.CULL_FACE);let _e=L.side===Ot;me&&(_e=!_e),ee(_e),L.blending===Gi&&L.transparent===!1?O(Xn):O(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Le=L.stencilWrite;c.setTest(Le),Le&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),R(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ue(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function ee(L){j!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),j=L)}function v(L){L!==ep?(Ue(n.CULL_FACE),L!==ce&&(L===fl?n.cullFace(n.BACK):L===tp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),ce=L}function _(L){L!==D&&(B&&n.lineWidth(L),D=L)}function R(L,me,_e){L?(Ue(n.POLYGON_OFFSET_FILL),(H!==me||X!==_e)&&(n.polygonOffset(me,_e),H=me,X=_e)):Te(n.POLYGON_OFFSET_FILL)}function G(L){L?Ue(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function N(L){L===void 0&&(L=n.TEXTURE0+$-1),ae!==L&&(n.activeTexture(L),ae=L)}function z(L,me,_e){_e===void 0&&(ae===null?_e=n.TEXTURE0+$-1:_e=ae);let Le=le[_e];Le===void 0&&(Le={type:void 0,texture:void 0},le[_e]=Le),(Le.type!==L||Le.texture!==me)&&(ae!==_e&&(n.activeTexture(_e),ae=_e),n.bindTexture(L,me||we[L]),Le.type=L,Le.texture=me)}function se(){const L=le[ae];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ne(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(L){ge.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ge.copy(L))}function qe(L){xe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),xe.copy(L))}function nt(L,me){let _e=f.get(me);_e===void 0&&(_e=new WeakMap,f.set(me,_e));let Le=_e.get(L);Le===void 0&&(Le=n.getUniformBlockIndex(me,L.name),_e.set(L,Le))}function Ge(L,me){const Le=f.get(me).get(L);u.get(me)!==Le&&(n.uniformBlockBinding(me,Le,L.__bindingPointIndex),u.set(me,Le))}function fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ae=null,le={},m={},x=new WeakMap,M=[],p=null,h=!1,b=null,E=null,T=null,U=null,C=null,w=null,re=null,y=new Xe(0,0,0),A=0,Z=!1,j=null,ce=null,D=null,H=null,X=null,ge.set(0,0,n.canvas.width,n.canvas.height),xe.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:Te,bindFramebuffer:ke,drawBuffers:g,useProgram:P,setBlending:O,setMaterial:J,setFlipSided:ee,setCullFace:v,setLineWidth:_,setPolygonOffset:R,setScissorTest:G,activeTexture:N,bindTexture:z,unbindTexture:se,compressedTexImage2D:ne,compressedTexImage3D:ue,texImage2D:ye,texImage3D:pe,updateUBOMapping:nt,uniformBlockBinding:Ge,texStorage2D:Ce,texStorage3D:Ae,texSubImage2D:de,texSubImage3D:Ee,compressedTexSubImage2D:te,compressedTexSubImage3D:ze,scissor:be,viewport:qe,reset:fe}}function e0(n,e,t,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(v,_){return m?new OffscreenCanvas(v,_):Ss("canvas")}function M(v,_,R,G){let N=1;if((v.width>G||v.height>G)&&(N=G/Math.max(v.width,v.height)),N<1||_===!0)if(typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&v instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&v instanceof ImageBitmap){const z=_?Zo:Math.floor,se=z(N*v.width),ne=z(N*v.height);f===void 0&&(f=x(se,ne));const ue=R?x(se,ne):f;return ue.width=se,ue.height=ne,ue.getContext("2d").drawImage(v,0,0,se,ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+v.width+"x"+v.height+") to ("+se+"x"+ne+")."),ue}else return"data"in v&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+v.width+"x"+v.height+")."),v;return v}function p(v){return ql(v.width)&&ql(v.height)}function h(v){return o?!1:v.wrapS!==en||v.wrapT!==en||v.minFilter!==wt&&v.minFilter!==qt}function b(v,_){return v.generateMipmaps&&_&&v.minFilter!==wt&&v.minFilter!==qt}function E(v){n.generateMipmap(v)}function T(v,_,R,G,N=!1){if(o===!1)return _;if(v!==null){if(n[v]!==void 0)return n[v];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let z=_;if(_===n.RED&&(R===n.FLOAT&&(z=n.R32F),R===n.HALF_FLOAT&&(z=n.R16F),R===n.UNSIGNED_BYTE&&(z=n.R8)),_===n.RED_INTEGER&&(R===n.UNSIGNED_BYTE&&(z=n.R8UI),R===n.UNSIGNED_SHORT&&(z=n.R16UI),R===n.UNSIGNED_INT&&(z=n.R32UI),R===n.BYTE&&(z=n.R8I),R===n.SHORT&&(z=n.R16I),R===n.INT&&(z=n.R32I)),_===n.RG&&(R===n.FLOAT&&(z=n.RG32F),R===n.HALF_FLOAT&&(z=n.RG16F),R===n.UNSIGNED_BYTE&&(z=n.RG8)),_===n.RGBA){const se=N?gs:Ke.getTransfer(G);R===n.FLOAT&&(z=n.RGBA32F),R===n.HALF_FLOAT&&(z=n.RGBA16F),R===n.UNSIGNED_BYTE&&(z=se===it?n.SRGB8_ALPHA8:n.RGBA8),R===n.UNSIGNED_SHORT_4_4_4_4&&(z=n.RGBA4),R===n.UNSIGNED_SHORT_5_5_5_1&&(z=n.RGB5_A1)}return(z===n.R16F||z===n.R32F||z===n.RG16F||z===n.RG32F||z===n.RGBA16F||z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function U(v,_,R){return b(v,R)===!0||v.isFramebufferTexture&&v.minFilter!==wt&&v.minFilter!==qt?Math.log2(Math.max(_.width,_.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?_.mipmaps.length:1}function C(v){return v===wt||v===gl||v===Qs?n.NEAREST:n.LINEAR}function w(v){const _=v.target;_.removeEventListener("dispose",w),y(_),_.isVideoTexture&&u.delete(_)}function re(v){const _=v.target;_.removeEventListener("dispose",re),Z(_)}function y(v){const _=i.get(v);if(_.__webglInit===void 0)return;const R=v.source,G=d.get(R);if(G){const N=G[_.__cacheKey];N.usedTimes--,N.usedTimes===0&&A(v),Object.keys(G).length===0&&d.delete(R)}i.remove(v)}function A(v){const _=i.get(v);n.deleteTexture(_.__webglTexture);const R=v.source,G=d.get(R);delete G[_.__cacheKey],a.memory.textures--}function Z(v){const _=v.texture,R=i.get(v),G=i.get(_);if(G.__webglTexture!==void 0&&(n.deleteTexture(G.__webglTexture),a.memory.textures--),v.depthTexture&&v.depthTexture.dispose(),v.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(R.__webglFramebuffer[N]))for(let z=0;z<R.__webglFramebuffer[N].length;z++)n.deleteFramebuffer(R.__webglFramebuffer[N][z]);else n.deleteFramebuffer(R.__webglFramebuffer[N]);R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer[N])}else{if(Array.isArray(R.__webglFramebuffer))for(let N=0;N<R.__webglFramebuffer.length;N++)n.deleteFramebuffer(R.__webglFramebuffer[N]);else n.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&n.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let N=0;N<R.__webglColorRenderbuffer.length;N++)R.__webglColorRenderbuffer[N]&&n.deleteRenderbuffer(R.__webglColorRenderbuffer[N]);R.__webglDepthRenderbuffer&&n.deleteRenderbuffer(R.__webglDepthRenderbuffer)}if(v.isWebGLMultipleRenderTargets)for(let N=0,z=_.length;N<z;N++){const se=i.get(_[N]);se.__webglTexture&&(n.deleteTexture(se.__webglTexture),a.memory.textures--),i.remove(_[N])}i.remove(_),i.remove(v)}let j=0;function ce(){j=0}function D(){const v=j;return v>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+r.maxTextures),j+=1,v}function H(v){const _=[];return _.push(v.wrapS),_.push(v.wrapT),_.push(v.wrapR||0),_.push(v.magFilter),_.push(v.minFilter),_.push(v.anisotropy),_.push(v.internalFormat),_.push(v.format),_.push(v.type),_.push(v.generateMipmaps),_.push(v.premultiplyAlpha),_.push(v.flipY),_.push(v.unpackAlignment),_.push(v.colorSpace),_.join()}function X(v,_){const R=i.get(v);if(v.isVideoTexture&&J(v),v.isRenderTargetTexture===!1&&v.version>0&&R.__version!==v.version){const G=v.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ge(R,v,_);return}}t.bindTexture(n.TEXTURE_2D,R.__webglTexture,n.TEXTURE0+_)}function $(v,_){const R=i.get(v);if(v.version>0&&R.__version!==v.version){ge(R,v,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,R.__webglTexture,n.TEXTURE0+_)}function B(v,_){const R=i.get(v);if(v.version>0&&R.__version!==v.version){ge(R,v,_);return}t.bindTexture(n.TEXTURE_3D,R.__webglTexture,n.TEXTURE0+_)}function Q(v,_){const R=i.get(v);if(v.version>0&&R.__version!==v.version){xe(R,v,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+_)}const ie={[Yo]:n.REPEAT,[en]:n.CLAMP_TO_EDGE,[jo]:n.MIRRORED_REPEAT},ae={[wt]:n.NEAREST,[gl]:n.NEAREST_MIPMAP_NEAREST,[Qs]:n.NEAREST_MIPMAP_LINEAR,[qt]:n.LINEAR,[Ip]:n.LINEAR_MIPMAP_NEAREST,[Sr]:n.LINEAR_MIPMAP_LINEAR},le={[Yp]:n.NEVER,[Qp]:n.ALWAYS,[jp]:n.LESS,[Ku]:n.LEQUAL,[Kp]:n.EQUAL,[Jp]:n.GEQUAL,[$p]:n.GREATER,[Zp]:n.NOTEQUAL};function K(v,_,R){if(R?(n.texParameteri(v,n.TEXTURE_WRAP_S,ie[_.wrapS]),n.texParameteri(v,n.TEXTURE_WRAP_T,ie[_.wrapT]),(v===n.TEXTURE_3D||v===n.TEXTURE_2D_ARRAY)&&n.texParameteri(v,n.TEXTURE_WRAP_R,ie[_.wrapR]),n.texParameteri(v,n.TEXTURE_MAG_FILTER,ae[_.magFilter]),n.texParameteri(v,n.TEXTURE_MIN_FILTER,ae[_.minFilter])):(n.texParameteri(v,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(v,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(v===n.TEXTURE_3D||v===n.TEXTURE_2D_ARRAY)&&n.texParameteri(v,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==en||_.wrapT!==en)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(v,n.TEXTURE_MAG_FILTER,C(_.magFilter)),n.texParameteri(v,n.TEXTURE_MIN_FILTER,C(_.minFilter)),_.minFilter!==wt&&_.minFilter!==qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(v,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(v,n.TEXTURE_COMPARE_FUNC,le[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const G=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===wt||_.minFilter!==Qs&&_.minFilter!==Sr||_.type===Vn&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===Er&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||i.get(_).__currentAnisotropy)&&(n.texParameterf(v,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy)}}function oe(v,_){let R=!1;v.__webglInit===void 0&&(v.__webglInit=!0,_.addEventListener("dispose",w));const G=_.source;let N=d.get(G);N===void 0&&(N={},d.set(G,N));const z=H(_);if(z!==v.__cacheKey){N[z]===void 0&&(N[z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,R=!0),N[z].usedTimes++;const se=N[v.__cacheKey];se!==void 0&&(N[v.__cacheKey].usedTimes--,se.usedTimes===0&&A(_)),v.__cacheKey=z,v.__webglTexture=N[z].texture}return R}function ge(v,_,R){let G=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=n.TEXTURE_3D);const N=oe(v,_),z=_.source;t.bindTexture(G,v.__webglTexture,n.TEXTURE0+R);const se=i.get(z);if(z.version!==se.__version||N===!0){t.activeTexture(n.TEXTURE0+R);const ne=Ke.getPrimaries(Ke.workingColorSpace),ue=_.colorSpace===jt?null:Ke.getPrimaries(_.colorSpace),de=_.colorSpace===jt||ne===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Ee=h(_)&&p(_.image)===!1;let te=M(_.image,Ee,!1,r.maxTextureSize);te=ee(_,te);const ze=p(te)||o,Ce=s.convert(_.format,_.colorSpace);let Ae=s.convert(_.type),ye=T(_.internalFormat,Ce,Ae,_.colorSpace,_.isVideoTexture);K(G,_,ze);let pe;const be=_.mipmaps,qe=o&&_.isVideoTexture!==!0&&ye!==Yu,nt=se.__version===void 0||N===!0,Ge=U(_,te,ze);if(_.isDepthTexture)ye=n.DEPTH_COMPONENT,o?_.type===Vn?ye=n.DEPTH_COMPONENT32F:_.type===Gn?ye=n.DEPTH_COMPONENT24:_.type===ui?ye=n.DEPTH24_STENCIL8:ye=n.DEPTH_COMPONENT16:_.type===Vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===fi&&ye===n.DEPTH_COMPONENT&&_.type!==ya&&_.type!==Gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=Gn,Ae=s.convert(_.type)),_.format===Yi&&ye===n.DEPTH_COMPONENT&&(ye=n.DEPTH_STENCIL,_.type!==ui&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=ui,Ae=s.convert(_.type))),nt&&(qe?t.texStorage2D(n.TEXTURE_2D,1,ye,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ye,te.width,te.height,0,Ce,Ae,null));else if(_.isDataTexture)if(be.length>0&&ze){qe&&nt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,be[0].width,be[0].height);for(let fe=0,L=be.length;fe<L;fe++)pe=be[fe],qe?t.texSubImage2D(n.TEXTURE_2D,fe,0,0,pe.width,pe.height,Ce,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,fe,ye,pe.width,pe.height,0,Ce,Ae,pe.data);_.generateMipmaps=!1}else qe?(nt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,te.width,te.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,te.width,te.height,Ce,Ae,te.data)):t.texImage2D(n.TEXTURE_2D,0,ye,te.width,te.height,0,Ce,Ae,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){qe&&nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,be[0].width,be[0].height,te.depth);for(let fe=0,L=be.length;fe<L;fe++)pe=be[fe],_.format!==tn?Ce!==null?qe?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,pe.width,pe.height,te.depth,Ce,pe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,ye,pe.width,pe.height,te.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,pe.width,pe.height,te.depth,Ce,Ae,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,ye,pe.width,pe.height,te.depth,0,Ce,Ae,pe.data)}else{qe&&nt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,be[0].width,be[0].height);for(let fe=0,L=be.length;fe<L;fe++)pe=be[fe],_.format!==tn?Ce!==null?qe?t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,pe.width,pe.height,Ce,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(n.TEXTURE_2D,fe,0,0,pe.width,pe.height,Ce,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,fe,ye,pe.width,pe.height,0,Ce,Ae,pe.data)}else if(_.isDataArrayTexture)qe?(nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,te.width,te.height,te.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Ce,Ae,te.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ye,te.width,te.height,te.depth,0,Ce,Ae,te.data);else if(_.isData3DTexture)qe?(nt&&t.texStorage3D(n.TEXTURE_3D,Ge,ye,te.width,te.height,te.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Ce,Ae,te.data)):t.texImage3D(n.TEXTURE_3D,0,ye,te.width,te.height,te.depth,0,Ce,Ae,te.data);else if(_.isFramebufferTexture){if(nt)if(qe)t.texStorage2D(n.TEXTURE_2D,Ge,ye,te.width,te.height);else{let fe=te.width,L=te.height;for(let me=0;me<Ge;me++)t.texImage2D(n.TEXTURE_2D,me,ye,fe,L,0,Ce,Ae,null),fe>>=1,L>>=1}}else if(be.length>0&&ze){qe&&nt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,be[0].width,be[0].height);for(let fe=0,L=be.length;fe<L;fe++)pe=be[fe],qe?t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Ce,Ae,pe):t.texImage2D(n.TEXTURE_2D,fe,ye,Ce,Ae,pe);_.generateMipmaps=!1}else qe?(nt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,te.width,te.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ce,Ae,te)):t.texImage2D(n.TEXTURE_2D,0,ye,Ce,Ae,te);b(_,ze)&&E(G),se.__version=z.version,_.onUpdate&&_.onUpdate(_)}v.__version=_.version}function xe(v,_,R){if(_.image.length!==6)return;const G=oe(v,_),N=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,v.__webglTexture,n.TEXTURE0+R);const z=i.get(N);if(N.version!==z.__version||G===!0){t.activeTexture(n.TEXTURE0+R);const se=Ke.getPrimaries(Ke.workingColorSpace),ne=_.colorSpace===jt?null:Ke.getPrimaries(_.colorSpace),ue=_.colorSpace===jt||se===ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const de=_.isCompressedTexture||_.image[0].isCompressedTexture,Ee=_.image[0]&&_.image[0].isDataTexture,te=[];for(let fe=0;fe<6;fe++)!de&&!Ee?te[fe]=M(_.image[fe],!1,!0,r.maxCubemapSize):te[fe]=Ee?_.image[fe].image:_.image[fe],te[fe]=ee(_,te[fe]);const ze=te[0],Ce=p(ze)||o,Ae=s.convert(_.format,_.colorSpace),ye=s.convert(_.type),pe=T(_.internalFormat,Ae,ye,_.colorSpace),be=o&&_.isVideoTexture!==!0,qe=z.__version===void 0||G===!0;let nt=U(_,ze,Ce);K(n.TEXTURE_CUBE_MAP,_,Ce);let Ge;if(de){be&&qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,nt,pe,ze.width,ze.height);for(let fe=0;fe<6;fe++){Ge=te[fe].mipmaps;for(let L=0;L<Ge.length;L++){const me=Ge[L];_.format!==tn?Ae!==null?be?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L,0,0,me.width,me.height,Ae,me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L,pe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L,0,0,me.width,me.height,Ae,ye,me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L,pe,me.width,me.height,0,Ae,ye,me.data)}}}else{Ge=_.mipmaps,be&&qe&&(Ge.length>0&&nt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,nt,pe,te[0].width,te[0].height));for(let fe=0;fe<6;fe++)if(Ee){be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,te[fe].width,te[fe].height,Ae,ye,te[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pe,te[fe].width,te[fe].height,0,Ae,ye,te[fe].data);for(let L=0;L<Ge.length;L++){const _e=Ge[L].image[fe].image;be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L+1,0,0,_e.width,_e.height,Ae,ye,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L+1,pe,_e.width,_e.height,0,Ae,ye,_e.data)}}else{be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ae,ye,te[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,pe,Ae,ye,te[fe]);for(let L=0;L<Ge.length;L++){const me=Ge[L];be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L+1,0,0,Ae,ye,me.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,L+1,pe,Ae,ye,me.image[fe])}}}b(_,Ce)&&E(n.TEXTURE_CUBE_MAP),z.__version=N.version,_.onUpdate&&_.onUpdate(_)}v.__version=_.version}function Me(v,_,R,G,N,z){const se=s.convert(R.format,R.colorSpace),ne=s.convert(R.type),ue=T(R.internalFormat,se,ne,R.colorSpace);if(!i.get(_).__hasExternalTextures){const Ee=Math.max(1,_.width>>z),te=Math.max(1,_.height>>z);N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?t.texImage3D(N,z,ue,Ee,te,_.depth,0,se,ne,null):t.texImage2D(N,z,ue,Ee,te,0,se,ne,null)}t.bindFramebuffer(n.FRAMEBUFFER,v),O(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,N,i.get(R).__webglTexture,0,q(_)):(N===n.TEXTURE_2D||N>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,N,i.get(R).__webglTexture,z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(v,_,R){if(n.bindRenderbuffer(n.RENDERBUFFER,v),_.depthBuffer&&!_.stencilBuffer){let G=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(R||O(_)){const N=_.depthTexture;N&&N.isDepthTexture&&(N.type===Vn?G=n.DEPTH_COMPONENT32F:N.type===Gn&&(G=n.DEPTH_COMPONENT24));const z=q(_);O(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z,G,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,z,G,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,G,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,v)}else if(_.depthBuffer&&_.stencilBuffer){const G=q(_);R&&O(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,G,n.DEPTH24_STENCIL8,_.width,_.height):O(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,G,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,v)}else{const G=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let N=0;N<G.length;N++){const z=G[N],se=s.convert(z.format,z.colorSpace),ne=s.convert(z.type),ue=T(z.internalFormat,se,ne,z.colorSpace),de=q(_);R&&O(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,ue,_.width,_.height):O(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,ue,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ue,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(v,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,v),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X(_.depthTexture,0);const G=i.get(_.depthTexture).__webglTexture,N=q(_);if(_.depthTexture.format===fi)O(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,G,0,N):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,G,0);else if(_.depthTexture.format===Yi)O(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,G,0,N):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,G,0);else throw new Error("Unknown depthTexture format")}function Te(v){const _=i.get(v),R=v.isWebGLCubeRenderTarget===!0;if(v.depthTexture&&!_.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");Ue(_.__webglFramebuffer,v)}else if(R){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]=n.createRenderbuffer(),we(_.__webglDepthbuffer[G],v,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),we(_.__webglDepthbuffer,v,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(v,_,R){const G=i.get(v);_!==void 0&&Me(G.__webglFramebuffer,v,v.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),R!==void 0&&Te(v)}function g(v){const _=v.texture,R=i.get(v),G=i.get(_);v.addEventListener("dispose",re),v.isWebGLMultipleRenderTargets!==!0&&(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=_.version,a.memory.textures++);const N=v.isWebGLCubeRenderTarget===!0,z=v.isWebGLMultipleRenderTargets===!0,se=p(v)||o;if(N){R.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(o&&_.mipmaps&&_.mipmaps.length>0){R.__webglFramebuffer[ne]=[];for(let ue=0;ue<_.mipmaps.length;ue++)R.__webglFramebuffer[ne][ue]=n.createFramebuffer()}else R.__webglFramebuffer[ne]=n.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){R.__webglFramebuffer=[];for(let ne=0;ne<_.mipmaps.length;ne++)R.__webglFramebuffer[ne]=n.createFramebuffer()}else R.__webglFramebuffer=n.createFramebuffer();if(z)if(r.drawBuffers){const ne=v.texture;for(let ue=0,de=ne.length;ue<de;ue++){const Ee=i.get(ne[ue]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&v.samples>0&&O(v)===!1){const ne=z?_:[_];R.__webglMultisampledFramebuffer=n.createFramebuffer(),R.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let ue=0;ue<ne.length;ue++){const de=ne[ue];R.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,R.__webglColorRenderbuffer[ue]);const Ee=s.convert(de.format,de.colorSpace),te=s.convert(de.type),ze=T(de.internalFormat,Ee,te,de.colorSpace,v.isXRRenderTarget===!0),Ce=q(v);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,ze,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,R.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),v.depthBuffer&&(R.__webglDepthRenderbuffer=n.createRenderbuffer(),we(R.__webglDepthRenderbuffer,v,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(N){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),K(n.TEXTURE_CUBE_MAP,_,se);for(let ne=0;ne<6;ne++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)Me(R.__webglFramebuffer[ne][ue],v,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ue);else Me(R.__webglFramebuffer[ne],v,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);b(_,se)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(z){const ne=v.texture;for(let ue=0,de=ne.length;ue<de;ue++){const Ee=ne[ue],te=i.get(Ee);t.bindTexture(n.TEXTURE_2D,te.__webglTexture),K(n.TEXTURE_2D,Ee,se),Me(R.__webglFramebuffer,v,Ee,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),b(Ee,se)&&E(n.TEXTURE_2D)}t.unbindTexture()}else{let ne=n.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(o?ne=v.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ne,G.__webglTexture),K(ne,_,se),o&&_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)Me(R.__webglFramebuffer[ue],v,_,n.COLOR_ATTACHMENT0,ne,ue);else Me(R.__webglFramebuffer,v,_,n.COLOR_ATTACHMENT0,ne,0);b(_,se)&&E(ne),t.unbindTexture()}v.depthBuffer&&Te(v)}function P(v){const _=p(v)||o,R=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let G=0,N=R.length;G<N;G++){const z=R[G];if(b(z,_)){const se=v.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ne=i.get(z).__webglTexture;t.bindTexture(se,ne),E(se),t.unbindTexture()}}}function I(v){if(o&&v.samples>0&&O(v)===!1){const _=v.isWebGLMultipleRenderTargets?v.texture:[v.texture],R=v.width,G=v.height;let N=n.COLOR_BUFFER_BIT;const z=[],se=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=i.get(v),ue=v.isWebGLMultipleRenderTargets===!0;if(ue)for(let de=0;de<_.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let de=0;de<_.length;de++){z.push(n.COLOR_ATTACHMENT0+de),v.depthBuffer&&z.push(se);const Ee=ne.__ignoreDepthValues!==void 0?ne.__ignoreDepthValues:!1;if(Ee===!1&&(v.depthBuffer&&(N|=n.DEPTH_BUFFER_BIT),v.stencilBuffer&&(N|=n.STENCIL_BUFFER_BIT)),ue&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ne.__webglColorRenderbuffer[de]),Ee===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[se]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[se])),ue){const te=i.get(_[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,R,G,0,0,R,G,N,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,z)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let de=0;de<_.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ne.__webglColorRenderbuffer[de]);const Ee=i.get(_[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}}function q(v){return Math.min(r.maxSamples,v.samples)}function O(v){const _=i.get(v);return o&&v.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function J(v){const _=a.render.frame;u.get(v)!==_&&(u.set(v,_),v.update())}function ee(v,_){const R=v.colorSpace,G=v.format,N=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||v.format===Ko||R!==Ln&&R!==jt&&(Ke.getTransfer(R)===it?o===!1?e.has("EXT_sRGB")===!0&&G===tn?(v.format=Ko,v.minFilter=qt,v.generateMipmaps=!1):_=Zu.sRGBToLinear(_):(G!==tn||N!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),_}this.allocateTextureUnit=D,this.resetTextureUnits=ce,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=B,this.setTextureCube=Q,this.rebindTextures=ke,this.setupRenderTarget=g,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=O}function t0(n,e,t){const i=t.isWebGL2;function r(s,a=jt){let o;const l=Ke.getTransfer(a);if(s===Yn)return n.UNSIGNED_BYTE;if(s===Vu)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Wu)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Np)return n.BYTE;if(s===Fp)return n.SHORT;if(s===ya)return n.UNSIGNED_SHORT;if(s===Gu)return n.INT;if(s===Gn)return n.UNSIGNED_INT;if(s===Vn)return n.FLOAT;if(s===Er)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Op)return n.ALPHA;if(s===tn)return n.RGBA;if(s===Bp)return n.LUMINANCE;if(s===zp)return n.LUMINANCE_ALPHA;if(s===fi)return n.DEPTH_COMPONENT;if(s===Yi)return n.DEPTH_STENCIL;if(s===Ko)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Hp)return n.RED;if(s===ku)return n.RED_INTEGER;if(s===Gp)return n.RG;if(s===Xu)return n.RG_INTEGER;if(s===qu)return n.RGBA_INTEGER;if(s===eo||s===to||s===no||s===io)if(l===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===eo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===eo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===vl||s===xl||s===Ml||s===Sl)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===vl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===xl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ml)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Sl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yu)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===El||s===yl)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===El)return l===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===yl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Tl||s===bl||s===Al||s===Rl||s===wl||s===Cl||s===Pl||s===Ll||s===Dl||s===Ul||s===Il||s===Nl||s===Fl||s===Ol)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Tl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===bl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Al)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Rl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Cl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Pl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ll)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Dl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ul)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Il)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Nl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Fl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ol)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ro||s===Bl||s===zl)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ro)return l===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Bl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===zl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Vp||s===Hl||s===Gl||s===Vl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ro)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Hl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Gl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Vl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ui?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class n0 extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class is extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const i0={type:"move"};class Po{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new is,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new is,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new is,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,i),h=this._getHandJoint(c,M);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,x=.005;c.inputState.pinching&&d>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(i0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new is;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class r0 extends Ki{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,m=null,x=null;const M=t.getContextAttributes();let p=null,h=null;const b=[],E=[],T=new $e;let U=null;const C=new Yt;C.layers.enable(1),C.viewport=new gt;const w=new Yt;w.layers.enable(2),w.viewport=new gt;const re=[C,w],y=new n0;y.layers.enable(1),y.layers.enable(2);let A=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let oe=b[K];return oe===void 0&&(oe=new Po,b[K]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(K){let oe=b[K];return oe===void 0&&(oe=new Po,b[K]=oe),oe.getGripSpace()},this.getHand=function(K){let oe=b[K];return oe===void 0&&(oe=new Po,b[K]=oe),oe.getHandSpace()};function j(K){const oe=E.indexOf(K.inputSource);if(oe===-1)return;const ge=b[oe];ge!==void 0&&(ge.update(K.inputSource,K.frame,c||a),ge.dispatchEvent({type:K.type,data:K.inputSource}))}function ce(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",ce),r.removeEventListener("inputsourceschange",D);for(let K=0;K<b.length;K++){const oe=E[K];oe!==null&&(E[K]=null,b[K].disconnect(oe))}A=null,Z=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,h=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",ce),r.addEventListener("inputsourceschange",D),M.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const oe={antialias:r.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),h=new pi(m.framebufferWidth,m.framebufferHeight,{format:tn,type:Yn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let oe=null,ge=null,xe=null;M.depth&&(xe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=M.stencil?Yi:fi,ge=M.stencil?ui:Gn);const Me={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Me),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new pi(d.textureWidth,d.textureHeight,{format:tn,type:Yn,depthTexture:new ff(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const we=e.properties.get(h);we.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(K){for(let oe=0;oe<K.removed.length;oe++){const ge=K.removed[oe],xe=E.indexOf(ge);xe>=0&&(E[xe]=null,b[xe].disconnect(ge))}for(let oe=0;oe<K.added.length;oe++){const ge=K.added[oe];let xe=E.indexOf(ge);if(xe===-1){for(let we=0;we<b.length;we++)if(we>=E.length){E.push(ge),xe=we;break}else if(E[we]===null){E[we]=ge,xe=we;break}if(xe===-1)break}const Me=b[xe];Me&&Me.connect(ge)}}const H=new W,X=new W;function $(K,oe,ge){H.setFromMatrixPosition(oe.matrixWorld),X.setFromMatrixPosition(ge.matrixWorld);const xe=H.distanceTo(X),Me=oe.projectionMatrix.elements,we=ge.projectionMatrix.elements,Ue=Me[14]/(Me[10]-1),Te=Me[14]/(Me[10]+1),ke=(Me[9]+1)/Me[5],g=(Me[9]-1)/Me[5],P=(Me[8]-1)/Me[0],I=(we[8]+1)/we[0],q=Ue*P,O=Ue*I,J=xe/(-P+I),ee=J*-P;oe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ee),K.translateZ(J),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const v=Ue+J,_=Te+J,R=q-ee,G=O+(xe-ee),N=ke*Te/_*v,z=g*Te/_*v;K.projectionMatrix.makePerspective(R,G,N,z,v,_),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function B(K,oe){oe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(oe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;y.near=w.near=C.near=K.near,y.far=w.far=C.far=K.far,(A!==y.near||Z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,Z=y.far);const oe=K.parent,ge=y.cameras;B(y,oe);for(let xe=0;xe<ge.length;xe++)B(ge[xe],oe);ge.length===2?$(y,C,w):y.projectionMatrix.copy(C.projectionMatrix),Q(K,y,oe)};function Q(K,oe,ge){ge===null?K.matrix.copy(oe.matrixWorld):(K.matrix.copy(ge.matrixWorld),K.matrix.invert(),K.matrix.multiply(oe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=$o*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)};let ie=null;function ae(K,oe){if(u=oe.getViewerPose(c||a),x=oe,u!==null){const ge=u.views;m!==null&&(e.setRenderTargetFramebuffer(h,m.framebuffer),e.setRenderTarget(h));let xe=!1;ge.length!==y.cameras.length&&(y.cameras.length=0,xe=!0);for(let Me=0;Me<ge.length;Me++){const we=ge[Me];let Ue=null;if(m!==null)Ue=m.getViewport(we);else{const ke=f.getViewSubImage(d,we);Ue=ke.viewport,Me===0&&(e.setRenderTargetTextures(h,ke.colorTexture,d.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(h))}let Te=re[Me];Te===void 0&&(Te=new Yt,Te.layers.enable(Me),Te.viewport=new gt,re[Me]=Te),Te.matrix.fromArray(we.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(we.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),Me===0&&(y.matrix.copy(Te.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xe===!0&&y.cameras.push(Te)}}for(let ge=0;ge<b.length;ge++){const xe=E[ge],Me=b[ge];xe!==null&&Me!==void 0&&Me.update(xe,oe,c||a)}ie&&ie(K,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),x=null}const le=new uf;le.setAnimationLoop(ae),this.setAnimationLoop=function(K){ie=K},this.dispose=function(){}}}function s0(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,of(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,b,E,T){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,T)):h.isMeshMatcapMaterial?(s(p,h),x(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),M(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,b,E):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ot&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ot&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const b=e.get(h).envMap;if(b&&(p.envMap.value=b,p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap){p.lightMap.value=h.lightMap;const E=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=h.lightMapIntensity*E,t(h.lightMap,p.lightMapTransform)}h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,b,E){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*b,p.scale.value=E*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),e.get(h).envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,b){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ot&&p.clearcoatNormalScale.value.negate())),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,h){h.matcap&&(p.matcap.value=h.matcap)}function M(p,h){const b=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function o0(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,E){const T=E.program;i.uniformBlockBinding(b,T)}function c(b,E){let T=r[b.id];T===void 0&&(x(b),T=u(b),r[b.id]=T,b.addEventListener("dispose",p));const U=E.program;i.updateUBOMapping(b,U);const C=e.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function u(b){const E=f();b.__bindingPointIndex=E;const T=n.createBuffer(),U=b.__size,C=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,U,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,T),T}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const E=r[b.id],T=b.uniforms,U=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,w=T.length;C<w;C++){const re=Array.isArray(T[C])?T[C]:[T[C]];for(let y=0,A=re.length;y<A;y++){const Z=re[y];if(m(Z,C,y,U)===!0){const j=Z.__offset,ce=Array.isArray(Z.value)?Z.value:[Z.value];let D=0;for(let H=0;H<ce.length;H++){const X=ce[H],$=M(X);typeof X=="number"||typeof X=="boolean"?(Z.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,j+D,Z.__data)):X.isMatrix3?(Z.__data[0]=X.elements[0],Z.__data[1]=X.elements[1],Z.__data[2]=X.elements[2],Z.__data[3]=0,Z.__data[4]=X.elements[3],Z.__data[5]=X.elements[4],Z.__data[6]=X.elements[5],Z.__data[7]=0,Z.__data[8]=X.elements[6],Z.__data[9]=X.elements[7],Z.__data[10]=X.elements[8],Z.__data[11]=0):(X.toArray(Z.__data,D),D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,Z.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,E,T,U){const C=b.value,w=E+"_"+T;if(U[w]===void 0)return typeof C=="number"||typeof C=="boolean"?U[w]=C:U[w]=C.clone(),!0;{const re=U[w];if(typeof C=="number"||typeof C=="boolean"){if(re!==C)return U[w]=C,!0}else if(re.equals(C)===!1)return re.copy(C),!0}return!1}function x(b){const E=b.uniforms;let T=0;const U=16;for(let w=0,re=E.length;w<re;w++){const y=Array.isArray(E[w])?E[w]:[E[w]];for(let A=0,Z=y.length;A<Z;A++){const j=y[A],ce=Array.isArray(j.value)?j.value:[j.value];for(let D=0,H=ce.length;D<H;D++){const X=ce[D],$=M(X),B=T%U;B!==0&&U-B<$.boundary&&(T+=U-B),j.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=T,T+=$.storage}}}const C=T%U;return C>0&&(T+=U-C),b.__size=T,b.__cache={},this}function M(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function p(b){const E=b.target;E.removeEventListener("dispose",p);const T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function h(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class gf{constructor(e={}){const{canvas:t=tm(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),x=new Int32Array(4);let M=null,p=null;const h=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_t,this._useLegacyLights=!1,this.toneMapping=qn,this.toneMappingExposure=1;const E=this;let T=!1,U=0,C=0,w=null,re=-1,y=null;const A=new gt,Z=new gt;let j=null;const ce=new Xe(0);let D=0,H=t.width,X=t.height,$=1,B=null,Q=null;const ie=new gt(0,0,H,X),ae=new gt(0,0,H,X);let le=!1;const K=new cf;let oe=!1,ge=!1,xe=null;const Me=new mt,we=new $e,Ue=new W,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ke(){return w===null?$:1}let g=i;function P(S,F){for(let k=0;k<S.length;k++){const Y=S[k],V=t.getContext(Y,F);if(V!==null)return V}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ea}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",me,!1),g===null){const F=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&F.shift(),g=P(F,S),g===null)throw P(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&g instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),g.getShaderPrecisionFormat===void 0&&(g.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let I,q,O,J,ee,v,_,R,G,N,z,se,ne,ue,de,Ee,te,ze,Ce,Ae,ye,pe,be,qe;function nt(){I=new _v(g),q=new cv(g,I,e),I.init(q),pe=new t0(g,I,q),O=new Qx(g,I,q),J=new xv(g),ee=new zx,v=new e0(g,I,O,ee,q,pe,J),_=new fv(E),R=new mv(E),G=new Am(g,q),be=new av(g,I,G,q),N=new gv(g,G,J,be),z=new yv(g,N,G,J),Ce=new Ev(g,q,v),Ee=new uv(ee),se=new Bx(E,_,R,I,q,be,Ee),ne=new s0(E,ee),ue=new Gx,de=new Yx(I,q),ze=new ov(E,_,R,O,z,d,l),te=new Jx(E,z,q),qe=new o0(g,J,q,O),Ae=new lv(g,I,J,q),ye=new vv(g,I,J,q),J.programs=se.programs,E.capabilities=q,E.extensions=I,E.properties=ee,E.renderLists=ue,E.shadowMap=te,E.state=O,E.info=J}nt();const Ge=new r0(E,g);this.xr=Ge,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const S=I.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=I.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(H,X,!1))},this.getSize=function(S){return S.set(H,X)},this.setSize=function(S,F,k=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=S,X=F,t.width=Math.floor(S*$),t.height=Math.floor(F*$),k===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(H*$,X*$).floor()},this.setDrawingBufferSize=function(S,F,k){H=S,X=F,$=k,t.width=Math.floor(S*k),t.height=Math.floor(F*k),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(ie)},this.setViewport=function(S,F,k,Y){S.isVector4?ie.set(S.x,S.y,S.z,S.w):ie.set(S,F,k,Y),O.viewport(A.copy(ie).multiplyScalar($).floor())},this.getScissor=function(S){return S.copy(ae)},this.setScissor=function(S,F,k,Y){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,F,k,Y),O.scissor(Z.copy(ae).multiplyScalar($).floor())},this.getScissorTest=function(){return le},this.setScissorTest=function(S){O.setScissorTest(le=S)},this.setOpaqueSort=function(S){B=S},this.setTransparentSort=function(S){Q=S},this.getClearColor=function(S){return S.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(S=!0,F=!0,k=!0){let Y=0;if(S){let V=!1;if(w!==null){const ve=w.texture.format;V=ve===qu||ve===Xu||ve===ku}if(V){const ve=w.texture.type,Se=ve===Yn||ve===Gn||ve===ya||ve===ui||ve===Vu||ve===Wu,Pe=ze.getClearColor(),De=ze.getClearAlpha(),He=Pe.r,Ie=Pe.g,Fe=Pe.b;Se?(m[0]=He,m[1]=Ie,m[2]=Fe,m[3]=De,g.clearBufferuiv(g.COLOR,0,m)):(x[0]=He,x[1]=Ie,x[2]=Fe,x[3]=De,g.clearBufferiv(g.COLOR,0,x))}else Y|=g.COLOR_BUFFER_BIT}F&&(Y|=g.DEPTH_BUFFER_BIT),k&&(Y|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",me,!1),ue.dispose(),de.dispose(),ee.dispose(),_.dispose(),R.dispose(),z.dispose(),be.dispose(),qe.dispose(),se.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Tt),Ge.removeEventListener("sessionend",Qe),xe&&(xe.dispose(),xe=null),bt.stop()};function fe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=J.autoReset,F=te.enabled,k=te.autoUpdate,Y=te.needsUpdate,V=te.type;nt(),J.autoReset=S,te.enabled=F,te.autoUpdate=k,te.needsUpdate=Y,te.type=V}function me(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function _e(S){const F=S.target;F.removeEventListener("dispose",_e),Le(F)}function Le(S){Re(S),ee.remove(S)}function Re(S){const F=ee.get(S).programs;F!==void 0&&(F.forEach(function(k){se.releaseProgram(k)}),S.isShaderMaterial&&se.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,k,Y,V,ve){F===null&&(F=Te);const Se=V.isMesh&&V.matrixWorld.determinant()<0,Pe=Mf(S,F,k,Y,V);O.setMaterial(Y,Se);let De=k.index,He=1;if(Y.wireframe===!0){if(De=N.getWireframeAttribute(k),De===void 0)return;He=2}const Ie=k.drawRange,Fe=k.attributes.position;let at=Ie.start*He,Bt=(Ie.start+Ie.count)*He;ve!==null&&(at=Math.max(at,ve.start*He),Bt=Math.min(Bt,(ve.start+ve.count)*He)),De!==null?(at=Math.max(at,0),Bt=Math.min(Bt,De.count)):Fe!=null&&(at=Math.max(at,0),Bt=Math.min(Bt,Fe.count));const dt=Bt-at;if(dt<0||dt===1/0)return;be.setup(V,Y,Pe,k,De);let mn,rt=Ae;if(De!==null&&(mn=G.get(De),rt=ye,rt.setIndex(mn)),V.isMesh)Y.wireframe===!0?(O.setLineWidth(Y.wireframeLinewidth*ke()),rt.setMode(g.LINES)):rt.setMode(g.TRIANGLES);else if(V.isLine){let Ve=Y.linewidth;Ve===void 0&&(Ve=1),O.setLineWidth(Ve*ke()),V.isLineSegments?rt.setMode(g.LINES):V.isLineLoop?rt.setMode(g.LINE_LOOP):rt.setMode(g.LINE_STRIP)}else V.isPoints?rt.setMode(g.POINTS):V.isSprite&&rt.setMode(g.TRIANGLES);if(V.isBatchedMesh)rt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)rt.renderInstances(at,dt,V.count);else if(k.isInstancedBufferGeometry){const Ve=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Os=Math.min(k.instanceCount,Ve);rt.renderInstances(at,dt,Os)}else rt.render(at,dt)};function Ze(S,F,k){S.transparent===!0&&S.side===An&&S.forceSinglePass===!1?(S.side=Ot,S.needsUpdate=!0,Lr(S,F,k),S.side=jn,S.needsUpdate=!0,Lr(S,F,k),S.side=An):Lr(S,F,k)}this.compile=function(S,F,k=null){k===null&&(k=S),p=de.get(k),p.init(),b.push(p),k.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),S!==k&&S.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights(E._useLegacyLights);const Y=new Set;return S.traverse(function(V){const ve=V.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){const Pe=ve[Se];Ze(Pe,k,V),Y.add(Pe)}else Ze(ve,k,V),Y.add(ve)}),b.pop(),p=null,Y},this.compileAsync=function(S,F,k=null){const Y=this.compile(S,F,k);return new Promise(V=>{function ve(){if(Y.forEach(function(Se){ee.get(Se).currentProgram.isReady()&&Y.delete(Se)}),Y.size===0){V(S);return}setTimeout(ve,10)}I.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Je=null;function ht(S){Je&&Je(S)}function Tt(){bt.stop()}function Qe(){bt.start()}const bt=new uf;bt.setAnimationLoop(ht),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(S){Je=S,Ge.setAnimationLoop(S),S===null?bt.stop():bt.start()},Ge.addEventListener("sessionstart",Tt),Ge.addEventListener("sessionend",Qe),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(F),F=Ge.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,F,w),p=de.get(S,b.length),p.init(),b.push(p),Me.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),K.setFromProjectionMatrix(Me),ge=this.localClippingEnabled,oe=Ee.init(this.clippingPlanes,ge),M=ue.get(S,h.length),M.init(),h.push(M),an(S,F,0,E.sortObjects),M.finish(),E.sortObjects===!0&&M.sort(B,Q),this.info.render.frame++,oe===!0&&Ee.beginShadows();const k=p.state.shadowsArray;if(te.render(k,S,F),oe===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(M,S),p.setupLights(E._useLegacyLights),F.isArrayCamera){const Y=F.cameras;for(let V=0,ve=Y.length;V<ve;V++){const Se=Y[V];Ca(M,S,Se,Se.viewport)}}else Ca(M,S,F);w!==null&&(v.updateMultisampleRenderTarget(w),v.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(E,S,F),be.resetDefaultState(),re=-1,y=null,b.pop(),b.length>0?p=b[b.length-1]:p=null,h.pop(),h.length>0?M=h[h.length-1]:M=null};function an(S,F,k,Y){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||K.intersectsSprite(S)){Y&&Ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Me);const Se=z.update(S),Pe=S.material;Pe.visible&&M.push(S,Se,Pe,k,Ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||K.intersectsObject(S))){const Se=z.update(S),Pe=S.material;if(Y&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ue.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ue.copy(Se.boundingSphere.center)),Ue.applyMatrix4(S.matrixWorld).applyMatrix4(Me)),Array.isArray(Pe)){const De=Se.groups;for(let He=0,Ie=De.length;He<Ie;He++){const Fe=De[He],at=Pe[Fe.materialIndex];at&&at.visible&&M.push(S,Se,at,k,Ue.z,Fe)}}else Pe.visible&&M.push(S,Se,Pe,k,Ue.z,null)}}const ve=S.children;for(let Se=0,Pe=ve.length;Se<Pe;Se++)an(ve[Se],F,k,Y)}function Ca(S,F,k,Y){const V=S.opaque,ve=S.transmissive,Se=S.transparent;p.setupLightsView(k),oe===!0&&Ee.setGlobalState(E.clippingPlanes,k),ve.length>0&&xf(V,ve,F,k),Y&&O.viewport(A.copy(Y)),V.length>0&&Pr(V,F,k),ve.length>0&&Pr(ve,F,k),Se.length>0&&Pr(Se,F,k),O.buffers.depth.setTest(!0),O.buffers.depth.setMask(!0),O.buffers.color.setMask(!0),O.setPolygonOffset(!1)}function xf(S,F,k,Y){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const ve=q.isWebGL2;xe===null&&(xe=new pi(1,1,{generateMipmaps:!0,type:I.has("EXT_color_buffer_half_float")?Er:Yn,minFilter:Sr,samples:ve?4:0})),E.getDrawingBufferSize(we),ve?xe.setSize(we.x,we.y):xe.setSize(Zo(we.x),Zo(we.y));const Se=E.getRenderTarget();E.setRenderTarget(xe),E.getClearColor(ce),D=E.getClearAlpha(),D<1&&E.setClearColor(16777215,.5),E.clear();const Pe=E.toneMapping;E.toneMapping=qn,Pr(S,k,Y),v.updateMultisampleRenderTarget(xe),v.updateRenderTargetMipmap(xe);let De=!1;for(let He=0,Ie=F.length;He<Ie;He++){const Fe=F[He],at=Fe.object,Bt=Fe.geometry,dt=Fe.material,mn=Fe.group;if(dt.side===An&&at.layers.test(Y.layers)){const rt=dt.side;dt.side=Ot,dt.needsUpdate=!0,Pa(at,k,Y,Bt,dt,mn),dt.side=rt,dt.needsUpdate=!0,De=!0}}De===!0&&(v.updateMultisampleRenderTarget(xe),v.updateRenderTargetMipmap(xe)),E.setRenderTarget(Se),E.setClearColor(ce,D),E.toneMapping=Pe}function Pr(S,F,k){const Y=F.isScene===!0?F.overrideMaterial:null;for(let V=0,ve=S.length;V<ve;V++){const Se=S[V],Pe=Se.object,De=Se.geometry,He=Y===null?Se.material:Y,Ie=Se.group;Pe.layers.test(k.layers)&&Pa(Pe,F,k,De,He,Ie)}}function Pa(S,F,k,Y,V,ve){S.onBeforeRender(E,F,k,Y,V,ve),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(E,F,k,Y,S,ve),V.transparent===!0&&V.side===An&&V.forceSinglePass===!1?(V.side=Ot,V.needsUpdate=!0,E.renderBufferDirect(k,F,Y,V,S,ve),V.side=jn,V.needsUpdate=!0,E.renderBufferDirect(k,F,Y,V,S,ve),V.side=An):E.renderBufferDirect(k,F,Y,V,S,ve),S.onAfterRender(E,F,k,Y,V,ve)}function Lr(S,F,k){F.isScene!==!0&&(F=Te);const Y=ee.get(S),V=p.state.lights,ve=p.state.shadowsArray,Se=V.state.version,Pe=se.getParameters(S,V.state,ve,F,k),De=se.getProgramCacheKey(Pe);let He=Y.programs;Y.environment=S.isMeshStandardMaterial?F.environment:null,Y.fog=F.fog,Y.envMap=(S.isMeshStandardMaterial?R:_).get(S.envMap||Y.environment),He===void 0&&(S.addEventListener("dispose",_e),He=new Map,Y.programs=He);let Ie=He.get(De);if(Ie!==void 0){if(Y.currentProgram===Ie&&Y.lightsStateVersion===Se)return Da(S,Pe),Ie}else Pe.uniforms=se.getUniforms(S),S.onBuild(k,Pe,E),S.onBeforeCompile(Pe,E),Ie=se.acquireProgram(Pe,De),He.set(De,Ie),Y.uniforms=Pe.uniforms;const Fe=Y.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Fe.clippingPlanes=Ee.uniform),Da(S,Pe),Y.needsLights=Ef(S),Y.lightsStateVersion=Se,Y.needsLights&&(Fe.ambientLightColor.value=V.state.ambient,Fe.lightProbe.value=V.state.probe,Fe.directionalLights.value=V.state.directional,Fe.directionalLightShadows.value=V.state.directionalShadow,Fe.spotLights.value=V.state.spot,Fe.spotLightShadows.value=V.state.spotShadow,Fe.rectAreaLights.value=V.state.rectArea,Fe.ltc_1.value=V.state.rectAreaLTC1,Fe.ltc_2.value=V.state.rectAreaLTC2,Fe.pointLights.value=V.state.point,Fe.pointLightShadows.value=V.state.pointShadow,Fe.hemisphereLights.value=V.state.hemi,Fe.directionalShadowMap.value=V.state.directionalShadowMap,Fe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Fe.spotShadowMap.value=V.state.spotShadowMap,Fe.spotLightMatrix.value=V.state.spotLightMatrix,Fe.spotLightMap.value=V.state.spotLightMap,Fe.pointShadowMap.value=V.state.pointShadowMap,Fe.pointShadowMatrix.value=V.state.pointShadowMatrix),Y.currentProgram=Ie,Y.uniformsList=null,Ie}function La(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=cs.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Da(S,F){const k=ee.get(S);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function Mf(S,F,k,Y,V){F.isScene!==!0&&(F=Te),v.resetTextureUnits();const ve=F.fog,Se=Y.isMeshStandardMaterial?F.environment:null,Pe=w===null?E.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Ln,De=(Y.isMeshStandardMaterial?R:_).get(Y.envMap||Se),He=Y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ie=!!k.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Fe=!!k.morphAttributes.position,at=!!k.morphAttributes.normal,Bt=!!k.morphAttributes.color;let dt=qn;Y.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(dt=E.toneMapping);const mn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,rt=mn!==void 0?mn.length:0,Ve=ee.get(Y),Os=p.state.lights;if(oe===!0&&(ge===!0||S!==y)){const kt=S===y&&Y.id===re;Ee.setState(Y,S,kt)}let ot=!1;Y.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Os.state.version||Ve.outputColorSpace!==Pe||V.isBatchedMesh&&Ve.batching===!1||!V.isBatchedMesh&&Ve.batching===!0||V.isInstancedMesh&&Ve.instancing===!1||!V.isInstancedMesh&&Ve.instancing===!0||V.isSkinnedMesh&&Ve.skinning===!1||!V.isSkinnedMesh&&Ve.skinning===!0||V.isInstancedMesh&&Ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ve.instancingColor===!1&&V.instanceColor!==null||Ve.envMap!==De||Y.fog===!0&&Ve.fog!==ve||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Ee.numPlanes||Ve.numIntersection!==Ee.numIntersection)||Ve.vertexAlphas!==He||Ve.vertexTangents!==Ie||Ve.morphTargets!==Fe||Ve.morphNormals!==at||Ve.morphColors!==Bt||Ve.toneMapping!==dt||q.isWebGL2===!0&&Ve.morphTargetsCount!==rt)&&(ot=!0):(ot=!0,Ve.__version=Y.version);let $n=Ve.currentProgram;ot===!0&&($n=Lr(Y,F,V));let Ua=!1,Zi=!1,Bs=!1;const vt=$n.getUniforms(),Zn=Ve.uniforms;if(O.useProgram($n.program)&&(Ua=!0,Zi=!0,Bs=!0),Y.id!==re&&(re=Y.id,Zi=!0),Ua||y!==S){vt.setValue(g,"projectionMatrix",S.projectionMatrix),vt.setValue(g,"viewMatrix",S.matrixWorldInverse);const kt=vt.map.cameraPosition;kt!==void 0&&kt.setValue(g,Ue.setFromMatrixPosition(S.matrixWorld)),q.logarithmicDepthBuffer&&vt.setValue(g,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&vt.setValue(g,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Zi=!0,Bs=!0)}if(V.isSkinnedMesh){vt.setOptional(g,V,"bindMatrix"),vt.setOptional(g,V,"bindMatrixInverse");const kt=V.skeleton;kt&&(q.floatVertexTextures?(kt.boneTexture===null&&kt.computeBoneTexture(),vt.setValue(g,"boneTexture",kt.boneTexture,v)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(vt.setOptional(g,V,"batchingTexture"),vt.setValue(g,"batchingTexture",V._matricesTexture,v));const zs=k.morphAttributes;if((zs.position!==void 0||zs.normal!==void 0||zs.color!==void 0&&q.isWebGL2===!0)&&Ce.update(V,k,$n),(Zi||Ve.receiveShadow!==V.receiveShadow)&&(Ve.receiveShadow=V.receiveShadow,vt.setValue(g,"receiveShadow",V.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Zn.envMap.value=De,Zn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Zi&&(vt.setValue(g,"toneMappingExposure",E.toneMappingExposure),Ve.needsLights&&Sf(Zn,Bs),ve&&Y.fog===!0&&ne.refreshFogUniforms(Zn,ve),ne.refreshMaterialUniforms(Zn,Y,$,X,xe),cs.upload(g,La(Ve),Zn,v)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(cs.upload(g,La(Ve),Zn,v),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&vt.setValue(g,"center",V.center),vt.setValue(g,"modelViewMatrix",V.modelViewMatrix),vt.setValue(g,"normalMatrix",V.normalMatrix),vt.setValue(g,"modelMatrix",V.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const kt=Y.uniformsGroups;for(let Hs=0,yf=kt.length;Hs<yf;Hs++)if(q.isWebGL2){const Ia=kt[Hs];qe.update(Ia,$n),qe.bind(Ia,$n)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return $n}function Sf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Ef(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,F,k){ee.get(S.texture).__webglTexture=F,ee.get(S.depthTexture).__webglTexture=k;const Y=ee.get(S);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=k===void 0,Y.__autoAllocateDepthBuffer||I.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,F){const k=ee.get(S);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,k=0){w=S,U=F,C=k;let Y=!0,V=null,ve=!1,Se=!1;if(S){const De=ee.get(S);De.__useDefaultFramebuffer!==void 0?(O.bindFramebuffer(g.FRAMEBUFFER,null),Y=!1):De.__webglFramebuffer===void 0?v.setupRenderTarget(S):De.__hasExternalTextures&&v.rebindTextures(S,ee.get(S.texture).__webglTexture,ee.get(S.depthTexture).__webglTexture);const He=S.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Se=!0);const Ie=ee.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?V=Ie[F][k]:V=Ie[F],ve=!0):q.isWebGL2&&S.samples>0&&v.useMultisampledRTT(S)===!1?V=ee.get(S).__webglMultisampledFramebuffer:Array.isArray(Ie)?V=Ie[k]:V=Ie,A.copy(S.viewport),Z.copy(S.scissor),j=S.scissorTest}else A.copy(ie).multiplyScalar($).floor(),Z.copy(ae).multiplyScalar($).floor(),j=le;if(O.bindFramebuffer(g.FRAMEBUFFER,V)&&q.drawBuffers&&Y&&O.drawBuffers(S,V),O.viewport(A),O.scissor(Z),O.setScissorTest(j),ve){const De=ee.get(S.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+F,De.__webglTexture,k)}else if(Se){const De=ee.get(S.texture),He=F||0;g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,De.__webglTexture,k||0,He)}re=-1},this.readRenderTargetPixels=function(S,F,k,Y,V,ve,Se){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Pe=Pe[Se]),Pe){O.bindFramebuffer(g.FRAMEBUFFER,Pe);try{const De=S.texture,He=De.format,Ie=De.type;if(He!==tn&&pe.convert(He)!==g.getParameter(g.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Fe=Ie===Er&&(I.has("EXT_color_buffer_half_float")||q.isWebGL2&&I.has("EXT_color_buffer_float"));if(Ie!==Yn&&pe.convert(Ie)!==g.getParameter(g.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Vn&&(q.isWebGL2||I.has("OES_texture_float")||I.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-Y&&k>=0&&k<=S.height-V&&g.readPixels(F,k,Y,V,pe.convert(He),pe.convert(Ie),ve)}finally{const De=w!==null?ee.get(w).__webglFramebuffer:null;O.bindFramebuffer(g.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(S,F,k=0){const Y=Math.pow(2,-k),V=Math.floor(F.image.width*Y),ve=Math.floor(F.image.height*Y);v.setTexture2D(F,0),g.copyTexSubImage2D(g.TEXTURE_2D,k,0,0,S.x,S.y,V,ve),O.unbindTexture()},this.copyTextureToTexture=function(S,F,k,Y=0){const V=F.image.width,ve=F.image.height,Se=pe.convert(k.format),Pe=pe.convert(k.type);v.setTexture2D(k,0),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,k.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,k.unpackAlignment),F.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,Y,S.x,S.y,V,ve,Se,Pe,F.image.data):F.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,Y,S.x,S.y,F.mipmaps[0].width,F.mipmaps[0].height,Se,F.mipmaps[0].data):g.texSubImage2D(g.TEXTURE_2D,Y,S.x,S.y,Se,Pe,F.image),Y===0&&k.generateMipmaps&&g.generateMipmap(g.TEXTURE_2D),O.unbindTexture()},this.copyTextureToTexture3D=function(S,F,k,Y,V=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=S.max.x-S.min.x+1,Se=S.max.y-S.min.y+1,Pe=S.max.z-S.min.z+1,De=pe.convert(Y.format),He=pe.convert(Y.type);let Ie;if(Y.isData3DTexture)v.setTexture3D(Y,0),Ie=g.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)v.setTexture2DArray(Y,0),Ie=g.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,Y.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,Y.unpackAlignment);const Fe=g.getParameter(g.UNPACK_ROW_LENGTH),at=g.getParameter(g.UNPACK_IMAGE_HEIGHT),Bt=g.getParameter(g.UNPACK_SKIP_PIXELS),dt=g.getParameter(g.UNPACK_SKIP_ROWS),mn=g.getParameter(g.UNPACK_SKIP_IMAGES),rt=k.isCompressedTexture?k.mipmaps[V]:k.image;g.pixelStorei(g.UNPACK_ROW_LENGTH,rt.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,rt.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,S.min.x),g.pixelStorei(g.UNPACK_SKIP_ROWS,S.min.y),g.pixelStorei(g.UNPACK_SKIP_IMAGES,S.min.z),k.isDataTexture||k.isData3DTexture?g.texSubImage3D(Ie,V,F.x,F.y,F.z,ve,Se,Pe,De,He,rt.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),g.compressedTexSubImage3D(Ie,V,F.x,F.y,F.z,ve,Se,Pe,De,rt.data)):g.texSubImage3D(Ie,V,F.x,F.y,F.z,ve,Se,Pe,De,He,rt),g.pixelStorei(g.UNPACK_ROW_LENGTH,Fe),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,at),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Bt),g.pixelStorei(g.UNPACK_SKIP_ROWS,dt),g.pixelStorei(g.UNPACK_SKIP_IMAGES,mn),V===0&&Y.generateMipmaps&&g.generateMipmap(Ie),O.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?v.setTextureCube(S,0):S.isData3DTexture?v.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?v.setTexture2DArray(S,0):v.setTexture2D(S,0),O.unbindTexture()},this.resetState=function(){U=0,C=0,w=null,O.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ta?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Us?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===_t?hi:ju}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===hi?_t:Ln}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class a0 extends gf{}a0.prototype.isWebGL1Renderer=!0;class l0 extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Qo extends wr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lc=new mt,ea=new ef,rs=new Is,ss=new W;class Dc extends Lt{constructor(e=new on,t=new Qo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rs.copy(i.boundingSphere),rs.applyMatrix4(r),rs.radius+=s,e.ray.intersectsSphere(rs)===!1)return;Lc.copy(r).invert(),ea.copy(e.ray).applyMatrix4(Lc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=d,M=m;x<M;x++){const p=c.getX(x);ss.fromBufferAttribute(f,p),Uc(ss,p,l,r,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let x=d,M=m;x<M;x++)ss.fromBufferAttribute(f,x),Uc(ss,x,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Uc(n,e,t,i,r,s,a){const o=ea.distanceSqToPoint(n);if(o<t){const l=new W;ea.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class wa extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new W,d=new W,m=[],x=[],M=[],p=[];for(let h=0;h<=i;h++){const b=[],E=h/i;let T=0;h===0&&a===0?T=.5/t:h===i&&l===Math.PI&&(T=-.5/t);for(let U=0;U<=t;U++){const C=U/t;f.x=-e*Math.cos(r+C*s)*Math.sin(a+E*o),f.y=e*Math.cos(a+E*o),f.z=e*Math.sin(r+C*s)*Math.sin(a+E*o),x.push(f.x,f.y,f.z),d.copy(f).normalize(),M.push(d.x,d.y,d.z),p.push(C+T,1-E),b.push(c++)}u.push(b)}for(let h=0;h<i;h++)for(let b=0;b<t;b++){const E=u[h][b+1],T=u[h][b],U=u[h+1][b],C=u[h+1][b+1];(h!==0||a>0)&&m.push(E,T,C),(h!==i-1||l<Math.PI)&&m.push(T,U,C)}this.setIndex(m),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(M,3)),this.setAttribute("uv",new Ft(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class c0 extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class u0 extends c0{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ea);const vf=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},f0={name:"GlobeThree",setup(){const n=Ba(null);let e,t,i,r,s,a,o=null,l=!1,c=0,u=0,f=0,d=0,m=0,x=0;const M=.95,p=Ba("dark"),h=()=>{p.value=p.value==="dark"?"light":"dark",b()},b=()=>{e&&(e.background=new Xe(p.value==="dark"?"#0a0a0a":"#f5f5f5"),r&&(r.material.color=new Xe(p.value==="dark"?"#1a1a1a":"#e0e0e0")),U())},E=()=>{e=new l0,e.background=new Xe(p.value==="dark"?"#0a0a0a":"#f5f5f5");const j=Math.round(window.innerHeight*.7);t=new Yt(75,1,.1,1e3),t.position.z=3,i=new gf({antialias:!0,alpha:!0}),i.setSize(j,j),i.setPixelRatio(window.devicePixelRatio),n.value.appendChild(i.domElement);const ce=new wa(1,64,64),D=new ba({color:p.value==="dark"?"#1a1a1a":"#e0e0e0",transparent:!0,opacity:.8});r=new wn(ce,D),e.add(r),U();const H=new u0(16777215,.6);e.add(H),i.domElement.addEventListener("mousedown",C),i.domElement.addEventListener("mousemove",w),i.domElement.addEventListener("mouseup",re),i.domElement.addEventListener("wheel",y)},T=j=>{j&&(e.remove(j),j.geometry&&j.geometry.dispose(),j.material&&j.material.dispose())},U=async()=>{try{const ce=await(await fetch("/js/static/globe-points.json")).json();T(s),T(a);const D=[],H=[],X=[],$=[];if(ce.points.forEach(B=>{const Q=B.lon,ae=(90-B.lat)*Math.PI/180,le=(Q+180)*Math.PI/180,K=Math.sin(ae)*Math.cos(le),oe=Math.cos(ae),ge=Math.sin(ae)*Math.sin(le),xe=K*1.01,Me=oe*1.01,we=ge*1.01;B.type==="ocean"?(X.push(xe,Me,we),$.push(.5,.5,.5)):(D.push(xe,Me,we),p.value==="dark"?H.push(1,1,1):H.push(0,0,0))}),D.length){const B=new on;B.setAttribute("position",new Ft(D,3)),B.setAttribute("color",new Ft(H,3));const Q=new Qo({size:.01,vertexColors:!0,transparent:!0,opacity:.8});s=new Dc(B,Q),e.add(s)}if(X.length){const B=new on;B.setAttribute("position",new Ft(X,3)),B.setAttribute("color",new Ft($,3));const Q=new Qo({size:.01,vertexColors:!0,transparent:!0,opacity:.3});a=new Dc(B,Q),e.add(a)}}catch(j){console.error("Error loading points:",j)}},C=j=>{l=!0,c=j.clientX,u=j.clientY},w=j=>{if(!l)return;const ce=j.clientX-c,D=j.clientY-u;m=ce*.01,x=D*.01,c=j.clientX,u=j.clientY},re=()=>{l=!1},y=j=>{const ce=j.deltaY>0?.9:1.1;m*=ce,x*=ce},A=()=>{l||(m*=M,x*=M),d+=m,f+=x,r&&(r.rotation.x=f,r.rotation.y=d),s&&(s.rotation.x=f,s.rotation.y=d),a&&(a.rotation.x=f,a.rotation.y=d),i.render(e,t),o=requestAnimationFrame(A)},Z=()=>{if(!i||!t)return;const j=Math.round(window.innerHeight*.7);i.setSize(j,j),t.aspect=1,t.updateProjectionMatrix()};return du(()=>{E(),A(),window.addEventListener("resize",Z)}),ga(()=>{o&&cancelAnimationFrame(o),i&&i.dispose(),window.removeEventListener("resize",Z)}),{container:n,theme:p,toggleTheme:h}}},h0={class:"controls"},d0={class:"globe-wrapper",ref:"container"};function p0(n,e,t,i,r,s){return Lu(),fd("div",{class:Rs(["globe-container",i.theme])},[pr("div",h0,[pr("button",{onClick:e[0]||(e[0]=(...a)=>i.toggleTheme&&i.toggleTheme(...a)),class:"theme-btn"},Vc(i.theme==="dark"?"☀️":"🌙"),1)]),pr("div",d0,null,512)],2)}const m0=vf(f0,[["render",p0],["__scopeId","data-v-ae0c64fb"]]),_0={name:"App",components:{GlobeThree:m0}};function g0(n,e,t,i,r,s){const a=Lh("GlobeThree");return Lu(),hd(a)}const v0=vf(_0,[["render",g0]]);Zd(v0).mount("#app");
