YUI.add("resize-constrain",function(e,t){function B(){B.superclass.constructor.apply(this,arguments)}var n=e.Lang,r=n.isBoolean,i=n.isNumber,s=n.isString,o=e.Resize.capitalize,u=function(t){return t instanceof e.Node},a=function(e){return parseFloat(e)||0},f="borderBottomWidth",l="borderLeftWidth",c="borderRightWidth",h="borderTopWidth",p="border",d="bottom",v="con",m="constrain",g="host",y="left",b="maxHeight",w="maxWidth",E="minHeight",S="minWidth",x="node",T="offsetHeight",N="offsetWidth",C="preserveRatio",k="region",L="resizeConstrained",A="right",O="tickX",M="tickY",_="top",D="width",P="view",H="viewportRegion";e.mix(B,{NAME:L,NS:v,ATTRS:{constrain:{setter:function(t){return t&&(u(t)||s(t)||t.nodeType)&&(t=e.one(t)),t}},minHeight:{value:15,validator:i},minWidth:{value:15,validator:i},maxHeight:{value:Infinity,validator:i},maxWidth:{value:Infinity,validator:i},preserveRatio:{value:!1,validator:r},tickX:{value:!1},tickY:{value:!1}}}),e.extend(B,e.Plugin.Base,{constrainSurrounding:null,initializer:function(){var t=this,n=t.get(g);n.delegate.dd.plug(e.Plugin.DDConstrained,{tickX:t.get(O),tickY:t.get(M)}),n.after("resize:align",e.bind(t._handleResizeAlignEvent,t)),n.on("resize:start",e.bind(t._handleResizeStartEvent,t))},_checkConstrain:function(e,t,n){var r=this,i,s,u,f,l=r.get(g),c=l.info,h=r.constrainSurrounding.border,d=r._getConstrainRegion();d&&(i=c[e]+c[n],s=d[t]-a(h[o(p,t,D)]),i>=s&&(c[n]-=i-s),u=c[e],f=d[e]+a(h[o(p,e,D)]),u<=f&&(c[e]+=f-u,c[n]-=f-u))},_checkHeight:function(){var e=this,t=e.get(g),n=t.info,r=e.get(b)+t.totalVSurrounding,i=e.get(E)+t.totalVSurrounding;e._checkConstrain(_,d,T),n.offsetHeight>r&&t._checkSize(T,r),n.offsetHeight<i&&t._checkSize(T,i)},_checkRatio:function(){var t=this,n=t.get(g),r=n.info,s=n.originalInfo,o=s.offsetWidth,u=s.offsetHeight,p=s.top,d=s.left,v=s.bottom,y=s.right,b=function(){return r.offsetWidth/o},w=function(){return r.offsetHeight/u},E=n.changeHeightHandles,S,x,T,N,C,k;t.get(m)&&n.changeHeightHandles&&n.changeWidthHandles&&(T=t._getConstrainRegion(),x=t.constrainSurrounding.border,S=T.bottom-a(x[f])-v,N=d-(T.left+a(x[l])),C=T.right-a(x[c])-y,k=p-(T.top+a(x[h])),n.changeLeftHandles&&n.changeTopHandles?E=k<N:n.changeLeftHandles?E=S<N:n.changeTopHandles?E=k<C:E=S<C),E?(r.offsetWidth=o*w(),t._checkWidth(),r.offsetHeight=u*b()):(r.offsetHeight=u*b(),t._checkHeight(),r.offsetWidth=o*w()),n.changeTopHandles&&(r.top=p+(u-r.offsetHeight)),n.changeLeftHandles&&(r.left=d+(o-r.offsetWidth)),e.each(r,function(e,t){i(e)&&(r[t]=Math.round(e))})},_checkRegion:function(){var t=this,n=t.get(g),r=t._getConstrainRegion();return e.DOM.inRegion(null,r,!0,n.info)},_checkWidth:function(){var e=this,t=e.get(g),n=t.info,r=e.get(w)+t.totalHSurrounding,i=e.get(S)+t.totalHSurrounding;e._checkConstrain(y,A,N),n.offsetWidth<i&&t._checkSize(N,i),n.offsetWidth>r&&t._checkSize(N,r)},_getConstrainRegion:function(){var e=this,t=e.get(g),n=t.get(x),r=e.get(m),i=null;return r&&(r===P?i=n.get(H):u(r)?i=r.get(k):i=r),i},_handleResizeAlignEvent:function(){var e=this,t=e.get(g);e._checkHeight(),e._checkWidth(),e.get(C)&&e._checkRatio(),e.get(m)&&!e._checkRegion()&&(t.info=t.lastInfo)},_handleResizeStartEvent:function(){var e=this,t=e.get(m),n=e.get(g);e.constrainSurrounding=n._getBoxSurroundingInfo(t)}}),e.namespace("Plugin"),e.Plugin.ResizeConstrained=B},"patched-v3.18.0",{requires:["plugin","resize-base"]});
