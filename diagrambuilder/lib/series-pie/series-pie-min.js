YUI.add("series-pie",function(e,t){var n=e.config,r=n.doc,i=e.ClassNameManager.getClassName,s=i("seriesmarker");e.PieSeries=e.Base.create("pieSeries",e.SeriesBase,[e.Plots],{_map:null,_image:null,_setMap:function(){var e="pieHotSpotMapi_"+Math.round(1e5*Math.random()),t=this.get("graph"),n,i,s;t?i=t.get("contentBox"):(n=this.get("graphic"),i=n.get("node"));if(this._image){i.removeChild(this._image);while(this._areaNodes&&this._areaNodes.length>0)s=this._areaNodes.shift(),this._map.removeChild(s);i.removeChild(this._map)}this._image=r.createElement("img"),this._image.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJJREFUeNpiZGBgSGPAAgACDAAIkABoFyloZQAAAABJRU5ErkJggg==",i.appendChild(this._image),this._image.style.position="absolute",this._image.style.left="0px",this._image.style.top="0px",this._image.setAttribute("usemap","#"+e),this._image.style.zIndex=3,this._image.style.opacity=0,this._image.setAttribute("alt","imagemap"),this._map=r.createElement("map"),i.appendChild(this._map),this._map.setAttribute("name",e),this._map.setAttribute("id",e),this._areaNodes=[]},_categoryDisplayName:null,_valueDisplayName:null,addListeners:function(){var t=this.get("categoryAxis"),n=this.get("valueAxis");t&&(t.after("dataReady",e.bind(this._categoryDataChangeHandler,this)),t.after("dataUpdate",e.bind(this._categoryDataChangeHandler,this))),n&&(n.after("dataReady",e.bind(this._valueDataChangeHandler,this)),n.after("dataUpdate",e.bind(this._valueDataChangeHandler,this))),this.after("categoryAxisChange",this.categoryAxisChangeHandler),this.after("valueAxisChange",this.valueAxisChangeHandler),this._stylesChangeHandle=this.after("stylesChange",this._updateHandler),this._visibleChangeHandle=this.after("visibleChange",this._handleVisibleChange)},validate:function(){this.draw(),this._renderered=!0},_categoryAxisChangeHandler:function(){var t=this.get("categoryAxis");t.after("dataReady",e.bind(this._categoryDataChangeHandler,this)),t.after("dataUpdate",e.bind(this._categoryDataChangeHandler,this))},_valueAxisChangeHandler:function(){var t=this.get("valueAxis");t.after("dataReady",e.bind(this._valueDataChangeHandler,this)),t.after("dataUpdate",e.bind(this._valueDataChangeHandler,this))},GUID:"pieseries",_categoryDataChangeHandler:function(){this._rendered&&this.get("categoryKey")&&this.get("valueKey")&&this.draw()},_valueDataChangeHandler:function(){this._rendered&&this.get("categoryKey")&&this.get("valueKey")&&this.draw()},getTotalValues:function(){var e=this.get("valueAxis").getTotalByKey(this.get("valueKey"));return e},draw:function(){var e=this.get("width"),t=this.get("height");if(isFinite(e)&&isFinite(t)&&e>0&&t>0){this._rendered=!0;if(this._drawing){this._callLater=!0;return}this._drawing=!0,this._callLater=!1,this.drawSeries(),this._drawing=!1,this._callLater?this.draw():this.fire("drawingComplete")}},drawPlots:function(){var t=this.get("valueAxis").getDataByKey(this.get("valueKey")).concat(),n=0,r=t.length,i=this.get("styles").marker,s=i.fill.colors,o=i.fill.alphas||["1"],u=i.border.colors,a=[i.border.weight],f=[i.border.alpha],l=a.concat(),c=u.concat(),h=f.concat(),p,d,v=i.padding,m=this.get("graphic"),g=Math.min(m.get("width"),m.get("height")),y=g-(v.left+v.right),b=g-(v.top+v.bottom),w=-90,E=y/2,S=b/2,x=Math.min(E,S),T=0,N,C=0,k,L,A,O,M,_=this.get("graphOrder")||0,D=e.Graphic.NAME==="canvasGraphic";for(;T<r;++T)N=parseFloat(t[T]),t.push(N),isNaN(N)||(n+=N);p=s?s.concat():null,d=o?o.concat():null,this._createMarkerCache(),D&&(this._setMap(),this._image.width=y,this._image.height=b);for(T=0;T<r;T++)N=t[T],n===0?C=360/t.length:C=360*(N/n),p&&p.length<1&&(p=s.concat()),d&&d.length<1&&(d=o.concat()),l&&l.length<1&&(l=a.concat()),l&&c.length<1&&(c=u.concat()),h&&h.length<1&&(h=f.concat()),A=l?l.shift():null,k=c?c.shift():null,L=h?h.shift():null,w+=C,O={border:{color:k,weight:A,alpha:L},fill:{color:p?p.shift():this._getDefaultColor(T,"slice"),alpha:d?d.shift():null},type:"pieslice",arc:C,radius:x,startAngle:w,cx:E,cy:S,width:y,height:b},M=this.getMarker(O,_,T),D&&this._addHotspot(O,_,T);this._clearMarkerCache()},_setStyles:function(t){return t.marker||(t={marker:t}),t=this._parseMarkerStyles(t),e.PieSeries.superclass._mergeStyles.apply(this,[t,this._getDefaultStyles()])},_addHotspot:function(e,t,n){var i=r.createElement("area"),o=1,u=e.cx,a=e.cy,f=e.arc,l=e.startAngle-f,c=e.startAngle,h=e.radius,p=u+Math.cos(l/180*Math.PI)*h,d=a+Math.sin(l/180*Math.PI)*h,v=u+Math.cos(c/180*Math.PI)*h,m=a+Math.sin(c/180*Math.PI)*h,g=Math.floor(f/10)-1,y=f/Math.floor(f/10)/180*Math.PI,b=Math.atan((d-a)/(p-u)),w=u+", "+a+", "+p+", "+d,E,S,x;for(o=1;o<=g;++o)x=y*o,E=Math.cos(b+x),S=Math.sin(b+x),l<=90?(w+=", "+(u+h*Math.cos(b+y*o)),w+=", "+(a+h*Math.sin(b+y*o))):(w+=", "+(u-h*Math.cos(b+y*o)),w+=", "+(a-h*Math.sin(b+y*o)));w+=", "+v+", "+m,w+=", "+u+", "+a,this._map.appendChild(i),i.setAttribute("class",s),i.setAttribute("id","hotSpot_"+t+"_"+n),i.setAttribute("shape","polygon"),i.setAttribute("coords",w),this._areaNodes.push(i)},updateMarkerState:function(e,t){if(this._markers[t]){var n=this._getState(e),r,i,s=this._markers[t],o=this.get("styles").marker;r=n==="off"||!o[n]?o:o[n],i=this._mergeStyles(r,{}),i.fill.color=i.fill.colors[t%i.fill.colors.length],i.fill.alpha=i.fill.alphas[t%i.fill.alphas.length],s.set(i)}},_createMarker:function(e){var t=this.get("graphic"),n,r=this._copyObject(e);return n=t.addShape(r),n.addClass(s),n},_clearMarkerCache:function(){var e=this._markerCache.length,t=0,n;for(;t<e;++t)n=this._markerCache[t],n&&n.destroy();this._markerCache=[]},_getPlotDefaults:function(){var e={padding:{top:0,left:0,right:0,bottom:0},fill:{alphas:["1"]},border:{weight:0,alpha:1}};return e.fill.colors=this._defaultSliceColors,e.border.colors=this._defaultBorderColors,e}},{ATTRS:{type:{value:"pie"},order:{},graph:{},categoryAxis:{value:null,validator:function(e){return e!==this.get("categoryAxis")}},valueAxis:{value:null,validator:function(e){return e!==
this.get("valueAxis")}},categoryKey:{value:null,validator:function(e){return e!==this.get("categoryKey")}},valueKey:{value:null,validator:function(e){return e!==this.get("valueKey")}},categoryDisplayName:{setter:function(e){return this._categoryDisplayName=e,e},getter:function(){return this._categoryDisplayName||this.get("categoryKey")}},valueDisplayName:{setter:function(e){return this._valueDisplayName=e,e},getter:function(){return this._valueDisplayName||this.get("valueKey")}},slices:null}})},"patched-v3.18.0",{requires:["series-base","series-plot-util"]});
