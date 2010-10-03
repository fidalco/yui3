YUI.add("exec-command",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_lastKey:null,_inst:null,command:function(E,D){var C=A.COMMANDS[E];if(C){return C.call(this,E,D);}else{return this._command(E,D);}},_command:function(E,D){var C=this.getInstance();try{C.config.doc.execCommand(E,null,D);}catch(F){}},getInstance:function(){if(!this._inst){this._inst=this.get("host").getInstance();}return this._inst;},initializer:function(){B.mix(this.get("host"),{execCommand:function(D,C){return this.exec.command(D,C);},_execCommand:function(D,C){return this.exec._command(D,C);}});this.get("host").on("dom:keypress",B.bind(function(C){this._lastKey=C.keyCode;},this));}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:false}},COMMANDS:{wrap:function(E,C){var D=this.getInstance();return(new D.Selection()).wrapContent(C);},inserthtml:function(E,C){var D=this.getInstance();if(D.Selection.hasCursor()||B.UA.ie){return(new D.Selection()).insertContent(C);}else{this._command("inserthtml",C);}},insertandfocus:function(G,D){var F=this.getInstance(),C,E;if(F.Selection.hasCursor()){D+=F.Selection.CURSOR;C=this.command("inserthtml",D);E=new F.Selection();E.focusCursor(true,true);}else{this.command("inserthtml",D);}return C;},insertbr:function(E){var D=this.getInstance(),F,C=new D.Selection();C.setCursor();F=C.getCursor();F.insert("<br>","before");C.focusCursor(true,false);return F.previous();},insertimage:function(D,C){return this.command("inserthtml",'<img src="'+C+'">');},addclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().addClass(C);},removeclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().removeClass(C);},forecolor:function(E,F){var D=this.getInstance(),C=new D.Selection(),G;if(!B.UA.ie){this._command("styleWithCSS","true");}if(D.Selection.hasCursor()){if(C.isCollapsed){if(C.anchorNode&&(C.anchorNode.get("innerHTML")==="&nbsp;")){C.anchorNode.setStyle("color",F);G=C.anchorNode;}else{G=this.command("inserthtml",'<span style="color: '+F+'">'+D.Selection.CURSOR+"</span>");C.focusCursor(true,true);}return G;}else{return this._command(E,F);}}else{this._command(E,F);}if(!B.UA.ie){this._command("styleWithCSS",false);}},backcolor:function(E,F){var D=this.getInstance(),C=new D.Selection(),H;if(B.UA.gecko||B.UA.opera){E="hilitecolor";}if(!B.UA.ie){this._command("styleWithCSS","true");}if(D.Selection.hasCursor()){if(C.isCollapsed){if(C.anchorNode&&(C.anchorNode.get("innerHTML")==="&nbsp;")){C.anchorNode.setStyle("backgroundColor",F);H=C.anchorNode;}else{H=this.command("inserthtml",'<span style="background-color: '+F+'">'+D.Selection.CURSOR+"</span>");C.focusCursor(true,true);}return H;}else{return this._command(E,F);}}else{if(B.UA.gecko&&C.isCollapsed){this._command("inserthtml",'<span id="yui3-bcolor" style="background-color: '+F+'"></span>');var G=D.one("#yui3-bcolor");if(G){G.set("id","");G.removeAttribute("id");}}else{this._command(E,F);}}if(!B.UA.ie){this._command("styleWithCSS",false);}},hilitecolor:function(){return A.COMMANDS.backcolor.apply(this,arguments);},fontname:function(E,F){this._command("fontname",F);var D=this.getInstance(),C=new D.Selection();if(C.isCollapsed&&(this._lastKey!=32)){if(C.anchorNode.test("font")){C.anchorNode.set("face",F);}}},fontsize:function(E,G){this._command("fontsize",G);var D=this.getInstance(),C=new D.Selection();if(C.isCollapsed&&(this._lastKey!=32)){if(C.anchorNode.test("font")){C.anchorNode.set("size",G);}else{if(B.UA.gecko){var F=C.anchorNode.ancestor("p");if(F){F.setStyle("fontSize","");}}}}}}});B.namespace("Plugin");B.Plugin.ExecCommand=A;},"@VERSION@",{requires:["frame"],skinnable:false});