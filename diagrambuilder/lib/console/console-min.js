YUI.add("console",function(e,t){function et(){et.superclass.constructor.apply(this,arguments)}var n=e.ClassNameManager.getClassName,r="checked",i="clear",s="click",o="collapsed",u="console",a="contentBox",f="disabled",l="entry",c="error",h="height",p="info",d="lastTime",v="pause",m="paused",g="reset",y="startTime",b="title",w="warn",E=".",S=n(u,"button"),x=n(u,"checkbox"),T=n(u,i),N=n(u,"collapse"),C=n(u,o),k=n(u,"controls"),L=n(u,"hd"),A=n(u,"bd"),O=n(u,"ft"),M=n(u,b),_=n(u,l),D=n(u,l,"cat"),P=n(u,l,"content"),H=n(u,l,"meta"),B=n(u,l,"src"),j=n(u,l,"time"),F=n(u,v),I=n(u,v,"label"),q=/^(\S+)\s/,R=/&(?!#?[a-z0-9]+;)/g,U=/>/g,z=/</g,W="&#38;",X="&#62;",V="&#60;",$='<div class="{entry_class} {cat_class} {src_class}"><p class="{entry_meta_class}"><span class="{entry_src_class}">{sourceAndDetail}</span><span class="{entry_cat_class}">{category}</span><span class="{entry_time_class}"> {totalTime}ms (+{elapsedTime}) {localTime}</span></p><pre class="{entry_content_class}">{message}</pre></div>',J=e.Lang,K=e.Node.create,Q=J.isNumber,G=J.isString,Y=e.merge,Z=e.Lang.sub;e.Console=e.extend(et,e.Widget,{_evtCat:null,_head:null,_body:null,_foot:null,_printLoop:null,buffer:null,log:function(){return e.log.apply(e,arguments),this},clearConsole:function(){return this._body.empty(),this._cancelPrintLoop(),this.buffer=[],this},reset:function(){return this.fire(g),this},collapse:function(){return this.set(o,!0),this},expand:function(){return this.set(o,!1),this},printBuffer:function(t){var n=this.buffer,r=e.config.debug,i=[],s=this.get("consoleLimit"),o=this.get("newestOnTop"),u=o?this._body.get("firstChild"):null,a;n.length>s&&n.splice(0,n.length-s),t=Math.min(n.length,t||n.length),e.config.debug=!1;if(!this.get(m)&&this.get("rendered")){for(a=0;a<t&&n.length;++a)i[a]=this._createEntryHTML(n.shift());n.length||this._cancelPrintLoop(),i.length&&(o&&i.reverse(),this._body.insertBefore(K(i.join("")),u),this.get("scrollIntoView")&&this.scrollToLatest(),this._trimOldEntries())}return e.config.debug=r,this},initializer:function(){this._evtCat=e.stamp(this)+"|",this.buffer=[],this.get("logSource").on(this._evtCat+this.get("logEvent"),e.bind("_onLogEvent",this)),this.publish(l,{defaultFn:this._defEntryFn}),this.publish(g,{defaultFn:this._defResetFn}),this.after("rendered",this._schedulePrint)},destructor:function(){var e=this.get("boundingBox");this._cancelPrintLoop(),this.get("logSource").detach(this._evtCat+"*"),e.purge(!0)},renderUI:function(){this._initHead(),this._initBody(),this._initFoot();var e=this.get("style");e!=="block"&&this.get("boundingBox").addClass(this.getClassName(e))},syncUI:function(){this._uiUpdatePaused(this.get(m)),this._uiUpdateCollapsed(this.get(o)),this._uiSetHeight(this.get(h))},bindUI:function(){this.get(a).one("button."+N).on(s,this._onCollapseClick,this),this.get(a).one("input[type=checkbox]."+F).on(s,this._onPauseClick,this),this.get(a).one("button."+T).on(s,this._onClearClick,this),this.after(this._evtCat+"stringsChange",this._afterStringsChange),this.after(this._evtCat+"pausedChange",this._afterPausedChange),this.after(this._evtCat+"consoleLimitChange",this._afterConsoleLimitChange),this.after(this._evtCat+"collapsedChange",this._afterCollapsedChange)},_initHead:function(){var e=this.get(a),t=Y(et.CHROME_CLASSES,{str_collapse:this.get("strings.collapse"),str_title:this.get("strings.title")});this._head=K(Z(et.HEADER_TEMPLATE,t)),e.insertBefore(this._head,e.get("firstChild"))},_initBody:function(){this._body=K(Z(et.BODY_TEMPLATE,et.CHROME_CLASSES)),this.get(a).appendChild(this._body)},_initFoot:function(){var t=Y(et.CHROME_CLASSES,{id_guid:e.guid(),str_pause:this.get("strings.pause"),str_clear:this.get("strings.clear")});this._foot=K(Z(et.FOOTER_TEMPLATE,t)),this.get(a).appendChild(this._foot)},_isInLogLevel:function(e){var t=e.cat,n=this.get("logLevel");if(n!==p){t=t||p,G(t)&&(t=t.toLowerCase());if(t===w&&n===c||t===p&&n!==p)return!1}return!0},_normalizeMessage:function(e){var t=e.msg,n=e.cat,r=e.src,i={time:new Date,message:t,category:n||this.get("defaultCategory"),sourceAndDetail:r||this.get("defaultSource"),source:null,localTime:null,elapsedTime:null,totalTime:null};return i.source=q.test(i.sourceAndDetail)?RegExp.$1:i.sourceAndDetail,i.localTime=i.time.toLocaleTimeString?i.time.toLocaleTimeString():i.time+"",i.elapsedTime=i.time-this.get(d),i.totalTime=i.time-this.get(y),this._set(d,i.time),i},_schedulePrint:function(){!this._printLoop&&!this.get(m)&&this.get("rendered")&&(this._printLoop=e.later(this.get("printTimeout"),this,this.printBuffer,this.get("printLimit"),!0))},_createEntryHTML:function(e){return e=Y(this._htmlEscapeMessage(e),et.ENTRY_CLASSES,{cat_class:this.getClassName(l,e.category),src_class:this.getClassName(l,e.source)}),this.get("entryTemplate").replace(/\{(\w+)\}/g,function(t,n){return n in e?e[n]:""})},scrollToLatest:function(){var e=this.get("newestOnTop")?0:this._body.get("scrollHeight");this._body.set("scrollTop",e)},_htmlEscapeMessage:function(e){return e.message=this._encodeHTML(e.message),e.source=this._encodeHTML(e.source),e.sourceAndDetail=this._encodeHTML(e.sourceAndDetail),e.category=this._encodeHTML(e.category),e},_trimOldEntries:function(){e.config.debug=!1;var t=this._body,n=this.get("consoleLimit"),r=e.config.debug,i,s,o,u;if(t){i=t.all(E+_),u=i.size()-n;if(u>0){this.get("newestOnTop")?(o=n,u=i.size()):o=0,this._body.setStyle("display","none");for(;o<u;++o)s=i.item(o),s&&s.remove();this._body.setStyle("display","")}}e.config.debug=r},_encodeHTML:function(e){return G(e)?e.replace(R,W).replace(z,V).replace(U,X):e},_cancelPrintLoop:function(){this._printLoop&&(this._printLoop.cancel(),this._printLoop=null)},_validateStyle:function(e){return e==="inline"||e==="block"||e==="separate"},_onPauseClick:function(e){this.set(m,e.target.get(r))},_onClearClick:function(e){this.clearConsole()},_onCollapseClick:function(e){this.set(o,!this.get(o))},_validateLogSource:function(t){return t&&e.Lang.isFunction(t.on)},_setLogLevel:function(e){return G(e)&&(e=e.toLowerCase
()),e===w||e===c?e:p},_getUseBrowserConsole:function(){var e=this.get("logSource");return e instanceof YUI?e.config.useBrowserConsole:null},_setUseBrowserConsole:function(t){var n=this.get("logSource");return n instanceof YUI?(t=!!t,n.config.useBrowserConsole=t,t):e.Attribute.INVALID_VALUE},_uiSetHeight:function(e){et.superclass._uiSetHeight.apply(this,arguments);if(this._head&&this._foot){var t=this.get("boundingBox").get("offsetHeight")-this._head.get("offsetHeight")-this._foot.get("offsetHeight");this._body.setStyle(h,t+"px")}},_uiSizeCB:function(){},_afterStringsChange:function(e){var t=e.subAttrName?e.subAttrName.split(E)[1]:null,n=this.get(a),r=e.prevVal,s=e.newVal;(!t||t===b)&&r.title!==s.title&&n.all(E+M).setHTML(s.title),(!t||t===v)&&r.pause!==s.pause&&n.all(E+I).setHTML(s.pause),(!t||t===i)&&r.clear!==s.clear&&n.all(E+T).set("value",s.clear)},_afterPausedChange:function(t){var n=t.newVal;t.src!==e.Widget.SRC_UI&&this._uiUpdatePaused(n),n?this._printLoop&&this._cancelPrintLoop():this._schedulePrint()},_uiUpdatePaused:function(e){var t=this._foot.all("input[type=checkbox]."+F);t&&t.set(r,e)},_afterConsoleLimitChange:function(){this._trimOldEntries()},_afterCollapsedChange:function(e){this._uiUpdateCollapsed(e.newVal)},_uiUpdateCollapsed:function(e){var t=this.get("boundingBox"),n=t.all("button."+N),r=e?"addClass":"removeClass",i=this.get("strings."+(e?"expand":"collapse"));t[r](C),n&&n.setHTML(i),this._uiSetHeight(e?this._head.get("offsetHeight"):this.get(h))},_afterVisibleChange:function(e){et.superclass._afterVisibleChange.apply(this,arguments),this._uiUpdateFromHideShow(e.newVal)},_uiUpdateFromHideShow:function(e){e&&this._uiSetHeight(this.get(h))},_onLogEvent:function(t){if(!this.get(f)&&this._isInLogLevel(t)){var n=e.config.debug;e.config.debug=!1,this.fire(l,{message:this._normalizeMessage(t)}),e.config.debug=n}},_defResetFn:function(){this.clearConsole(),this.set(y,new Date),this.set(f,!1),this.set(m,!1)},_defEntryFn:function(e){e.message&&(this.buffer.push(e.message),this._schedulePrint())}},{NAME:u,LOG_LEVEL_INFO:p,LOG_LEVEL_WARN:w,LOG_LEVEL_ERROR:c,ENTRY_CLASSES:{entry_class:_,entry_meta_class:H,entry_cat_class:D,entry_src_class:B,entry_time_class:j,entry_content_class:P},CHROME_CLASSES:{console_hd_class:L,console_bd_class:A,console_ft_class:O,console_controls_class:k,console_checkbox_class:x,console_pause_class:F,console_pause_label_class:I,console_button_class:S,console_clear_class:T,console_collapse_class:N,console_title_class:M},HEADER_TEMPLATE:'<div class="{console_hd_class}"><h4 class="{console_title_class}">{str_title}</h4><button type="button" class="{console_button_class} {console_collapse_class}">{str_collapse}</button></div>',BODY_TEMPLATE:'<div class="{console_bd_class}"></div>',FOOTER_TEMPLATE:'<div class="{console_ft_class}"><div class="{console_controls_class}"><label class="{console_pause_label_class}"><input type="checkbox" class="{console_checkbox_class} {console_pause_class}" value="1" id="{id_guid}"> {str_pause}</label><button type="button" class="{console_button_class} {console_clear_class}">{str_clear}</button></div></div>',ENTRY_TEMPLATE:$,ATTRS:{logEvent:{value:"yui:log",writeOnce:!0,validator:G},logSource:{value:e,writeOnce:!0,validator:function(e){return this._validateLogSource(e)}},strings:{valueFn:function(){return e.Intl.get("console")}},paused:{value:!1,validator:J.isBoolean},defaultCategory:{value:p,validator:G},defaultSource:{value:"global",validator:G},entryTemplate:{value:$,validator:G},logLevel:{value:e.config.logLevel||p,setter:function(e){return this._setLogLevel(e)}},printTimeout:{value:100,validator:Q},printLimit:{value:50,validator:Q},consoleLimit:{value:300,validator:Q},newestOnTop:{value:!0},scrollIntoView:{value:!0},startTime:{value:new Date},lastTime:{value:new Date,readOnly:!0},collapsed:{value:!1},height:{value:"300px"},width:{value:"300px"},useBrowserConsole:{lazyAdd:!1,value:!1,getter:function(){return this._getUseBrowserConsole()},setter:function(e){return this._setUseBrowserConsole(e)}},style:{value:"separate",writeOnce:!0,validator:function(e){return this._validateStyle(e)}}}})},"patched-v3.18.0",{requires:["yui-log","widget"],skinnable:!0,lang:["en","es","hu","it","ja"]});
