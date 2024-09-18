var AwesompleteBundle=(()=>{var dt=Object.create;var Q=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var vt=Object.getOwnPropertyNames;var bt=Object.getPrototypeOf,gt=Object.prototype.hasOwnProperty;var rt=(l,u)=>()=>(u||l((u={exports:{}}).exports,u),u.exports),yt=(l,u)=>{for(var h in u)Q(l,h,{get:u[h],enumerable:!0})},st=(l,u,h,v)=>{if(u&&typeof u=="object"||typeof u=="function")for(let r of vt(u))!gt.call(l,r)&&r!==h&&Q(l,r,{get:()=>u[r],enumerable:!(v=mt(u,r))||v.enumerable});return l};var lt=(l,u,h)=>(h=l!=null?dt(bt(l)):{},st(u||!l||!l.__esModule?Q(h,"default",{value:l,enumerable:!0}):h,l)),At=l=>st(Q({},"__esModule",{value:!0}),l);var ut=rt((St,Y)=>{(function(){var l=function(i,s){var f=this;l.count=(l.count||0)+1,this.count=l.count,this.isOpened=!1,this.input=r(i),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-autocomplete","list"),this.input.setAttribute("aria-expanded","false"),this.input.setAttribute("aria-controls","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),this.options=s=s||{},h(this,{minChars:2,maxItems:10,autoFirst:!1,data:l.DATA,filter:l.FILTER_CONTAINS,sort:s.sort===!1?!1:l.SORT_BYLENGTH,container:l.CONTAINER,item:l.ITEM,replace:l.REPLACE,tabSelect:!1,listLabel:"Results List",statusNoResults:"No results found",statusXResults:"{0} results found",statusTypeXChar:"Type {0} or more characters for results"},s),this.index=-1,this.container=this.container(i),this.ul=r.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container,"aria-label":this.listLabel}),this.status=r.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:""}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(a){var p=a.keyCode;f.opened&&(p===13&&f.selected||p===9&&f.selected&&f.tabSelect?(a.preventDefault(),f.select(void 0,void 0,a)):p===27?f.close({reason:"esc"}):(p===38||p===40)&&(a.preventDefault(),f[p===38?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(a){a.preventDefault()},click:function(a){var p=a.target;if(p!==this){for(;p&&!/li/i.test(p.nodeName);)p=p.parentNode;p&&a.button===0&&(a.preventDefault(),f.select(p,a.target,a))}}}},r.bind(this.input,this._events.input),r.bind(this.input.form,this._events.form),r.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||s.list||[],l.all.push(this)};l.prototype={set list(i){if(Array.isArray(i))this._list=i;else if(typeof i=="string"&&i.indexOf(",")>-1)this._list=i.split(/\s*,\s*/);else if(i=r(i),i&&i.children){var s=[];v.apply(i.children).forEach(function(f){if(!f.disabled){var a=f.textContent.trim(),p=f.value||a,E=f.label||a;p!==""&&s.push({label:E,value:p})}}),this._list=s}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(i){this.opened&&(this.input.setAttribute("aria-expanded","false"),this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),this.input.setAttribute("aria-activedescendant",""),r.fire(this.input,"awesomplete-close",i||{}))},open:function(){this.input.setAttribute("aria-expanded","true"),this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&this.index===-1&&this.goto(0),r.fire(this.input,"awesomplete-open")},destroy:function(){if(r.unbind(this.input,this._events.input),r.unbind(this.input.form,this._events.form),!this.options.container){var i=this.container.parentNode;i.insertBefore(this.input,this.container),i.removeChild(this.container)}this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete"),this.input.removeAttribute("aria-expanded"),this.input.removeAttribute("aria-controls"),this.input.removeAttribute("role");var s=l.all.indexOf(this);s!==-1&&l.all.splice(s,1)},next:function(){var i=this.ul.children.length;this.goto(this.index<i-1?this.index+1:i?0:-1)},previous:function(){var i=this.ul.children.length,s=this.index-1;this.goto(this.selected&&s!==-1?s:i-1)},goto:function(i){var s=this.ul.children;this.selected&&s[this.index].setAttribute("aria-selected","false"),this.index=i,i>-1&&s.length>0&&(s[i].setAttribute("aria-selected","true"),this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=s[i].offsetTop-this.ul.clientHeight+s[i].clientHeight,r.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(i,s,f){if(i?this.index=r.siblingIndex(i):i=this.ul.children[this.index],i){var a=this.suggestions[this.index],p=r.fire(this.input,"awesomplete-select",{text:a,origin:s||i,originalEvent:f});p&&(this.replace(a),this.close({reason:"select"}),r.fire(this.input,"awesomplete-selectcomplete",{text:a,originalEvent:f}))}},evaluate:function(){var i=this,s=this.input.value;s.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(f){return new u(i.data(f,s))}).filter(function(f){return i.filter(f,s)}),this.sort!==!1&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(f,a){i.ul.appendChild(i.item(f,s,a))}),this.ul.children.length===0?(this.status.textContent=this.statusNoResults,this.close({reason:"nomatches"})):(this.input.setAttribute("aria-activedescendant",""),this.open(),this.status.textContent=this.statusXResults.replaceAll("{0}",this.ul.children.length))):(this.close({reason:"nomatches"}),this.minChar<=1||s.length>=this.minChars?this.status.textContent=this.statusNoResults:this.status.textContent=this.statusTypeXChar.replaceAll("{0}",this.minChars))}},l.all=[],l.FILTER_CONTAINS=function(i,s){return RegExp(r.regExpEscape(s.trim()),"i").test(i)},l.FILTER_STARTSWITH=function(i,s){return RegExp("^"+r.regExpEscape(s.trim()),"i").test(i)},l.SORT_BYLENGTH=function(i,s){return i.length!==s.length?i.length-s.length:i<s?-1:1},l.CONTAINER=function(i){return r.create("div",{className:"awesomplete",around:i})},l.ITEM=function(i,s,f){var a=s.trim()===""?i:i.replace(RegExp(r.regExpEscape(s.trim()),"gi"),"<mark>$&</mark>");return r.create("li",{innerHTML:a,role:"option","aria-selected":"false",tabindex:"-1",id:"awesomplete_list_"+this.count+"_item_"+f})},l.REPLACE=function(i){this.input.value=i.value},l.DATA=function(i){return i};function u(i){var s=Array.isArray(i)?{label:i[0],value:i[1]}:typeof i=="object"&&"label"in i&&"value"in i?i:{label:i,value:i};this.label=s.label||s.value,this.value=s.value}Object.defineProperty(u.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),u.prototype.toString=u.prototype.valueOf=function(){return""+this.label};function h(i,s,f){for(var a in s){var p=s[a],E=i.input.getAttribute("data-"+a.toLowerCase());typeof p=="number"?i[a]=parseInt(E):p===!1?i[a]=E!==null:p instanceof Function?i[a]=null:i[a]=E,!i[a]&&i[a]!==0&&(i[a]=a in f?f[a]:p)}}var v=Array.prototype.slice;function r(i,s){return typeof i=="string"?(s||document).querySelector(i):i||null}function b(i,s){return v.call((s||document).querySelectorAll(i))}r.create=function(i,s){var f=document.createElement(i);for(var a in s){var p=s[a];if(a==="inside")r(p).appendChild(f);else if(a==="around"){var E=r(p);E.parentNode.insertBefore(f,E),f.appendChild(E),E.getAttribute("autofocus")!=null&&E.focus()}else a in f?f[a]=p:f.setAttribute(a,p)}return f},r.bind=function(i,s){if(i)for(var f in s){var a=s[f];f.split(/\s+/).forEach(function(p){i.addEventListener(p,a)})}},r.unbind=function(i,s){if(i)for(var f in s){var a=s[f];f.split(/\s+/).forEach(function(p){i.removeEventListener(p,a)})}},r.fire=function(i,s,f){var a=document.createEvent("HTMLEvents");a.initEvent(s,!0,!0);for(var p in f)a[p]=f[p];return i.dispatchEvent(a)},r.regExpEscape=function(i){return i.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},r.siblingIndex=function(i){for(var s=0;i=i.previousElementSibling;s++);return s};function m(){b("input.awesomplete").forEach(function(i){new l(i)})}return typeof self!="undefined"&&(self.Awesomplete=l),typeof Document!="undefined"&&(document.readyState!=="loading"?m():document.addEventListener("DOMContentLoaded",m)),l.$=r,l.$$=b,typeof Y=="object"&&Y.exports&&(Y.exports=l),l})()});var at=rt((Ft,J)=>{var ot=function(){var l="awesomplete-",u=l+"loadcomplete",h=l+"selectcomplete",v=l+"match",r=l+"prepop",b=l+"select",m="awe-found",i="awe-not-found",s=Awesomplete.$;function f(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:typeof t=="object"&&"label"in t&&"value"in t?t:{label:t,value:t};return{label:e.label||e.value,value:e.value}}function a(t,e,n){return s.fire(t,e,{detail:n})}function p(t,e){var n=t.input,o=n.classList,c=t.utilprops,d=c.selected,g=c.convertInput.call(t,n.value),_=t.opened,L=[],C=t._list,y,I,A,x;if(c.prepop=!1,C){for(x=0;x<C.length;x++)if(A=C[x],y=f(t.data(A,g)),t.maxItems===0&&(y.toString=function(){return""+this.label},t.filter(y,g)&&(_=!0)),I={input:{value:""}},t.replace.call(I,y),c.convertInput.call(t,I.input.value)===g){if(d&&d.value===y.value&&d.label===y.label){L=[A];break}L.push(A)}L.length>0?e?a(n,r,L):c.changed&&(c.prevSelected=L,o.remove(i),o.add(m),a(n,v,L)):e?a(n,r,[]):c.changed&&(c.prevSelected=[],o.remove(m),!_||n!==document.activeElement?g!==""&&(o.add(i),a(n,v,[])):o.remove(i))}}function E(t){var e=this;(t.type===h||t.type===u||t.type==="blur")&&t.target===e.input&&p(e,e.utilprops.prepop&&t.type===u)}function X(t){var e=this;t.target===e.input&&t.keyCode===9&&e.select(void 0,void 0,t)}function w(t){var e=this;clearTimeout(e.utilprops.timeoutID),e.utilprops.changed=!0,e.utilprops.selected=t.text}function U(t){return Object.keys(t).length===0&&t.constructor===Object}function P(t,e,n){var o=t.utilprops;return!o.listQuery||!o.loadall&&e.lastIndexOf(n,0)===0&&(e.lastIndexOf(o.listQuery,0)!==0||typeof o.limit=="number"&&t._list.length>=o.limit)}function q(t,e,n){t.list=e,t.utilprops.listQuery=n,a(t.input,u,n)}function N(t,e,n,o){var c;if(o||P(t,t.utilprops.val,n)){if(typeof e=="string"&&(e=JSON.parse(e)),t.utilprops.convertResponse&&(e=t.utilprops.convertResponse.call(t,e)),!Array.isArray(e)){if(t.utilprops.limit===0||t.utilprops.limit===1)e=U(e)?[]:[e];else for(c in e)if(Array.isArray(e[c])){e=e[c];break}}Array.isArray(e)&&q(t,e,n||t.utilprops.loadall)}return t}function M(){var t=this,e=t.awe,n=t.xhr,o=t.queryVal;n.status===200&&N(e,n.responseText,o,!1)}function D(t,e){var n=new XMLHttpRequest;t.utilprops.ajax.call(t,t.utilprops.url,t.utilprops.urlEnd,t.utilprops.loadall?"":e,M.bind({awe:t,xhr:n,queryVal:e}),n)}function S(t,e,n){t.utilprops.url&&P(t,e,e)?typeof n=="number"&&n>0?t.utilprops.timeoutID=setTimeout(D.bind(null,t,e),n):D(t,e):p(t,t.utilprops.prepop)}function W(t){var e=t.input,n=e.classList;n.remove(i),n.remove(m),a(e,v,[])}function H(t,e,n){return t.utilprops.prepop=n||!1,t.utilprops.val!==e&&(clearTimeout(t.utilprops.timeoutID),t.utilprops.selected=null,t.utilprops.changed=!0,t.utilprops.val=e,(e===""||e.length<t.minChars)&&W(t),e.length>=t.minChars&&S(t,e,t.utilprops.debounce)),t}function K(t){var e=this,n;t.target===e.input&&(n=e.utilprops.convertInput.call(e,e.input.value),H(e,n))}function F(t,e,n){return s.create("li",{innerHTML:t,role:"option","aria-selected":"false",tabindex:"-1",id:"awesomplete_list_"+this.count+"_item_"+n})}function k(t){return t.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")}function $(t){var e=this,n=e.sourceId,o=e.dataField,c=e.targetId,d,g;t.target===s(n)&&(typeof c=="function"?c(t,o):(d=s(c),d&&d!==document.activeElement&&(g=Array.isArray(t.detail)&&t.detail.length===1?t.detail[0]:null,g=(o&&g?g[o]:g)||"",typeof d.value!="undefined"?(d.value=g,d.classList&&d.classList.remove&&d.classList.remove(i)):typeof d.src!="undefined"?d.src=g:d.innerHTML=g)))}function B(t){var e=this,n,o;t.target===s(e.btnId)&&(t.preventDefault(),n=e.awe,n.ul.childNodes.length===0||n.ul.hasAttribute("hidden")?(o=n.minChars,n.minChars=0,n.evaluate(),n.minChars=o):n.close())}function T(t,e,n){var o=s.regExpEscape(k(e).trim()),c=o===""?null:n?RegExp("^"+o,"i"):RegExp("(?!<[^>]+?>)"+o+"(?![^<]*?>)","gi");return t.replace(c,"<mark>$&</mark>")}function j(t,e,n,o,c){var d=c.root,g=c.value,_=c.label||c.value,L=!0,C=[],y;if(o===0&&d&&n&&(n+".").lastIndexOf(d+".",0)!==0&&(d+".").lastIndexOf(n+".",0)!==0)return t;if(Object(e)!==e)n?t[n]=e:t=e;else if(Array.isArray(e)){for(y=0;y<e.length;y++)C.push(j({},e[y],"",o+1,c));n?t[n]=C:t=C}else{for(y in e)L=!1,j(t,e[y],n?n+"."+y:y,o,c);L&&n&&(t[n]={})}return o<2&&n&&(g&&(n+".").lastIndexOf(g+".",0)===0&&(t.value=t[n]),_&&(n+".").lastIndexOf(_+".",0)===0&&(t.label=t[n])),o===0&&(g&&!("value"in t)&&(t.value=null),_&&!("label"in t)&&(t.label=null)),t}function G(){var t=this,e=t.awe.input,n=t.boundMatch,o=t.boundOnInput,c=t.boundOnKeydown,d=t.boundSelect;e.removeEventListener(b,d),e.removeEventListener(u,n),e.removeEventListener(h,n),e.removeEventListener("blur",n),e.removeEventListener("input",o),e.removeEventListener("keydown",c)}return{ajax:function(t,e,n,o,c){var d=encodeURIComponent(n);return c=c||new XMLHttpRequest,c.open("GET",t+(typeof e=="function"?e(d):d+(e||""))),c.onload=o,c.send(),c},convertInput:function(t){return typeof t=="string"?t.trim().toLowerCase():""},item:F,load:q,mark:T,itemContains:function(t,e,n){var o;return e.trim()!==""&&(o=(""+t).split(/<p>/),o[0]=T(o[0],e),t=o.join("<p>")),F.call(this,t,e,n)},itemMarkAll:function(t,e,n){return F.call(this,e.trim()===""?""+t:T(""+t,e),e,n)},itemStartsWith:function(t,e,n){return F.call(this,e.trim()===""?""+t:T(""+t,e,!0),e,n)},itemWords:function(t,e,n){var o,c=e.split(/\s+/),d;if(e.trim()!==""){for(o=(""+t).split("<"),d=0;d<c.length;d++)o[0]=T(o[0],c[d]);t=o.join("<")}return F.call(this,t,e,n)},create:function(t,e,n){n.item=n.item||this.itemContains;var o=new Awesomplete(t,n);return o.utilprops=e||{},!o.utilprops.url&&typeof o.utilprops.loadall=="undefined"&&(o.utilprops.loadall=!0),o.utilprops.ajax=o.utilprops.ajax||this.ajax,o.utilprops.convertInput=o.utilprops.convertInput||this.convertInput,o},attach:function(t){var e=t.input,n=E.bind(t),o=X.bind(t),c=K.bind(t),d=w.bind(t),g=G.bind({awe:t,boundMatch:n,boundOnInput:c,boundOnKeydown:o,boundSelect:d}),_={keydown:o,input:c};return _.blur=_[h]=_[u]=n,_[b]=d,s.bind(e,_),t.utilprops.detach=g,t.utilprops.prepop&&(t.utilprops.loadall||e.value!=="")&&(t.utilprops.val=t.utilprops.convertInput.call(t,e.value),S(t,t.utilprops.val)),t},update:function(t,e,n){return t.input.value=e,H(t,e,n)},updateList:function(t,e,n,o){return N(t,e,n,o)},start:function(t,e,n){return this.attach(this.create(t,e,n))},detach:function(t){return clearTimeout(t.utilprops.timeoutID),t.utilprops.detach&&(t.utilprops.detach(),delete t.utilprops.detach),t},createCopyFun:function(t,e,n){return $.bind({sourceId:t,dataField:e,targetId:s(n)||n})},attachCopyFun:function(t,e,n){return e=typeof e=="boolean"?e:!0,n=n||document.body,n.addEventListener(v,t),e&&n.addEventListener(r,t),t},startCopy:function(t,e,n,o){var c=s(t);return this.attachCopyFun(this.createCopyFun(c||t,e,n),o,c)},detachCopyFun:function(t,e){return e=e||document.body,e.removeEventListener(r,t),e.removeEventListener(v,t),t},createClickFun:function(t,e){return B.bind({btnId:t,awe:e})},attachClickFun:function(t,e){return e=e||document.body,e.addEventListener("click",t),t},startClick:function(t,e){var n=s(t);return this.attachClickFun(this.createClickFun(n||t,e),n)},detachClickFun:function(t,e){return e=e||document.body,e.removeEventListener("click",t),t},filterContains:function(t,e){return Awesomplete.FILTER_CONTAINS(t.value,e)},filterStartsWith:function(t,e){return Awesomplete.FILTER_STARTSWITH(t.value,e)},filterOff:function(t,e){return!0},filterWords:function(t,e){var n=e.split(/\s+/),o=!0,c;for(t=" "+t,c=0;o&&c<n.length;c++)o=Awesomplete.FILTER_CONTAINS(t," "+n[c]);return o},jsonFlatten:function(t){return j({},t,"",0,this)}}}();typeof J=="object"&&J.exports&&(J.exports=ot);typeof self!="undefined"&&(self.AwesompleteUtil=ot)});var Ct={};yt(Ct,{Awesomplete:()=>pt.default,AwesompleteUtil:()=>ht.default,attachAwesomplete:()=>ft,copyValueToId:()=>ct});var pt=lt(ut()),ht=lt(at());var R=AwesompleteUtil,O=(l,u,h)=>{if(u==null)return null;if(typeof l[u]!="function")throw new Error("Unknown "+h+" function "+u);return l[u]},Et=(l,u,h)=>{var v=null,r;return u&&(v=new RegExp("^.+["+u+"]\\s*|"),r=u[0],u[0]!==" "&&(r+=" ")),function(b){var m=h?b.value.substring(0,b.value.lastIndexOf("|")):b.value,i=v?this.input.value.match(v)[0]+m+r:m;l?l.call(this,i):this.input.value=i}},_t=(l,u,h,v)=>(l||(v?l=R.itemMarkAll:u?l=R.itemStartsWith:h&&(l=R.itemContains)),h?function(r,b,m){return l.call(this,r,b.match(h)[0],m)}:l),It=(l,u,h,v)=>{if(!h&&!v)return l;let r=l,b=Awesomplete;if(u)if(descrSearch)r=function(m,i){return b.FILTER_STARTSWITH(m,i)||b.FILTER_STARTSWITH(m.substring(m.lastIndexOf("|")+1),i)};else{if(!h)return R.filterStartsWith;r=b.FILTER_STARTSWITH}else if(!l||l===R.filterContains||l===b.FILTER_CONTAINS){if(!h)return R.filterContains;r=b.FILTER_CONTAINS}return function(m,i){let s=h?i.match(h)[0]:i;return h&&this.minChars>1&&s.trimStart().length<this.minChars?!1:r.call(this,v?m.value:m,s)}},Tt=(l,u,h,v,r)=>{let b=null;if(h||v)b=function(m,i){return{label:(m[h||u]||"").replace("<p>","<p >")+(v?"<p>"+(m[v]||""):""),value:(m[u]||"")+(r?"|"+(m[v]||"").replace("|"," "):"")}};else if(u)b=function(m,i){return m[u]||""};else return l;return l?function(m,i){return l.call(this,b(m,i),i)}:b},Lt=(l,u)=>{if(!u)return l;let h=new RegExp("["+u+"]\\s*$"),v=new RegExp("[^"+u+"]*$");return function(r){var b=r.replace(h,"").match(v)[0].trim().toLowerCase();return l?l.call(this,b):b}},xt=(l,u,h)=>{h=h||{},u=u||{};let v=l.getAttribute.bind(l),r=function(nt){return v(nt)||h[nt]},b=r("ajax"),m=r("assign"),i=r("autoFirst"),s=r("combobox"),f=r("container"),a=r("convertInput"),p=r("convertResponse"),E=r("data"),X=r("debounce"),w=r("descr"),U=r("descrSearch"),P=r("item"),q=r("filter"),N=r("forField"),M=r("label"),D=r("limit"),S=r("list"),W=r("loadall"),H=r("listLabel"),K=r("maxItems"),F=r("minChars"),k=r("multiple"),$=r("prepop"),B=r("replace"),T=r("sort"),j=r("statusNoResults"),G=r("statusTypeXChar"),t=r("statusXResults"),e=r("value"),n=r("url"),o=r("urlEnd"),c=O(u,a,"convertInput"),d=O(u,E,"data"),g=O(u,q,"filter"),_=O(u,P,"item"),L=O(u,B,"replace"),C=g===Awesomplete.FILTER_STARTSWITH||g===R.filterStartsWith,y=U==="true"||U===!0;if(N===void 0)throw new Error("Missing forField attribute.");let I={},A={},x=null,Z=null,z=null;if(n&&(I.url=n),o&&(I.urlEnd=typeof u[o]=="function"?u[o]:o),W&&(I.loadall=W==="true"||W===!0),$&&(I.prepop=$==="true"||$===!0),X&&(I.debounce=Number(X)),D&&(I.limit=Number(D)),!e&&w)throw new Error("'descr' without 'value' parameter.");if(!e&&M)throw new Error("'label' without 'value' parameter.");if(y&&!w)throw new Error("Cannot search description texts without knowing the description field. Please supply descr parameter.");p&&(I.convertResponse=O(u,p,"convertResponse")),b&&(I.ajax=O(u,b,"ajax")),k&&k!=="false"&&(x=k==="true"||k===!0?" ":k,Z=s&&s!=="false"?"":"(["+x+"]\\s*)?",z=new RegExp("[^"+x+"]*"+Z+"$"));let tt=Lt(c,x),et=It(g,C,z,M||w),it=_t(_,C,z,y);tt&&(I.convertInput=tt),et&&(A.filter=et),it&&(A.item=it),F&&(A.minChars=Number(F)),K&&(A.maxItems=Number(K)),i&&(A.autoFirst=i==="true"||i===!0),f&&(A.container=O(u,f,"container")),(B||x||y)&&(A.replace=Et(L,x,y)),(e||E)&&(A.data=Tt(d,e,M,w,y)),S&&(A.list=(typeof u[S]=="function"?u[S]():u[S])||S),H&&(A.listLabel=H),j&&(A.statusNoResults=j),t&&(A.statusXResults=t),G&&(A.statusTypeXChar=G),T==="false"||T===!1?A.sort=!1:T&&(A.sort=u[T]||T);let V=R.start("#"+N,I,A);return m&&m!=="false"&&(u[m==="true"||m===!0?"awe_"+N:m]=V),s&&s!=="false"&&R.startClick("#"+(s==="true"||s===!0?"awe_btn_"+N:s),V),V},ft=xt;copyValueToId=l=>{let u=l.getAttribute.bind(l),h=u("dataField"),v=u("field"),r=u("targetField"),b=u("target");if(v==null)throw new Error("Missing field attribute.");if(b==null&&r==null)throw new Error("Missing target or targetField attribute.");AwesompleteUtil.startCopy("#"+v,h,r?"#"+r:b)};var ct=copyValueToId;return At(Ct);})();
//# sourceMappingURL=awesomplete_bundle.js.map
