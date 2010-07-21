YUI.add("dom-base",function(D){(function(I){var S="nodeType",F="ownerDocument",E="defaultView",K="parentWindow",N="tagName",P="parentNode",R="firstChild",M="previousSibling",Q="nextSibling",L="contains",H="compareDocumentPosition",G="",O=I.config.doc.documentElement,J=/<([a-z]+)/i;I.DOM={byId:function(U,T){return I.DOM.allById(U,T)[0]||null;},children:function(V,T){var U=[];if(V){T=T||"*";U=I.Selector.query("> "+T,V);}return U;},firstByTag:function(T,U){var V;U=U||I.config.doc;if(T&&U.getElementsByTagName){V=U.getElementsByTagName(T)[0];}return V||null;},getText:(O.textContent!==undefined)?function(U){var T="";if(U){T=U.textContent;}return T||"";}:function(U){var T="";if(U){T=U.innerText;}return T||"";},setText:(O.textContent!==undefined)?function(T,U){if(T){T.textContent=U;}}:function(T,U){if(T){T.innerText=U;}},previous:function(T,V,U){return I.DOM.elementByAxis(T,M,V,U);},next:function(T,V,U){return I.DOM.elementByAxis(T,Q,V,U);},ancestor:function(U,V,W){var T=null;if(W){T=(!V||V(U))?U:null;}return T||I.DOM.elementByAxis(U,P,V,null);},elementByAxis:function(T,W,V,U){while(T&&(T=T[W])){if((U||T[N])&&(!V||V(T))){return T;}}return null;},contains:function(U,V){var T=false;if(!V||!U||!V[S]||!U[S]){T=false;}else{if(U[L]){if(I.UA.opera||V[S]===1){T=U[L](V);}else{T=I.DOM._bruteContains(U,V);}}else{if(U[H]){if(U===V||!!(U[H](V)&16)){T=true;}}}}return T;},inDoc:function(W,Z){Z=Z||W[F];var T=[],U=false,V,X,Y;W.id=W.id||I.guid();T=I.DOM.allById(W.id,Z);for(V=0;X=T[V++];){if(X===W){U=true;break;}}return U;},allById:function(Y,T){T=T||I.config.doc;var U=[],V=[],W,X;if(T.querySelectorAll){V=T.querySelectorAll('[id="'+Y+'"]');}else{if(T.all){U=T.all(Y);if(U&&U.nodeType){U=[U];}if(U&&U.length){for(W=0;X=U[W++];){if(X.id===Y){V.push(X);}}}}else{V=[I.DOM._getDoc(T).getElementById(Y)];}}return V;},create:function(Y,a){if(typeof Y==="string"){Y=I.Lang.trim(Y);}a=a||I.config.doc;var U=J.exec(Y),X=I.DOM._create,Z=I.DOM.creators,W=null,T,V;if(Y!=undefined){if(U&&Z[U[1]]){if(typeof Z[U[1]]==="function"){X=Z[U[1]];}else{T=Z[U[1]];}}V=X(Y,a,T).childNodes;if(V.length===1){W=V[0].parentNode.removeChild(V[0]);}else{if(V[0]&&V[0].className==="yui3-big-dummy"){if(V.length===2){W=V[0].nextSibling;}else{V[0].parentNode.removeChild(V[0]);W=I.DOM._nl2frag(V,a);}}else{W=I.DOM._nl2frag(V,a);}}}return W;},_nl2frag:function(U,X){var V=null,W,T;if(U&&(U.push||U.item)&&U[0]){X=X||U[0].ownerDocument;V=X.createDocumentFragment();if(U.item){U=I.Array(U,0,true);}for(W=0,T=U.length;W<T;W++){V.appendChild(U[W]);}}return V;},CUSTOM_ATTRIBUTES:(!O.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(V,T,W,U){if(V&&V.setAttribute){T=I.DOM.CUSTOM_ATTRIBUTES[T]||T;V.setAttribute(T,W,U);}},getAttribute:function(W,T,V){V=(V!==undefined)?V:2;var U="";if(W&&W.getAttribute){T=I.DOM.CUSTOM_ATTRIBUTES[T]||T;U=W.getAttribute(T,V);if(U===null){U="";}}return U;},isWindow:function(T){return T.alert&&T.document;},_fragClones:{},_create:function(U,V,T){T=T||"div";var W=I.DOM._fragClones[T];if(W){W=W.cloneNode(false);}else{W=I.DOM._fragClones[T]=V.createElement(T);}W.innerHTML=U;return W;},_removeChildNodes:function(T){while(T.firstChild){T.removeChild(T.firstChild);}},addHTML:function(X,W,U){var T=X.parentNode,V;if(W!==undefined&&W!==null){if(W.nodeType){V=W;}else{V=I.DOM.create(W);}}if(U){if(U.nodeType){U.parentNode.insertBefore(V,U);}else{switch(U){case"replace":while(X.firstChild){X.removeChild(X.firstChild);}if(V){X.appendChild(V);}break;case"before":T.insertBefore(V,X);break;case"after":if(X.nextSibling){T.insertBefore(V,X.nextSibling);}else{T.appendChild(V);}break;default:X.appendChild(V);}}}else{X.appendChild(V);}return V;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(V){var U="",T;if(V&&V[N]){T=I.DOM.VALUE_GETTERS[V[N].toLowerCase()];if(T){U=T(V);}else{U=V.value;}}if(U===G){U=G;}return(typeof U==="string")?U:"";},setValue:function(T,U){var V;if(T&&T[N]){V=I.DOM.VALUE_SETTERS[T[N].toLowerCase()];if(V){V(T,U);}else{T.value=U;}}},siblings:function(W,V){var T=[],U=W;while((U=U[M])){if(U[N]&&(!V||V(U))){T.unshift(U);}}U=W;while((U=U[Q])){if(U[N]&&(!V||V(U))){T.push(U);}}return T;},_bruteContains:function(T,U){while(U){if(T===U){return true;}U=U.parentNode;}return false;},_getRegExp:function(U,T){T=T||"";I.DOM._regexCache=I.DOM._regexCache||{};if(!I.DOM._regexCache[U+T]){I.DOM._regexCache[U+T]=new RegExp(U,T);}return I.DOM._regexCache[U+T];},_getDoc:function(T){var U=I.config.doc;if(T){U=(T[S]===9)?T:T[F]||T.document||I.config.doc;}return U;},_getWin:function(T){var U=I.DOM._getDoc(T);return U[E]||U[K]||I.config.win;},_batch:function(W,a,Z,V,U,Y){a=(typeof name==="string")?I.DOM[a]:a;var T,X=[];if(a&&W){I.each(W,function(b){if((T=a.call(I.DOM,b,Z,V,U,Y))!==undefined){X[X.length]=T;}});}return X.length?X:W;},creators:{},_IESimpleCreate:function(T,U){U=U||I.config.doc;return U.createElement(T);}};(function(X){var Z=X.DOM.creators,T=X.DOM.create,W=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,V="<table>",U="</table>";if(X.UA.ie){X.mix(Z,{tbody:function(a,b){var c=T(V+a+U,b),Y=c.children.tags("tbody")[0];if(c.children.length>1&&Y&&!W.test(a)){Y[P].removeChild(Y);}return c;},script:function(Y,a){var b=a.createElement("div");b.innerHTML="-"+Y;b.removeChild(b[R]);return b;}},true);X.mix(X.DOM.VALUE_GETTERS,{button:function(Y){return(Y.attributes&&Y.attributes.value)?Y.attributes.value.value:"";}});X.mix(X.DOM.VALUE_SETTERS,{button:function(a,b){var Y=a.attributes.value;if(!Y){Y=a[F].createAttribute("value");a.setAttributeNode(Y);}Y.value=b;},select:function(c,d){for(var a=0,Y=c.getElementsByTagName("option"),b;b=Y[a++];){if(X.DOM.getValue(b)===d){X.DOM.setAttribute(b,"selected",true);break;}}}});X.DOM.creators.style=X.DOM.creators.script;}if(X.UA.gecko||X.UA.ie){X.mix(Z,{option:function(Y,a){return T('<select><option class="yui3-big-dummy" selected></option>'+Y+"</select>",a);},tr:function(Y,a){return T("<tbody>"+Y+"</tbody>",a);},td:function(Y,a){return T("<tr>"+Y+"</tr>",a);
},tbody:function(Y,a){return T(V+Y+U,a);}});X.mix(Z,{legend:"fieldset",th:Z.td,thead:Z.tbody,tfoot:Z.tbody,caption:Z.tbody,colgroup:Z.tbody,col:Z.tbody,optgroup:Z.option});}X.mix(X.DOM.VALUE_GETTERS,{option:function(a){var Y=a.attributes;return(Y.value&&Y.value.specified)?a.value:a.text;},select:function(a){var b=a.value,Y=a.options;if(Y&&b===""){if(a.multiple){}else{b=X.DOM.getValue(Y[a.selectedIndex]);}}return b;}});})(I);})(D);var B,A,C;D.mix(D.DOM,{hasClass:function(G,F){var E=D.DOM._getRegExp("(?:^|\\s+)"+F+"(?:\\s+|$)");return E.test(G.className);},addClass:function(F,E){if(!D.DOM.hasClass(F,E)){F.className=D.Lang.trim([F.className,E].join(" "));}},removeClass:function(F,E){if(E&&A(F,E)){F.className=D.Lang.trim(F.className.replace(D.DOM._getRegExp("(?:^|\\s+)"+E+"(?:\\s+|$)")," "));if(A(F,E)){C(F,E);}}},replaceClass:function(F,E,G){C(F,E);B(F,G);},toggleClass:function(F,E,G){var H=(G!==undefined)?G:!(A(F,E));if(H){B(F,E);}else{C(F,E);}}});A=D.DOM.hasClass;C=D.DOM.removeClass;B=D.DOM.addClass;D.mix(D.DOM,{setWidth:function(F,E){D.DOM._setSize(F,"width",E);},setHeight:function(F,E){D.DOM._setSize(F,"height",E);},_setSize:function(F,H,G){G=(G>0)?G:0;var E=0;F.style[H]=G+"px";E=(H==="height")?F.offsetHeight:F.offsetWidth;if(E>G){G=G-(E-G);if(G<0){G=0;}F.style[H]=G+"px";}}});},"@VERSION@",{requires:["oop"]});YUI.add("dom-style",function(A){(function(E){var C="documentElement",B="defaultView",D="ownerDocument",O="style",R="float",F="cssFloat",G="styleFloat",M="transparent",I="getComputedStyle",P=E.config.doc,L=undefined,J=E.DOM,K="transform",Q=["WebkitTransform","MozTransform","OTransform"],N=/color$/i,H=/width|height|top|left|right|bottom|margin|padding/i;E.Array.each(Q,function(S){if(S in P[C].style){K=S;}});E.mix(J,{DEFAULT_UNIT:"px",CUSTOM_STYLES:{},setStyle:function(V,S,X,U){U=U||V.style;var T=J.CUSTOM_STYLES,W;if(U){if(X===null||X===""){X="";}else{if(!isNaN(new Number(X))&&H.test(S)){X+=J.DEFAULT_UNIT;}}if(S in T){if(T[S].set){T[S].set(V,X,U);return;}else{if(typeof T[S]==="string"){S=T[S];}}}U[S]=X;}},getStyle:function(V,S,U){U=U||V.style;var T=J.CUSTOM_STYLES,W="";if(U){if(S in T){if(T[S].get){return T[S].get(V,S,U);}else{if(typeof T[S]==="string"){S=T[S];}}}W=U[S];if(W===""){W=J[I](V,S);}}return W;},setStyles:function(T,U){var S=T.style;E.each(U,function(V,W){J.setStyle(T,W,V,S);},J);},getComputedStyle:function(T,S){var V="",U=T[D];if(T[O]){V=U[B][I](T,null)[S];}return V;}});if(P[C][O][F]!==L){J.CUSTOM_STYLES[R]=F;}else{if(P[C][O][G]!==L){J.CUSTOM_STYLES[R]=G;}}if(E.UA.opera){J[I]=function(U,T){var S=U[D][B],V=S[I](U,"")[T];if(N.test(T)){V=E.Color.toRGB(V);}return V;};}if(E.UA.webkit){J[I]=function(U,T){var S=U[D][B],V=S[I](U,"")[T];if(V==="rgba(0, 0, 0, 0)"){V=M;}return V;};}J._multiplyMatrix=function(T,S){var U=[T[0][0]*S[0][0]+T[0][1]*S[1][0],T[0][0]*T[0][1]+T[0][1]*S[1][1],T[1][0]*S[0][0]+T[1][1]*S[1][0],T[1][0]*S[0][1]+S[1][1]*S[1][1]];return U;};J.CUSTOM_STYLES.transform={set:function(T,U,S){S[K]=U;},get:function(T,S){return J.getComputedStyle(T,K);}};})(A);(function(D){var B=parseInt,C=RegExp;D.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Color.re_RGB.test(E)){E=D.Color.toHex(E);}if(D.Color.re_hex.exec(E)){E="rgb("+[B(C.$1,16),B(C.$2,16),B(C.$3,16)].join(", ")+")";}return E;},toHex:function(F){F=D.Color.KEYWORDS[F]||F;if(D.Color.re_RGB.exec(F)){F=[Number(C.$1).toString(16),Number(C.$2).toString(16),Number(C.$3).toString(16)];for(var E=0;E<F.length;E++){if(F[E].length<2){F[E]="0"+F[E];}}F=F.join("");}if(F.length<6){F=F.replace(D.Color.re_hex3,"$1$1");}if(F!=="transparent"&&F.indexOf("#")<0){F="#"+F;}return F.toUpperCase();}};})(A);},"@VERSION@",{requires:["dom-base"]});YUI.add("dom-style-ie",function(A){(function(D){var X="hasLayout",K="px",L="filter",B="filters",U="opacity",N="auto",G="borderWidth",J="borderTopWidth",R="borderRightWidth",W="borderBottomWidth",H="borderLeftWidth",I="width",P="height",S="transparent",T="visible",C="getComputedStyle",a=undefined,Z=D.config.doc.documentElement,Q=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,M=(D.UA.ie>=8),E=function(Y){return Y.currentStyle||Y.style;},O={CUSTOM_STYLES:{},get:function(Y,c){var b="",d;if(Y){d=E(Y)[c];if(c===U&&D.DOM.CUSTOM_STYLES[U]){b=D.DOM.CUSTOM_STYLES[U].get(Y);}else{if(!d||(d.indexOf&&d.indexOf(K)>-1)){b=d;}else{if(D.DOM.IE.COMPUTED[c]){b=D.DOM.IE.COMPUTED[c](Y,c);}else{if(Q.test(d)){b=O.getPixel(Y,c)+K;}else{b=d;}}}}}return b;},sizeOffsets:{width:["Left","Right"],height:["Top","Bottom"],top:["Top"],bottom:["Bottom"]},getOffset:function(c,Y){var g=E(c)[Y],h=Y.charAt(0).toUpperCase()+Y.substr(1),d="offset"+h,b="pixel"+h,f=O.sizeOffsets[Y],e=c.ownerDocument.compatMode,i="";if(g===N||g.indexOf("%")>-1){i=c["offset"+h];if(e!=="BackCompat"){if(f[0]){i-=O.getPixel(c,"padding"+f[0]);i-=O.getBorderWidth(c,"border"+f[0]+"Width",1);}if(f[1]){i-=O.getPixel(c,"padding"+f[1]);i-=O.getBorderWidth(c,"border"+f[1]+"Width",1);}}}else{if(!c.style[b]&&!c.style[Y]){c.style[Y]=g;}i=c.style[b];}return i+K;},borderMap:{thin:(M)?"1px":"2px",medium:(M)?"3px":"4px",thick:(M)?"5px":"6px"},getBorderWidth:function(b,d,Y){var c=Y?"":K,e=b.currentStyle[d];if(e.indexOf(K)<0){if(O.borderMap[e]&&b.currentStyle.borderStyle!=="none"){e=O.borderMap[e];}else{e=0;}}return(Y)?parseFloat(e):e;},getPixel:function(c,Y){var e=null,b=E(c),f=b.right,d=b[Y];c.style.right=d;e=c.style.pixelRight;c.style.right=f;return e;},getMargin:function(c,Y){var d,b=E(c);if(b[Y]==N){d=0;}else{d=O.getPixel(c,Y);}return d+K;},getVisibility:function(b,Y){var c;while((c=b.currentStyle)&&c[Y]=="inherit"){b=b.parentNode;}return(c)?c[Y]:T;},getColor:function(b,Y){var c=E(b)[Y];if(!c||c===S){D.DOM.elementByAxis(b,"parentNode",null,function(d){c=E(d)[Y];
if(c&&c!==S){b=d;return true;}});}return D.Color.toRGB(c);},getBorderColor:function(b,Y){var c=E(b),d=c[Y]||c.color;return D.Color.toRGB(D.Color.toHex(d));}},F={};if(D.UA.ie){D.DOM.CUSTOM_STYLES[U]={get:function(b){var d=100;try{d=b[B]["DXImageTransform.Microsoft.Alpha"][U];}catch(c){try{d=b[B]("alpha")[U];}catch(Y){}}return d/100;},set:function(b,e,Y){var d,c;if(e===""){c=E(b);d=(U in c)?c[U]:1;e=d;}if(typeof Y[L]=="string"){Y[L]="alpha("+U+"="+e*100+")";if(!b.currentStyle||!b.currentStyle[X]){Y.zoom=1;}}}};}try{D.config.doc.createElement("div").style.height="-1px";}catch(V){D.DOM.CUSTOM_STYLES.height={set:function(c,d,b){var Y=parseFloat(d);if(isNaN(Y)||Y>=0){b.height=d;}else{}}};D.DOM.CUSTOM_STYLES.width={set:function(c,d,b){var Y=parseFloat(d);if(isNaN(Y)||Y>=0){b.width=d;}else{}}};}F[I]=F[P]=O.getOffset;F.color=F.backgroundColor=O.getColor;F[G]=F[J]=F[R]=F[W]=F[H]=O.getBorderWidth;F.marginTop=F.marginRight=F.marginBottom=F.marginLeft=O.getMargin;F.visibility=O.getVisibility;F.borderColor=F.borderTopColor=F.borderRightColor=F.borderBottomColor=F.borderLeftColor=O.getBorderColor;if(!D.config.win[C]){D.DOM[C]=O.get;}D.namespace("DOM.IE");D.DOM.IE.COMPUTED=F;D.DOM.IE.ComputedStyle=O;})(A);},"@VERSION@",{requires:["dom-style"]});YUI.add("dom-screen",function(A){(function(F){var D="documentElement",P="compatMode",N="position",C="fixed",L="relative",G="left",H="top",I="BackCompat",O="medium",E="borderLeftWidth",B="borderTopWidth",Q="getBoundingClientRect",J="getComputedStyle",K=F.DOM,M=/^t(?:able|d|h)$/i;F.mix(K,{winHeight:function(S){var R=K._getWinSize(S).height;return R;},winWidth:function(S){var R=K._getWinSize(S).width;return R;},docHeight:function(S){var R=K._getDocSize(S).height;return Math.max(R,K._getWinSize(S).height);},docWidth:function(S){var R=K._getDocSize(S).width;return Math.max(R,K._getWinSize(S).width);},docScrollX:function(T,U){U=U||(T)?K._getDoc(T):F.config.doc;var S=U.defaultView,R=(S)?S.pageXOffset:0;return Math.max(U[D].scrollLeft,U.body.scrollLeft,R);},docScrollY:function(T,U){U=U||(T)?K._getDoc(T):F.config.doc;var S=U.defaultView,R=(S)?S.pageYOffset:0;return Math.max(U[D].scrollTop,U.body.scrollTop,R);},getXY:function(){if(F.config.doc[D][Q]){return function(U){var b=null,V,S,W,Z,Y,R,T,X,a;if(U){if(K.inDoc(U)){a=U.ownerDocument;V=K.docScrollX(U,a);S=K.docScrollY(U,a);W=U[Q]();b=[W.left,W.top];if(F.UA.ie){Z=2;Y=2;X=a[P];R=K[J](a[D],E);T=K[J](a[D],B);if(F.UA.ie===6){if(X!==I){Z=0;Y=0;}}if((X==I)){if(R!==O){Z=parseInt(R,10);}if(T!==O){Y=parseInt(T,10);}}b[0]-=Z;b[1]-=Y;}if((S||V)){if(!F.UA.itouch){b[0]+=V;b[1]+=S;}}}else{b=K._getOffset(U);}}return b;};}else{return function(S){var V=null,U,R,X,T,W;if(S){if(K.inDoc(S)){V=[S.offsetLeft,S.offsetTop];U=S.ownerDocument;R=S;X=((F.UA.gecko||F.UA.webkit>519)?true:false);while((R=R.offsetParent)){V[0]+=R.offsetLeft;V[1]+=R.offsetTop;if(X){V=K._calcBorders(R,V);}}if(K.getStyle(S,N)!=C){R=S;while((R=R.parentNode)){T=R.scrollTop;W=R.scrollLeft;if(F.UA.gecko&&(K.getStyle(R,"overflow")!=="visible")){V=K._calcBorders(R,V);}if(T||W){V[0]-=W;V[1]-=T;}}V[0]+=K.docScrollX(S,U);V[1]+=K.docScrollY(S,U);}else{V[0]+=K.docScrollX(S,U);V[1]+=K.docScrollY(S,U);}}else{V=K._getOffset(S);}}return V;};}}(),_getOffset:function(R){var T,S=null;if(R){T=K.getStyle(R,N);S=[parseInt(K[J](R,G),10),parseInt(K[J](R,H),10)];if(isNaN(S[0])){S[0]=parseInt(K.getStyle(R,G),10);if(isNaN(S[0])){S[0]=(T===L)?0:R.offsetLeft||0;}}if(isNaN(S[1])){S[1]=parseInt(K.getStyle(R,H),10);if(isNaN(S[1])){S[1]=(T===L)?0:R.offsetTop||0;}}}return S;},getX:function(R){return K.getXY(R)[0];},getY:function(R){return K.getXY(R)[1];},setXY:function(S,V,Y){var T=K.setStyle,X,W,R,U;if(S&&V){X=K.getStyle(S,N);W=K._getOffset(S);if(X=="static"){X=L;T(S,N,X);}U=K.getXY(S);if(V[0]!==null){T(S,G,V[0]-U[0]+W[0]+"px");}if(V[1]!==null){T(S,H,V[1]-U[1]+W[1]+"px");}if(!Y){R=K.getXY(S);if(R[0]!==V[0]||R[1]!==V[1]){K.setXY(S,V,true);}}}else{}},setX:function(S,R){return K.setXY(S,[R,null]);},setY:function(R,S){return K.setXY(R,[null,S]);},swapXY:function(S,R){var T=K.getXY(S);K.setXY(S,K.getXY(R));K.setXY(R,T);},_calcBorders:function(T,U){var S=parseInt(K[J](T,B),10)||0,R=parseInt(K[J](T,E),10)||0;if(F.UA.gecko){if(M.test(T.tagName)){S=0;R=0;}}U[0]+=R;U[1]+=S;return U;},_getWinSize:function(U,W){W=W||(U)?K._getDoc(U):F.config.doc;var V=W.defaultView||W.parentWindow,X=W[P],T=V.innerHeight,S=V.innerWidth,R=W[D];if(X&&!F.UA.opera){if(X!="CSS1Compat"){R=W.body;}T=R.clientHeight;S=R.clientWidth;}return{height:T,width:S};},_getDocSize:function(S){var T=(S)?K._getDoc(S):F.config.doc,R=T[D];if(T[P]!="CSS1Compat"){R=T.body;}return{height:R.scrollHeight,width:R.scrollWidth};}});})(A);(function(G){var D="top",C="right",H="bottom",B="left",F=function(L,K){var N=Math.max(L[D],K[D]),O=Math.min(L[C],K[C]),I=Math.min(L[H],K[H]),J=Math.max(L[B],K[B]),M={};M[D]=N;M[C]=O;M[H]=I;M[B]=J;return M;},E=G.DOM;G.mix(E,{region:function(J){var K=E.getXY(J),I=false;if(J&&K){I=E._getRegion(K[1],K[0]+J.offsetWidth,K[1]+J.offsetHeight,K[0]);}return I;},intersect:function(K,I,M){var J=M||E.region(K),L={},O=I,N;if(O.tagName){L=E.region(O);}else{if(G.Lang.isObject(I)){L=I;}else{return false;}}N=F(L,J);return{top:N[D],right:N[C],bottom:N[H],left:N[B],area:((N[H]-N[D])*(N[C]-N[B])),yoff:((N[H]-N[D])),xoff:(N[C]-N[B]),inRegion:E.inRegion(K,I,false,M)};},inRegion:function(L,I,J,N){var M={},K=N||E.region(L),P=I,O;if(P.tagName){M=E.region(P);}else{if(G.Lang.isObject(I)){M=I;}else{return false;}}if(J){return(K[B]>=M[B]&&K[C]<=M[C]&&K[D]>=M[D]&&K[H]<=M[H]);}else{O=F(M,K);if(O[H]>=O[D]&&O[C]>=O[B]){return true;}else{return false;}}},inViewportRegion:function(J,I,K){return E.inRegion(J,E.viewportRegion(J),I,K);},_getRegion:function(K,L,I,J){var M={};M[D]=M[1]=K;M[B]=M[0]=J;M[H]=I;M[C]=L;M.width=M[C]-M[B];M.height=M[H]-M[D];return M;},viewportRegion:function(J){J=J||G.config.doc.documentElement;var I=false,L,K;if(J){L=E.docScrollX(J);K=E.docScrollY(J);I=E._getRegion(K,E.winWidth(J)+L,K+E.winHeight(J),L);}return I;}});})(A);},"@VERSION@",{requires:["dom-base","dom-style","event-base"]});
YUI.add("selector-native",function(A){(function(E){E.namespace("Selector");var C="compareDocumentPosition",D="ownerDocument";var B={_foundCache:[],useNative:true,_compare:("sourceIndex" in E.config.doc.documentElement)?function(I,H){var G=I.sourceIndex,F=H.sourceIndex;if(G===F){return 0;}else{if(G>F){return 1;}}return -1;}:(E.config.doc.documentElement[C]?function(G,F){if(G[C](F)&4){return -1;}else{return 1;}}:function(J,I){var H,F,G;if(J&&I){H=J[D].createRange();H.setStart(J,0);F=I[D].createRange();F.setStart(I,0);G=H.compareBoundaryPoints(1,F);}return G;}),_sort:function(F){if(F){F=E.Array(F,0,true);if(F.sort){F.sort(B._compare);}}return F;},_deDupe:function(F){var G=[],H,I;for(H=0;(I=F[H++]);){if(!I._found){G[G.length]=I;I._found=true;}}for(H=0;(I=G[H++]);){I._found=null;I.removeAttribute("_found");}return G;},query:function(G,N,O,F){N=N||E.config.doc;var K=[],H=(E.Selector.useNative&&E.config.doc.querySelector&&!F),J=[[G,N]],L,P,I,M=(H)?E.Selector._nativeQuery:E.Selector._bruteQuery;if(G&&M){if(!F&&(!H||N.tagName)){J=B._splitQueries(G,N);}for(I=0;(L=J[I++]);){P=M(L[0],L[1],O);if(!O){P=E.Array(P,0,true);}if(P){K=K.concat(P);}}if(J.length>1){K=B._sort(B._deDupe(K));}}return(O)?(K[0]||null):K;},_splitQueries:function(H,K){var G=H.split(","),I=[],L="",J,F;if(K){if(K.tagName){K.id=K.id||E.guid();L='[id="'+K.id+'"] ';}for(J=0,F=G.length;J<F;++J){H=L+G[J];I.push([H,K]);}}return I;},_nativeQuery:function(F,G,H){if(E.UA.webkit&&F.indexOf(":checked")>-1){return E.Selector.query(F,G,H,true);}try{return G["querySelector"+(H?"":"All")](F);}catch(I){return E.Selector.query(F,G,H,true);}},filter:function(G,F){var H=[],I,J;if(G&&F){for(I=0;(J=G[I++]);){if(E.Selector.test(J,F)){H[H.length]=J;}}}else{}return H;},test:function(H,I,N){var L=false,G=I.split(","),F=false,O,R,M,Q,K,J,P;if(H&&H.tagName){if(!N&&!E.DOM.inDoc(H)){O=H.parentNode;if(O){N=O;}else{Q=H[D].createDocumentFragment();Q.appendChild(H);N=Q;F=true;}}N=N||H[D];if(!H.id){H.id=E.guid();}for(K=0;(P=G[K++]);){P+='[id="'+H.id+'"]';M=E.Selector.query(P,N);for(J=0;R=M[J++];){if(R===H){L=true;break;}}if(L){break;}}if(F){Q.removeChild(H);}}return L;},ancestor:function(G,F,H){return E.DOM.ancestor(G,function(I){return E.Selector.test(I,F);},H);}};E.mix(E.Selector,B,true);})(A);},"@VERSION@",{requires:["dom-base"]});YUI.add("selector-css2",function(G){var H="parentNode",D="tagName",E="attributes",A="combinator",F="pseudos",C=G.Selector,B={_reRegExpTokens:/([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,SORT_RESULTS:true,_children:function(M,I){var J=M.children,L,K=[],N,O;if(M.children&&I&&M.children.tags){K=M.children.tags(I);}else{if((!J&&M[D])||(J&&I)){N=J||M.childNodes;J=[];for(L=0;(O=N[L++]);){if(O.tagName){if(!I||I===O.tagName){J.push(O);}}}}}return J||[];},_re:{attr:/(\[[^\]]*\])/g,pseudos:/:([\-\w]+(?:\(?:['"]?(.+)['"]?\)))*/i},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(J,I){return G.DOM.getAttribute(J,I)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(I){return G.Selector._children(I[H])[0]===I;}},_bruteQuery:function(N,R,T){var O=[],I=[],Q=C._tokenize(N),M=Q[Q.length-1],S=G.DOM._getDoc(R),K,J,P,L;if(M){J=M.id;P=M.className;L=M.tagName||"*";if(R.getElementsByTagName){if(J&&(R.all||(R.nodeType===9||G.DOM.inDoc(R)))){I=G.DOM.allById(J,R);}else{if(P){I=R.getElementsByClassName(P);}else{I=R.getElementsByTagName(L);}}}else{K=R.firstChild;while(K){if(K.tagName){I.push(K);}K=K.nextSilbing||K.firstChild;}}if(I.length){O=C._filterNodes(I,Q,T);}}return O;},_filterNodes:function(R,N,P){var W=0,V,X=N.length,Q=X-1,M=[],T=R[0],a=T,Y=G.Selector.getters,L,U,K,O,I,S,J,Z;for(W=0;(a=T=R[W++]);){Q=X-1;O=null;testLoop:while(a&&a.tagName){K=N[Q];J=K.tests;V=J.length;if(V&&!I){while((Z=J[--V])){L=Z[1];if(Y[Z[0]]){S=Y[Z[0]](a,Z[0]);}else{S=a[Z[0]];if(S===undefined&&a.getAttribute){S=a.getAttribute(Z[0]);}}if((L==="="&&S!==Z[2])||(typeof L!=="string"&&L.test&&!L.test(S))||(!L.test&&typeof L==="function"&&!L(a,Z[0]))){if((a=a[O])){while(a&&(!a.tagName||(K.tagName&&K.tagName!==a.tagName))){a=a[O];}}continue testLoop;}}}Q--;if(!I&&(U=K.combinator)){O=U.axis;a=a[O];while(a&&!a.tagName){a=a[O];}if(U.direct){O=null;}}else{M.push(T);if(P){return M;}break;}}}T=a=null;return M;},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:E,re:/^\[(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(K,L){var J=K[2]||"",I=G.Selector.operators,M;if((K[1]==="id"&&J==="=")||(K[1]==="className"&&G.config.doc.documentElement.getElementsByClassName&&(J==="~="||J==="="))){L.prefilter=K[1];L[K[1]]=K[3];}if(J in I){M=I[J];if(typeof M==="string"){K[3]=K[3].replace(G.Selector._reRegExpTokens,"\\$1");M=G.DOM._getRegExp(M.replace("{val}",K[3]));}K[2]=M;}if(!L.last||L.prefilter!==K[1]){return K.slice(1);}}},{name:D,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(J,K){var I=J[1].toUpperCase();K.tagName=I;if(I!=="*"&&(!K.last||K.prefilter)){return[D,"=",I];}if(!K.prefilter){K.prefilter="tagName";}}},{name:A,re:/^\s*([>+~]|\s)\s*/,fn:function(I,J){}},{name:F,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(I,J){var K=C[F][I[1]];if(K){return[I[2],K];}else{return false;}}}],_getToken:function(I){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(K){K=K||"";K=C._replaceShorthand(G.Lang.trim(K));var J=C._getToken(),P=K,O=[],Q=false,M,N,L,I;outer:do{Q=false;for(L=0;(I=C._parsers[L++]);){if((M=I.re.exec(K))){if(I.name!==A){J.selector=K;}K=K.replace(M[0],"");if(!K.length){J.last=true;}if(C._attrFilters[M[1]]){M[1]=C._attrFilters[M[1]];}N=I.fn(M,J);if(N===false){Q=false;break outer;}else{if(N){J.tests.push(N);}}if(!K.length||I.name===A){O.push(J);J=C._getToken(J);if(I.name===A){J.combinator=G.Selector.combinators[M[1]];}}Q=true;}}}while(Q&&K.length);if(!Q||K.length){O=[];}return O;},_replaceShorthand:function(J){var K=C.shorthand,L=J.match(C._re.attr),O=J.match(C._re.pseudos),N,M,I;
if(O){J=J.replace(C._re.pseudos,"!!REPLACED_PSEUDO!!");}if(L){J=J.replace(C._re.attr,"!!REPLACED_ATTRIBUTE!!");}for(N in K){if(K.hasOwnProperty(N)){J=J.replace(G.DOM._getRegExp(N,"gi"),K[N]);}}if(L){for(M=0,I=L.length;M<I;++M){J=J.replace("!!REPLACED_ATTRIBUTE!!",L[M]);}}if(O){for(M=0,I=O.length;M<I;++M){J=J.replace("!!REPLACED_PSEUDO!!",O[M]);}}return J;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(J,I){return G.DOM.getAttribute(J,I);}}};G.mix(G.Selector,B,true);G.Selector.getters.src=G.Selector.getters.rel=G.Selector.getters.href;if(G.Selector.useNative&&G.config.doc.querySelector){G.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"@VERSION@",{requires:["selector-native"]});YUI.add("selector",function(A){},"@VERSION@",{use:["selector-native","selector-css2"]});YUI.add("dom",function(A){},"@VERSION@",{use:["dom-base","dom-style","dom-style-ie","dom-screen","selector"]});