/*** _jquery-1.9.1.min.js ***/
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

/*** _jquery.autocomplete.js ***/
/**
 * @fileOverview jquery-autocomplete, the jQuery Autocompleter
 * @author <a href="mailto:dylan@dyve.net">Dylan Verheul</a>
 * @requires jQuery 1.6+
 *
 * Copyright 2005-2012, Dylan Verheul
 *
 * Use under either MIT, GPL or Apache 2.0. See LICENSE.txt
 *
 * Project home: https://github.com/dyve/jquery-autocomplete
 */

(function($) {
    "use strict";

    /**
     * jQuery autocomplete plugin
     * @param {object|string} options
     * @returns (object} jQuery object
     */
    $.fn.autocomplete = function(options) {
        var url;
        if (arguments.length > 1) {
            url = options;
            options = arguments[1];
            options.url = url;
        } else if (typeof options === 'string') {
            url = options;
            options = { url: url };
        }
        var opts = $.extend({}, $.fn.autocomplete.defaults, options);
        return this.each(function() {
            var $this = $(this);
            $this.data('autocompleter', new $.Autocompleter(
                $this,
                $.meta ? $.extend({}, opts, $this.data()) : opts
            ));
        });
    };

    /**
     * Store default options
     * @type {object}
     */
    $.fn.autocomplete.defaults = {
        inputClass: 'acInput',
        loadingClass: 'acLoading',
        resultsClass: 'acResults',
        selectClass: 'acSelect',
        queryParamName: 'q',
        limitParamName: 'limit',
        extraParams: {},
        remoteDataType: false,
        lineSeparator: '\n',
        cellSeparator: '|',
        minChars: 2,
        maxItemsToShow: 10,
        delay: 400,
        useCache: true,
        maxCacheLength: 10,
        matchSubset: true,
        matchCase: false,
        matchInside: true,
        mustMatch: false,
        selectFirst: false,
        selectOnly: false,
        showResult: null,
        preventDefaultReturn: true,
        preventDefaultTab: false,
        autoFill: false,
        filterResults: true,
        sortResults: true,
        sortFunction: null,
        onItemSelect: null,
        onNoMatch: null,
        onFinish: null,
        matchStringConverter: null,
        beforeUseConverter: null,
        autoWidth: 'min-width',
        useDelimiter: false,
        delimiterChar: ',',
        delimiterKeyCode: 188,
        processData: null
    };

    /**
     * Sanitize result
     * @param {Object} result
     * @returns {Object} object with members value (String) and data (Object)
     * @private
     */
    var sanitizeResult = function(result) {
        var value, data;
        var type = typeof result;
        if (type === 'string') {
            value = result;
            data = {};
        } else if ($.isArray(result)) {
            value = result[0];
            data = result.slice(1);
        } else if (type === 'object') {
            value = result.value;
            data = result.data;
        }
        value = String(value);
        if (typeof data !== 'object') {
            data = {};
        }
        return {
            value: value,
            data: data
        };
    };

    /**
     * Sanitize integer
     * @param {mixed} value
     * @param {Object} options
     * @returns {Number} integer
     * @private
     */
    var sanitizeInteger = function(value, stdValue, options) {
        var num = parseInt(value, 10);
        options = options || {};
        if (isNaN(num) || (options.min && num < options.min)) {
            num = stdValue;
        }
        return num;
    };

    /**
     * Create partial url for a name/value pair
     */
    var makeUrlParam = function(name, value) {
        return [name, encodeURIComponent(value)].join('=');
    };

    /**
     * Build an url
     * @param {string} url Base url
     * @param {object} [params] Dictionary of parameters
     */
    var makeUrl = function(url, params) {
        var urlAppend = [];
        $.each(params, function(index, value) {
            urlAppend.push(makeUrlParam(index, value));
        });
        if (urlAppend.length) {
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += urlAppend.join('&');
        }
        return url;
    };

    /**
     * Default sort filter
     * @param {object} a
     * @param {object} b
     * @param {boolean} matchCase
     * @returns {number}
     */
    var sortValueAlpha = function(a, b, matchCase) {
        a = String(a.value);
        b = String(b.value);
        if (!matchCase) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };

    /**
     * Parse data received in text format
     * @param {string} text Plain text input
     * @param {string} lineSeparator String that separates lines
     * @param {string} cellSeparator String that separates cells
     * @returns {array} Array of autocomplete data objects
     */
    var plainTextParser = function(text, lineSeparator, cellSeparator) {
        var results = [];
        var i, j, data, line, value, lines;
        // Be nice, fix linebreaks before splitting on lineSeparator
        lines = String(text).replace('\r\n', '\n').split(lineSeparator);
        for (i = 0; i < lines.length; i++) {
            line = lines[i].split(cellSeparator);
            data = [];
            for (j = 0; j < line.length; j++) {
                data.push(decodeURIComponent(line[j]));
            }
            value = data.shift();
            results.push({ value: value, data: data });
        }
        return results;
    };

    /**
     * Autocompleter class
     * @param {object} $elem jQuery object with one input tag
     * @param {object} options Settings
     * @constructor
     */
    $.Autocompleter = function($elem, options) {

        /**
         * Assert parameters
         */
        if (!$elem || !($elem instanceof $) || $elem.length !== 1 || $elem.get(0).tagName.toUpperCase() !== 'INPUT') {
            throw new Error('Invalid parameter for jquery.Autocompleter, jQuery object with one element with INPUT tag expected.');
        }

        /**
         * @constant Link to this instance
         * @type object
         * @private
         */
        var self = this;

        /**
         * @property {object} Options for this instance
         * @public
         */
        this.options = options;

        /**
         * @property object Cached data for this instance
         * @private
         */
        this.cacheData_ = {};

        /**
         * @property {number} Number of cached data items
         * @private
         */
        this.cacheLength_ = 0;

        /**
         * @property {string} Class name to mark selected item
         * @private
         */
        this.selectClass_ = 'jquery-autocomplete-selected-item';

        /**
         * @property {number} Handler to activation timeout
         * @private
         */
        this.keyTimeout_ = null;

        /**
         * @property {number} Handler to finish timeout
         * @private
         */
        this.finishTimeout_ = null;

        /**
         * @property {number} Last key pressed in the input field (store for behavior)
         * @private
         */
        this.lastKeyPressed_ = null;

        /**
         * @property {string} Last value processed by the autocompleter
         * @private
         */
        this.lastProcessedValue_ = null;

        /**
         * @property {string} Last value selected by the user
         * @private
         */
        this.lastSelectedValue_ = null;

        /**
         * @property {boolean} Is this autocompleter active (showing results)?
         * @see showResults
         * @private
         */
        this.active_ = false;

        /**
         * @property {boolean} Is this autocompleter allowed to finish on blur?
         * @private
         */
        this.finishOnBlur_ = true;

        /**
         * Sanitize options
         */
        this.options.minChars = sanitizeInteger(this.options.minChars, $.fn.autocomplete.defaults.minChars, { min: 1 });
        this.options.maxItemsToShow = sanitizeInteger(this.options.maxItemsToShow, $.fn.autocomplete.defaults.maxItemsToShow, { min: 0 });
        this.options.maxCacheLength = sanitizeInteger(this.options.maxCacheLength, $.fn.autocomplete.defaults.maxCacheLength, { min: 1 });
        this.options.delay = sanitizeInteger(this.options.delay, $.fn.autocomplete.defaults.delay, { min: 0 });

        /**
         * Init DOM elements repository
         */
        this.dom = {};

        /**
         * Store the input element we're attached to in the repository
         */
        this.dom.$elem = $elem;

        /**
         * Switch off the native autocomplete and add the input class
         */
        this.dom.$elem.attr('autocomplete', 'off').addClass(this.options.inputClass);

        /**
         * Create DOM element to hold results, and force absolute position
         */
        this.dom.$results = $('<div></div>').hide().addClass(this.options.resultsClass).css({
            position: 'absolute'
        });
        $('body').append(this.dom.$results);

        /**
         * Attach keyboard monitoring to $elem
         */
        $elem.keydown(function(e) {
            self.lastKeyPressed_ = e.keyCode;
            switch(self.lastKeyPressed_) {

                case self.options.delimiterKeyCode: // comma = 188
                    if (self.options.useDelimiter && self.active_) {
                        self.selectCurrent();
                    }
                    break;

                // ignore navigational & special keys
                case 35: // end
                case 36: // home
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                case 37: // left
                case 39: // right
                    break;

                case 38: // up
                    e.preventDefault();
                    if (self.active_) {
                        self.focusPrev();
                    } else {
                        self.activate();
                    }
                    return false;

                case 40: // down
                    e.preventDefault();
                    if (self.active_) {
                        self.focusNext();
                    } else {
                        self.activate();
                    }
                    return false;

                case 9: // tab
                    if (self.active_) {
                        self.selectCurrent();
                        if (self.options.preventDefaultTab) {
                            e.preventDefault();
                            return false;
                        }
                    }
                break;

                case 13: // return
                    if (self.active_) {
                        self.selectCurrent();
                        if (self.options.preventDefaultReturn) {
                            e.preventDefault();
                            return false;
                        }
                    }
                break;

                case 27: // escape
                    if (self.active_) {
                        e.preventDefault();
                        self.deactivate(true);
                        return false;
                    }
                break;

                default:
                    self.activate();

            }
        });

        /**
         * Finish on blur event
         * Use a timeout because instant blur gives race conditions
         */
        $elem.blur(function() {
            if (self.finishOnBlur_) {
                self.finishTimeout_ = setTimeout(function() { self.deactivate(true); }, 200);
            }
        });

    };

    /**
     * Position output DOM elements
     * @private
     */
    $.Autocompleter.prototype.position = function() {
        var offset = this.dom.$elem.offset();
        this.dom.$results.css({
            top: offset.top + this.dom.$elem.outerHeight(),
            left: offset.left
        });
    };

    /**
     * Read from cache
     * @private
     */
    $.Autocompleter.prototype.cacheRead = function(filter) {
        var filterLength, searchLength, search, maxPos, pos;
        if (this.options.useCache) {
            filter = String(filter);
            filterLength = filter.length;
            if (this.options.matchSubset) {
                searchLength = 1;
            } else {
                searchLength = filterLength;
            }
            while (searchLength <= filterLength) {
                if (this.options.matchInside) {
                    maxPos = filterLength - searchLength;
                } else {
                    maxPos = 0;
                }
                pos = 0;
                while (pos <= maxPos) {
                    search = filter.substr(0, searchLength);
                    if (this.cacheData_[search] !== undefined) {
                        return this.cacheData_[search];
                    }
                    pos++;
                }
                searchLength++;
            }
        }
        return false;
    };

    /**
     * Write to cache
     * @private
     */
    $.Autocompleter.prototype.cacheWrite = function(filter, data) {
        if (this.options.useCache) {
            if (this.cacheLength_ >= this.options.maxCacheLength) {
                this.cacheFlush();
            }
            filter = String(filter);
            if (this.cacheData_[filter] !== undefined) {
                this.cacheLength_++;
            }
            this.cacheData_[filter] = data;
            return this.cacheData_[filter];
        }
        return false;
    };

    /**
     * Flush cache
     * @public
     */
    $.Autocompleter.prototype.cacheFlush = function() {
        this.cacheData_ = {};
        this.cacheLength_ = 0;
    };

    /**
     * Call hook
     * Note that all called hooks are passed the autocompleter object
     * @param {string} hook
     * @param data
     * @returns Result of called hook, false if hook is undefined
     */
    $.Autocompleter.prototype.callHook = function(hook, data) {
        var f = this.options[hook];
        if (f && $.isFunction(f)) {
            return f(data, this);
        }
        return false;
    };
    
    /**
     * Set timeout to activate autocompleter
     */
    $.Autocompleter.prototype.activate = function() {
        var self = this;
        if (this.keyTimeout_) {
            clearTimeout(this.keyTimeout_);
        }
        this.keyTimeout_ = setTimeout(function() {
            self.activateNow();
        }, this.options.delay);
    };

    /**
     * Activate autocompleter immediately
     */
    $.Autocompleter.prototype.activateNow = function() {
        var value = this.beforeUseConverter(this.dom.$elem.val());
        if (value !== this.lastProcessedValue_ && value !== this.lastSelectedValue_) {
            this.fetchData(value);
        }
    };

    /**
     * Get autocomplete data for a given value
     * @param {string} value Value to base autocompletion on
     * @private
     */
    $.Autocompleter.prototype.fetchData = function(value) {
        var self = this;
        var processResults = function(results, filter) {
            if (self.options.processData) {
                results = self.options.processData(results);
            }
            self.showResults(self.filterResults(results, filter), filter);
        };
        this.lastProcessedValue_ = value;
        if (value.length < this.options.minChars) {
            processResults([], value);
        } else if (this.options.data) {
            processResults(this.options.data, value);
        } else {
            this.fetchRemoteData(value, function(remoteData) {
                processResults(remoteData, value);
            });
        }
    };

    /**
     * Get remote autocomplete data for a given value
     * @param {string} filter The filter to base remote data on
     * @param {function} callback The function to call after data retrieval
     * @private
     */
    $.Autocompleter.prototype.fetchRemoteData = function(filter, callback) {
        var data = this.cacheRead(filter);
        if (data) {
            callback(data);
        } else {
            var self = this;
            var dataType = self.options.remoteDataType === 'json' ? 'json' : 'text';
            var ajaxCallback = function(data) {
                var parsed = false;
                if (data !== false) {
                    parsed = self.parseRemoteData(data);
                    self.cacheWrite(filter, parsed);
                }
                self.dom.$elem.removeClass(self.options.loadingClass);
                callback(parsed);
            };
            this.dom.$elem.addClass(this.options.loadingClass);
            $.ajax({
                url: this.makeUrl(filter),
                success: ajaxCallback,
                error: function() {
                    ajaxCallback(false);
                },
                dataType: dataType
            });
        }
    };

    /**
     * Create or update an extra parameter for the remote request
     * @param {string} name Parameter name
     * @param {string} value Parameter value
     * @public
     */
    $.Autocompleter.prototype.setExtraParam = function(name, value) {
        var index = $.trim(String(name));
        if (index) {
            if (!this.options.extraParams) {
                this.options.extraParams = {};
            }
            if (this.options.extraParams[index] !== value) {
                this.options.extraParams[index] = value;
                this.cacheFlush();
            }
        }
    };

    /**
     * Build the url for a remote request
     * If options.queryParamName === false, append query to url instead of using a GET parameter
     * @param {string} param The value parameter to pass to the backend
     * @returns {string} The finished url with parameters
     */
    $.Autocompleter.prototype.makeUrl = function(param) {
        var self = this;
        var url = this.options.url;
        var params = $.extend({}, this.options.extraParams);

        if (this.options.queryParamName === false) {
            url += encodeURIComponent(param);
        } else {
            params[this.options.queryParamName] = param;
        }

        if (this.options.limitParamName && this.options.maxItemsToShow) {
            params[this.options.limitParamName] = this.options.maxItemsToShow;
        }

        return makeUrl(url, params);
    };

    /**
     * Parse data received from server
     * @param remoteData Data received from remote server
     * @returns {array} Parsed data
     */
    $.Autocompleter.prototype.parseRemoteData = function(remoteData) {
        var remoteDataType;
        var data = remoteData;
        if (this.options.remoteDataType === 'json') {
            remoteDataType = typeof(remoteData);
            switch (remoteDataType) {
                case 'object':
                    data = remoteData;
                    break;
                case 'string':
                    data = $.parseJSON(remoteData);
                    break;
                default:
                    throw new Error("Unexpected remote data type: " + remoteDataType);
            }
            return data;
        }
        return plainTextParser(data, this.options.lineSeparator, this.options.cellSeparator);
    };

    /**
     * Filter result
     * @param {Object} result
     * @param {String} filter
     * @returns {boolean} Include this result
     * @private
     */
    $.Autocompleter.prototype.filterResult = function(result, filter) {
        if (!result.value) {
            return false;
        }
        if (this.options.filterResults) {
            var pattern = this.matchStringConverter(filter);
            var testValue = this.matchStringConverter(result.value);
            if (!this.options.matchCase) {
                pattern = pattern.toLowerCase();
                testValue = testValue.toLowerCase();
            }
            var patternIndex = testValue.indexOf(pattern);
            if (this.options.matchInside) {
                return patternIndex > -1;
            } else {
                return patternIndex === 0;
            }
        }
        return true;
    };

    /**
     * Filter results
     * @param results
     * @param filter
     */
    $.Autocompleter.prototype.filterResults = function(results, filter) {
        var filtered = [];
        var i, result;

        for (i = 0; i < results.length; i++) {
            result = sanitizeResult(results[i]);
            if (this.filterResult(result, filter)) {
                filtered.push(result);
            }
        }
        if (this.options.sortResults) {
            filtered = this.sortResults(filtered, filter);
        }
        if (this.options.maxItemsToShow > 0 && this.options.maxItemsToShow < filtered.length) {
            filtered.length = this.options.maxItemsToShow;
        }
        return filtered;
    };

    /**
     * Sort results
     * @param results
     * @param filter
     */
    $.Autocompleter.prototype.sortResults = function(results, filter) {
        var self = this;
        var sortFunction = this.options.sortFunction;
        if (!$.isFunction(sortFunction)) {
            sortFunction = function(a, b, f) {
                return sortValueAlpha(a, b, self.options.matchCase);
            };
        }
        results.sort(function(a, b) {
            return sortFunction(a, b, filter, self.options);
        });
        return results;
    };

    /**
     * Convert string before matching
     * @param s
     * @param a
     * @param b
     */
    $.Autocompleter.prototype.matchStringConverter = function(s, a, b) {
        var converter = this.options.matchStringConverter;
        if ($.isFunction(converter)) {
            s = converter(s, a, b);
        }
        return s;
    };

    /**
     * Convert string before use
     * @param s
     * @param a
     * @param b
     */
    $.Autocompleter.prototype.beforeUseConverter = function(s, a, b) {
        s = this.getValue();
        var converter = this.options.beforeUseConverter;
        if ($.isFunction(converter)) {
            s = converter(s, a, b);
        }
        return s;
    };

    /**
     * Enable finish on blur event
     */
    $.Autocompleter.prototype.enableFinishOnBlur = function() {
        this.finishOnBlur_ = true;
    };

    /**
     * Disable finish on blur event
     */
    $.Autocompleter.prototype.disableFinishOnBlur = function() {
        this.finishOnBlur_ = false;
    };

    /**
     * Create a results item (LI element) from a result
     * @param result
     */
    $.Autocompleter.prototype.createItemFromResult = function(result) {
        var self = this;
        var $li = $('<li>' + this.showResult(result.value, result.data) + '</li>');
        $li.data({value: result.value, data: result.data})
            .click(function() {
                self.selectItem($li);
            })
            .mousedown(self.disableFinishOnBlur)
            .mouseup(self.enableFinishOnBlur)
        ;
        return $li;
    };

    /**
     * Get all items from the results list
     * @param result
     */
    $.Autocompleter.prototype.getItems = function() {
        return $('>ul>li', this.dom.$results);
    };

    /**
     * Show all results
     * @param results
     * @param filter
     */
    $.Autocompleter.prototype.showResults = function(results, filter) {
        var numResults = results.length;
        var self = this;
        var $ul = $('<ul></ul>');
        var i, result, $li, autoWidth, first = false, $first = false;

        if (numResults) {
            for (i = 0; i < numResults; i++) {
                result = results[i];
                $li = this.createItemFromResult(result);
                $ul.append($li);
                if (first === false) {
                    first = String(result.value);
                    $first = $li;
                    $li.addClass(this.options.firstItemClass);
                }
                if (i === numResults - 1) {
                    $li.addClass(this.options.lastItemClass);
                }
            }

            // Always recalculate position before showing since window size or
            // input element location may have changed.
            this.position();

            this.dom.$results.html($ul).show();
            if (this.options.autoWidth) {
                autoWidth = this.dom.$elem.outerWidth() - this.dom.$results.outerWidth() + this.dom.$results.width();
                this.dom.$results.css(this.options.autoWidth, autoWidth);
            }
            this.getItems().hover(
                function() { self.focusItem(this); },
                function() { /* void */ }
            );
            if (this.autoFill(first, filter) || this.options.selectFirst || (this.options.selectOnly && numResults === 1)) {
                this.focusItem($first);
            }
            this.active_ = true;
        } else {
            this.hideResults();
            this.active_ = false;
        }
    };

    $.Autocompleter.prototype.showResult = function(value, data) {
        if ($.isFunction(this.options.showResult)) {
            return this.options.showResult(value, data);
        } else {
            return value;
        }
    };

    $.Autocompleter.prototype.autoFill = function(value, filter) {
        var lcValue, lcFilter, valueLength, filterLength;
        if (this.options.autoFill && this.lastKeyPressed_ !== 8) {
            lcValue = String(value).toLowerCase();
            lcFilter = String(filter).toLowerCase();
            valueLength = value.length;
            filterLength = filter.length;
            if (lcValue.substr(0, filterLength) === lcFilter) {
                var d = this.getDelimiterOffsets();
                var pad = d.start ? ' ' : ''; // if there is a preceding delimiter
                this.setValue( pad + value );
                var start = filterLength + d.start + pad.length;
                var end = valueLength + d.start + pad.length;
                this.selectRange(start, end);
                return true;
            }
        }
        return false;
    };

    $.Autocompleter.prototype.focusNext = function() {
        this.focusMove(+1);
    };

    $.Autocompleter.prototype.focusPrev = function() {
        this.focusMove(-1);
    };

    $.Autocompleter.prototype.focusMove = function(modifier) {
        var $items = this.getItems();
        modifier = sanitizeInteger(modifier, 0);
        if (modifier) {
            for (var i = 0; i < $items.length; i++) {
                if ($($items[i]).hasClass(this.selectClass_)) {
                    this.focusItem(i + modifier);
                    return;
                }
            }
        }
        this.focusItem(0);
    };

    $.Autocompleter.prototype.focusItem = function(item) {
        var $item, $items = this.getItems();
        if ($items.length) {
            $items.removeClass(this.selectClass_).removeClass(this.options.selectClass);
            if (typeof item === 'number') {
                if (item < 0) {
                    item = 0;
                } else if (item >= $items.length) {
                    item = $items.length - 1;
                }
                $item = $($items[item]);
            } else {
                $item = $(item);
            }
            if ($item) {
                $item.addClass(this.selectClass_).addClass(this.options.selectClass);
            }
        }
    };

    $.Autocompleter.prototype.selectCurrent = function() {
        var $item = $('li.' + this.selectClass_, this.dom.$results);
        if ($item.length === 1) {
            this.selectItem($item);
        } else {
            this.deactivate(false);
        }
    };

    $.Autocompleter.prototype.selectItem = function($li) {
        var value = $li.data('value');
        var data = $li.data('data');
        var displayValue = this.displayValue(value, data);
        var processedDisplayValue = this.beforeUseConverter(displayValue);
        this.lastProcessedValue_ = processedDisplayValue;
        this.lastSelectedValue_ = processedDisplayValue;
        var d = this.getDelimiterOffsets();
        var delimiter = this.options.delimiterChar;
        var elem = this.dom.$elem;
        var extraCaretPos = 0;
        if ( this.options.useDelimiter ) {
            // if there is a preceding delimiter, add a space after the delimiter
            if ( elem.val().substring(d.start-1, d.start) == delimiter && delimiter != ' ' ) {
                displayValue = ' ' + displayValue;
            }
            // if there is not already a delimiter trailing this value, add it
            if ( elem.val().substring(d.end, d.end+1) != delimiter && this.lastKeyPressed_ != this.options.delimiterKeyCode ) {
                displayValue = displayValue + delimiter;
            } else {
                // move the cursor after the existing trailing delimiter
                extraCaretPos = 1;
            }
        }
        this.setValue(displayValue);
        this.setCaret(d.start + displayValue.length + extraCaretPos);
        this.callHook('onItemSelect', { value: value, data: data });
        this.deactivate(true);
        elem.focus();    
    };

    $.Autocompleter.prototype.displayValue = function(value, data) {
        if ($.isFunction(this.options.displayValue)) {
            return this.options.displayValue(value, data);
        }
        return value;
    };

    $.Autocompleter.prototype.hideResults = function() {
        this.dom.$results.hide();
    };

    $.Autocompleter.prototype.deactivate = function(finish) {
        if (this.finishTimeout_) {
            clearTimeout(this.finishTimeout_);
        }
        if (this.keyTimeout_) {
            clearTimeout(this.keyTimeout_);
        }
        if (finish) {
            if (this.lastProcessedValue_ !== this.lastSelectedValue_) {
                if (this.options.mustMatch) {
                    this.setValue('');
                }
                this.callHook('onNoMatch');
            }
            if (this.active_) {
                this.callHook('onFinish');
            }
            this.lastKeyPressed_ = null;
            this.lastProcessedValue_ = null;
            this.lastSelectedValue_ = null;
            this.active_ = false;
        }
        this.hideResults();
    };

    $.Autocompleter.prototype.selectRange = function(start, end) {
        var input = this.dom.$elem.get(0);
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    };

    /**
     * Move caret to position
     * @param {Number} pos
     */
    $.Autocompleter.prototype.setCaret = function(pos) {
        this.selectRange(pos, pos);
    };

    /**
     * Get caret position
     */
    $.Autocompleter.prototype.getCaret = function() {
        var elem = this.dom.$elem;
        if ($.browser.msie) {
            // ie
            var selection = document.selection;
            if (elem[0].tagName.toLowerCase() != 'textarea') {
                var val = elem.val();
                var range = selection.createRange().duplicate();
                range.moveEnd('character', val.length);
                var s = ( range.text == '' ? val.length : val.lastIndexOf(range.text) );
                range = selection.createRange().duplicate();
                range.moveStart('character', -val.length);
                var e = range.text.length;
            } else {
                var range = selection.createRange();
                var stored_range = range.duplicate();
                stored_range.moveToElementText(elem[0]);
                stored_range.setEndPoint('EndToEnd', range);
                var s = stored_range.text.length - range.text.length;
                var e = s + range.text.length;
            }
        } else {
            // ff, chrome, safari
            var s = elem[0].selectionStart;
            var e = elem[0].selectionEnd;
        }
        return {
            start: s,
            end: e
        };        
    };

    /**
     * Set the value that is currently being autocompleted
     * @param {String} value
     */
    $.Autocompleter.prototype.setValue = function(value) {
        if ( this.options.useDelimiter ) {
            // set the substring between the current delimiters
            var val = this.dom.$elem.val();
            var d = this.getDelimiterOffsets();
            var preVal = val.substring(0, d.start);
            var postVal = val.substring(d.end);
            value = preVal + value + postVal;
        }
        this.dom.$elem.val(value);
    };

    /**
     * Get the value currently being autocompleted
     * @param {String} value
     */
    $.Autocompleter.prototype.getValue = function() {
        var val = this.dom.$elem.val();
        if ( this.options.useDelimiter ) {
            var d = this.getDelimiterOffsets();
            return val.substring(d.start, d.end).trim();
        } else {
            return val;
        }
    };

    /**
     * Get the offsets of the value currently being autocompleted
     */
    $.Autocompleter.prototype.getDelimiterOffsets = function() {
        var val = this.dom.$elem.val();
        if ( this.options.useDelimiter ) {
            var preCaretVal = val.substring(0, this.getCaret().start);
            var start = preCaretVal.lastIndexOf(this.options.delimiterChar) + 1;
            var postCaretVal = val.substring(this.getCaret().start);
            var end = postCaretVal.indexOf(this.options.delimiterChar);
            if ( end == -1 ) end = val.length;
            end += this.getCaret().start;
        } else {
            start = 0;
            end = val.length;
        }
        return {
            start: start,
            end: end
        };
    };

})(jQuery);

/*** _jquery.autocomplete.min.js ***/
/**
 * @fileOverview jquery-autocomplete, the jQuery Autocompleter
 * @author <a href="mailto:dylan@dyve.net">Dylan Verheul</a>
 * @version 2.4.4
 * @requires jQuery 1.6+
 * @license MIT | GPL | Apache 2.0, see LICENSE.txt
 * @see https://github.com/dyve/jquery-autocomplete
 */
(function($){"use strict";$.fn.autocomplete=function(options){var url;if(arguments.length>1){url=options;options=arguments[1];options.url=url}else if(typeof options==="string"){url=options;options={url:url}}var opts=$.extend({},$.fn.autocomplete.defaults,options);return this.each(function(){var $this=$(this);$this.data("autocompleter",new $.Autocompleter($this,$.meta?$.extend({},opts,$this.data()):opts))})};$.fn.autocomplete.defaults={inputClass:"acInput",loadingClass:"acLoading",resultsClass:"acResults",selectClass:"acSelect",queryParamName:"q",extraParams:{},remoteDataType:false,lineSeparator:"\n",cellSeparator:"|",minChars:2,maxItemsToShow:10,delay:400,useCache:true,maxCacheLength:10,matchSubset:true,matchCase:false,matchInside:true,mustMatch:false,selectFirst:false,selectOnly:false,showResult:null,preventDefaultReturn:1,preventDefaultTab:0,autoFill:false,filterResults:true,filter:true,sortResults:true,sortFunction:null,onItemSelect:null,onNoMatch:null,onFinish:null,matchStringConverter:null,beforeUseConverter:null,autoWidth:"min-width",useDelimiter:false,delimiterChar:",",delimiterKeyCode:188,processData:null,onError:null,enabled:true};var sanitizeResult=function(result){var value,data;var type=typeof result;if(type==="string"){value=result;data={}}else if($.isArray(result)){value=result[0];data=result.slice(1)}else if(type==="object"){value=result.value;data=result.data}value=String(value);if(typeof data!=="object"){data={}}return{value:value,data:data}};var sanitizeInteger=function(value,stdValue,options){var num=parseInt(value,10);options=options||{};if(isNaN(num)||options.min&&num<options.min){num=stdValue}return num};var makeUrlParam=function(name,value){return[name,encodeURIComponent(value)].join("=")};var makeUrl=function(url,params){var urlAppend=[];$.each(params,function(index,value){urlAppend.push(makeUrlParam(index,value))});if(urlAppend.length){url+=url.indexOf("?")===-1?"?":"&";url+=urlAppend.join("&")}return url};var sortValueAlpha=function(a,b,matchCase){a=String(a.value);b=String(b.value);if(!matchCase){a=a.toLowerCase();b=b.toLowerCase()}if(a>b){return 1}if(a<b){return-1}return 0};var plainTextParser=function(text,lineSeparator,cellSeparator){var results=[];var i,j,data,line,value,lines;lines=String(text).replace("\r\n","\n").split(lineSeparator);for(i=0;i<lines.length;i++){line=lines[i].split(cellSeparator);data=[];for(j=0;j<line.length;j++){data.push(decodeURIComponent(line[j]))}value=data.shift();results.push({value:value,data:data})}return results};$.Autocompleter=function($elem,options){if(!$elem||!($elem instanceof $)||$elem.length!==1||$elem.get(0).tagName.toUpperCase()!=="INPUT"){throw new Error("Invalid parameter for jquery.Autocompleter, jQuery object with one element with INPUT tag expected.")}var self=this;this.options=options;this.cacheData_={};this.cacheLength_=0;this.selectClass_="jquery-autocomplete-selected-item";this.keyTimeout_=null;this.finishTimeout_=null;this.lastKeyPressed_=null;this.lastProcessedValue_=null;this.lastSelectedValue_=null;this.active_=false;this.finishOnBlur_=true;this.options.minChars=sanitizeInteger(this.options.minChars,$.fn.autocomplete.defaults.minChars,{min:0});this.options.maxItemsToShow=sanitizeInteger(this.options.maxItemsToShow,$.fn.autocomplete.defaults.maxItemsToShow,{min:0});this.options.maxCacheLength=sanitizeInteger(this.options.maxCacheLength,$.fn.autocomplete.defaults.maxCacheLength,{min:1});this.options.delay=sanitizeInteger(this.options.delay,$.fn.autocomplete.defaults.delay,{min:0});if(this.options.preventDefaultReturn!=2){this.options.preventDefaultReturn=this.options.preventDefaultReturn?1:0}if(this.options.preventDefaultTab!=2){this.options.preventDefaultTab=this.options.preventDefaultTab?1:0}this.dom={};this.dom.$elem=$elem;this.dom.$elem.attr("autocomplete","off").addClass(this.options.inputClass);this.dom.$results=$("<div></div>").hide().addClass(this.options.resultsClass).css({position:"absolute"});$("body").append(this.dom.$results);$elem.keydown(function(e){self.lastKeyPressed_=e.keyCode;switch(self.lastKeyPressed_){case self.options.delimiterKeyCode:if(self.options.useDelimiter&&self.active_){self.selectCurrent()}break;case 35:case 36:case 16:case 17:case 18:case 37:case 39:break;case 38:e.preventDefault();if(self.active_){self.focusPrev()}else{self.activate()}return false;case 40:e.preventDefault();if(self.active_){self.focusNext()}else{self.activate()}return false;case 9:if(self.active_){self.selectCurrent();if(self.options.preventDefaultTab){e.preventDefault();return false}}if(self.options.preventDefaultTab===2){e.preventDefault();return false}break;case 13:if(self.active_){self.selectCurrent();if(self.options.preventDefaultReturn){e.preventDefault();return false}}if(self.options.preventDefaultReturn===2){e.preventDefault();return false}break;case 27:if(self.active_){e.preventDefault();self.deactivate(true);return false}break;default:self.activate()}});$elem.on("paste",function(){self.activate()});var onBlurFunction=function(){self.deactivate(true)};$elem.blur(function(){if(self.finishOnBlur_){self.finishTimeout_=setTimeout(onBlurFunction,200)}});$elem.parents("form").on("submit",onBlurFunction)};$.Autocompleter.prototype.position=function(){var offset=this.dom.$elem.offset();var height=this.dom.$results.outerHeight();var totalHeight=$(window).outerHeight();var inputBottom=offset.top+this.dom.$elem.outerHeight();var bottomIfDown=inputBottom+height;var position={top:inputBottom,left:offset.left};if(bottomIfDown>totalHeight){var topIfUp=offset.top-height;if(topIfUp>=0){position.top=topIfUp}}this.dom.$results.css(position)};$.Autocompleter.prototype.cacheRead=function(filter){var filterLength,searchLength,search,maxPos,pos;if(this.options.useCache){filter=String(filter);filterLength=filter.length;if(this.options.matchSubset){searchLength=1}else{searchLength=filterLength}while(searchLength<=filterLength){if(this.options.matchInside){maxPos=filterLength-searchLength}else{maxPos=0}pos=0;while(pos<=maxPos){search=filter.substr(0,searchLength);if(this.cacheData_[search]!==undefined){return this.cacheData_[search]}pos++}searchLength++}}return false};$.Autocompleter.prototype.cacheWrite=function(filter,data){if(this.options.useCache){if(this.cacheLength_>=this.options.maxCacheLength){this.cacheFlush()}filter=String(filter);if(this.cacheData_[filter]!==undefined){this.cacheLength_++}this.cacheData_[filter]=data;return this.cacheData_[filter]}return false};$.Autocompleter.prototype.cacheFlush=function(){this.cacheData_={};this.cacheLength_=0};$.Autocompleter.prototype.callHook=function(hook,data){var f=this.options[hook];if(f&&$.isFunction(f)){return f(data,this)}return false};$.Autocompleter.prototype.activate=function(){if(!this.options.enabled)return;var self=this;if(this.keyTimeout_){clearTimeout(this.keyTimeout_)}this.keyTimeout_=setTimeout(function(){self.activateNow()},this.options.delay)};$.Autocompleter.prototype.activateNow=function(){var value=this.beforeUseConverter(this.dom.$elem.val());if(value!==this.lastProcessedValue_&&value!==this.lastSelectedValue_){this.fetchData(value)}};$.Autocompleter.prototype.fetchData=function(value){var self=this;var processResults=function(results,filter){if(self.options.processData){results=self.options.processData(results)}self.showResults(self.filterResults(results,filter),filter)};this.lastProcessedValue_=value;if(value.length<this.options.minChars){processResults([],value)}else if(this.options.data){processResults(this.options.data,value)}else{this.fetchRemoteData(value,function(remoteData){processResults(remoteData,value)})}};$.Autocompleter.prototype.fetchRemoteData=function(filter,callback){var data=this.cacheRead(filter);if(data){callback(data)}else{var self=this;var dataType=self.options.remoteDataType==="json"?"json":"text";var ajaxCallback=function(data){var parsed=false;if(data!==false){parsed=self.parseRemoteData(data);self.cacheWrite(filter,parsed)}self.dom.$elem.removeClass(self.options.loadingClass);callback(parsed)};this.dom.$elem.addClass(this.options.loadingClass);$.ajax({url:this.makeUrl(filter),success:ajaxCallback,error:function(jqXHR,textStatus,errorThrown){if($.isFunction(self.options.onError)){self.options.onError(jqXHR,textStatus,errorThrown)}else{ajaxCallback(false)}},dataType:dataType})}};$.Autocompleter.prototype.setExtraParam=function(name,value){var index=$.trim(String(name));if(index){if(!this.options.extraParams){this.options.extraParams={}}if(this.options.extraParams[index]!==value){this.options.extraParams[index]=value;this.cacheFlush()}}};$.Autocompleter.prototype.makeUrl=function(param){var self=this;var url=this.options.url;var params=$.extend({},this.options.extraParams);if(this.options.queryParamName===false){url+=encodeURIComponent(param)}else{params[this.options.queryParamName]=param}return makeUrl(url,params)};$.Autocompleter.prototype.parseRemoteData=function(remoteData){var remoteDataType;var data=remoteData;if(this.options.remoteDataType==="json"){remoteDataType=typeof remoteData;switch(remoteDataType){case"object":data=remoteData;break;case"string":data=$.parseJSON(remoteData);break;default:throw new Error("Unexpected remote data type: "+remoteDataType)}return data}return plainTextParser(data,this.options.lineSeparator,this.options.cellSeparator)};$.Autocompleter.prototype.defaultFilter=function(result,filter){if(!result.value){return false}if(this.options.filterResults){var pattern=this.matchStringConverter(filter);var testValue=this.matchStringConverter(result.value);if(!this.options.matchCase){pattern=pattern.toLowerCase();testValue=testValue.toLowerCase()}var patternIndex=testValue.indexOf(pattern);if(this.options.matchInside){return patternIndex>-1}else{return patternIndex===0}}return true};$.Autocompleter.prototype.filterResult=function(result,filter){if(this.options.filter===false){return true}if($.isFunction(this.options.filter)){return this.options.filter(result,filter)}return this.defaultFilter(result,filter)};$.Autocompleter.prototype.filterResults=function(results,filter){var filtered=[];var i,result;for(i=0;i<results.length;i++){result=sanitizeResult(results[i]);if(this.filterResult(result,filter)){filtered.push(result)}}if(this.options.sortResults){filtered=this.sortResults(filtered,filter)}if(this.options.maxItemsToShow>0&&this.options.maxItemsToShow<filtered.length){filtered.length=this.options.maxItemsToShow}return filtered};$.Autocompleter.prototype.sortResults=function(results,filter){var self=this;var sortFunction=this.options.sortFunction;if(!$.isFunction(sortFunction)){sortFunction=function(a,b,f){return sortValueAlpha(a,b,self.options.matchCase)}}results.sort(function(a,b){return sortFunction(a,b,filter,self.options)});return results};$.Autocompleter.prototype.matchStringConverter=function(s,a,b){var converter=this.options.matchStringConverter;if($.isFunction(converter)){s=converter(s,a,b)}return s};$.Autocompleter.prototype.beforeUseConverter=function(s){s=this.getValue(s);var converter=this.options.beforeUseConverter;if($.isFunction(converter)){s=converter(s)}return s};$.Autocompleter.prototype.enableFinishOnBlur=function(){this.finishOnBlur_=true};$.Autocompleter.prototype.disableFinishOnBlur=function(){this.finishOnBlur_=false};$.Autocompleter.prototype.createItemFromResult=function(result){var self=this;var $li=$("<li/>");$li.text(this.showResult(result.value,result.data));$li.data({value:result.value,data:result.data}).click(function(){self.selectItem($li)}).mousedown(self.disableFinishOnBlur).mouseup(self.enableFinishOnBlur);return $li};$.Autocompleter.prototype.getItems=function(){return $(">ul>li",this.dom.$results)};$.Autocompleter.prototype.showResults=function(results,filter){var numResults=results.length;var self=this;var $ul=$("<ul></ul>");var i,result,$li,autoWidth,first=false,$first=false;if(numResults){for(i=0;i<numResults;i++){result=results[i];$li=this.createItemFromResult(result);$ul.append($li);if(first===false){first=String(result.value);$first=$li;$li.addClass(this.options.firstItemClass)}if(i===numResults-1){$li.addClass(this.options.lastItemClass)}}this.dom.$results.html($ul).show();this.position();if(this.options.autoWidth){autoWidth=this.dom.$elem.outerWidth()-this.dom.$results.outerWidth()+this.dom.$results.width();this.dom.$results.css(this.options.autoWidth,autoWidth)}this.getItems().hover(function(){self.focusItem(this)},function(){});if(this.autoFill(first,filter)||this.options.selectFirst||this.options.selectOnly&&numResults===1){this.focusItem($first)}this.active_=true}else{this.hideResults();this.active_=false}};$.Autocompleter.prototype.showResult=function(value,data){if($.isFunction(this.options.showResult)){return this.options.showResult(value,data)}else{return value}};$.Autocompleter.prototype.autoFill=function(value,filter){var lcValue,lcFilter,valueLength,filterLength;if(this.options.autoFill&&this.lastKeyPressed_!==8){lcValue=String(value).toLowerCase();lcFilter=String(filter).toLowerCase();valueLength=value.length;filterLength=filter.length;if(lcValue.substr(0,filterLength)===lcFilter){var d=this.getDelimiterOffsets();var pad=d.start?" ":"";this.setValue(pad+value);var start=filterLength+d.start+pad.length;var end=valueLength+d.start+pad.length;this.selectRange(start,end);return true}}return false};$.Autocompleter.prototype.focusNext=function(){this.focusMove(+1)};$.Autocompleter.prototype.focusPrev=function(){this.focusMove(-1)};$.Autocompleter.prototype.focusMove=function(modifier){var $items=this.getItems();modifier=sanitizeInteger(modifier,0);if(modifier){for(var i=0;i<$items.length;i++){if($($items[i]).hasClass(this.selectClass_)){this.focusItem(i+modifier);return}}}this.focusItem(0)};$.Autocompleter.prototype.focusItem=function(item){var $item,$items=this.getItems();if($items.length){$items.removeClass(this.selectClass_).removeClass(this.options.selectClass);if(typeof item==="number"){if(item<0){item=0}else if(item>=$items.length){item=$items.length-1}$item=$($items[item])}else{$item=$(item)}if($item){$item.addClass(this.selectClass_).addClass(this.options.selectClass)}}};$.Autocompleter.prototype.selectCurrent=function(){var $item=$("li."+this.selectClass_,this.dom.$results);if($item.length===1){this.selectItem($item)}else{this.deactivate(false)}};$.Autocompleter.prototype.selectItem=function($li){var value=$li.data("value");var data=$li.data("data");var displayValue=this.displayValue(value,data);var processedDisplayValue=this.beforeUseConverter(displayValue);this.lastProcessedValue_=processedDisplayValue;this.lastSelectedValue_=processedDisplayValue;var d=this.getDelimiterOffsets();var delimiter=this.options.delimiterChar;var elem=this.dom.$elem;var extraCaretPos=0;if(this.options.useDelimiter){if(elem.val().substring(d.start-1,d.start)==delimiter&&delimiter!=" "){displayValue=" "+displayValue}if(elem.val().substring(d.end,d.end+1)!=delimiter&&this.lastKeyPressed_!=this.options.delimiterKeyCode){displayValue=displayValue+delimiter}else{extraCaretPos=1}}this.setValue(displayValue);this.setCaret(d.start+displayValue.length+extraCaretPos);this.callHook("onItemSelect",{value:value,data:data});this.deactivate(true);elem.focus()};$.Autocompleter.prototype.displayValue=function(value,data){if($.isFunction(this.options.displayValue)){return this.options.displayValue(value,data)}return value};$.Autocompleter.prototype.hideResults=function(){this.dom.$results.hide()};$.Autocompleter.prototype.deactivate=function(finish){if(this.finishTimeout_){clearTimeout(this.finishTimeout_)}if(this.keyTimeout_){clearTimeout(this.keyTimeout_)}if(finish){if(this.lastProcessedValue_!==this.lastSelectedValue_){if(this.options.mustMatch){this.setValue("")}this.callHook("onNoMatch")}if(this.active_){this.callHook("onFinish")}this.lastKeyPressed_=null;this.lastProcessedValue_=null;this.lastSelectedValue_=null;this.active_=false}this.hideResults()};$.Autocompleter.prototype.selectRange=function(start,end){var input=this.dom.$elem.get(0);if(input.setSelectionRange){input.focus();input.setSelectionRange(start,end)}else if(input.createTextRange){var range=input.createTextRange();range.collapse(true);range.moveEnd("character",end);range.moveStart("character",start);range.select()}};$.Autocompleter.prototype.setCaret=function(pos){this.selectRange(pos,pos)};$.Autocompleter.prototype.getCaret=function(){var $elem=this.dom.$elem;var elem=$elem[0];var val,selection,range,start,end,stored_range;if(elem.createTextRange){selection=document.selection;if(elem.tagName.toLowerCase()!="textarea"){val=$elem.val();range=selection.createRange().duplicate();range.moveEnd("character",val.length);if(range.text===""){start=val.length}else{start=val.lastIndexOf(range.text)}range=selection.createRange().duplicate();range.moveStart("character",-val.length);end=range.text.length}else{range=selection.createRange();stored_range=range.duplicate();stored_range.moveToElementText(elem);stored_range.setEndPoint("EndToEnd",range);start=stored_range.text.length-range.text.length;end=start+range.text.length}}else{start=$elem[0].selectionStart;end=$elem[0].selectionEnd}return{start:start,end:end}};$.Autocompleter.prototype.setValue=function(value){if(this.options.useDelimiter){var val=this.dom.$elem.val();var d=this.getDelimiterOffsets();var preVal=val.substring(0,d.start);var postVal=val.substring(d.end);value=preVal+value+postVal}this.dom.$elem.val(value)};$.Autocompleter.prototype.getValue=function(value){if(this.options.useDelimiter){var d=this.getDelimiterOffsets();return value.substring(d.start,d.end).trim()}else{return value}};$.Autocompleter.prototype.getDelimiterOffsets=function(){var val=this.dom.$elem.val();if(this.options.useDelimiter){var preCaretVal=val.substring(0,this.getCaret().start);var start=preCaretVal.lastIndexOf(this.options.delimiterChar)+1;var postCaretVal=val.substring(this.getCaret().start);var end=postCaretVal.indexOf(this.options.delimiterChar);if(end==-1)end=val.length;end+=this.getCaret().start}else{start=0;end=val.length}return{start:start,end:end}}})(jQuery);

/*** _jquery.simplemodal.1.4.4.min.js ***/
/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});

/*** _sjcl.min.js ***/
"use strict";var sjcl={cipher:{},hash:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.h[0][0][0]||this.w();var b,c,d,e,f=this.h[0][4],g=this.h[1];b=a.length;var h=1;if(b!==4&&b!==6&&b!==8)throw new sjcl.exception.invalid("invalid aes key size");this.a=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(a%b===0||b===8&&a%b===4){c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255];if(a%b===0){c=c<<8^c>>>24^h<<24;h=h<<1^(h>>7)*283}}d[a]=d[a-b]^c}for(b=0;a;b++,a--){c=d[b&3?a:a-4];e[b]=a<=4||b<4?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^
g[3][f[c&255]]}};
sjcl.cipher.aes.prototype={encrypt:function(a){return this.H(a,0)},decrypt:function(a){return this.H(a,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],w:function(){var a=this.h[0],b=this.h[1],c=a[4],d=b[4],e,f,g,h=[],i=[],k,j,l,m;for(e=0;e<0x100;e++)i[(h[e]=e<<1^(e>>7)*283)^e]=e;for(f=g=0;!c[f];f^=k||1,g=i[g]||1){l=g^g<<1^g<<2^g<<3^g<<4;l=l>>8^l&255^99;c[f]=l;d[l]=f;j=h[e=h[k=h[f]]];m=j*0x1010101^e*0x10001^k*0x101^f*0x1010100;j=h[l]*0x101^l*0x1010100;for(e=0;e<4;e++){a[e][f]=j=j<<24^j>>>8;b[e][l]=m=m<<24^m>>>8}}for(e=
0;e<5;e++){a[e]=a[e].slice(0);b[e]=b[e].slice(0)}},H:function(a,b){if(a.length!==4)throw new sjcl.exception.invalid("invalid aes block size");var c=this.a[b],d=a[0]^c[0],e=a[b?3:1]^c[1],f=a[2]^c[2];a=a[b?1:3]^c[3];var g,h,i,k=c.length/4-2,j,l=4,m=[0,0,0,0];g=this.h[b];var n=g[0],o=g[1],p=g[2],q=g[3],r=g[4];for(j=0;j<k;j++){g=n[d>>>24]^o[e>>16&255]^p[f>>8&255]^q[a&255]^c[l];h=n[e>>>24]^o[f>>16&255]^p[a>>8&255]^q[d&255]^c[l+1];i=n[f>>>24]^o[a>>16&255]^p[d>>8&255]^q[e&255]^c[l+2];a=n[a>>>24]^o[d>>16&
255]^p[e>>8&255]^q[f&255]^c[l+3];l+=4;d=g;e=h;f=i}for(j=0;j<4;j++){m[b?3&-j:j]=r[d>>>24]<<24^r[e>>16&255]<<16^r[f>>8&255]<<8^r[a&255]^c[l++];g=d;d=e;e=f;f=a;a=g}return m}};
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.P(a.slice(b/32),32-(b&31)).slice(1);return c===undefined?a:sjcl.bitArray.clamp(a,c-b)},concat:function(a,b){if(a.length===0||b.length===0)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return d===32?a.concat(b):sjcl.bitArray.P(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;if(b===0)return 0;return(b-1)*32+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(a.length*32<b)return a;a=a.slice(0,Math.ceil(b/
32));var c=a.length;b&=31;if(c>0&&b)a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1);return a},partial:function(a,b,c){if(a===32)return b;return(c?b|0:b<<32-a)+a*0x10000000000},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return false;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return c===0},P:function(a,b,c,d){var e;e=0;if(d===undefined)d=[];for(;b>=32;b-=32){d.push(c);c=0}if(b===0)return d.concat(a);
for(e=0;e<a.length;e++){d.push(c|a[e]>>>b);c=a[e]<<32-b}e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,b+a>32?c:d.pop(),1));return d},k:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++){if((d&3)===0)e=a[d/4];b+=String.fromCharCode(e>>>24);e<<=8}return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++){d=d<<8|a.charCodeAt(c);if((c&3)===3){b.push(d);d=0}}c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a+="00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,d*4)}};
sjcl.codec.base64={D:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b){var c="",d,e=0,f=sjcl.codec.base64.D,g=0,h=sjcl.bitArray.bitLength(a);for(d=0;c.length*6<h;){c+=f.charAt((g^a[d]>>>e)>>>26);if(e<6){g=a[d]<<6-e;e+=26;d++}else{g<<=6;e-=6}}for(;c.length&3&&!b;)c+="=";return c},toBits:function(a){a=a.replace(/\s|=/g,"");var b=[],c,d=0,e=sjcl.codec.base64.D,f=0,g;for(c=0;c<a.length;c++){g=e.indexOf(a.charAt(c));if(g<0)throw new sjcl.exception.invalid("this isn't base64!");
if(d>26){d-=26;b.push(f^g>>>d);f=g<<32-d}else{d+=6;f^=g<<32-d}}d&56&&b.push(sjcl.bitArray.partial(d&56,f,1));return b}};sjcl.hash.sha256=function(a){this.a[0]||this.w();if(a){this.n=a.n.slice(0);this.i=a.i.slice(0);this.e=a.e}else this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.n=this.N.slice(0);this.i=[];this.e=0;return this},update:function(a){if(typeof a==="string")a=sjcl.codec.utf8String.toBits(a);var b,c=this.i=sjcl.bitArray.concat(this.i,a);b=this.e;a=this.e=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)this.C(c.splice(0,16));return this},finalize:function(){var a,b=this.i,c=this.n;b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.e/
4294967296));for(b.push(this.e|0);b.length;)this.C(b.splice(0,16));this.reset();return c},N:[],a:[],w:function(){function a(e){return(e-Math.floor(e))*0x100000000|0}var b=0,c=2,d;a:for(;b<64;c++){for(d=2;d*d<=c;d++)if(c%d===0)continue a;if(b<8)this.N[b]=a(Math.pow(c,0.5));this.a[b]=a(Math.pow(c,1/3));b++}},C:function(a){var b,c,d=a.slice(0),e=this.n,f=this.a,g=e[0],h=e[1],i=e[2],k=e[3],j=e[4],l=e[5],m=e[6],n=e[7];for(a=0;a<64;a++){if(a<16)b=d[a];else{b=d[a+1&15];c=d[a+14&15];b=d[a&15]=(b>>>7^b>>>18^
b>>>3^b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[a&15]+d[a+9&15]|0}b=b+n+(j>>>6^j>>>11^j>>>25^j<<26^j<<21^j<<7)+(m^j&(l^m))+f[a];n=m;m=l;l=j;j=k+b|0;k=i;i=h;h=g;g=b+(h&i^k&(h^i))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0}e[0]=e[0]+g|0;e[1]=e[1]+h|0;e[2]=e[2]+i|0;e[3]=e[3]+k|0;e[4]=e[4]+j|0;e[5]=e[5]+l|0;e[6]=e[6]+m|0;e[7]=e[7]+n|0}};
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,i=h.bitLength(c)/8,k=h.bitLength(g)/8;e=e||64;d=d||[];if(i<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;f<4&&k>>>8*f;f++);if(f<15-i)f=15-i;c=h.clamp(c,8*(15-f));b=sjcl.mode.ccm.G(a,b,c,d,e,f);g=sjcl.mode.ccm.I(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),i=f.clamp(b,h-e),k=f.bitSlice(b,
h-e);h=(h-e)/8;if(g<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;b<4&&h>>>8*b;b++);if(b<15-g)b=15-g;c=f.clamp(c,8*(15-b));i=sjcl.mode.ccm.I(a,i,c,k,e,b);a=sjcl.mode.ccm.G(a,i.data,c,d,e,b);if(!f.equal(i.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return i.data},G:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,i=h.k;e/=8;if(e%2||e<4||e>16)throw new sjcl.exception.invalid("ccm: invalid tag length");if(d.length>0xffffffff||b.length>0xffffffff)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
f=[h.partial(8,(d.length?64:0)|e-2<<2|f-1)];f=h.concat(f,c);f[3]|=h.bitLength(b)/8;f=a.encrypt(f);if(d.length){c=h.bitLength(d)/8;if(c<=65279)g=[h.partial(16,c)];else if(c<=0xffffffff)g=h.concat([h.partial(16,65534)],[c]);g=h.concat(g,d);for(d=0;d<g.length;d+=4)f=a.encrypt(i(f,g.slice(d,d+4)))}for(d=0;d<b.length;d+=4)f=a.encrypt(i(f,b.slice(d,d+4)));return h.clamp(f,e*8)},I:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.k;var i=b.length,k=h.bitLength(b);c=h.concat([h.partial(8,f-1)],c).concat([0,
0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!i)return{tag:d,data:[]};for(g=0;g<i;g+=4){c[3]++;e=a.encrypt(c);b[g]^=e[0];b[g+1]^=e[1];b[g+2]^=e[2];b[g+3]^=e[3]}return{tag:d,data:h.clamp(b,k)}}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(sjcl.bitArray.bitLength(c)!==128)throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl.mode.ocb2.A,i=sjcl.bitArray,k=i.k,j=[0,0,0,0];c=h(a.encrypt(c));var l,m=[];d=d||[];e=e||64;for(g=0;g+4<b.length;g+=4){l=b.slice(g,g+4);j=k(j,l);m=m.concat(k(c,a.encrypt(k(c,l))));c=h(c)}l=b.slice(g);b=i.bitLength(l);g=a.encrypt(k(c,[0,0,0,b]));l=i.clamp(k(l,g),b);j=k(j,k(l,g));j=a.encrypt(k(j,k(c,h(c))));if(d.length)j=k(j,f?d:sjcl.mode.ocb2.pmac(a,
d));return m.concat(i.concat(l,i.clamp(j,e)))},decrypt:function(a,b,c,d,e,f){if(sjcl.bitArray.bitLength(c)!==128)throw new sjcl.exception.invalid("ocb iv must be 128 bits");e=e||64;var g=sjcl.mode.ocb2.A,h=sjcl.bitArray,i=h.k,k=[0,0,0,0],j=g(a.encrypt(c)),l,m,n=sjcl.bitArray.bitLength(b)-e,o=[];d=d||[];for(c=0;c+4<n/32;c+=4){l=i(j,a.decrypt(i(j,b.slice(c,c+4))));k=i(k,l);o=o.concat(l);j=g(j)}m=n-c*32;l=a.encrypt(i(j,[0,0,0,m]));l=i(l,h.clamp(b.slice(c),m));k=i(k,l);k=a.encrypt(i(k,i(j,g(j))));if(d.length)k=
i(k,f?d:sjcl.mode.ocb2.pmac(a,d));if(!h.equal(h.clamp(k,e),h.bitSlice(b,n)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return o.concat(h.clamp(l,m))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.A,e=sjcl.bitArray,f=e.k,g=[0,0,0,0],h=a.encrypt([0,0,0,0]);h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4){h=d(h);g=f(g,a.encrypt(f(h,b.slice(c,c+4))))}b=b.slice(c);if(e.bitLength(b)<128){h=f(h,d(h));b=e.concat(b,[2147483648|0])}g=f(g,b);return a.encrypt(f(d(f(h,d(h))),g))},A:function(a){return[a[0]<<
1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^(a[0]>>>31)*135]}};sjcl.misc.hmac=function(a,b){this.M=b=b||sjcl.hash.sha256;var c=[[],[]],d=b.prototype.blockSize/32;this.l=[new b,new b];if(a.length>d)a=b.hash(a);for(b=0;b<d;b++){c[0][b]=a[b]^909522486;c[1][b]=a[b]^1549556828}this.l[0].update(c[0]);this.l[1].update(c[1])};sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a,b){a=(new this.M(this.l[0])).update(a,b).finalize();return(new this.M(this.l[1])).update(a).finalize()};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E3;if(d<0||c<0)throw sjcl.exception.invalid("invalid params to pbkdf2");if(typeof a==="string")a=sjcl.codec.utf8String.toBits(a);e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,i,k=[],j=sjcl.bitArray;for(i=1;32*k.length<(d||1);i++){e=f=a.encrypt(j.concat(b,[i]));for(g=1;g<c;g++){f=a.encrypt(f);for(h=0;h<f.length;h++)e[h]^=f[h]}k=k.concat(e)}if(d)k=j.clamp(k,d);return k};
sjcl.random={randomWords:function(a,b){var c=[];b=this.isReady(b);var d;if(b===0)throw new sjcl.exception.notready("generator isn't seeded");else b&2&&this.U(!(b&1));for(b=0;b<a;b+=4){(b+1)%0x10000===0&&this.L();d=this.u();c.push(d[0],d[1],d[2],d[3])}this.L();return c.slice(0,a)},setDefaultParanoia:function(a){this.t=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.q[c],h=this.isReady();d=this.F[c];if(d===undefined)d=this.F[c]=this.R++;if(g===undefined)g=this.q[c]=0;this.q[c]=
(this.q[c]+1)%this.b.length;switch(typeof a){case "number":break;case "object":if(b===undefined)for(c=b=0;c<a.length;c++)for(e=a[c];e>0;){b++;e>>>=1}this.b[g].update([d,this.J++,2,b,f,a.length].concat(a));break;case "string":if(b===undefined)b=a.length;this.b[g].update([d,this.J++,3,b,f,a.length]);this.b[g].update(a);break;default:throw new sjcl.exception.bug("random: addEntropy only supports number, array or string");}this.j[g]+=b;this.f+=b;if(h===0){this.isReady()!==0&&this.K("seeded",Math.max(this.g,
this.f));this.K("progress",this.getProgress())}},isReady:function(a){a=this.B[a!==undefined?a:this.t];return this.g&&this.g>=a?this.j[0]>80&&(new Date).valueOf()>this.O?3:1:this.f>=a?2:0},getProgress:function(a){a=this.B[a?a:this.t];return this.g>=a?1["0"]:this.f>a?1["0"]:this.f/a},startCollectors:function(){if(!this.m){if(window.addEventListener){window.addEventListener("load",this.o,false);window.addEventListener("mousemove",this.p,false)}else if(document.attachEvent){document.attachEvent("onload",
this.o);document.attachEvent("onmousemove",this.p)}else throw new sjcl.exception.bug("can't attach event");this.m=true}},stopCollectors:function(){if(this.m){if(window.removeEventListener){window.removeEventListener("load",this.o);window.removeEventListener("mousemove",this.p)}else if(window.detachEvent){window.detachEvent("onload",this.o);window.detachEvent("onmousemove",this.p)}this.m=false}},addEventListener:function(a,b){this.r[a][this.Q++]=b},removeEventListener:function(a,b){var c;a=this.r[a];
var d=[];for(c in a)a.hasOwnProperty[c]&&a[c]===b&&d.push(c);for(b=0;b<d.length;b++){c=d[b];delete a[c]}},b:[new sjcl.hash.sha256],j:[0],z:0,q:{},J:0,F:{},R:0,g:0,f:0,O:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],s:undefined,t:6,m:false,r:{progress:{},seeded:{}},Q:0,B:[0,48,64,96,128,192,0x100,384,512,768,1024],u:function(){for(var a=0;a<4;a++){this.d[a]=this.d[a]+1|0;if(this.d[a])break}return this.s.encrypt(this.d)},L:function(){this.a=this.u().concat(this.u());this.s=new sjcl.cipher.aes(this.a)},T:function(a){this.a=
sjcl.hash.sha256.hash(this.a.concat(a));this.s=new sjcl.cipher.aes(this.a);for(a=0;a<4;a++){this.d[a]=this.d[a]+1|0;if(this.d[a])break}},U:function(a){var b=[],c=0,d;this.O=b[0]=(new Date).valueOf()+3E4;for(d=0;d<16;d++)b.push(Math.random()*0x100000000|0);for(d=0;d<this.b.length;d++){b=b.concat(this.b[d].finalize());c+=this.j[d];this.j[d]=0;if(!a&&this.z&1<<d)break}if(this.z>=1<<this.b.length){this.b.push(new sjcl.hash.sha256);this.j.push(0)}this.f-=c;if(c>this.g)this.g=c;this.z++;this.T(b)},p:function(a){sjcl.random.addEntropy([a.x||
a.clientX||a.offsetX,a.y||a.clientY||a.offsetY],2,"mouse")},o:function(){sjcl.random.addEntropy(new Date,2,"loadtime")},K:function(a,b){var c;a=sjcl.random.r[a];var d=[];for(c in a)a.hasOwnProperty(c)&&d.push(a[c]);for(c=0;c<d.length;c++)d[c](b)}};
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json,f=e.c({iv:sjcl.random.randomWords(4,0)},e.defaults);e.c(f,c);if(typeof f.salt==="string")f.salt=sjcl.codec.base64.toBits(f.salt);if(typeof f.iv==="string")f.iv=sjcl.codec.base64.toBits(f.iv);if(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||typeof a==="string"&&f.iter<=100||f.ts!==64&&f.ts!==96&&f.ts!==128||f.ks!==128&&f.ks!==192&&f.ks!==0x100||f.iv.length<2||f.iv.length>
4)throw new sjcl.exception.invalid("json encrypt: invalid parameters");if(typeof a==="string"){c=sjcl.misc.cachedPbkdf2(a,f);a=c.key.slice(0,f.ks/32);f.salt=c.salt}if(typeof b==="string")b=sjcl.codec.utf8String.toBits(b);c=new sjcl.cipher[f.cipher](a);e.c(d,f);d.key=a;f.ct=sjcl.mode[f.mode].encrypt(c,b,f.iv,f.adata,f.tag);return e.encode(e.V(f,e.defaults))},decrypt:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json;b=e.c(e.c(e.c({},e.defaults),e.decode(b)),c,true);if(typeof b.salt==="string")b.salt=
sjcl.codec.base64.toBits(b.salt);if(typeof b.iv==="string")b.iv=sjcl.codec.base64.toBits(b.iv);if(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||typeof a==="string"&&b.iter<=100||b.ts!==64&&b.ts!==96&&b.ts!==128||b.ks!==128&&b.ks!==192&&b.ks!==0x100||!b.iv||b.iv.length<2||b.iv.length>4)throw new sjcl.exception.invalid("json decrypt: invalid parameters");if(typeof a==="string"){c=sjcl.misc.cachedPbkdf2(a,b);a=c.key.slice(0,b.ks/32);b.salt=c.salt}c=new sjcl.cipher[b.cipher](a);c=sjcl.mode[b.mode].decrypt(c,
b.ct,b.iv,b.adata,b.tag);e.c(d,b);d.key=a;return sjcl.codec.utf8String.fromBits(c)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");c+=d+b+":";d=",";switch(typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+sjcl.codec.base64.fromBits(a[b],1)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type");
}}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");if(!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^([a-z][a-z0-9]*):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");b[d[1]]=d[2]?parseInt(d[2],10):d[1].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(d[3]):unescape(d[3])}return b},c:function(a,b,c){if(a===
undefined)a={};if(b===undefined)return a;var d;for(d in b)if(b.hasOwnProperty(d)){if(c&&a[d]!==undefined&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},V:function(a,b){var c={},d;for(d in a)if(a.hasOwnProperty(d)&&a[d]!==b[d])c[d]=a[d];return c},W:function(a,b){var c={},d;for(d=0;d<b.length;d++)if(a[b[d]]!==undefined)c[b[d]]=a[b[d]];return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.S={};
sjcl.misc.cachedPbkdf2=function(a,b){var c=sjcl.misc.S,d;b=b||{};d=b.iter||1E3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};c=b.salt===undefined?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};

/*** app.dialogs.js ***/
var DlgExport = null;
var DlgOptions = null;
var DlgPassGet = null;
var DlgUserLogin = null;
var DlgUserRegister = null;


// the DOM is ready
//$(function(){
document.addEventListener('DOMContentLoaded', function () {
    DlgExport = new DialogModal({
        width    : 750,
        title    : 'Data export',
        hint     : 'Here you can get all your data unencrypted.',
        dom      : {},

        onCreate : function(){
            this.SetContent(this.dom.text = element('textarea', {className:'export'}));
        },

        /**
         * Open the subscriber
         * master password is accessible
         * decrypt all the data and show it
         */
        EventOpen : function () {
            if ( export_data ) {
                setTimeout(function(){
                    DlgExport.Show();
                    for ( var id_note in export_data.notes ) {
                        // check type
                        if ( export_data.notes[id_note] instanceof Array ) {
                            export_data.notes[id_note].each(function(entry){
                                var name = App.Decode(entry.name, true);
                                var data = App.Decode(entry.data, true);
                                if ( name && data ) {
                                    DlgExport.dom.text.value += name + ': ' + data + "\n";
                                }
                            });
                        }
                        // check type
                        if ( export_data.note_tags[id_note] instanceof Array ) {
                            var tags = [];
                            export_data.note_tags[id_note].each(function(id_tag){
                                if ( export_data.tags[id_tag] ) tags.push(App.Decode(export_data.tags[id_tag], true));
                            });
                            if ( tags.length > 0 ) {
                                DlgExport.dom.text.value += 'tags: ' + tags.join(' ') + "\n";
                            }
                        }
                        DlgExport.dom.text.value += "\n";
                    }
                    // strip
                    DlgExport.dom.text.value = DlgExport.dom.text.value.trim();
                    export_data = null;
                }, 50);
            }
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgExport.Close();
        },

        controls : {
            'Close' : {
                main    : true,
                onClick : function(){
                    //var modal = this.modal;
                    this.modal.Close();
                }
            }
        }
    });


    DlgOptions = new DialogModal({
        width    : 650,
        title    : 'Options',
        hint     : 'Here you can create/restore backups and export all your data.',

        onCreate : function(){
            var file = element('input', {type:'file', name:'file', id:'file-upload', onchange:function(){
                    hint.innerHTML = this.value;
                    fbtn.value = 'File selected';
                }});
            var fbtn = element('input', {type:'button', className:'button long', value:'Choose file ...', onclick:function(){
                    //$(file).trigger('click');
                    file.click();
                }});
            var hint = element('div', {className:'fhint'});

            this.SetContent([
                element('div', {className:'desc'}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
                element('input', {type:'button', className:'button long', value:'Create backup', onclick:function(){
                        window.location = 'user/export/txt';
                    }}),
                element('div', {className:'desc'}, "Please specify your previously downloaded backup package and then press the \"Restore backup\" button. It will upload your backup to the server and replace all your current data with the data from this backup. Warning: this operation can't be reverted!"),
                element('div', {}, [
                    element('input', {type:'button', className:'button long', value:'Restore backup', onclick:function(){
                            var btn = this;
                            btn.value = 'Uploading ...';
                            btn.disabled = true;

                            var data = new FormData();
                            data.append('file', file.files[0]);
                            console.log(data);

                            api.postForm('user/import/txt', data, function ( error, data ) {
                                if ( error ) {
                                    console.error(error);
                                    return;
                                }

                                console.log('user import', data);

                                btn.value = 'Restore backup';
                                btn.disabled = false;
                                if ( data && data.error ) {
                                    alert('Restore from backup failed. Error: ' + data.error);
                                } else {
                                    alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                                    // We must reload the whole page to update data_tags
                                    window.location.reload();
                                }
                            });

                            // $.ajax({
                            //     url: 'user/import/txt',
                            //     data: data,
                            //     cache: false,
                            //     contentType: false,
                            //     processData: false,
                            //     type: 'POST',
                            //     dataType: 'json',
                            //     success: function(data) {
                            //         btn.value = 'Restore backup';
                            //         btn.disabled = false;
                            //         if ( data && data.error ) {
                            //             alert('Restore from backup failed. Error: ' + data.error);
                            //         } else {
                            //             alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                            //             // We must reload the whole page to update data_tags
                            //             window.location.reload();
                            //         }
                            //     }
                            // });
                        }}), ' ',
                    fbtn,
                    hint
                ]),
                element('div', {className:'desc'}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
                element('input', {type:'button', className:'button long', value:'Export data', onclick:function(){
                        var btn = this;

                        btn.value = 'Loading ...';
                        btn.disabled = true;

                        api.get('user/export/plain', function ( error, data ) {
                            if ( error ) {
                                console.error(error);
                                return;
                            }

                            console.log('user export', data);

                            btn.value = 'Export data';
                            btn.disabled = false;
                            export_data = data;
                            App.ExpirePass();
                        });
                    }})
            ]);
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgOptions.Close();
        },

        controls : {
            'Close' : {
                main    : true,
                onClick : function(){
                    this.modal.Close();
                }
            }
        }
    });


    DlgPassGet = new DialogModal({
        width    : 500,
        title    : 'Password',
        hint     : 'Please enter your password to unlock encrypted data.',
        data     : {attempts:0},

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.pass    = element('input', {type:'password', autocomplete:'current-password', className:'line'});
            this.data.linkset = element('a', {className:'combo', title:'click to change the password storing time'});
            onEnterClick(this.data.pass, this.params.controls['Continue'].dom);

            this.data.fldlist.AddRow([
                [
                    element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')
                ],
                [
                    element('input', {type:'text', autocomplete:'username', className:'hidden', value:App.Get('username_last_used', '')}),
                    this.data.pass
                ]
            ], {});
            //this.data.fldlist.AddRow([null, ['remember password for ', this.data.linkset]], {});

            this.SetContent(element('form', {}, this.data.fldlist.dom.table));
        },

        onShow   : function(){
            // new LinkSet(DlgPassGet.data.linkset, {
            //     300:   {next:1200,  title: '5 minutes'},
            //     1200:  {next:3600,  title: '20 minutes'},
            //     3600:  {next:18000, title: '1 hour'},
            //     18000: {next:86400, title: '5 hours'},
            //     86400: {next:300,   title: '1 day'}
            // }, App.Get('pass_store_time', 300));
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgPassGet.Show({escClose:false});
        },

        controls : {
            'Log off' : {
                main    : false,
                onClick : function(){
                    this.modal.Close();
                    SignOut();
                }
            },
            'Continue' : {
                main    : true,
                onClick : function(){
                    var modal = this.modal;
                    var pass  = modal.data.pass.value;
                    // check pass
                    if ( App.CheckPass(pass) ) {
                        initData(data_user, function () {
                            //App.Set('pass_store_time', modal.data.linkset.value, true);
                            App.SetPass(pass);
                            modal.data.attempts = 0;
                            // reset value
                            modal.data.pass.value = '';
                            modal.Close();
                            //NoteFilter.SetFocus();
                        });
                        // if ( modal.data.linkset.value ) {
                        //     //fb(modal.data.linkset.value);
                        //     App.Set('pass_store_time', modal.data.linkset.value, true);
                        //     App.SetPassTime(modal.data.linkset.value);
                        // }
                    } else {
                        modal.data.pass.focus();
                        modal.data.attempts++;
                        if ( modal.data.attempts == 1 )
                            modal.SetMessage('Password is invalid!');
                        else
                            modal.SetMessage(['Password is invalid!', element('br'), 'Logged attempts: ' + modal.data.attempts]);
                    }
                }
            }
        }
    });


    DlgUserLogin = new DialogModal({
        width : 500,
        title : 'Authentication',
        hint  : "Welcome back! Please authorize.",
        data  : {attempts:0},

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.name = element('input', {className:'line', autocomplete:'username', type:'text', value:App.Get('username_last_used', '')});
            this.data.pass = element('input', {className:'line', autocomplete:'current-password', type:'password'});

            onEnterFocus(this.data.name, this.data.pass);
            onEnterClick(this.data.pass, this.params.controls['Login'].dom);

            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'username'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your name or email')],
                this.data.name
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')],
                this.data.pass
            ], {});
            this.SetContent(element('form', {}, this.data.fldlist.dom.table));
        },

        controls : {
            'Cancel' : {
                onClick : function(){
                    this.modal.Close();
                }
            },
            'Login' : {
                main    : true,
                onClick : function(){
                    var modal = this.modal;
                    // get name and pass
                    var username = modal.data.name.value;
                    var password = modal.data.pass.value;
                    // verification
                    if ( username && password ) {
                        // ajax request
                        username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                        password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
                        // block all inputs and buttons
                        modal.EnableControls(false);
                        modal.data.name.disabled = true;
                        modal.data.pass.disabled = true;
                        if ( modal.data.attempts > 1 ) {
                            modal.SetLoading("Sending server request ...");
                        }

                        api.post('user/auth', {name: username, pass: password, mode: 'login'}, function ( error, data ) {
                            if ( error ) {
                                console.error(error);
                                modal.SetMessage('Request error.', 'error');
                                return;
                            }

                            console.log('user auth', data);

                            if ( data ) {
                                // check returned data
                                if ( data && data.id ) {
                                    initData(data, function () {
                                        // save user name of last login
                                        App.Set('username_last_used', modal.data.name.value, true);
                                        App.SetPass(modal.data.pass.value);
                                        // reset values
                                        modal.data.name.value = '';
                                        modal.data.pass.value = '';
                                        //modal.SetHint();
                                        //modal.SetContent();
                                        //$(modal.dom.footer).hide();
                                        //modal.SetMessage(['Authentication was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                        // redirect to home with delay
                                        //setTimeout(function(){
                                        //window.location.href = window.location.href;
                                        modal.Close();
                                        //NoteFilter.SetFocus();

                                        pageInit.style.display = 'none';
                                        //pageMain.style.display = 'block';
                                        //}, 500);
                                    });
                                    return;
                                } else {
                                    modal.data.attempts++;
                                    if ( modal.data.attempts === 1 ) {
                                        modal.SetMessage('Invalid user name or password.', 'error');
                                    } else {
                                        modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                    }
                                }
                            } else {
                                modal.SetMessage('Invalid response from the server.');
                            }
                            // unblock all inputs and buttons
                            modal.EnableControls(true);
                            modal.data.name.disabled = false;
                            modal.data.pass.disabled = false;
                        });
                    } else {
                        modal.SetMessage('Empty user name or password.');
                    }
                }
            }
        }
    });


    DlgUserRegister = new DialogModal({
        width : 550,
        title : 'Registration',
        hint  : "You are going to register in the system. Please note that the password you are going to enter will be used not only to login but also to encrypt/decrypt your data so choose a strong and long password. Your registration data won't be sent to the server in plain unencrypted form. Only hashes are stored on the server. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you so please keep that password utmost safe.",
        data  : {attempts:0},

        onShow : function(){
            var self = this;

            api.get('user/captcha', function ( error, data ) {
                if ( error ) {
                    console.error(error);
                    return;
                }

                console.log('user captcha', data);

                self.data.cimg.src = data.src;
            });
        },

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.name  = element('input', {type:'text', autocomplete:'username', className:'line'});
            this.data.pass1 = element('input', {type:'password', autocomplete:'new-password', className:'line'});
            this.data.pass2 = element('input', {type:'password', autocomplete:'new-password', className:'line'});
            this.data.cimg  = element('img',   {width:161, height:75});
            this.data.code  = element('input', {type:'text', autocomplete:'off', className:'line cline', title:'case insensitive code above'});

            onEnterFocus(this.data.name,  this.data.pass1);
            onEnterFocus(this.data.pass1, this.data.pass2);
            onEnterFocus(this.data.pass2, this.data.code);
            onEnterClick(this.data.code,  this.params.controls['Register'].dom);

            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'username'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your name or email')],
                this.data.name
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')],
                this.data.pass1
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'confirm password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key once more')],
                this.data.pass2
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'captcha'),
                    element('br'),
                    element('span', {className:'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
                [this.data.cimg, element('br'), this.data.code]
            ], {});
            //console.log(this.dom.footer);
            //$(this.dom.footer).hide();
            this.dom.footer.classList.add('hidden');
            var self = this;
            this.SetContent(element('a', {}, "I understand that my password can't be restored and will keep it safe", {onclick: function () {
                var container = document.getElementById('simplemodal-container');

                self.SetHint('Keep your password safe - you are the only one who knows it so there is no way to restore it!');
                 //$('#simplemodal-container').css('top', ($('#simplemodal-container').css('top').replace('px','') - 80) + 'px');
                container.style.top = parseInt(container.style.top, 10) - 100 + 'px';
                self.SetContent(element('form', {}, self.data.fldlist.dom.table));
                //$(self.dom.footer).show();
                self.dom.footer.classList.remove('hidden');
                self.data.name.focus();
            }}));
        },

        controls : {
            'Cancel' : {
                onClick : function(){
                    this.modal.Close();
                }
            },
            'Register' : {
                main    : true,
                onClick : function(){
                    var modal = this.modal;
                    // get name and pass
                    var password, username = modal.data.name.value;
                    var pass1 = modal.data.pass1.value;
                    var pass2 = modal.data.pass2.value;
                    // verification
                    if ( username && pass1 && pass2 && pass1 == pass2 ) {
                        // make hash
                        username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                        password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass1));
                        // block all inputs and buttons
                        modal.EnableControls(false);
                        modal.data.name.disabled = true;
                        modal.data.pass1.disabled = true;
                        modal.data.pass2.disabled = true;
                        if ( modal.data.attempts > 1 ) {
                            modal.SetLoading("Sending server request ...");
                        }

                        api.post('user/auth', {name: username, pass: password, code: modal.data.code.value, mode: 'register'}, function (error, data ) {
                            if ( error ) {
                                console.error(error);
                                modal.SetMessage('Request error.', 'error');
                                return;
                            }

                            console.log('user auth', data);

                            if ( data ) {
                                if ( data.code !== false ) {
                                    // check returned data
                                    if ( data && data.id ) {
                                        initData(data, function () {
                                            // save user name for future logins
                                            App.Set('username_last_used', modal.data.name.value, true);
                                            App.SetPass(password);
                                            // reset values
                                            modal.data.name.value = '';
                                            modal.data.pass1.value = '';
                                            modal.data.pass2.value = '';
                                            //modal.SetHint();
                                            //modal.SetContent();
                                            //$(modal.dom.footer).hide();
                                            //modal.dom.footer.classList.add('hidden');
                                            //modal.SetMessage(['Registration was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                            // redirect to home with delay
                                            //setTimeout(function(){
                                            //window.location.href = window.location.href;
                                            modal.Close();

                                            pageInit.style.display = 'none';
                                            pageMain.style.display = 'block';
                                            //}, 500);
                                        });
                                        return;
                                    } else {
                                        modal.data.attempts++;
                                        if ( modal.data.attempts === 1 )
                                            modal.SetMessage(['Invalid user name or password.', element('br'), 'There maybe already a user with the same name or there are some technical problems on the server.'], 'error');
                                        else
                                            modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                    }
                                } else {
                                    modal.SetMessage('Invalid captcha code. Please correct it and try once again.');
                                }
                            } else {
                                modal.SetMessage('Invalid responce from the server.');
                            }
                            // unblock all inputs and buttons
                            modal.EnableControls(true);
                            modal.data.name.disabled = false;
                            modal.data.pass1.disabled = false;
                            modal.data.pass2.disabled = false;
                        });
                    } else {
                        modal.SetMessage("Empty one of the required field or passwords don't match.");
                    }
                }
            }
        }
    });


    App.Subscribe(DlgExport);
    App.Subscribe(DlgOptions);
    App.Subscribe(DlgPassGet);
});
//});

/*** app.fldlist.js ***/
/**
 * Table manager for fields
 * @param params list of configuration parameters
 *     cols - name of table columns (also class names for corresponding cells)
 *     attr - table attributes overwriting the default ones
 */
function FieldList ( params ) {
	this.params = params;

	// html elements
	this.dom  = {};

	this.SetCols = function( cols ){
		this.params.cols = cols;
	};

	this.AddRow = function ( cells, attr ) {
		if ( cells && cells instanceof Array && cells.length == this.params.cols.length ) {
			var cell = null;
			var row  = this.dom.table.insertRow(-1);
			elattr(row, attr);
			for ( var i = 0; i < this.params.cols.length; i++ ) {
				cell = row.insertCell(-1);
				cell.className = this.params.cols[i];
				elchild(cell, cells[i]);
				elattr(cell, this.params.cols[i]);
			}
			return row;
		}
		return false;
	};
	
	this.AddDivider = function ( cells, attr ) {
		var row  = this.dom.table.insertRow(-1);
		var cell = row.insertCell(-1);
		elattr(cell, {colspan:this.params.cols.length});
		elchild(cell, element('div', {className:'divider'}));
	};

	this.Init = function () {
		this.dom.table = element('table', {className:'fldlist'});
		elattr(this.dom.table,this.params.attr);
	};
	this.Init();
}

/*** app.js ***/
/**
 * Main application object
 */

var App = new function () {
	/* @var for limited scopes */
	var self = this;

	/* @var list of vars */
	this.data = {};

	/* @var private primary password (accessed only indirectly) */
	var pass = null;

	/* @var hash of the given pass (if not set then the pass was not created) */
	var hash = null;

	/* @var time in seconds for pass caching (default 5 mins) */
	//var time = 300;

	/* @var encode/decode default configuration */
	var params = {ks:256,ts:128,mode:'ccm',cipher:'aes'};

	/* @var list of encryption core subsribers to be notified on open/close events */
	this.subscribers = [];

	/** ??????????
	 * Callback function for primary password request
	 * shuld be set on application level
	 */
	this.RequestPass = null;

	// lists for cached enc/dec values
	// to prevent unnecessary ecnryption/decryption
	// filling optionally and clearing on master password expiration
	var cache_enc = {};  // "plain_text":'***encoded string***' list
	var cache_dec = {};  // '***encoded string***':"plain_text" list

	/**
	 * Set global variable
	 * @param name the name of value to store
	 * @param value the variable value
	 * @param persistent flag to store in the local storage permanently
	 */
	this.Set = function ( name, value, persistent ) {
		if ( persistent ) {
			localStorage.setItem(name, value);
		} else {
			this.data[name] = value;
		}
	};

	/**
	 * Get global variable
	 * @param name the name of value to retrive
	 * @param ifnull default value if variable is not set
	 */
	this.Get = function ( name, ifnull ) {
		return this.data[name] || localStorage.getItem(name) || ifnull;
	};

	/**
	 * Calculate the hash from given value
	 * algorithm: sha256
	 */
	this.CalcHash = function ( value ) {
		return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
	};

	/**
	 * Check if hash set
	 */
	this.HasHash = function () {
		return ( hash != null && hash != '' );
	};

	/**
	 * Check if pass set
	 */
	this.HasPass = function () {
		return ( pass != null && pass != '' );
	};

	/**
	 * Check if pass set and matches the hash
	 * @param value the master password to check
	 */
	this.CheckPass = function ( value ) {
		// check input
		if ( !this.HasHash() || !value ) {
		    return false;
        }
		// comparing
		return ( hash == this.CalcHash(value) );
	};

	/**
	 * Set the hash of private pass var
	 * @param value the master password hash value
	 */
	this.SetPassHash = function ( value ) {
	    //console.log('SetPassHash', value);
		// check input
		if ( !value ) return false;
		// set and return
		return hash = value;
	};

	/**
	 * Set the time to remember the password
	 * @param newtime the time in seconds for pass caching
	 */
	// this.SetPassTime = function ( newtime ) {
	// 	// check input
	// 	newtime = parseInt(newtime, 10);
	// 	if ( !newtime || newtime == NaN || newtime <= 0 ) return false;
	// 	time = newtime;
	// 	return true;
	// };

	/**
	 * Set the private pass var and start timer for clearing it in some time
	 * @param value the master password to check
	 */
	this.SetPass = function ( value ) {
        //console.log('SetPass', value);
		// check input
		if ( !value ) {
		    return false;
        }
		// set the private password
		pass = value;
		// calculate and set hash if necessary
		if ( !this.HasHash() ) {
		    this.SetPassHash(this.CalcHash(value));
        }
        //console.log('pass will expire in', time);
		// set clearing timer
		//setTimeout(function(){self.ExpirePass()}, time * 1000);
		// notify all the subsribers that we have the pass
		for ( var i in this.subscribers ) {
			if ( self.subscribers[i].EventOpen && self.subscribers[i].EventOpen instanceof Function ) {
				// open the subscriber - decrypt all the data and show it
				self.subscribers[i].EventOpen();
			}
		}
		// return password hash value
		return hash;
	};

	/**
	 *
	 */
	this.ExpirePass = function () {
        console.log('master password expire');
		// notify all the subsribers about clearing
		for ( var i in self.subscribers ) {
			if ( typeof self.subscribers[i].EventClose === 'function' ) {
				// close the subscriber - clear all the decrypted data
				self.subscribers[i].EventClose();
			}
		}
		// clear the master pass
		pass = null;
		// clear cache
		cache_enc = {};
		cache_dec = {};
		// ask for pass
		if ( self.RequestPass && self.RequestPass instanceof Function ) {
			self.RequestPass.call();
		}
	};

	/**
	 * Encrypt the given text and pass the result to callback function
	 * @param data data for encryption
	 * @param cache optional bool flag
	 *
	 */
	this.Encode = function ( data, cache ) {
		// password is present and not empty input
		if ( pass && data !== false && data !== null ) {
			// try to get from cache
			if ( cache && cache_enc[data] ) return cache_enc[data];
			// protected block
			try {
				var enc = sjcl.encrypt(pass, data, params);
				// fill cache if necessary
				if ( cache ) {
					cache_enc[data] = enc;
					cache_dec[enc] = data;
				}
				return enc;
			} catch(e) {
				console.trace();
                console.log('encrypt failure', e, data);
			}
		}
		return false;
	};
//	this.Encode = function ( text, callback ) {
//		// temporary pass storing not to loose in on timer clearing
//		var ptmp = pass;
//		// password is cached so do encryption immediately
//		if ( ptmp ) {
//			callback.call(this, sjcl.encrypt(ptmp, text, params));
//			return true;
//		} else {
//			// ask for password and then do encryption
//			if ( this.RequestPass && this.RequestPass instanceof Function ) {
//				this.RequestPass.call(this, function(){
//					// pass encryption to the callback
//					callback.call(this, sjcl.encrypt(pass, text, params));
//					return true;
//				});
//			}
//			return false;
//		}
//	}

	/**
	 * Decrypt the given text and pass the result to callback function
	 * @param data data to be decrypted
	 * @param cache optional bool flag
	 */
	this.Decode = function ( data, cache ) {
		// password is present and not empty input
		if ( pass && data ) {
			// try to get from cache
			if ( cache && cache_dec[data] ) return cache_dec[data];
			// protected block
			try {
				var dec = sjcl.decrypt(pass, data);
				// fill cache if necessary
				if ( cache ) {
					cache_dec[data] = dec;
					cache_enc[dec] = data;
				}
				return dec;
			} catch(e) {
				console.trace();
                console.log('decrypt failure', e, data);
			}
		}
		return false;
	};
//	this.Decode = function ( text, callback ) {
//		// temporary pass storing not to loose in on timer clearing
//		var ptmp = pass;
//		// password is cached so do encryption immediately
//		if ( ptmp ) {
//			callback.call(this, sjcl.decrypt(ptmp, text));
//			return true;
//		} else {
//			// ask for password and then do encryption
//			if ( this.RequestPass && this.RequestPass instanceof Function ) {
//				this.RequestPass.call(this, function(){
//					// pass decryption to the callback
//					callback.call(this, sjcl.decrypt(pass, text));
//					return true;
//				});
//			}
//			return false;
//		}
//	}

	this.Subscribe = function ( component ) {
		this.subscribers.push(component);
	}
};

/*** app.main.js ***/
// reference and dictionary data
//var data_entry_types      = <?php //echo cache::db_entry_types() ?>;
//var data_templates        = <?php //echo cache::db_templates() ?>;
//var data_template_entries = <?php //echo cache::db_template_entries() ?>;

// compacted list of all encoded tags with links and use counters
//var data_tags = <?php //echo cache::db_tags() ?>;
// need to correct type if empty
//if ( data_tags.data.length != undefined && data_tags.data.length == 0 )
//	{ data_tags.data = {}; data_tags.defn = {name:0, links:1, uses:2}; }
// decoded to these two lists
//var data_tags_nmlist = {}; // {note:1, site:2, email:3}
//var data_tags_idlist = {}; // {1:note, 2:site, 3:email}
// they are filling on page loading and on note creation
// if there are some new tags

// contains encrypted data for export
// if not null an export window appears
var export_data = null;

// list of tag names with title images
var icon_tags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

var pageInit = document.getElementById('pageInit');
var pageMain = document.getElementById('pageMain');


function status ( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json ( response ) {
    return response.json();
}

var api = {
    defaults: {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    },

    get: function ( uri, callback ) {
        fetch(uri, api.defaults)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    post: function ( uri, data, callback ) {
        fetch(uri, Object.assign({}, api.defaults, {method: 'post', body: JSON.stringify(data)}))
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    postForm: function ( uri, data, callback ) {
        var config = Object.assign({}, api.defaults, {method: 'post', body: data, headers: {
                'Accept': 'application/json'
            }});

        fetch(uri, config)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    }
};


// logoff
function SignOut () {
    api.post('user/signout', null, function ( error, data ) {
        if ( error ) {
            console.error(error);
            return;
        }

        // true or false
        console.log('signout', data);

        location.reload();
    });
}


function initData ( data, callback ) {
    window.data_user = data;

    api.get('user/data', function ( error, data ) {
        if ( error ) {
            console.error(error);
            callback();
            return;
        }

        window.data_entry_types = data.entry_types;
        window.data_templates = data.templates;
        window.data_template_entries = data.template_entries;

        // compacted list of all encoded tags with links and use counters
        window.data_tags = data.tags;
        // need to correct type if empty
        // if ( !data_tags.data.length ) {
        //     data_tags.data = {};
        //     data_tags.defn = {name:0, links:1, uses:2};
        // }
        // decoded to these two lists
        window.data_tags_nmlist = {}; // {note:1, site:2, email:3}
        window.data_tags_idlist = {}; // {1:note, 2:site, 3:email}
        // they are filling on page loading and on note creation
        // if there are some new tags

        // main components initialization
        NoteFilter.Init({handle:document.querySelector('div.notefilter')});
        NoteList.Init({handle:document.querySelector('div.notelist')});
        TemplateList.Init({handle:document.querySelector('div.templatelist')});
        NoteEditor.Init({handle:document.querySelector('div.noteeditor')});

        // to receive password change events
        App.Subscribe(TagManager);
        App.Subscribe(TemplateList);
        App.Subscribe(NoteList);
        App.Subscribe(NoteFilter);
        App.Subscribe(NoteEditor);

        // show
        pageMain.style.display = 'block';

        callback();
    });
}


// start entropy collection
sjcl.random.startCollectors();
// check each 5 sec if has enough
var collect_timer = setInterval(function(){
    if ( sjcl.random.isReady() ) {
        console.log('entropy collected');
        // has enough
        sjcl.random.stopCollectors();
        // stop checking
        clearInterval(collect_timer);
    }
}, 5000);


api.get('user/info', function ( error, data ) {
    if ( error ) {
        console.error(error);
        return;
    }

    console.log('user info', data);

    if ( data ) {
        window.data_user = data;

        // apply current pass hash
        App.SetPassHash(data.hash);
        // ask for a pass
        DlgPassGet.Show({escClose:false});
    } else {
        pageInit.style.display = 'block';
    }
});

/*** app.modal.js ***/
/**
 * Modal window wrapper
 */

function DialogModal ( params ) {
	this.params = params;
	this.data   = params.data || {};

	// html elements of the dialog
	this.dom  = {};

	this.SetWidth = function ( value ) {
		this.dom.body.style.width = value + 'px';
	};

	this.Show = function ( params ) {
		params = params || {};
		if ( this.params.onShow && this.params.onShow instanceof Function ) {
			this.params.onShow.call(this);
		}
		$(this.dom.main).modal(params);
	};

	this.Close = function ( delay ) {
		if ( delay ) {
			var self = this;
			setTimeout(function(){
				$.modal.close();
				self.Reset();
			}, parseInt(delay, 10));
		} else {
			$.modal.close();
			this.Reset();
		}
	};

	this.Reset = function () {
		this.SetMessage();
	};

	this.SetTitle = function ( hint ) {

	};

	this.SetHint = function ( hint ) {
		if ( hint ) {
			if ( this.dom.hint.childNodes.length == 0 ) {
				this.dom.hint.appendChild(element('div', {className:'info'}, hint));
			}
			this.dom.hint.childNodes[0].innerHTML = hint;
			this.dom.hint.style.display = '';
		} else {
			this.dom.hint.style.display = 'none';
		}
	};

	this.SetMessage = function ( text, type ) {
		if ( text ) {
			type = type || 'warning';
			elchild(elclear(this.dom.message), element('div', {className:'message ' + type}, text));
			this.dom.message.style.display = '';
		} else {
			this.dom.message.style.display = 'none';
		}
	};

	this.SetLoading = function ( text ) {
		this.SetMessage(text, 'loading');
	};

	this.SetContent = function ( content ) {
		if ( content ) {
			elclear(this.dom.content);
			elchild(this.dom.content, content);
		} else {
			this.dom.content.style.display = 'none';
		}
	};

	this.EnableControls = function ( state ) {
		if ( this.params.controls ) {
			for ( var cname in this.params.controls ) {
				this.params.controls[cname].dom.disabled = !state;
			}
		}
	};

	this.Init = function () {
		this.dom.body  = element('div', {className:'body'}, [
			this.dom.title   = element('div', {className:'block title'}, this.params.title),
			this.dom.hint    = element('div', {className:'block hint'}),
			this.dom.content = element('div', {className:'block content'}),
			this.dom.message = element('div', {className:'block info'}),
			this.dom.footer  = element('div', {className:'block footer'})
		]);

		this.dom.main = element('div', {className:'dialogmodal'}, this.dom.body);

		if ( this.params.width ) this.SetWidth(this.params.width);

		this.SetHint(this.params.hint);
		this.SetMessage(this.params.message);

		if ( this.params.controls ) {
			for ( var cname in this.params.controls ) {
				var cdata = this.params.controls[cname];
				cdata.dom = element('input', {type:'button', value:cname, className:'button'});
				// for inline indirect future use
				cdata.dom.modal = this;
				// default action
				if ( cdata.main ) cdata.dom.className += ' bold';
				// set callback
				if ( cdata.onClick && cdata.onClick instanceof Function ) {
					cdata.dom.onclick = cdata.onClick;
				}
				this.dom.footer.appendChild(cdata.dom);
			}
		}

		if ( this.params.onCreate && this.params.onCreate instanceof Function ) {
			this.params.onCreate.call(this);
		}

		if ( this.params.EventClose && this.params.EventClose instanceof Function ) {
			this.EventClose = this.params.EventClose;
		}
		if ( this.params.EventOpen && this.params.EventOpen instanceof Function ) {
			this.EventOpen = this.params.EventOpen;
		}

		if ( this.params.content ) {
			this.params.content.style.display = '';
			this.dom.content.appendChild(this.params.content);
		}
	};
	this.Init();
}

/*** app.note.editor.js ***/
/**
 * Main module to work with single note
 * creation, edit or view
 */
var NoteEditor = new function () {
	// for limited scopes
	var self = this;

	// input data length limit
	var maxlength_tags  = 1024,  // total length of all tags in the input field
		maxlength_title = 256;   // entry name max length

	// flag to indicate if there are some changes
	// note entries was moved or type is changed
	// entry added or deleted
	var changed = false;

	// messages
	var msg_has_changes = 'The current note has unsaved changes. Do you really want to continue and lost these changes?';

	// hover hints
	var hint_back  = 'Will discard all your current changes and show the template list.';
	var hint_new   = 'Will create a new note based on the current one.';
	var hint_clone = 'Will save the current note as a copy.';
	var hint_save  = 'Will save all your changes. You can also press Ctrl+Enter';

	// component state flag
	// true - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		// open if there is a note
		if ( this.data ) {
			// iterate all entries
			for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
				//var entry = this.dom.entries.childNodes[i];
				with ( this.dom.entries.childNodes[i] ) {
					// set post data
					post.name_dec = App.Decode(post.name);
					post.data_dec = App.Decode(post.data);
					// set current data (taking either from post or decrypt)
					data.name_dec = ( post.name == data.name ) ? post.name_dec : App.Decode(data.name);
					data.data_dec = ( post.data == data.data ) ? post.data_dec : App.Decode(data.data);
					// enable all inputs
					dom.name.disabled = dom.data.disabled = false;
					// change input to decrypted values
					dom.name.value = data.name_dec;
					dom.data.value = data.data_dec;
					// update counter value
					dom.data.onkeyup();
				}
			}
			EnableControls(true);
			// tags block
			this.dom.tags.input.disabled = false;
			this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags).toLowerCase();
			// fill autocompleter
			var data = [];
			// prepare all tags
			for ( var tid in data_tags_idlist ) data.push([data_tags_idlist[tid], tid]);
			$(this.dom.tags.input).data('autocompleter').options.data = data;
		}
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment and there is a note
		if ( this.data && this.open ) {
			// iterate all entries
			for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
				//var entry = this.dom.entries.childNodes[i];
				with ( this.dom.entries.childNodes[i] ) {
					// if data changed than reassing (taking either from post or encrypt)
					if ( data.name_dec != dom.name.value ) data.name = ( post.name_dec == dom.name.value ) ? post.name : App.Encode(dom.name.value);
					if ( data.data_dec != dom.data.value ) data.data = ( post.data_dec == dom.data.value ) ? post.data : App.Encode(dom.data.value);
					// clear post and current data
					post.name_dec = data.name_dec = null;
					post.data_dec = data.data_dec = null;
					// disable all inputs
					dom.name.disabled = dom.data.disabled = true;
					// change input to default hidden values
					dom.name.value = '********';
					dom.data.value = '[encrypted data]';
					// hide counter value
					dom.counter.innerHTML = '';
					// hide history block and clear content
					dom.history.style.display = 'none';
					elclear(dom.history);
					delete data.history;
				}
			}
			EnableControls(false);
			// tags block
			this.dom.tags.input.disabled = true;
			this.data.tags = TagManager.Str2IDs(this.dom.tags.input.value.toLowerCase());
			this.dom.tags.input.value = '[encrypted tags]';
			// clear autocompleter
			$(this.dom.tags.input).data('autocompleter').options.data = [];
		}
		// component state flag
		this.open = false;
	};

	/**
	 * Quick check if the tag input changed since the last post
	 * @param data tags string
	 * @param post array of tag ids posted
	 * @return bool flag of change
	 */
	var TagsChanged = function ( data, post ) {
		// prepare input
		data = TagManager.Str2Names(data);
		post = post || [];
		// different size
		if ( data.length != post.length ) return true;
		// check parsed string
		for ( var id = null, i = 0; i < data.length; i++ ) {
			id = data_tags_nmlist[data[i]];
			// new tag not posted to the server
			if ( !id ) return true;
			// posted tags not include this id
			if ( !post.has(id) ) return true;
		}
		return false;
	};

	/**
	 * Collect all the note and entries data
	 */
	var GetData = function () {
		// local vars
		var	i = 0, entry = null, deleted = [], ids = [];

		// get the list of tags ids and names
		self.data.tags = TagManager.Str2IDs(self.dom.tags.input.value.toLowerCase());
		// tags changed since the last post
		if ( self.data.tags.join() != self.post.tags.join() ) {
			// drop flag or copy of tags
			self.post.tags = ( self.data.tags.length == 0 ) ? 0 : self.data.tags.slice();
		} else {
			// no changes so nothing to be sent
			delete self.post.tags;
		}

		// clear previous data
		self.post.entries = [];

		// fill the list of entries to be deleted
		for ( i = 0; i < self.dom.entries.childNodes.length; i++ )
			if ( self.dom.entries.childNodes[i].deleted ) deleted.push(self.dom.entries.childNodes[i]);

		// remove deleted entries
		for ( i = 0; i < deleted.length; i++ ) {
			// edit mode
			if ( deleted[i].data.id ) ids.push(deleted[i].data.id);
			// remove from dom
			self.dom.entries.removeChild(deleted[i]);
		}
		// there are some deleted entry ids
		if ( ids.length > 0 ) self.post.deleted = ids;

		//TODO: add real entries check (there maybe no one left)

		// iterate all entries
		for ( i = 0; i < self.dom.entries.childNodes.length; i++ ) {
			entry = self.dom.entries.childNodes[i];
			// collected data
			var post = {};
			// edit mode
			if ( entry.data.id ) post.id = entry.data.id;
			// if type changed since the last save or new mode
			if ( entry.post.id_type != entry.data.id_type || entry.data.id == undefined )
				post.id_type = entry.data.id_type;
			// entry name changed or new mode
			if ( entry.post.name_dec != entry.dom.name.value || entry.data.id == undefined ) {
				entry.data.name = post.name = ( entry.data.name_dec == entry.dom.name.value ) ? entry.data.name : App.Encode(entry.dom.name.value);
				entry.data.name_dec = entry.dom.name.value;
			}
			// entry value changed or new mode
			if ( entry.post.data_dec != entry.dom.data.value || entry.data.id == undefined ) {
				entry.data.data = post.data = ( entry.data.data_dec == entry.dom.data.value ) ? entry.data.data : App.Encode(entry.dom.data.value);
				entry.data.data_dec = entry.dom.data.value;
			}
			// type change block
			entry.dom.type.style.display = 'none';
			// hide history block
			entry.dom.history.style.display = 'none';
			// history block clear content
			elclear(entry.dom.history);
			delete entry.data.history;

			self.post.entries.push(post);
		}

		console.log('note data to post', self.post);

		return self.post;
	};

	/**
	 * Saves all note changes
	 * 1. collects note and entries data
	 * 2. does ajax request to save
	 * 3. processing the response
	 */
	this.Save = function () {
		// do nothing if there are no modifications
		if ( !this.HasChanges() ) {
		    return;
        }

		// disable controls to prevent double posting
		EnableControls(false);
		//SetTitleIcon('img/message.loading.gif');

		api.post('note/save/' + (this.data.id || ''), GetData(), function ( error, data ) {
            if ( error ) {
                console.error(error);
            }

            console.log('note save', data);

			if ( data && data.id && data.entries ) {
				// the note is just created
				var is_new = !self.data.id ? true : false;
				// switch to edit mode if necessary
				self.data.id = data.id;
				// data container for entries
				var entries = [];
				// iterate all entries
				for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
					var entry = self.dom.entries.childNodes[i];
					// update data
					entry.data.id       = data.entries[i].id;
					entry.post.name     = entry.data.name;
					entry.post.name_dec = entry.data.name_dec;
					entry.post.data     = entry.data.data;
					entry.post.data_dec = entry.data.data_dec;
					entry.post.id_type  = entry.data.id_type;
					// clear color from inputs
					//$(entry.dom.name).removeClass('changed');
					entry.dom.name.classList.remove('changed');
					//$(entry.dom.data).removeClass('changed');
					entry.dom.data.classList.remove('changed');
					//$(self.dom.tags.input).removeClass('changed');
					self.dom.tags.input.classList.remove('changed');

					// change icons according to status
					if ( data.entries[i].changed ) entry.dom.icon.src = 'img/field_flag_ok.png';
					if ( data.entries[i].added )   entry.dom.icon.src = 'img/field_flag_add.png';

					// rebuild global data in case some items deleted or added
					entries.push(entry.data);
				}
				self.data.entries = entries;
				// tags processed
				if ( data.tags ) {
					// there are tags in response and correspond with sent ones
					if ( data.tags instanceof Array && self.data.tags.length == data.tags.length ) {
						for ( i = 0; i < data.tags.length; i++ ) {
							// check if the ecrypted string
							if ( isNaN(self.data.tags[i]) ) {
								// add new tag id and enc/dev values to the global lookup tables
								TagManager.Add(data.tags[i], self.data.tags[i]);
								// replace the ecrypted string with received id
								self.data.tags[i] = data.tags[i];
							}
						}
					}
					// show ok image
					self.dom.tags.icon.src = 'img/field_flag_ok.png';
				}
				// fill current tags data
				self.dom.tags.input.value = TagManager.IDs2Str(self.data.tags).toLowerCase();
				// confirm posted tags
				self.post.tags = self.data.tags.slice();
				// clear deleted entries list
				delete self.post.deleted;
				// timer to set default images
				setTimeout(function(){
					// iterate all entries
					for ( var i = 0; i < self.dom.entries.childNodes.length; i++ )
						with ( self.dom.entries.childNodes[i] )
							dom.icon.src = 'img/field_' + data_entry_types.data[data.id_type][data_entry_types.defn.name] + '.png';
					self.dom.tags.icon.src = 'img/field_tag.png';
				}, 2000);

				// flag reset
				changed = false;

				NoteFilter.NotesRequest();
//				if ( is_new ) {
//					self.data.ctime = Math.round(new Date().getTime() / 1000);
//					NoteList.NoteCreate(self.data);
//				} else {
//					self.data.mtime = Math.round(new Date().getTime() / 1000);
//					//NoteList.dom.notes.removeChild(NoteList.dom.notes.active);
//					NoteList.NoteUpdate(self.data);
//				}

//				if ( NoteList.dom.notes.active ) {
//					var note = NoteList.dom.notes.active;
//					if ( NoteList.NoteVisible(note) ) NoteList.DrawNoteTags(note);
//				}
			} else {
				// invalid response from the server
			}
			// enable controls
			EnableControls(true);
			//$(self.dom.controls).removeClass('loading');
			// change icon if necessary
			SetTitleIcon();
			//self.Escape();
		});
	};

	/**
	 * Control button change type
	 * @param entry pointer to the entry data
	 */
	var EntryBtnConfig = function ( entry ) {
		// crete list if not exist
		if ( entry.dom.type.childNodes.length == 0 ) {
			var list = table(1,0, {className:'list'}, {
				// set old desc
				onmouseout: function(){entry.dom.desc.innerHTML = entry.dom.desc.value;}
			});

			var cell = null;
			// build type list
			for ( var id in data_entry_types.data ) {
				cell = element('td', {className:entry.data.id_type == id ? 'current' : 'item'}, data_entry_types.data[id][data_entry_types.defn.name], {
					// set desc on mouse over action
					onmouseover: function(){entry.dom.desc.innerHTML = this.desc;},
					onclick: function(){
						if ( this.className == 'item' ) {
							// change name if default
							if ( entry.dom.name.value == data_entry_types.data[entry.data.id_type][data_entry_types.defn.name] ) {
								entry.dom.name.value = data_entry_types.data[this.type][data_entry_types.defn.name];
							}
							// prepare type, name and value
							entry.data.id_type  = this.type;
							entry.data.name     = App.Encode(entry.dom.name.value);
							entry.data.name_dec = entry.dom.name.value;
							entry.data.data     = App.Encode(entry.dom.data.value);
							entry.data.data_dec = entry.dom.data.value;
							// clone entry and do some sync
							var entry_new  = EntryCreate(entry.data);
							entry_new.post = entry.post;
							entry_new.dom.name.onchange();
							entry_new.dom.data.onchange();
							// insert and remove
							self.dom.entries.insertBefore(entry_new, entry);
							self.dom.entries.removeChild(entry);
							// set flag
							changed = true;
						}
					}
				});
				cell.type = id;
				cell.name = data_entry_types.data[id][data_entry_types.defn.name];
				cell.desc = data_entry_types.data[id][data_entry_types.defn.description];
				elchild(list, cell);
			}
			elchild(entry.dom.type, list);
		}
		// show/hide block
		entry.dom.type.style.display = (entry.dom.type.style.display != 'block' ? 'block' : 'none' );
	};

	/**
	 * Control button to obtain and show entry history
	 * @param entry pointer to the entry data
	 */
	var EntryBtnHistory = function ( entry ) {
		// first time
		if ( !entry.data.history ) {
			// note and entry are from server
			if ( self.data.id && entry.data.id ) {
				elchild(elclear(entry.dom.history), element('div', {className:'info'}, 'loading ...'));

                api.get('note/history/' + self.data.id + '/' + entry.data.id, function ( error, history ) {
                    if ( error ) {
                        console.error(error);
                        return;
                    }

                    console.log('note history', history);

					elclear(entry.dom.history);
					entry.data.history = history;
					var tbl = element('table', {className:'maxw'});
					if ( history.data.length ) {
						for ( var i = 0; i < history.data.length; i++ ) {
							var name = history.data[i][history.defn.name] ? App.Decode(history.data[i][history.defn.name]) : '';
							var data = history.data[i][history.defn.data] ? App.Decode(history.data[i][history.defn.data]) : '';
							tblrow(tbl,[
								// name and data
								element('span', {title:name}, ( name.length > 20) ? name.slice(0, 15) + '...' : name),
								element('span', {title:data}, ( data.length > 30) ? data.slice(0, 25) + '...' : data),
								// link to use
								element('a', {name:name, data:data}, 'use', {onclick:function(){
									entry.dom.name.value = this.name;
									entry.dom.data.value = this.data;
									entry.dom.name.onchange();
									entry.dom.data.onchange();
									entry.dom.history.style.display = 'none';
								}})
							], [{className:'name'}, {className:'data'}, {className:'ctrl'}]);
						}
						elchild(elclear(entry.dom.history), tbl);
					} else {
						// no history on the server
						elchild(elclear(entry.dom.history), element('div', {className:'info'},
							'there are no history records for this entry'));
					}
				});
			} else {
				// new entry
				entry.data.history = [];
				elchild(elclear(entry.dom.history), element('div', {className:'info'},
					'there are no history records for this entry'));
			}
		}
		// show/hide block
		entry.dom.history.style.display = (entry.dom.history.style.display != 'block' ? 'block' : 'none' );
	};

	/**
	 * Control button add new
	 * @param entry pointer to the entry data
	 */
	var EntryBtnAdd = function ( entry ) {
		// prepare name and value
		var name = data_entry_types.data[entry.data.id_type][data_entry_types.defn.name];
		// generate some password if pass type
		var data = ( entry.data.id_type == 4 ) ? pwdgen(20) : '';
		// clone
		var entry_new = EntryCreate({
			id_type : entry.data.id_type,
			name    : App.Encode(name),
			name_dec: name,
			data    : App.Encode(data),
			data_dec: data
		});
		self.dom.entries.insertBefore(entry_new, entry);
		//$(entry_new.dom.name).addClass('changed');
		entry_new.dom.name.classList.add('changed');
		//$(entry_new.dom.data).addClass('changed');
		entry_new.dom.data.classList.add('changed');
		changed = true;
	};

	/**
	 * Control button move up
	 * @param entry pointer to the entry data
	 */
	var EntryBtnUp = function ( entry ) {
		// can be moved
		if ( entry.previousSibling ) {
			self.dom.entries.insertBefore(entry, entry.previousSibling);
			changed = true;
		}
	};

	/**
	 * Control button move down
	 * @param entry pointer to the entry data
	 */
	var EntryBtnDown = function ( entry ) {
		// can be moved
		if ( entry.nextSibling ) {
			self.dom.entries.insertBefore(entry, entry.nextSibling.nextSibling);
			changed = true;
		}
	};

	/**
	 * Control button delete
	 * @param entry pointer to the entry data
	 */
	var EntryBtnDelete = function ( entry ) {
		if ( self.dom.entries.childNodes.length > 1 ) {
			// hide entry
			//$(entry.dom.undo).toggleClass('hidden');
			entry.dom.undo.classList.toggle('hidden');
			//$(entry.dom.body).toggleClass('hidden');
			entry.dom.body.classList.toggle('hidden');
			// set flag
			entry.deleted = true;
			changed = true;
		}
	};

	/**
	 * Block of note entry title name input with controls
	 * @param entry pointer to the entry data
	 */
	var EntryBlockTitle = function ( entry ) {
		// editable name
		entry.dom.name = element('input', {type:'text', maxLength:maxlength_title, disabled:!self.open, value: entry.data.name_dec}, '', {
			onchange : function(){
				this.value = this.value.rtrim();
				// only for edit mode
				if ( self.data.id ) {
					if ( entry.post.name_dec != null && entry.post.name_dec != this.value )
						//$(this).addClass('changed');
						this.classList.add('changed');
					else
						//$(this).removeClass('changed');
						this.classList.remove('changed');
				}
			}
		});
		//$(entry.dom.name).keydown(function(event) {
		entry.dom.name.addEventListener('keydown', function(event) {
			// up
			if ( event.which == 38 ) if ( entry.previousSibling ) entry.previousSibling.dom.name.focus();
			// down
			if ( event.which == 40 ) if ( entry.nextSibling ) entry.nextSibling.dom.name.focus();
		});
		// icon image
		entry.dom.icon  = element('img', {src:'img/field_' + data_entry_types.data[entry.data.id_type][data_entry_types.defn.name] + '.png', title:'drag and drop to change the entries order'});
		// top title line with name and controls
		entry.dom.title = tblrow(element('table', {className:'title'}), [entry.dom.icon, entry.dom.name, entry.dom.controls], [{className:'icon'}, {className:'name'}, {className:'controls'}]);
	};

	/**
	 * Block of note entry data input
	 * @param entry pointer to the entry data
	 */
	var EntryBlockInput = function ( entry ) {
		// types
		entry.dom.type = element('div', {className:'type'});
		// get the input data max length
		var limit = data_entry_types.data[entry.data.id_type][data_entry_types.defn.max];
		// create input depending on entry type
		if ( entry.data.id_type == 6 || entry.data.id_type == 7 ) {
			entry.dom.data = element('textarea', {className:'text', maxLength:limit, disabled:!this.open}, entry.data.data_dec);
			// keyboard navigation
			//$(entry.dom.data).keydown(function(event) {
			entry.dom.data.addEventListener('keydown', function ( event ) {
				//TODO: selectionStart is not cross-browser
				// up
				if ( event.which == 38 && entry.previousSibling && this.selectionStart == 0 ) entry.previousSibling.dom.data.focus();
				// down
				if ( event.which == 40 && entry.nextSibling && this.selectionStart == this.value.length ) entry.nextSibling.dom.data.focus();
			});
		} else {
			entry.dom.data = element('input', {type:'text', maxLength:limit, className:'line', disabled:!self.open, value: entry.data.data_dec});
			// keyboard navigation
            //$(entry.dom.data).keydown(function(event) {
            entry.dom.data.addEventListener('keydown', function ( event ) {
				// up
				if ( event.which == 38 ) if ( entry.previousSibling ) entry.previousSibling.dom.data.focus();
				// down
				if ( event.which == 40 ) if ( entry.nextSibling ) entry.nextSibling.dom.data.focus();
			});
		}
		// change color if changed in edit mode
		entry.dom.data.onchange = function() {
			this.value = this.value.rtrim();
			// only for edit mode
			if ( self.data.id ) {
				if ( entry.post.data_dec != null && entry.post.data_dec != this.value )
					//$(this).addClass('changed');
					this.classList.add('changed');
				else
					//$(this).removeClass('changed');
					this.classList.remove('changed');
			}
			// in case this is url entry type
			// if ( entry.data.id_type == 2 ) {
			// 	RequestUrlTitle(this.value);
			// }
		};

		// values history
		entry.dom.history = element('div', {className:'history'});

		// set chars count
		entry.dom.data.onkeyup = function(){
			entry.dom.counter.innerHTML = this.value.length;
			// red alert if data reached the length limit
			if ( this.value.length >= this.maxLength && entry.dom.counter.className != 'limit' ) {
				entry.dom.counter.className = 'limit';
			} else if ( this.value.length < this.maxLength && entry.dom.counter.className == 'limit' ) {
				entry.dom.counter.className = '';
			}
		};
		entry.dom.data.onkeydown = entry.dom.data.onkeyup;
	};

	// var RequestUrlTitle = function ( url ) {
	// 	//delete this.data.comment;
	// 	var comment = null;
	// 	// get an empty comment block
	// 	for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
	// 		var entry = self.dom.entries.childNodes[i];
	// 		// plain text type
	// 		if ( entry.data.id_type == 6 && entry.dom.data.value.trim() == '' ) {
	// 			comment = entry.dom.data;
	// 			break;
	// 		}
	// 	}
	// 	// send request only if there is an empty comment entry
	// 	if ( comment ) {
	// 		url = 'http://query.yahooapis.com/v1/public/yql?q=' +
	// 			'select * from html where url="' + encodeURIComponent(url) + '" and xpath="/html/head/title"&format=json';
	// 		$.ajax(url, {crossDomain:true, dataType:'json',
	// 			success: function(data){
	// 				if ( data && data.query && data.query.results && data.query.results.title ) {
	// 					comment.value = data.query.results.title;
	// 					comment.onkeyup();
	// 					comment.onchange();
	// 				}
	// 			}
	// 		});
	// 	}
	// };

	/**
	* Parse data and fill the select list
	*/
	this.ProceedUrlIcon = function ( data ) {
		if ( data && data.query && data.query.results ) {
            console.log(data);
		}
	};

	/**
	 * Block of note entry hint
	 * @param entry pointer to the entry data
	 */
	var EntryBlockHint = function ( entry ) {
		// entry description
		entry.dom.desc = element('span', {}, data_entry_types.data[entry.data.id_type][data_entry_types.defn.description]);
		entry.dom.desc.value = data_entry_types.data[entry.data.id_type][data_entry_types.defn.description];
		// letters counter with max length check
		entry.dom.counter = element('span', {className:entry.dom.data.value.length==entry.dom.data.maxLength?'limit':''}, !self.open ? '' : entry.dom.data.value.length);
		// bottom entry description and counter
		entry.dom.hint = tblrow(element('table', {className:'hint'}), [entry.dom.desc, entry.dom.counter], [{className:'text'}, {className:'counter'}]);
	};

	/**
	 * Block of note entry floating controls
	 * @param entry pointer to the entry data
	 */
	var EntryBlockControls = function ( entry ) {
		entry.dom.btn_config = element('img', {src:'img/field_btn_config.png', className:'button', title:'change entry type'}, null, {
			onclick:function(){EntryBtnConfig(entry);}
		});
		entry.dom.btn_history = element('img', {src:'img/field_btn_history.png', className:'button', title:'show/hide entry hisory values'}, null, {
			onclick:function(){EntryBtnHistory(entry);}
		});
		entry.dom.btn_add = element('img', {src:'img/field_btn_add.png', className:'button', title:'add new entry after this one'}, null, {
			onclick:function(){EntryBtnAdd(entry);}
		});
		entry.dom.btn_up = element('img', {src:'img/field_btn_up.png', className:'button', title:'move this entry one row up'}, null, {
			onclick:function(){EntryBtnUp(entry);}
		});
		entry.dom.btn_down = element('img', {src:'img/field_btn_down.png', className:'button', title:'move this entry one row down'}, null, {
			onclick:function(){EntryBtnDown(entry);}
		});
		entry.dom.btn_delete = element('img', {src:'img/field_btn_delete.png', className:'button', title:'delete this entry'}, null, {
			onclick:function(){EntryBtnDelete(entry);}
		});

		var buttons = [];
		// this is a password entry
		if ( entry.data.id_type == 4 ) {
			//alert(entry.dom.data.type);
			entry.dom.btn_pwdgen = element('img', {src:'img/field_btn_pwdgen.png', className:'button', title:'generate a new password'}, null, {
				onclick:function(){entry.dom.data.value = pwdgen(20);entry.dom.data.onchange();}
			});
			entry.dom.btn_maskpwd = element('img', {src:'img/field_eye_closed.png', className:'button', title: 'Show password'}, null, {
				onclick:function() {
					if (entry.dom.data.type == 'text') {
						this.title = 'Show password';
						this.src = 'img/field_eye_closed.png';
						entry.dom.data.type = 'password';
					} else {
						this.src = 'img/field_eye_openned.png';
						this.title = 'Hide password';
						entry.dom.data.type = 'text';
					}
				}
			});
			entry.dom.data.type = 'password';
			entry.dom.data.autocomplete = 'off';
			buttons.push(entry.dom.btn_maskpwd);
			buttons.push(entry.dom.btn_pwdgen);
		}
		// all other buttons
		buttons.push(entry.dom.btn_config, entry.dom.btn_history, entry.dom.btn_add, entry.dom.btn_up, entry.dom.btn_down, entry.dom.btn_delete);
		// add entry control buttons
		return entry.dom.controls = element('div', {className:'hidden'}, buttons);
	};

	/**
	 * Single entry creation
	 * @param data entry details
	 */
	var EntryCreate = function ( data ) {
		// body of the entry
		var entry = element('div', {className:'entry'});
		// entry dom elements
		entry.dom = {
			undo: element('div', {className:'undo hidden'}),
			body: element('div', {className:'body'})
		};
		// entry db data
		entry.data = data || {};
		// entry type, name and value after each saving
		entry.post = {
			id_type : data.id_type,
			name    : data.name,
			name_dec: data.name_dec,
			data    : data.data,
			data_dec: data.data_dec
		};

		// blocks
		EntryBlockInput(entry);
		EntryBlockHint(entry);
		EntryBlockControls(entry);
		EntryBlockTitle(entry);

		// fill entry
		elchild(entry.dom.body, [entry.dom.title, entry.dom.type, entry.dom.data, entry.dom.history, entry.dom.hint]);
		elchild(entry, [entry.dom.undo, entry.dom.body]);
		// undo delete
		elchild(entry.dom.undo, element('a', {}, 'restore deleted entry', {onclick:function(){
			//$(entry.dom.undo).toggleClass('hidden');
			entry.dom.undo.classList.toggle('hidden');
			//$(entry.dom.body).toggleClass('hidden');
			entry.dom.body.classList.toggle('hidden');
			entry.deleted = false;
		}}));

		// events
		//$(entry).mouseenter(function(){
		entry.addEventListener('mouseenter', function () {
			// only if not closed
			if ( self.open ) {
				if ( !entry.previousSibling ) entry.dom.btn_up.className   = 'disabled'; else entry.dom.btn_up.className   = 'button';
				if ( !entry.nextSibling )     entry.dom.btn_down.className = 'disabled'; else entry.dom.btn_down.className = 'button';
				//TODO: add real entries check (there are hidden entries so failure here)
				if ( self.dom.entries.childNodes.length == 1 ) entry.dom.btn_delete.className = 'disabled'; else entry.dom.btn_delete.className = 'button';
				//$(entry.dom.controls).fadeIn();
                entry.dom.controls.classList.remove('hidden');
			}
		});
		//$(entry).mouseleave(function(){
		entry.addEventListener('mouseleave', function () {
			// only if not closed
			if ( self.open ) {
				//$(entry.dom.controls).fadeOut();
                entry.dom.controls.classList.add('hidden');
			}
		});
		//$(entry).click(function(){
			// iterate all entries
//			for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
//				entry = self.dom.entries.childNodes[i];
//				$(entry.dom.body).removeClass('active');
//			}
//			$(this.dom.body).addClass('active');
		//});
		return entry;
	};

	/**
	 * Block of note title
	 */
	var BlockTitle = function () {
		self.dom.title = element('div', {className:'caption'});
		self.dom.title.icon = element('img', {width:32, height:32});
		elchild(self.dom.title, tblrow(element('table', {className:'maxw'}),[
				self.dom.title.icon,
				[element('div',{className:'main'},'Note')/*, element('div',{className:'hint'},'creation, edit or view')*/],
				[self.data.ctime ? element('div',{},'created: ' + TimestampToDateStr(self.data.ctime)) : '',
				 self.data.mtime ? element('div',{},'edited: ' + TimestampToDateStr(self.data.mtime)) : '']
			], [{className:'icon'}, {className:'name'}, {className:'info'}])
		);
	};

	/**
	 * Block of note entries
	 */
	var BlockEntries = function () {
		// list of all entries
		self.dom.entries = element('div', {className:'entries'});

		// iterate all prepared entries
		for ( var i = 0; i < self.data.entries.length; i++ ) {
			// new entry creation and add to list
			elchild(self.dom.entries,
				EntryCreate(self.data.entries[i]));
		}

		// drag and drop
		//$(self.dom.entries).sortable({containment:'parent', cursor:'move', handle:'.title .icon'});

		// return container
		return self.dom.entries;
	};

	/**
	 * Block of tags work
	 */
	var BlockTags = function () {
		// tags input
		var input = element('input', {type:'text', maxLength:maxlength_tags, disabled:!self.open, className:'line', value:''});
		// icon
		var icon = element('img', {src:'img/field_tag.png'});
		// tags container
		self.dom.tags = element('div', {className:'tags'}, [
			tblrow(element('table', {className:'title'}), [icon, 'tags'], [{className:'icon'}, {className:'name'}]),
			input,
			element('div', {className:'hint'}, 'list of associated tags separated by space')
		]);
		// pointers
		self.dom.tags.input = input;
		self.dom.tags.icon  = icon;
		// change color if changed in edit mode
		input.onchange = function() {
			// only for edit mode
			if ( self.data.id ) {
				// tags changed since the last post
				if ( TagsChanged(this.value, self.post.tags) ) {
					//$(this).addClass('changed');
					this.classList.add('changed');
				} else {
					//$(this).removeClass('changed');
					this.classList.remove('changed');
				}
			}
			// change icon if necessary
			//SetTitleIcon();
		};

		var data = [];
		// prepare all tags
		for ( var tid in data_tags_idlist ) data.push([data_tags_idlist[tid], tid]);
		// add autocompletion
		$(self.dom.tags.input).autocomplete({
			matchInside: false,
			selectFirst: true,
			useDelimiter: true,
			delimiterChar: ' ',
			delimiterKeyCode: 32,
			minChars: 1,
			autoWidth: 'width',
			delay: 200,
			data: data,
			showResult: function(tag){
				// degradation fix
				return tag;

				// wrap to div with icon
				return '<div class="tag">' + tag + '</div>';
			},
			processData: function(data){
				// get tags array
				var result = [], tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);
				// truncate available suggestion options
				data.each(function(item){
					if ( !tags.has(item[0]) ) result.push(item);
				});
				return result;
			}
		});

//		var timer = null;
//		input.onkeydown = function() {
//			// only for edit mode
//			if ( self.data.id ) {
//				if ( timer ) clearTimeout(timer);
//				timer = setTimeout(function(){self.dom.tags.input.onchange();}, 300);
//			}
//		}
		// return container
		return self.dom.tags;
	};

	/**
	 * Block of button controls
	 */
	var BlockControls = function () {
		// container
		self.dom.tcontrols = element('div', {className:'tbuttons'}, [
			element('input', {type:'button', value:'Back',      className:'button left', title:hint_back}, null, {onclick:function(){self.Escape();}}),
			element('input', {type:'button', value:'New',       className:'button left', title:hint_new}, null, {onclick:function(){self.New();}}),
			element('input', {type:'button', value:'Duplicate', className:'button left', title:hint_clone}, null, {onclick:function(){self.Clone();}}),
			element('input', {type:'button', value:'Save',      className:'button bold', title:hint_save}, null, {onclick:function(){self.Save();}})
		]);

		self.dom.bcontrols = element('div', {className:'bbuttons'}, [
			//element('input', {type:'button', value:'Back', className:'button'}, null, {onclick:function(){self.Escape();}}),
			element('input', {type:'button', value:'Save', className:'button bold', title:hint_save}, null, {onclick:function(){self.Save();}})
		]);
	};

	/**
	 * Event management
	 */
	var SetEvents = function () {
		// save
		//$(self.dom.handle).bind('keypress', function(event) {
		self.dom.handle.addEventListener('keypress', function(event) {
			if ( event.which == 13 ) {
				// save on Ctrl+Enter
				if ( event.ctrlKey ) {
					//event.preventDefault();
					//event.stopPropagation();
					self.Save();
				} else {
					// Enter pressed
				}
			}
		});
		// cancel
		//$(self.dom.handle).bind('keydown', function(event) {
		self.dom.handle.addEventListener('keydown', function(event) {
			if ( event.which == 27 ) {
				// exit from here
				self.Escape();
			}
		});
	};

	/**
	 * Enebles/disables the control buttons
	 * @param state bool flag
	 */
	var EnableControls = function ( state ) {
		if ( self.dom.bcontrols ) {
			var controls = self.dom.bcontrols.childNodes;
			for ( var i = 0;  i < controls.length; i++ ) {
				controls[i].disabled = !state;
			}
		}
	};

	/**
	 * Asks user about modifications
	 */
	this.ConfirmExit = function () {
		return confirm(msg_has_changes);
	}

	/**
	 * Saves the current note as new
	 */
	this.Clone = function () {
		// clear note and entries ids
		delete this.data.id;
		this.data.entries.each(function(entry){delete entry.id;});
		// reset tags
		this.post.tags = [];
		// set flag
		changed = true;
		// saving
		this.Save();
		// focus to the first input
		this.dom.entries.childNodes[0].dom.data.focus();
	}

	/**
	 * Prepares a new note with the same set of entries as the current note has
	 */
	this.New = function () {
		var name, data, entries = [];
		// iterate the current entry list
		this.data.entries.each(function(entry){
			// prepare name and data
			name = data_entry_types.data[entry.id_type][data_entry_types.defn.name];
			// generate some password if pass type
			data = ( entry.id_type == 4 ) ? pwdgen(20) : '';
			// append the entry list
			entries.push({
				id_type : entry.id_type,
				name    : App.Encode(name),
				name_dec: name,
				data    : App.Encode(data),
				data_dec: data
			});
		});
		// if user confirmed the exit
		if ( this.Escape(true) ) {
			// replace the entry list with the new one
			this.data.entries = entries;
			// compile all blocks together
			Build();
			// update the icon
			SetTitleIcon();
			// set flag
			changed = true;
			// focus to the first input
			this.dom.entries.childNodes[0].dom.data.focus();
		}
	}

	/**
	 * Leaves the current note editing
	 * asks user about modifications if present
	 * @param noswitch bool flag to not return back to the template list
	 * @return bool true if the note was escaped
	 */
	this.Escape = function ( noswitch ) {
		// check current note modifications
		var has_changes = NoteEditor.HasChanges();
		// not changed or user confirmed his wish
		if ( !has_changes || (has_changes && this.ConfirmExit()) ) {
			// get note from the list using current id
			var note = NoteList.GetNoteByID(self.data.id);
			// found
			if ( note !== false ) {
				// remove acitve cursor
				NoteList.SetNotesState([note], 'active', false);
			}
			// clear previous content
			elclear(this.dom.handle);
			// set data
			this.data = {tags:[], entries: []};
			// data to be send on save
			this.post = {tags:[]};
			//this.open = true;
			changed = false;
			// not full escape
			if ( !noswitch ) {
				self.Show(false);
				TemplateList.Show(true);
			}
			return true;
		}
		return false;
	};

	/**
	 * Creates a new note
	 */
	this.Create = function ( template ) {
		if ( console.time ) console.time('entry create');
		// set data
		this.data = {tags:[], entries: []};
		// data to be send on save
		this.post = {tags:[]};
		// local vars
		var id_template = template[data_templates.defn.id],
			id_type, name, data, tag;
		// template is given and valid
		if ( template && data_template_entries.data[id_template] ) {
			// fill the list of entries
			for ( var i = 0; i < data_template_entries.data[id_template].length; i++ ) {
			//for ( var i in data_template_entries.data[id_template] ) {
				// get the entry type
				id_type = data_template_entries.data[id_template][i][data_template_entries.defn.id_type];
				// prepare name and data
				name = data_template_entries.data[id_template][i][data_template_entries.defn.name];
				// generate some password if pass type
				data = ( id_type == 4 ) ? pwdgen(20) : '';
				// adding
				this.data.entries.push({
					id_type : id_type,
					name    : App.Encode(name),
					name_dec: name,
					data    : App.Encode(data),
					data_dec: data
				});
			}
			// default tag
			tag = template[data_templates.defn.tag];
			this.data.tags = TagManager.Str2IDs(tag);
		// no templates selected so just add one simple entry
		} else {
			name = data_entry_types.data[1][data_entry_types.defn.name];
			data = tag = '';
			// adding
			this.data.entries = [{
				id_type : 1,
				name    : App.Encode(name),
				name_dec: name,
				data    : App.Encode(data),
				data_dec: data
			}];
		}
		// compile all blocks together
		Build();
		// tags plain string
		this.dom.tags.input.value = tag.toLowerCase();
		SetTitleIcon();
		// focus to the first input
		this.dom.entries.childNodes[0].dom.data.focus();
		if ( console.timeEnd ) console.timeEnd('entry create');
	};

	/**
	 * Loads the existing note
	 * @param data note details
	 */
	this.Load = function ( data ) {
		if ( console.time ) console.time('entry load');
		// set data
		this.data = data;
		// data to be send on save
		self.post = {
			tags: data.tags ? data.tags.slice() : [] // copy of tags
		};
		// data is given and valid
		if ( data.id && data.entries && data.entries instanceof Array ) {
			// decode data in each entry and reorganize
			for ( var i = 0; i < data.entries.length; i++ ) {
				var entry = data.entries[i];
				// wrap encoded and decoded values
				entry.name_dec = App.Decode(entry.name);
				entry.data_dec = App.Decode(entry.data);
			}
		} else {
			// invalid input so switch to new mode
			this.Create();
		}
		// compile all blocks together
		Build();
		// tags plain string
		this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags).toLowerCase();
		SetTitleIcon();
		if ( console.timeEnd ) console.timeEnd('entry load');
	};

	/**
	 * Returns the open at the moment note id
	 */
	this.GetNoteID = function () {
		return ( this.data && this.data.id ? this.data.id : null );
	};

	var SetTitleIcon = function ( icon ) {
		if ( !icon ) {
			icon = 'img/tag_note.png';
			var tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);
			// check parsed string
			if ( tags && tags instanceof Array ) {
				// iterate words in the input string
				for ( var i = 0; i < tags.length; i++ ) {
					if ( icon_tags.has(tags[i]) ) {
						icon = 'img/tag_' + tags[i] + '.png';
						break;
					}
				}
			}
		}
		if ( self.dom.title.icon.src.search(icon) < 0 ) {
			self.dom.title.icon.src = icon;
		}
	};

	/**
	 * Compiles all blocks together
	 */
	var Build = function () {
		with ( self ) {
			changed = false;
			// all blocks
			BlockTitle();
			BlockEntries();
			BlockTags();
			BlockControls();

			// clear previous handle content
			elclear(dom.handle);

			// build all blocks together
			elchild(dom.handle, [
				dom.title,
				dom.tcontrols,
				dom.entries,
					element('div', {className:'divider'}),
				dom.tags,
					element('div', {className:'divider'}),
				dom.bcontrols
			]);
		}
		TemplateList.Show(false);
		self.Show(true);

	};

	/**
	 * Shows/hides the component
	 * @param state visibility flag: true - show, false - hide
	 */
	this.Show = function ( state ) {
		this.dom.handle.style.display = state ? 'block' : 'none';
	};

	/**
	 * Checks if there are any unsaved modificatons
	 * @return bool flag
	 */
	this.HasChanges = function () {
		var i, entry, flag = changed;
		// note is opened
		if ( this.data && this.data.entries && this.data.entries.length > 0 ) {
			// not sure if has changes already
			if ( !changed ) {
				// iterate all entries
				for ( i = 0; i < this.dom.entries.childNodes.length; i++ ) {
					entry = this.dom.entries.childNodes[i];
					//fb(i, entry.post.data_dec, entry.dom.data.value);
					//fb(i, entry.post.name_dec, entry.dom.name.value);
					//fb(i, entry.post.id_type, entry.data.id_type);
					if ( (entry.post.data_dec != null && entry.post.data_dec != entry.dom.data.value) ||
						 (entry.post.name_dec != null && entry.post.name_dec != entry.dom.name.value) ||
						 (entry.post.id_type  != entry.data.id_type) )
					{
						// change flag and skip all the rest checks
						flag = true;break;
					}
				}
				// still no changes so check tags
				if ( !flag && TagsChanged(this.dom.tags.input.value.toLowerCase(), this.post.tags) ) flag = true;
			}
		}
		return flag;
	};

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};
		// handler on note save
		this.onsave = params.onsave || null;
		// handler on cancel note adding or edit
		this.oncancel = params.oncancel || null;
		// event handlers
		SetEvents();
	};
};

/*** app.note.filter.js ***/
/**
 * Main module to work with user tags and words input
 * sends ajax request to the server side, helps to render results, shows messages
 */
var NoteFilter = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	// hints
	var hint_wexclude = 'click on this word to remove it from the filtering';
	var hint_home     = 'reset all search parameters and filters and request the latest active notes';

	// autocompleter commands hints
	var hint_cmd = {
		':day'     : 'allows to get notes modified during the last 24 hours',
		':week'    : 'allows to get notes modified during the last week',
		':month'   : 'allows to get notes modified during the last month',
		':notags'  : 'shows the notes without tags',
		':deleted' : 'shows the previously deleted notes'
	};

	// message texts
	var msg_info_no_data      = 'There are no records to meet the given search options. You can change these options or see your ';
	var msg_fail_server_error = 'The request was not successful. The response from the server: ';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		// decrypt input data if not the first time
		if ( this.dom.input.data.length ) this.dom.input.data = JSON.parse(App.Decode(this.dom.input.data));
		// restore backuped value
		this.dom.input.value = this.dom.input.data.encval;
		// inner parsed data
		this.data = TagManager.StrParse(this.dom.input.value);
		this.post = TagManager.StrParse();
		// build notes
		PerformSearch();
		// show/hide info and controls
		NoteList.UpdateCtrlBlock(true);
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment
		if ( this.open ) {
			// delete messages
			self.MsgClear();
			// backup and clear search string
			this.dom.input.data.encval = this.dom.input.value;
			// encrypt input data
			this.dom.input.data  = App.Encode(JSON.stringify(this.dom.input.data));
			// hide current value
			this.dom.input.value = '[encrypted data]';
			// inner parsed data
			this.data = {};
			this.post = {};
			// clear autocompleter
			$(this.dom.input).data('autocompleter').options.data = [true];
			// component state flag
			this.open = false;
		}
	};

	/**
	 * Removes all the messages
	 */
	this.MsgClear = function () {
		elclear(this.dom.messages);
	}

	/**
	 * Appends the given message
	 * @param text string message to add
	 * @param type string message type: info (default), warn, fail
	 */
	this.MsgAdd = function ( text, type ) {
		elchild(this.dom.messages, element('div', {className:type || 'info'}, text));
	};

	/**
	 * Set focus to tag search field
	 */
	this.SetFocus = function () {
		this.dom.input.focus();
	};

	/**
	 * Visual flags
	 */
	var LoadingStart = function () {
		self.dom.icon.className = 'icon loading';
		self.dom.messages.className = 'messages loading';
	}

	/**
	 * Visual flags
	 */
	var LoadingStop = function () {
		self.dom.icon.className = 'icon';
		self.dom.messages.className = 'messages';
	}

	/**
	 * Resets the current search options
	 * and get the lates notes
	 */
	this.RequestLatest = function () {
		this.Reset();
		this.NotesRequest();
	}

	/**
	 * Resets the current search options
	 * and get the deleted notes using :deleted tag
	 */
	this.RequestDeleted = function () {
		//this.Reset();
		this.MsgClear();
		// update user input
		this.dom.input.value = ':deleted';
		// prepare inner data
		this.UpdateParsedInput();
		// get data and build note list
		this.NotesRequest();
	}

	/**
	 * Sends ajax request to receive notes by tags and
	 * makes a note list using the received data
	 */
	this.NotesRequest = function ( isall ) {
		// show loading progress
		LoadingStart();
		// clone current data to post data
		for ( var item in this.data ) this.post[item] = this.data[item].slice();

		api.post('note/search', {tinc:this.post.tinc, texc:this.post.texc, wcmd:this.post.wcmd, all:isall}, function ( error, data ) {
            if ( error ) {
                console.error(error);
            }

            console.log('note search', data);

			if ( !data.error ) {
				// make note list using the received data
				NoteList.BuildTable(data.notes, data.total);
				// check if no data but show message only if there were some search options uses
				if ( data.total == 0 && (self.data.tinc.length || self.data.texc.length || self.data.wcmd.length) )
					// no data, need to inform and suggest to see for example the latest notes
					self.MsgAdd([msg_info_no_data, element('a', {className:'bold'}, 'latest notes', {onclick:function(){self.RequestLatest();}})]);
			} else {
				// server error
				self.MsgAdd(msg_fail_server_error + data.error, 'fail');
			}

			// hide loading progress
			LoadingStop();
		});
	};

	/**
	 * Updates inner data from user input if changed since last time
	 */
	this.UpdateParsedInput = function () {
		// check if old and current values match
		if ( this.dom.input.value.trim() != this.dom.input.data.oldval.trim() ) {
			// updating parsed data
			this.data = TagManager.StrParse(this.dom.input.value);
			// save current values
			this.dom.input.data.oldval = this.dom.input.value;
		}
	}

	/**
	 * Search handler
	 * updates the inner parsed data, saves the history and do the search
	 * Ctrl+Enter does the search and reformats the search string
	 * @param ctrl bool flag for Ctrl key holding
	 */
	this.DoSearch = function ( ctrl ) {
		// prepare inner data
		this.UpdateParsedInput();
		// history
		with ( self.dom.input ) {
			// first record or not the same as the last one
			if ( data.history.length == 0 || data.history[data.history.length-1] != value ) {
				// fill history and reset cursor
				data.history.push(value);
				data.histpos = data.history.length;
			}
		}
		// update user input if necessary
		if ( ctrl ) this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
		// do search
		PerformSearch();
	}

	/**
	 * Keyboard input handler for tag search
	 */
	var PerformSearch = function () {
		// delete old messages
		self.MsgClear();
		// not empty input
//		if ( self.dom.input.value.trim() != '' ) {
			// parsed tags and already posted don't match
			if ( self.data.tinc.sort().join() != self.post.tinc.sort().join() ||
				 self.data.texc.sort().join() != self.post.texc.sort().join() ||
				 self.data.wcmd.sort().join() != self.post.wcmd.sort().join() ||
				 self.dom.input.value.trim()  == '' )
			{
				// there are changes
				self.NotesRequest();
			} else {
				// manual filtering all the table as it was not recreated
				NoteList.SetNotesVisibility();
			}
			// check input for wrong tags
			if ( self.data.winc.length > 0 || self.data.wexc.length > 0 ) {
				var list = []; // shows them comma-separated
				self.data.winc.sort().each(function(item){list.push(element('a', {title:hint_wexclude, word:item, fexc:false},    item, {onclick:WordExclude}));});
				self.data.wexc.sort().each(function(item){list.push(element('a', {title:hint_wexclude, word:item, fexc:true}, '-'+item, {onclick:WordExclude}));});
				self.MsgAdd(['Here is the list of words used which are not your tags:', list, '. It was used for text filtering.']);
			}
//		} else {
//			// show latest
//			NoteList.BuildTable(false);
//			// reset inner data
//			self.data = TagManager.StrParse();
//			self.post = TagManager.StrParse();
//		}
	};

	/**
	 * Adds the given tag to the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagInclude = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// not added already and valid id
		if ( tagid && !this.data.tinc.has(tagid) ) {
			// prepare inner parsed data
			this.data.tinc.push(tagid);
			this.data.ninc.push(tagnm);
			// reforman input
			this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
		}
		// execute
		PerformSearch();
	};

	/**
	 * Removes the given tag from the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagExclude = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// exists in the search line and valid id
		if ( tagid && this.data.tinc.has(tagid) ) {
			// locate tag name and id in the inner parsed data
			var tinci = this.data.tinc.indexOf(tagid);
			var ninci = this.data.ninc.indexOf(tagnm);
			// and clear
			if ( tinci >= 0 ) this.data.tinc.splice(tinci, 1);
			if ( ninci >= 0 ) this.data.ninc.splice(ninci, 1);
			// reforman input
			this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
			//ReworkSearchStr();
		}
		// execute
		PerformSearch();
	};

	/**
	 * Subtracts the given tag in the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagSubtract = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// not subtracted already and valid id
		if ( tagid && !this.data.texc.has(tagid) ) {
			// locate tag name and id in the inner parsed data
			var tinci = this.data.tinc.indexOf(tagid);
			var ninci = this.data.ninc.indexOf(tagnm);
			// and clear
			if ( tinci >= 0 ) this.data.tinc.splice(tinci, 1);
			if ( ninci >= 0 ) this.data.ninc.splice(ninci, 1);
			// prepare inner parsed data
			this.data.texc.push(tagid);
			this.data.nexc.push(tagnm);
			// reforman input
			this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
			//ReworkSearchStr();
		}
		// execute
		PerformSearch();
	};

	/**
	 * Removes the clicked word from the search
	 */
	var WordExclude = function () {
		var list = this.fexc ? self.data.wexc : self.data.winc,
			wind = list.indexOf(this.word);
		if ( wind >= 0 ) {
			// delete word from inner data
			list.splice(wind, 1);
			// remove html element
			this.parentNode.removeChild(this);
			// remove message if there are no more words
			if ( self.data.winc.length == 0 && self.data.wexc.length == 0 ) {
				self.MsgClear();
			}
			// reforman input
			self.dom.input.data.oldval = self.dom.input.value = TagManager.StrBuild(self.data);
			// filtering all the table
			NoteList.SetNotesVisibility();
		}
	};

	/**
	 * Set default search hints and remove messages
	 */
	this.Reset = function () {
		// clear search string and set focus
		this.dom.input.data.oldval = this.dom.input.value = '';
		self.dom.input.focus();
		// clear tags data
		this.data = TagManager.StrParse();
		this.post = TagManager.StrParse();
		// delete all messages
		self.MsgClear();
	}

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};

		// parsed input data and its copy on post
		this.data = TagManager.StrParse();
		this.post = TagManager.StrParse();

		// build all blocks together
		elchild(this.dom.handle, [
			// main block
			element('div', {className:'search'}, [
				// home button and tags search input
				this.dom.home  = element('div',   {className:'home'}, element('div', {title:hint_home}, null, {onclick:function(){self.RequestLatest()}})),
				this.dom.input = element('input', {className:'line', type:'text', data:{encval:'', oldval:'', history:[], histpos:0}}),
				this.dom.icon  = element('div',   {className:'icon'})
			]),
			// hidden messages
			this.dom.messages = element('div', {className:'messages'})
		]);

		// autocompleter init
		$(this.dom.input).autocomplete({
			matchInside: false,
			selectFirst: true,
			useDelimiter: true,
			delimiterChar: ' ',
			delimiterKeyCode: 32,
			minChars: 1,
			autoWidth: 'width',
			delay: 200,
			data: [true],
			showResult: function(tag){
				// degradation fix
				return tag;

				var hint = '', fcmd = tag.charAt(0) == ':';
				if ( fcmd ) {
					hint = '<div class="hint">' + hint_cmd[tag] + '</div>';
				}
				// wrap to div with icon
				return '<div class="' + (fcmd ? 'cmd' : 'tag') + '">' + tag + hint + '</div>';
			},
			processData: function(data){
				// only if there should be some results
				if ( data.length > 0 ) {
					// prepare inner parsed data
					self.UpdateParsedInput();
					// preparing
					data = [];
					// commands
					if ( !self.data.wcmd.has('deleted') ) data.push([':deleted', 0]);
					if ( !self.data.wcmd.has('notags') )  data.push([':notags', 0]);
					if ( !self.data.wcmd.has('day') && !self.data.wcmd.has('week') && !self.data.wcmd.has('month') )
						data.push([':day', 0], [':week', 0], [':month', 0]);
					// if notags mode than no tags suggesting
					if ( !self.data.wcmd.has('notags') ) {
						var lnids = [];
						// get linked tags to already selected
						if ( self.data.tinc.length > 0 ) lnids = TagManager.Linked(self.data.tinc);
						// iterate all tags
						for ( var tnm in data_tags_nmlist ) {
							// get tag id
							var tid = data_tags_nmlist[tnm];
							// there are no including tags selected or it's one of the linked tag
							if ( self.data.tinc.length == 0 || lnids.has(tid) )
								// was not added so add it
								if ( !self.data.tinc.has(tid) && !self.data.texc.has(tid) ) data.push([tnm, tid], ['-'+tnm, tid]);
						}
					}
				}
				return data;
			}
		});
		// autocompleter for global access
		this.ac = $(this.dom.input).data('autocompleter');

		// search input handler
		//$(this.dom.input).bind('keydown', function(event) {
        this.dom.input.addEventListener('keydown', function(event) {
			// enter
			if ( event.which == 13 ) self.DoSearch(event.ctrlKey);
			// up
			if ( event.which == 38 ) {
				// no autocompleter and valid history cursor
				if ( !self.ac.active_ && this.data.histpos > 0 ) {
					// move up cursor position to the first non-duplicate item in the history
					while ( this.data.history[--this.data.histpos] && this.data.history[this.data.histpos].trim() == this.value.trim() ) {}
					// valid position found
					if ( this.data.histpos >= 0 ) this.value = this.data.history[this.data.histpos];
				}
			}
			// down
			if ( event.which == 40 ) {
				// no autocompleter and valid history cursor
				if ( !self.ac.active_ && this.data.histpos < this.data.history.length-1 ) {
					// move down cursor position to the first non-duplicate item in the history
					while ( this.data.history[++this.data.histpos] && this.data.history[this.data.histpos].trim() == this.value.trim() ) {}
					// valid position found
					if ( this.data.histpos < this.data.history.length ) this.value = this.data.history[this.data.histpos];
				}
			}
			// ctrl + space
			if ( event.ctrlKey && event.which == 32 ) {
				// show autocompleter if possible
				self.ac.activate();
			}
		});
	};
};

/*** app.note.list.js ***/
/**
 * Module to work with note list
 * view all, selecting, checking, appending, filtering
 */
var NoteList = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	var hint_tag_include   = 'click on this tag to include it to the search';
	var hint_tag_exclude   = 'click on this tag to exclude it from the search';
	var hint_info_missing  = 'there is no data';
	var hint_tags_missing  = 'there are no tags';
	var hint_notes_visible = 'the limited amount of visible notes received according the search options (usually the first 20)';
	var hint_notes_total   = 'the general amount of notes satisfying the giving search options';
	var hint_notes_filtered= 'the amount of notes excluded from the note list due to the search filter';

	var msg_checked_notes_remove  = 'You are going to delete all checked notes in the note list. Do you really want to continue?';
	var msg_checked_notes_restore = 'You are going to restore all checked notes in the note list. Do you really want to continue?';

	var msg_checked_notes_removed = 'The selected notes were successfully removed ';
	var msg_checked_notes_restored= 'The selected notes were successfully restored ';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		elclear(this.dom.notes);
		// show info and controls
		this.dom.tpbar.style.display = 'block';
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment
		if ( this.open ) {
			// clear decoded entries data in the requested notes
			this.data.notes.each(function(note){
				// all note entries
				note.entries.each(function(entry){
					// remove if exist
					delete entry.name_dec;
					delete entry.data_dec;
				});
				// all data for filtering
				delete note.fulltext;
			});
			// hide info and controls
			this.dom.tpbar.style.display = 'none';
			// clear notes
			elclear(this.dom.notes);
			// component state flag
			this.open = false;
		}
	};

	/**
	 * Deletes or restores the given list of notes depending on the undo flag
	 * @param list array of note ids
	 * @param undo bool flag: true - restore notes, delete otherwise
	 */
	var NotesDelete = function ( list, undo ) {
		// check input
		if ( list.length > 0 ) {
			// send request
			api.post('note/delete' + (undo ? '/undo' : ''), {ids:list}, function ( error, data ) {
                if ( error ) {
                    console.error(error);
                }

                console.log('note delete', data);

				// remove old messages
				NoteFilter.MsgClear();
				// on success
				if ( !data.error ) {
					// prepare message body
					var message = [(undo ? msg_checked_notes_restored : msg_checked_notes_removed) + '(amount:' + data.count + '). '];
					// after deletion allow to go to the deleted notes
					if ( !undo ) message.push(' It is still possible to ', element('a', {className:'bold'}, 'restore them', {onclick:function(){NoteFilter.RequestDeleted();}}));
					// close currently edited note if affected
					if ( list.has(NoteEditor.GetNoteID()) ) NoteEditor.Escape();
					// show status message
					NoteFilter.MsgAdd(message);
					// refresh note list
					NoteFilter.NotesRequest();
				} else {
					NoteFilter.MsgAdd('The request was not successful. The response from the server: ' + data.error, 'error');
				}
			});
		}
	};

	/**
	 * Makes a visualization of the given note entries details
	 * @param note array note attributes
	 * @param icon img node for note icon
	 * @return array of html nodes or hint string
	 */
	var BuildNoteInfo = function ( note, icon ) {
		var list = [], fulltext = [], url = null;
		// iterate all note entries
		note.entries.each(function(entry){
			// decrypt data
			var name = App.Decode(entry.name);
			var data = App.Decode(entry.data);
			// prepare fulltext data
			fulltext.push(name.toLowerCase());
			fulltext.push(data.toLowerCase());
			// there is data and it's not a password
			if ( entry.id_type !== 4 && data ) {
				// truncate
				var sname = name.length > 30 ? name.slice(0, 25) + '...' : name;
				var sdata = data.length > 50 ? data.slice(0, 35) + '...' : data;
				// url
				if ( entry.id_type === 2 ) {
					// http/https/ftp and have point
					if ( (data.search('http://') >= 0 || data.search('https://') >= 0 || data.search('ftp://') >= 0) && data.search('.') >= 0 ) {
						sdata = element('a', {target:'_blank', href:data}, sdata);
						// the first available url
						if ( !url ) url = data;
					} else {
						// just server name
						sdata = element('b', {}, sdata);
					}
				}
				list.push(element('span', {className:'name'}, sname + ':'));
				list.push(element('span', {className:'data'}, sdata));
			}
		});
		// has valid url (the first one)
		if ( url ) {
			// get rid of all unnecessary parts
			url = url.split('/');
			// parts are valid
			if ( url[2] && url[2] != 'localhost' ) {
				// try to get image, won't repclace the current one if no icon found
				element('img', {className:'icon', src:'https://www.google.com/s2/favicons?domain=' + url[2]}, null, {onload:function(){
					// icon loaded so get current icon parent
					var parent = icon.parentNode;
					// and replace the current one
					parent.removeChild(icon);
					// with new
					elchild(parent, this);
					//self.dom.entries.insertBefore(entry, entry.previousSibling);
				}})
			}
		}
		// build search full text data
		note.fulltext = fulltext.join("\n");
		// warning if no data
		return list.length > 0 ? list : element('div', {className:'warn'}, hint_info_missing);
	}

	/**
	 * Tag button click handler
	 * include, exclude and subtract
	 */
	var TagClickHandler = function ( event ) {
		// ctrl holding
		if ( event.ctrlKey ) {
			NoteFilter.TagSubtract(this.tagnm);
		} else {
			if ( this.finc ) {
				// available for selection
				NoteFilter.TagInclude(this.tagnm);
			} else {
				// already selected
				NoteFilter.TagExclude(this.tagnm);
			}
		}
		// prevent bubbling
		return false;
	};

	/**
	 * Makes a list of note tags buttons with handlers
	 * @param note array note attributes
	 * @return array of html tag nodes or hint string
	 */
	var BuildNoteTags = function ( note ) {
		var list = [], exc = [], inc = [];
		// there is some data
		if ( note.tags.length > 0 ) {
			// separate tags
			note.tags.each(function(item){
				if ( !NoteFilter.data.tinc.has(item) ) exc.push(data_tags_idlist[item]); else inc.push(data_tags_idlist[item]);
			});
			// forms the list of tags already selected
			inc.sort().each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag include', tagnm:item, title:hint_tag_exclude}, item);
				// mouse click handler
				//$(item).bind('click', TagClickHandler);
				item.addEventListener('click', TagClickHandler);
				list.push(item);
			});
			// forms the list of tags available for selection
			exc.sort().each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag', finc:true, tagnm:item, title:hint_tag_include}, item);
				// mouse click handler
				//$(item).bind('click', TagClickHandler);
				item.addEventListener('click', TagClickHandler);
				list.push(item);
			});
		}
		// list of tags or missing hint
		return list.length > 0 ? list : hint_tags_missing;
	}

	/**
	 * Returns the corresponding note icon image address
	 * @param note array note attributes
	 * @return url string
	 */
	var GetNoteIcon = function ( note ) {
		// prepare
		var icon = 'img/tag_note.png',
			tags = TagManager.IDs2Names(note.tags);
		// iterate words in the tag list
		tags.each(function(item){
			// it's a tag from the global set
			if ( icon_tags.has(item) ) {
				// get the first match
				icon = 'img/tag_' + item + '.png';return;
			}
		});
		return icon;
	}

	/**
	 * Shows/hides checked notes controls and general notes info
	 * @param ctrlonly flag to skip or not the control buttons
	 */
	this.UpdateCtrlBlock = function ( ctrlonly ) {
		//var total = self.dom.notes.childNodes.length;
		if ( !ctrlonly ) {
			// list of visible notes
			var visible = this.GetNotesVisible();
			// clear and fill
			elchild(elclear(self.dom.tpinfo), [
				// block with amount
				element('span', {className:'amount'}, [
					// title
					element('p', {}, 'notes '),
					// amount of visible notes
					element('b', {title:hint_notes_visible}, visible.length), ' of ', element('b', {title:hint_notes_total}, this.data.total),
					// total amount of notes
					( visible.length < this.data.notes.length ? [element('p', {className:'div'}, '|'), element('b', {title:hint_notes_filtered}, this.data.notes.length - visible.length), ' filtered'] : null),
					// link to load all available notes
					( this.data.notes.length < this.data.total ? [element('p', {className:'div'}, '|'), element('a', {className:'bold'}, 'load all', {onclick:function(){
						NoteFilter.NotesRequest(true);
					}})] : null)
				]),
				// block with selection
				element('span', {}, [
					// title
					element('p', {}, 'select '),
					// link to select all notes
					element('a', {}, 'all', {onclick:function(){
						self.SetNotesState(visible, 'marked', true);
						self.UpdateCtrlBlock(true);
					}}),
					element('p', {className:'div'}, '|'),
					// link to remove selection from all notes
					element('a', {}, 'none', {onclick:function(){
						self.SetNotesState(visible, 'marked', false);
						self.UpdateCtrlBlock(true);
					}}),
					element('p', {className:'div'}, '|'),
					// link to invert selection
					element('a', {}, 'invert', {onclick:function(){
						self.SetNotesState(visible, 'marked');
						self.UpdateCtrlBlock(true);
					}})
				])
			]);
		}
		// get the list of checked notes
		var checked = this.GetNotesByState('marked');
		// hide all buttons
		this.dom.btndelete.style.display  = 'none';
		this.dom.btnrestore.style.display = 'none';
		// show only the corresponding one
		if ( checked.length > 0 ) (NoteFilter.data.wcmd.has('deleted') ? this.dom.btnrestore : this.dom.btndelete).style.display = 'block';
		// show/hide block depending on notes amount
		this.dom.tpbar.style.display = this.data.total == 0 ? 'none' : 'block';
	}

	/**
	 * Set the default note state, removes additional classes and resets the state flags
	 * @param notes if given than it's the only note list to be reset
	 */
	this.ClearNotesState = function ( notes ) {
		// all notes or the given one/ones
		var i, list = notes || self.dom.notes.childNodes;
		// iterate formed list
		for ( i = 0; i < list.length; i++ ) {
			// reset class
			list[i].className = 'note';
			// reset state flags
			list[i].state.active = list[i].state.marked = false;
		}
	}

	/**
	 * Sets the flag and clall to the given note/notes
	 * @param notes to be processed
	 * @param type string name active | marked
	 * @param state optional bool flag, if set true - set, false - unset
	 */
	this.SetNotesState = function ( notes, type, state ) {
		// check input
		if ( notes.length > 0 ) {
			notes.each(function(note){
				// determine the state to switch to
				note.state[type] = state !== undefined ? state : (note.state[type] ? false : true);
				// invert class
				//$(note).toggleClass(type, note.state[type]);
				note.classList.toggle(type, note.state[type]);
			});
		}
	};

	/**
	 * Returns the list of notes with the given state
	 * @param type string state name active | marked
	 * @return array of nodes
	 */
	this.GetNotesByState = function ( type ) {
		// all notes or only the given one
		var i, result = [], list = self.dom.notes.childNodes;
		// iterate formed list
		for ( i = 0; i < list.length; i++ ) {
			if ( list[i].state[type] === true ) result.push(list[i]);
		}
		return result;
	}

	/**
	 * Returns the html note block by id if found or false otherwise
	 * @param id int note attribute
	 * @return node with data or false on failure
	 */
	this.GetNoteByID = function ( id ) {
		// iterate note list
		for ( var i = 0, list = this.dom.notes.childNodes; i < list.length; i++ ) {
			// return if matched
			if ( list[i].data.id === id ) return list[i];
		}
		return false;
	}

	/**
	 * Returns the list of visible notes
	 * @return array of nodes
	 */
	this.GetNotesVisible = function () {
		// iterate note list
		for ( var i = 0, result = [], list = this.dom.notes.childNodes; i < list.length; i++ ) {
			// fill the visible notes list
			if ( !list[i].style.display ) result.push(list[i]);
		}
		return result;
	}

	/**
	 * Whole note ckick handler
	 * highlights the active note or note range
	 * holding Ctrl checks/unchecks the selected notes
	 * holding Shift selects all the notes between old and new selected notes
	 * @param event event object
	 */
	var NoteClickHandler = function ( event ) {
		// holding Ctrl key
		if ( event.ctrlKey ) {
			self.SetNotesState([this], 'marked');
		// simple mouse click
		} else {
			// currently active note list
			var alast = self.GetNotesByState('active');
			// flag true if the clicked note is the same as already active
			var fsame = alast.length > 0 && alast[0].data.id === this.data.id;
			// check current note modifications
			var has_changes = NoteEditor.HasChanges();
			// not changed or user confirmed his wish
			if ( !has_changes || fsame || (has_changes && NoteEditor.ConfirmExit()) ) {
				// reset all notes states
				self.ClearNotesState();
					// check if the edited note is not already active
				if ( NoteEditor.GetNoteID() !== this.data.id ) {
					// show note details
					NoteEditor.Load(this.data);
				}
				// make active
				self.SetNotesState([this], 'active');
				// holding Shift key
				if ( event.shiftKey ) {
					var i, item, cflag = false;
					// iterate all notes
					for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
						// cursor
						item = self.dom.notes.childNodes[i];
						// flag showing that the cursor is inside the range
						if ( item.data.id === alast[0].data.id || item.data.id === this.data.id ) cflag = !cflag;
						// check inside the range or edge items
						if ( cflag || item.data.id === alast[0].data.id || item.data.id === this.data.id ) {
							self.SetNotesState([item], 'marked');
						}
					}
				} else {
					// check the only clicked note
					self.SetNotesState([this], 'marked');
				}
			}
		}
		// show/hide checked notes controls
		self.UpdateCtrlBlock();
		// prevent bubbling
		//return false;
	}

	/**
	 * Note checkbox ckick handler
	 */
	var NoteTickClickHandler = function () {
		// check/uncheck
		self.SetNotesState([this.note], 'marked');
		// show/hide checked notes controls
		self.UpdateCtrlBlock();
		// prevent bubbling
		return false;
	}

	/**
	 * Forms the note wrapper
	 * @param data array of note parameters
	 * @return formed node with data
	 */
	this.BuildNote = function ( data ) {
		// note body
		var note = element('div', {className:'note', data:data, dom:{}, state:{}});
		// note content
		elchild(note, [
			element('div', {className:'icon'}, [
				note.dom.icon = element('img', {className:'icon', src:GetNoteIcon(data)}),
				//note.dom.icon = BuildNoteIcon(data),
				note.dom.tick = element('div', {className:'tick', note:note})
			]),
			element('div', {className:'body'}, [
				note.dom.info = element('div', {className:'info'}, BuildNoteInfo(data, note.dom.icon)),
				note.dom.time = element('div', {className:'time'}, TimestampToDateStr(data.mtime)),
				note.dom.tags = element('div', {className:'tags'}, BuildNoteTags(data))
			])
		]);
		// whole note ckick
		//$(note).bind('click', NoteClickHandler);
		note.addEventListener('click', NoteClickHandler);
		// checkbox click
		//$(note.dom.tick).bind('click', NoteTickClickHandler);
		note.dom.tick.addEventListener('click', NoteTickClickHandler);
		// note html body
		return note;
	};

	/**
	 * Shows/hides notes according to the filter
	 * @param notes array of notes that should be processed, all if not given
	 */
	this.SetNotesVisibility = function ( notes ) {
		// all notes or the given one/ones
		notes = notes || this.dom.notes.childNodes;
		var i, visible,  // flag for visibility
			hlist = [];  // list of the notes that should be hidden
		// iterate formed list
		for ( i = 0; i < notes.length; i++ ) {
			// by default is visible
			visible = true;
			// check by tags
			//TODO:???
			// check by filter string if still visible
			if ( visible ) {
				// check included words
				NoteFilter.data.winc.each(function(word){
					// not found in fulltext so exit
					if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) < 0 ) {visible = false;return;}
				});
				// still visible
				if ( visible ) {
					// check excluded words
					NoteFilter.data.wexc.each(function(word){
						// found in fulltext so exit
						if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) >= 0 ) {visible = false;return;}
					});
				}
			}
			// apply visibility flag
			notes[i].style.display = visible ? '' : 'none';
			// fill the list of notes to be hidden
			if ( !visible ) hlist.push(notes[i]);
		}
		// clear inner state for hidden notes
		this.ClearNotesState(hlist);
		this.UpdateCtrlBlock();
	}

	/**
	 * Fills the note list with generated notes
	 * @param notes array of notes or false if gloabal latest list should be used
	 * @param total int general amount of notes
	 */
	this.BuildTable = function ( notes, total ) {
		// check input
		notes = notes instanceof Array ? notes : [];
		// set global data
		this.data.notes = notes;
		this.data.total = total;
		// clearing the container
		elclear(this.dom.notes);
		// there are some notes
		if ( total > 0 ) {
			// determine the note id beeing edited at the moment
			var note, neid = NoteEditor.GetNoteID();
			// iterate all notes
			notes.each(function(item){
				// append the created note to the list
				note = self.BuildNote(item);
				self.SetNotesVisibility([note]);
				elchild(self.dom.notes, note);
				// highlight the edited at the moment note
				if ( neid === item.id ) self.SetNotesState([note], 'active');
			});
		}
		// show/hide control panel
		this.UpdateCtrlBlock();
	};

	/**
	 * Deletes or restore selected notes depending on undo flag
	 */
	var BtnDeleteHandler = function () {
		// ask user
		if ( confirm(this.undo ? msg_checked_notes_restore : msg_checked_notes_remove) ) {
			var list = [];
			// iterate all checked notes
			self.GetNotesByState('marked').each(function(note){
				// fill id list
				if ( note.data.id ) list.push(note.data.id);
			});
			// send request
			NotesDelete(list, this.undo);
		}
	}

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};

		this.data = {
			total : 0,  // total amount on notes
			notes : []  // all requested notes data array
		};

		// build all blocks together
		elchild(this.dom.handle, [
			// top panel
			this.dom.tpbar = element('div', {className:'tpbar'}, [
				// controls
				this.dom.tpctrl = element('div', {className:'ctrl'}, [
					this.dom.btndelete  = element('input', {type:'button', value:'Delete', undo:false, className:'button hidden'}, null, {onclick:BtnDeleteHandler}),
					this.dom.btnrestore = element('input', {type:'button', value:'Restore', undo:true, className:'button hidden'}, null, {onclick:BtnDeleteHandler})
				]),
				// general info, load all, select all/none/invert
				this.dom.tpinfo = element('div', {className:'info'})
			]),
			// note list
			this.dom.notes = element('div', {className:'notes'}),
			// bottom panel
			this.dom.btbar = element('div', {className:'btbar'})
		]);

		// disable selection
		this.dom.notes.onselectstart = function () {return false;} // ie
		this.dom.notes.onmousedown   = function () {return false;} // mozilla
	};
};

/*** app.tag.manager.js ***/
/**
 * List of tags with managing
 * @param params list of configuration parameters
 */
var TagManager = new function () {
	// for limited scopes
	var self = this;

	// max length of each tag, will be truncated on exceed
	var maxlength_tag = 100;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		if ( console.time ) console.time('TagManager: decrypt tags');
		// decrypt tags
		for ( var id in data_tags.data ) {
			var name = App.Decode(data_tags.data[id][data_tags.defn.name]);
			// fill service lookup tables of tags by id and by name
			data_tags_nmlist[name] = id = parseInt(id, 10);
			data_tags_idlist[id] = name;
		}
		if ( console.timeEnd ) console.timeEnd('TagManager: decrypt tags');
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// clear service lookup tables
		data_tags_nmlist = {};
		data_tags_idlist = {};
	};

	/**
	 * Adds new tag id and enc/dev values to the global lookup tables
	 * @param id of the new tag
	 * @param enc encrypted tag name value
	 * @param dec optional decrypted tag name value, decrypted from enc if omitted
	 */
	this.Add = function ( id, enc, dec ) {
		// decrypt name if necessary
		dec = dec || App.Decode(enc, true);
		data_tags.data[id] = [enc, [], 1];
		data_tags_nmlist[dec] = id;
		data_tags_idlist[id] = dec;
	};

	/**
	 * Returns the sorted list of tag ids by usage
	 * first ids the most used
	 */
	this.SortByUses = function () {
		var result = [];
		// prepare list of id/usage
		for ( var id in data_tags.data ) {
			result.push({id:parseInt(id, 10), uses:data_tags.data[id][data_tags.defn.uses]});
		}
		// custom sort
		result.sort(function(a,b){return b.uses-a.uses});
		// rework output, get rid of objects
		for ( var i = 0; i < result.length; i++ ) {
			result[i] = result[i].id;
		}
		return result;
	};

	/**
	 * Converts the array of tags ids to tags names
	 * @param data array of tags (integers or encrypted strings)
	 * @param prefix string to prepend to each tag name
	 * @return tags names array
	 * @example [1,2,'***encrypted string***',3] -> ['ftp','note','ssh','site']
	 */
	this.IDs2Names = function ( data, prefix ) {
		var name, result = [];
		// check input
		if ( data && data instanceof Array )
			// get tag names from ids
			for ( var i = 0; i < data.length; i++ ) {
				// check type
				if ( isNaN(data[i]) ) {
					// seems this is a real-time encrypted string
					if ( (name = App.Decode(data[i], true)) !== false ) result.push((prefix ? prefix : '') + name);
				} else {
					// seems normal tag id
					if ( data_tags_idlist[data[i]] )
						// tag found in the global list
						result.push((prefix ? prefix : '') + data_tags_idlist[data[i]]);
				}
			}
		return result.sort();
	};

	/**
	 * Returns the string of tag names from the tags ids
	 * @example [1,2,3] -> "note site ftp"
	 */
	this.IDs2Str = function ( data ) {
		data = this.IDs2Names(data);
		return data.length > 0 ? data.join(' ') : '';
	};

	/**
	 * Converts a tags names array to array of ids or encrypted strings
	 * @param data tags string
	 * @param skip_new optional flag to exclude all new not encrypted values
	 * @return array of tags (integers or encrypted strings)
	 * @example skip_new=true  ['ftp','note','ssh','site'] -> [1,2,3]
	 * @example skip_new=false ['ftp','note','ssh','site'] -> [1,2,'***encrypted string***',3]
	 */
	this.Names2IDs = function ( data, skip_new ) {
		var result = [];
		// check input
		if ( data && data instanceof Array ) {
			// list of unique tag names
			var words = [], enc = null;
			// iterate words in the input string
			for ( var i = 0; i < data.length; i++ ) {
				// shorten too long lines
				var name = data[i].slice(0, maxlength_tag);
				// check if this word already processed
				if ( !words.has(name) ) {
					if ( data_tags_nmlist[name] ) {
						// tag found in the global data
						result.push(data_tags_nmlist[name]);
					} else {
						// not found so encrypt and cache if not skipped
						if ( !skip_new && (enc = App.Encode(name, true)) !== false ) {
							result.push(enc);
						}
					}
					// add word
					words.push(name);
				}
			}
		}
		return result;
	};

	/**
	 * Converts a tags string to array of ids or encrypted strings
	 * @param data tags string
	 * @param skip_new optional flag to exclude all new not encrypted values
	 * @return array of tags (integers or encrypted strings)
	 * @example skip_new=true  "ftp note ssh site" -> [1,2,3]
	 * @example skip_new=false "ftp note ssh site" -> [1,2,'***encrypted string***',3]
	 */
	this.Str2IDs = function ( data, skip_new ) {
		// do convert
		return this.Names2IDs(this.Str2Names(data), skip_new);
	};

//	this.NamesMissed = function ( names, data ) {
//		var result = [];
//		// check input
//		if ( data && data.match ) {
//			// split to separate words
//			data = data.match(/(\S+)/g);
//			if ( data && data instanceof Array ) {
//				// iterate words in the input string
//				for ( var i = 0; i < data.length; i++ ) {
//					if ( !names.has(data[i]) ) {
//						result.push(data[i]);
//					}
//				}
//			}
//		}
//		return result;
//	};

	/**
	 * Converts a string to array of words
	 * @param data input string
	 * @return array of words
	 * @example 'ftp -note :ssh !site' -> ["ftp","-note",":ssh","!site"]
	 * @example 'ftp "my note" :ssh' -> ["ftp","my note",":ssh"]
	 */
	this.Str2Names = function ( data ) {
		var result = [];
		// check input
		if ( data && data.match ) {
			// split to words
			//data = data.match(/(?:"[^"]+"|[\S]+)/g);
			data = data.match(/(\S+)/g);
			// not empty list of words
			if ( data && data instanceof Array ) {
				// iterate words in the input string
				data.each(function(word){
					// prevent duplication
					if ( !result.has(word) ) result.push(word);
				});
			}
		}
		return result;
	};

	/**
	 * Parses the user input into inner data lists
	 * @param data string of tags input
	 * @return hash of lists
	 */
	this.StrParse = function ( data ) {
		var tinc = [],  // array of included tags ids
			texc = [],  // array of excluded tags ids
			ninc = [],  // array of included tags names
			nexc = [],  // array of excluded tags names
			winc = [],  // array of included words (not tags)
			wexc = [],  // array of excluded words (not tags)
			wcmd = [];  // array of command words
		// prepare sorted list of words and iterate
		this.Str2Names(data).sort().each(function(word){
			// find out if there are special chars at the beginning of the word
			var fchar = word.charAt(0), fexc = (fchar === '-'), fcmd = (fchar === ':');
			// get the word without special chars if present
			if ( fexc || fcmd ) word = word.slice(1);
			// not empty
			if ( word ) {
				// command
				if ( fcmd ) {
					wcmd.push(word);
				} else {
					// just a tag
					var tid = data_tags_nmlist[word];
					// tag id found in the global data
					if ( tid ) {
						if ( fexc ) {
							// excluded
							texc.push(tid); nexc.push(word);
						} else {
							// included
							tinc.push(tid); ninc.push(word);
						}
					} else {
						// tag id not found so it's just a word
						if ( fexc )
							wexc.push(word);
						else
							winc.push(word);
					}
				}
			}
		});
		// build result struct
		return {
			tinc:tinc, texc:texc,
			ninc:ninc, nexc:nexc,
			winc:winc, wexc:wexc,
			wcmd:wcmd
		};
	}

	/**
	 * Build the user input string from the parsed inner data
	 * @param data hash of lists
	 * @return string of tags input
	 */
	this.StrBuild = function ( data ) {
		var list = [];
		// check input and fill the list with the corresponding data
		if ( data.wcmd && data.wcmd instanceof Array ) data.wcmd.sort().each(function(item){ list.push(':'+item); });
		if ( data.ninc && data.ninc instanceof Array ) data.ninc.sort().each(function(item){ list.push(    item); });
		if ( data.nexc && data.nexc instanceof Array ) data.nexc.sort().each(function(item){ list.push('-'+item); });
		if ( data.winc && data.winc instanceof Array ) data.winc.sort().each(function(item){ list.push(    item); });
		if ( data.wexc && data.wexc instanceof Array ) data.wexc.sort().each(function(item){ list.push('-'+item); });
		// implode data into one line separated by spaces
		return list.join(' ');
	}

	/**
	 * Splits the string with words into two lists - inc and exc
	 * @param data string with words
	 * @example data = "table window -chair -door" -> {winc:["table","window"],wexc:["chair","door"]}
	 */
//	this.SeparateWords = function ( data ) {
//		var list = [],  // array of all parts
//			winc = [],  // array of included words (not tags)
//			wexc = [];  // array of excluded words (not tags)
//		// prepare list of words
//		list = this.Str2Names(data);
//		list.each(function(word){
//			// find out if there is minus at the beginning of the word
//			if ( word.charAt(0) === '-' ) {
//				// get the word without minus
//				word = word.slice(1);
//				// append excluded
//				if ( word ) wexc.push(word);
//			} else {
//				// append included
//				if ( word ) winc.push(word);
//			}
//		});
//		// build result struct
//		return { winc:winc, wexc:wexc };
//	}

//	this.StrCombine = function ( data ) {
//		var texc = [];
//		data.texc.each(function(id){
//			texc.push('-' + data_tags_idlist[id]);
//		});
//		texc.sort();
//		return texc.join(' ') + (texc.length > 0 ? ' ' : '') + this.IDs2Str(data.tinc);
//	}

	this.Linked = function ( data ) {
		var result = [], list = {}, i;
		//data = data.slice();
		if ( data && data instanceof Array ) {
			if ( data.length === 1 ) {
				result = data_tags.data[data[0]][data_tags.defn.links];
			} else {
				data.each(function(id){
					var links = data_tags.data[id][data_tags.defn.links];
					links.each(function(link){
						list[link] = (list[link] ? list[link] : 0) + 1;
					});
				});
				for ( i in list ) {
					if ( list[i] === data.length ) {
						result.push(parseInt(i,10));
					}
				}
				//fb(list);
				//result = data[0].slice();
				// iterate all rest
	//			for ( var i = 1; i < data.length; i++ ) {
	//				var links = data_tags.data[data[i]][data_tags.defn.links];
	//
	//			}
	//				fb(id);
	//				fb(data_tags.data[id][data_tags.defn.links].sort());
				//});
			}
		}
		//fb(result);
		return result;
	}

};

/*** app.taglist.js ***/
/**
 * List of tags with managing
 * @param params list of configuration parameters
 */
function TagList ( params ) {
	// for limited scopes
	var self = this;

	var maxlength_tag = 9;

	// html parent object
	this.dom = {
		handle:params.handle || null,
		input: params.input  || null
	};

	// component state flag
	// true - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		//var text_tag_list = document.getElementById('text_tag_list');
		//text_tag_list.value = '';
		if ( console.time ) console.time('decode tags');
		// decode tags
		for ( var id in data_tags.data ) {
			var name = App.Decode(data_tags.data[id][data_tags.defn.name]);
			data_tags_nmlist[name] = id = parseInt(id, 10);
			data_tags_idlist[id] = name;
		}
		// clear to minimaze memory
		//delete data_tags.data;
		if ( console.timeEnd ) console.timeEnd('decode tags');

		var uses = [];
		for ( id in data_tags.data ) {
			uses.push({id:parseInt(id, 10), uses:data_tags.data[id][data_tags.defn.uses]});
		}
		uses.sort(function(a,b){
			return b.uses-a.uses;
		});
		//fb(uses);
		for ( var i = 0; i < uses.length; i++ ) {
			TagDraw(uses[i].id, data_tags_idlist[uses[i].id]);
		}
//		for ( name in data_tags_nmlist ) {
//			TagDraw(data_tags_nmlist[name], name);
//		}
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		data_tags_nmlist = {};
		data_tags_idlist = {};

		elclear(self.dom.tags);
	};

	this.IDs2Names = function ( data ) {
		var result = [];
		// check input
		if ( data && data instanceof Array ) {
			// get tag names from ids
			for ( var i = 0; i < data.length; i++ ) {
				// seems normal tag id
				if ( data_tags_idlist[data[i]] )
					// tag found in the global list
					result.push(data_tags_idlist[data[i]]);
			}
		}
		return result;
	};
	this.IDs2Str = function ( data ) {
		var result = '';
		// check input
		if ( data && data instanceof Array ) {
			var i, list = [];
			// get tag names from ids and join them in line separated by spaces
			for ( i = 0; i < data.length; i++ ) {
				// seems normal tag id
				if ( data_tags_idlist[data[i]] )
					// tag found in the global list
					list.push(data_tags_idlist[data[i]]);
			}
			// there are some tags
			if ( list.length > 0 ) result = list.join(' ');
		}
		return result;
	};

	/**
	 * Converts a tags string to array of ids
	 * @param data tags string
	 * @return array of tags (integers or encrypted strings)
	 * @example [1,2,3] -> "email work important"
	 */
	this.TagsStr2IDs = function ( data ) {
		var result = [];
		// check input
		if ( data ) {
			data = data.match(/(\S+)/g);
			var i, words = [];
			// check parsed string
			if ( data && data instanceof Array ) {
				// sort data by name
				data = data.sort();
				// iterate words in the input string
				for ( i = 0; i < data.length; i++ ) {
					// shorten too long lines
					data[i] = data[i].slice(0, maxlength_tag);
					// check if this word already processed
					if ( words.indexOf(data[i]) < 0 ) {
						if ( data_tags_nmlist[data[i]] ) {
							// tag found in the global data
							result.push(data_tags_nmlist[data[i]]);
//						} else {
//							// not found so encrypt
//							result.push(App.Encode(data[i]));
						}
						// add word
						words.push(data[i]);
					}
				}
			}
		}
		return result;
	};

	var TagDraw = function ( id, name ) {
		//fb('id', id);
		var i, tag = element('span', {className:'tag', tagid:id, tagnm:name, title:id + ':' + data_tags.data[id][data_tags.defn.uses]},
			(( name.length > maxlength_tag ) ? name.slice(0, maxlength_tag) + '...' : name), {onclick:function(){
				//if ( $(this).hasClass('inactive') ) return;
				if ( this.classList.contains('inactive') ) {
				    return;
                }
				//$(this).toggleClass('select');
				this.classList.toggle('select');
				//if ( $(this).hasClass('select') ) {
				if ( this.classList.contains('select') ) {
					var text = self.dom.input.value.trim();
					self.dom.input.value = text + ( text ? ' ' : '' ) + this.tagnm;
					for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
						if ( !data_tags.data[id][data_tags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
							//$(self.dom.tags.childNodes[i]).addClass('inactive');
							self.dom.tags.childNodes[i].classList.add('inactive');
						}
					}
				} else {
					self.dom.input.value = self.dom.input.value.replace(this.tagnm, '').replace('  ', ' ').trim();
					for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
						//if ( !data_tags.data[id][data_tags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
							//$(self.dom.tags.childNodes[i]).removeClass('inactive');
							self.dom.tags.childNodes[i].classList.remove('inactive');
						//}
					}
				}
				self.dom.input.focus();
				self.dom.input.selectionStart = self.dom.input.value.length;
				NoteTableFilter(self.dom.input.value);

			}
		});
		elchild(self.dom.tags, [tag,' ']);
	};

	/**
	 * Main init method
	 */
	var Init = function () {
		// check input
		if ( !self.dom.handle ) return;
		// set class for container
		self.dom.handle.className = 'taglist';

		elchild(self.dom.handle, self.dom.tags = element('div', {className:'tags'}));
	};
	// call on creation
	Init();
}

/*** app.template.list.js ***/
/**
 * List of note templates
 */
var TemplateList = new function () {
	// for limited scopes
	var self = this;

	var hint_main   = 'In the list above please select a template to be used to create your new note.';
	var hint_item   = 'This template will create a note with this set of entries:<br>';
	var hint_filter = 'filter by name or description ...';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		this.Fill();
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment
		if ( this.open ) {
			elclear(this.dom.list);
			// component state flag
			this.open = false;
		}
	};

	/**
	 * Fills the list with templates
	 */
	this.Fill = function () {
		// prepare
		elclear(self.dom.list);
		// iterate all templates
		data_templates.data.each(function(data){
			// template body
			var item = element('div', {className:'item', /*style:'display:none',*/ data:data},
				element('div', {className:'line'}, [
					element('div', {className:'name'}, data[data_templates.defn.name]),
					element('div', {className:'hint'}, data[data_templates.defn.description])
			]));
			// append
			elchild(self.dom.list, item);
			// template item handlers
			//$(item).click(function(){
			item.addEventListener('click', function () {
				self.Show(false);
				NoteEditor.Create(this.data);
			});
			//$(item).mouseenter(function(){
			item.addEventListener('mouseenter', function () {
				var list = [];
				data_template_entries.data[this.data[data_templates.defn.id]].each(function(entry){
					list.push('<b>' + entry[data_template_entries.defn.name] + '</b>');
				});
				self.dom.hint.innerHTML = hint_item + list.join(', ');
			});
		});
		this.Filter();
	};

	/**
	 * Filters by given text
	 * @param text string to search in each template name or description
	 */
	this.Filter = function ( text ) {
		text = text || this.dom.filter.value;
		text = text.toLowerCase();
		for ( var i = 0; i < self.dom.list.childNodes.length; i++ ) {
			// prepare
			var item = self.dom.list.childNodes[i];
			var name = item.data[data_templates.defn.name].toLowerCase();
			var desc = item.data[data_templates.defn.description].toLowerCase();
			// search substring and show/hide
			//$(item).toggle(name.indexOf(text) >= 0 || desc.indexOf(text) >= 0);
			item.classList.toggle('hidden', !(!text || name.indexOf(text) >= 0 || desc.indexOf(text) >= 0));
		}
	};

	/**
	 * Shows/hides the component
	 * @param state visibility flag: true - show, false - hide
	 */
	this.Show = function ( state ) {
		this.dom.handle.style.display = state ? 'block' : 'none';
	}

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};
		// build main blocks together
		elchild(this.dom.handle, [
			this.dom.title = element('div', {className:'title'}),
			this.dom.list  = element('div', {className:'list'}),
			this.dom.hint  = element('div', {className:'hint'}, hint_main)
		]);
		// reset hint
		//$(this.dom.handle).mouseleave(function(){
		this.dom.handle.addEventListener('mouseleave', function () {
		    self.dom.hint.innerHTML = hint_main;
		});

		//this.dom.filter = element('input', {type:'text', value:hint_filter});
		this.dom.filter = element('input', {type:'text', placeholder: hint_filter});
		// watermark and filtering
		//watermark(this.dom.filter, hint_filter, '#000');
		//$(this.dom.filter).keyup(function(){
		this.dom.filter.addEventListener('keyup', function() {
		    self.Filter(this.value);
		});

		// title
		elchild(this.dom.title, [element('div', {className:'text'}, 'Templates'), this.dom.filter]);
	}
};

/*** app.tools.js ***/
/**
 * Helper functions
 */

// array prototypes
Array.prototype.has = function ( value ) {
	return this.indexOf(value) >= 0;
};
Array.prototype.empty = function () {
	return !(this.length > 0);
};
Array.prototype.each = function ( func ) {
	var i, l = this.length;
	for ( i = 0; i < l; i++ ) { func(this[i], i); }
};
// IE compatibility
// if ( !Array.indexOf ) {
// 	Array.prototype.indexOf = function ( obj, start ) {
// 		var i;
// 		for ( i = (start || 0); i < this.length; i++ ) {
// 			if ( this[i] === obj ) { return i; }
// 		}
// 		return -1;
// 	};
// }

// string prototypes
// String.prototype.trim = function() {
//    return this.replace(/^\s+|\s+$/g,"");
// };
String.prototype.ltrim = function() {
   return this.replace(/^\s+/g,"");
};
String.prototype.rtrim = function() {
   return this.replace(/\s+$/g,"");
};


/**
 * Firebug debug compatible with IE
 * free list of params
 */
// function fb () {
// 	if ( window.console && window.console.info )
// 		// send all arguments to firebug
// 		console.info(arguments.length == 1 ? arguments[0] : arguments);
//
// }


/**
 * Moves focus to the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to jump to
 */
function onEnterFocus ( src, dest ) {
	src.onkeypress = function(event){
		if ( event.which || event.keyCode ) {
			if ( (event.which == 13) || (event.keyCode == 13) ) {
				dest.focus();
				return false;
			}
		}
		return true;
	};
}


/**
 * Clicks the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to click to
 */
function onEnterClick ( src, dest ) {
	src.onkeypress = function(event){
		if ( event.which || event.keyCode ) {
			if ( (event.which == 13) || (event.keyCode == 13) ) {
				dest.focus();
				dest.click();
				return false;
			}
		}
		return true;
	};
}


/**
 * New link type to select value from the set
 * @param obj html element to expand
 * @param data list of values and titles like {300:{title:'5 minutes',next:1200}, 1200:{title:'20 minutes',next:300}}
 * @param id default value to select
 */
function LinkSet ( obj, data, id ) {
	if ( !obj ) return;

	this.obj  = obj;
	this.data = data;

	/**
	 * Set currect value and title from the data
	 * @param id to select
	 */
	this.ItemSelect = function ( id ) {
		// if somebody alredy have 1 munute (probably should be removed in the future)
		if ( id == 60 ) data[60] = {next:300,  title: '1 minute'};
		// check input
		if ( id && data && data[id] ) {
			// set value and html
			this.obj.value = id;
			this.obj.innerHTML = data[id].title;
			var pthis = this;
			// set onclick handler and pass this object pointer for future selection
			this.obj.onclick = function(){
				pthis.ItemSelect(data[id].next);
			};
		}
	};

	// do the default selection
	this.ItemSelect(id);
}


/**
 * Adds the given value to the obj as a child recursively
 * @param obj DOMElement to be appended
 * @param value data to add (simple text values, DOMElements, array of DOMElements)
 * @return DOMElement owner of all added data
 * @example elchild(mydiv, 'Hello world'); // simple text value
 * @example elchild(mydiv, someotherdiv); // DOMElement
 * @example elchild(mydiv, [div1, div2, div3]); // DOMElement list
 * @example elchild(mydiv, [div1, 'hello', 'world']); // combined case
 */
function elchild ( obj, value ) {
	// check input
	if ( obj && value != null ) {
		// DOMElement
		if ( value.nodeType ) {
			obj.appendChild(value);
		}
		// array of DOMElements of simple values
		else if ( value instanceof Array ) {
			for ( var i = 0; i < value.length; i++ ) {
				elchild(obj, value[i]);
			}
		}
		// simple values
		else {
			obj.appendChild(document.createTextNode(value));
		}
	}
	return obj;
}


/**
 * Removes all child elements from the given object
 * @param obj DOMElement to be updated
 * @return DOMElement cleared
 */
function elclear ( obj ) {
	if ( obj && obj.hasChildNodes() ) {
		while ( obj.hasChildNodes() ) {
			obj.removeChild(obj.firstChild);
		}
	}
	return obj;
}


/**
 * Assigns a list of attribute values to the given object
 * @param obj DOMElement
 * @param attr list of attributes with values
 * @return DOMElement the same as the given one
 * @example elattr(myimg, {src:'face.png', className:'main'});
 */
function elattr ( obj, attr ) {
	// check if DOMElement
	if ( obj && obj.nodeType && attr && attr instanceof Object ) {
		for ( var akey in attr ) {
			obj[akey] = attr[akey];
		}
	}
	return obj;
}


/**
 * Creates a DOMElement with given options
 * @param name html element name (a, img, div, ...)
 * @param attr list of attributes with values
 * @param [data] inner html value
 * @param [handlers] list of DOMElement event handlers (onclick, onload, ...)
 * @return {Node}
 * @example element('link', {rel:'stylesheet', type:'text/css', href:'http://some.url/'});
 */
function element ( name, attr, data, handlers ) {
	var tag = document.createElement(name);
	elattr(tag, attr);
	elchild(tag, data);
	// set all handlers
	if ( handlers && handlers instanceof Object ) {
		for ( var handler in handlers ) {
			tag[handler] = handlers[handler];
		}
	}
	return tag;
}


function table ( rows, cols, attr, handlers ) {
	var el = element('table', attr, null, handlers);
	for ( var i = 0; i < rows; i++ ) {
		el.insertRow(-1);
		for ( var j = 0; j < cols; j++ ) {
			el.rows[i].insertCell(-1);
		}
	}
	return el;
}


function tblrow ( obj, cells, attrs ) {
	var row = obj.insertRow(-1);
	for ( var i = 0; i < cells.length; i++ ) {
		row.insertCell(-1);
		elchild(row.cells[i], cells[i]);
		elattr(row.cells[i], attrs[i]);
	}

	return obj;
}


/**
 * converts date from timestamp to simple date string
 * 1209589200 -> 2012.02.03 00:23
 * @return {String}
 */
function TimestampToDateStr ( tstamp ) {
	var theDate = tstamp ? new Date(tstamp * 1000) : new Date();
	var nyear   = theDate.getFullYear();
	var nmonth  = theDate.getMonth() + 1;
	var nday    = theDate.getDate();
	var hour    = theDate.getHours();
	var min     = theDate.getMinutes();
	if ( nmonth < 10 ) nmonth = '0' + nmonth;
	if ( nday   < 10 ) nday   = '0' + nday;
	if ( hour   < 10 ) hour   = '0' + hour;
	if ( min    < 10 ) min    = '0' + min;
	return nyear + '.' + nmonth + '.' + nday + ' ' + hour + ':' + min;
}


function time_data ( timestamp ) {
	var dt = new Date(timestamp * 1000);
	var dl = {y:dt.getFullYear(), m:dt.getMonth()+1, d:dt.getDate(), h:dt.getHours(), i:dt.getMinutes()};
	// extend with zero where necessary
	if ( dl.m < 10 ) dl.m = '0' + dl.m;
	if ( dl.d < 10 ) dl.d = '0' + dl.d;
	if ( dl.h < 10 ) dl.h = '0' + dl.h;
	if ( dl.i < 10 ) dl.i = '0' + dl.i;
	return dl;
}


/**
 * Password generator with SJCL entropy mechanism
 * @param {Number} length size of the result password
 * @return {String}
 */
function pwdgen ( length ) {
    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&{}()[]=+?*<>;,.:-_",
		letters = [], letter, result = "";
	while ( result.length < length ) {
		letter = null;
		// generate a char
		if ( sjcl.random.isReady() ) {
			// get
			letter = String.fromCharCode(parseInt(sjcl.codec.hex.fromBits(sjcl.random.randomWords(1)).substr(0,2), 16));
			// invalidate if not in dictionary
			if ( charset.indexOf(letter) === -1 ) letter = null;
		} else {
			letter = charset.charAt(Math.floor(Math.random() * charset.length));
		}
		// something is found
		if ( letter ) {
			// check if not a duplicate
			if ( letters.indexOf(letter.toLowerCase()) < 0 ) {
				// fill already used chars list
				letters.push(letter.toLowerCase());
				// fill the result
				result += letter;
			}
		}
	}
    return result;
}


/**
* Ajax cross-domain request helper
* @param url link to external resource
*/
// function jsonp ( url ) {
// 	// create element and get data to callback
// 	var script = element('script', {type:'text/javascript', src:url});
// 	// insert to DOM
// 	document.body.appendChild(script);
// 	// clear after data processed in 5 secs
// 	setTimeout(function(){
//         console.log('jsonp script tag clearing');
// 		document.body.removeChild(script);
// 	}, 10000);
// }


/**
 * Set input watermark hint
 * @param obj html element
 * @param text string hint
 * @param cin string color
 */
// function watermark ( obj, text, cin ) {
// 	$(obj)
// 		.focus(function(){
// 			if ( this.value == text ) $(this).val('').css({color:cin});
// 		})
// 		.focusout(function(){
// 			if ( !this.value ) $(this).val(text).css({color:''});
// 		});
// }

/*** app.tplist.js ***/
/**
 * List of groups with its items
 * @param params list of configuration parameters
 */
function CTemplateList ( params ) {
	// global params
	this.params = params;

	/**
	 * Add new parent section
	 */
	this.AddGroup = function ( name ) {
		// prepare data
		var group = element('div', {className:'group'}, [
			element('div', {className:'title'}, element('div', {className:'name'}, name)),
			element('div', {className:'items'})
		]);
		// append to container
		elchild(this.params.handle, group);
		return group;
	};

	/**
	 * Add new child section
	 * @param group pointer to parent section
	 * @param data of the template
	 */
	this.AddItem = function ( group, data ) {
		// prepare data
		var item = element('div', {className:'item', data:data}, element('div', {className:'line'}, [
			element('div', {className:'name'}, data[data_templates.defn.name]),
			element('div', {className:'hint'}, data[data_templates.defn.description])
			//element('div', {className:'ctrl'}, element('img', {src:'img/field_btn_delete_white.png'}))
		]));
		// append to group
		elchild(group.childNodes[1], item);
		// callback handler
		if ( this.params.onclick && this.params.onclick instanceof Function ) {
			item.onclick = this.params.onclick;
		}
	};

	this.Init = function () {
		// check input
		if ( !this.params.handle ) return;
		// set class for container
		this.params.handle.className = 'tplist';
	};
	this.Init();
}