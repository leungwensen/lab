YUI.add("aui-scheduler-view-table",function(e,t){var n=e.Lang,r=n.isFunction,i=e.DataType.DateMath,s=e.WidgetStdMod,o=i.WEEK_LENGTH,u=function(e,t){return function(n){var r=n.all(e);return r.size()>=t?r:null}},a=e.getClassName,f=a("icon"),l=a("icon","arrowstop-1-l"),c=a("icon","arrowstop-1-r"),h=a("scheduler-view","table","colgrid"),p=a("scheduler-view","table","colgrid","first"),d=a("scheduler-view","table","colgrid","today"),v=a("scheduler-view","table","container"),m=a("scheduler-view","table","events","overlay","node"),g=a("scheduler-view","table","events","overlay","node","body"),y=a("scheduler-view","table","events","overlay","node","close"),b=a("scheduler-view","table","header","col"),w=a("scheduler-view","table","header","day"),E=a("scheduler-view","table","header","table"),S=a("scheduler-view","table","more"),x=a("scheduler-view","table","row"),T=a("scheduler-view","table","row","container"),N=a("scheduler-view","table","data"),C=a("scheduler-view","table","data","col"),k=a("scheduler-view","table","data","col","title"),L=a("scheduler-view","table","data","col","title","down"),A=a("scheduler-view","table","data","col","title","first"),O=a("scheduler-view","table","data","col","title","next"),M=a("scheduler-view","table","data","col","title","today"),_=a("scheduler-view","table","data","event"),D=a("scheduler-view","table","data","event","left"),P=a("scheduler-view","table","data","event","right"),H=a("scheduler-view","table","data","first"),B=a("scheduler-view","table","grid"),j=a("scheduler-view","table","grid","first"),F='<div class="'+v+'">'+'<div class="'+T+'"></div>'+"</div>",I='<div class="'+m+'">'+'<div class="'+g+'"></div>'+'<a href="javascript:;" class="'+y+'">{label}</a>'+"</div>",q='<td class="'+h+'">&nbsp;</td>',R='<th class="'+w+'"><div>&nbsp;</div></th>',U='<table cellspacing="0" cellpadding="0" class="'+E+'">'+"<tbody>"+'<tr class="'+b+'"></tr>'+"</tbody>"+"</table>",z='<a href="javascript:;" class="'+S+'">{labelPrefix} {count} {labelSuffix}</a>',W='<div class="'+x+'" style="top: {top}%; height: {height}%;"></div>',X='<table cellspacing="0" cellpadding="0" class="'+N+'">'+"<tbody></tbody>"+"</table>",V='<table cellspacing="0" cellpadding="0" class="'+B+'">'+"<tbody>"+"<tr></tr>"+"</tbody>"+"</table>",$='<span class="'+[f,l].join(" ")+'"></span>',J='<span class="'+[f,c].join(" ")+'"></span>',K='<td class="'+C+'"><div></div></td>',Q="<tr></tr>",G=e.Component.create({NAME:"scheduler-view-table",ATTRS:{bodyContent:{value:""},displayDaysInterval:{value:42},displayRows:{value:3},fixedHeight:{value:!0},name:{value:"table"},headerDateFormatter:{value:function(t){var n=this,r=n.get("scheduler");return e.DataType.Date.format(t,{format:"%a",locale:r.get("locale")})},validator:r},navigationDateFormatter:{value:function(t){var n=this,r=n.get("scheduler");return e.DataType.Date.format(t,{format:"%b %Y",locale:r.get("locale")})},validator:r},scrollable:{value:!1},strings:{value:{close:"Close",show:"Show",more:"more"}},headerTableNode:{valueFn:function(){return e.Node.create(U)}},colHeaderDaysNode:{valueFn:"_valueColHeaderDaysNode"},rowsContainerNode:{valueFn:function(){return e.Node.create(F)}},tableGridNode:{valueFn:"_valueTableGridNode"}},HTML_PARSER:{colHeaderDaysNode:u("."+w,7),headerTableNode:"."+E,rowsContainerNode:"."+v,tableGridNode:u("."+B,7)},EXTENDS:e.SchedulerView,prototype:{evtDateStack:null,evtRenderedStack:null,rowDataTableStack:null,initializer:function(){var t=this;t.evtDateStack={},t.evtRenderedStack={},t.rowDataTableStack={},t.colHeaderDaysNode=t.get("colHeaderDaysNode"),t.headerTableNode=t.get("headerTableNode"),t.rowsContainerNode=t.get("rowsContainerNode"),t.tableGridNode=t.get("tableGridNode"),t.columnDayHeader=t.headerTableNode.one("."+b),t.columnTableGrid=e.NodeList.create(),t.tableRowContainer=t.rowsContainerNode.one("."+T),t.tableRows=e.NodeList.create()},bindUI:function(){var t=this;t.rowsContainerNode.delegate("click",e.bind(t._onClickMore,t),"."+S)},renderUI:function(){var e=this,t=e._getDisplayRowsCount(),n;for(n=0;n<t;n++)e.tableRows.push(e.buildGridRowNode(n));e._renderEventsOverlay(),e.colHeaderDaysNode.appendTo(e.columnDayHeader),e.tableRows.appendTo(e.tableRowContainer)},buildEventsRow:function(t,r,i){var s=this,o=s.get("displayRows"),u=0,a=e.Node.create(Q);return s.loopDates(t,r,function(f,l){var c=String(f.getTime()),h=s.evtRenderedStack[c];h||(s.evtRenderedStack[c]=[],h=s.evtRenderedStack[c]);if(u>l){h.push(null);return}var p=s.getIntersectEvents(f),d=s._getRenderableEvent(p,t,r,f),v=e.Node.create(K),m=v.one("div");if(h.length<p.length&&i===o-1){var g=s.get("strings"),y=e.Node.create(n.sub(z,{count:p.length-h.length,labelPrefix:g.show,labelSuffix:g.more}));y.setData("events",p),m.append(y)}else if(d){var b=s._getEvtSplitInfo(d,f,t,r);v.attr("colspan",b.colspan),u+=b.colspan-1,s._syncEventNodeContainerUI(d,m,b),s._syncEventNodeUI(d,m,f),h.push(d)}u++,a.append(v)}),a},buildEventsTable:function(t,n){var r=this,s=r.get("displayRows"),o=i.clearTime(r._findCurrentIntervalStart()),u=String(o.getTime()).concat(t.getTime()).concat(n.getTime()),a=r.rowDataTableStack[u],f;if(!a){a=e.Node.create(X);var l=a.one("tbody"),c=r.buildEventsTitleRow(a,t,n);l.append(c);for(f=0;f<s;f++){var h=r.buildEventsRow(t,n,f);l.append(h)}r.rowDataTableStack[u]=a}return a},buildEventsTitleRow:function(t,n,r){var s=this,o=s.get("scheduler").get("todayDate"),u=e.Node.create(Q);return s.loopDates(n,r,function(t,n){var r=e.Node.create(K);r.addClass(k).toggleClass(A,n===0).toggleClass(M,!i.isDayOverlap(t,o)).toggleClass(O,!i.isDayOverlap(i.subtract(t,i.DAY,1),o)).toggleClass(L,!i.isDayOverlap(i.subtract(t,i.WEEK,1),o)),u.append(r.setContent(t.getDate()))}),u},buildGridRowNode:function(t){var r=this,i=r._getDisplayRowsCount(),s=100/i,o=r._getTableGridNode(t),u=e.Node.create(n.sub(W,{height:s,top:s*t}));return u.append(o.toggleClass(j,t===0)),u},flushViewCache:function(){var e=this;e.evtDateStack={},e.evtRenderedStack={},e.rowDataTableStack={}},getIntersectEvents:function(t){var n=
this,r=n.get("scheduler"),i=String(t.getTime());if(!n.evtDateStack[i]){var s=r.getIntersectEvents(t);n.evtDateStack[i]=e.Array.filter(s,n.get("filterFn"))}return n.evtDateStack[i]},getNextDate:function(){var e=this,t=e.get("scheduler"),n=t.get("viewDate"),r=e.get("displayDaysInterval");return i.toLastHour(i.add(n,i.DAY,r))},getPrevDate:function(){var e=this,t=e.get("scheduler"),n=t.get("viewDate"),r=e.get("displayDaysInterval");return i.toMidnight(i.subtract(n,i.DAY,r))},hideEventsOverlay:function(){var e=this;e.eventsOverlay.set("visible",!1)},loopDates:function(e,t,n,r,s){var o=this,u=i.clone(e),a=t.getTime(),f;for(f=0;u.getTime()<=a;f++)n.apply(o,[u,f]),u=i.add(u,r||i.DAY,s||1)},plotEvents:function(){var e=this,t=e._findCurrentIntervalStart(),n=i.safeClearTime(t);e.flushViewCache(),e.hideEventsOverlay(),e.bodyNode.all("."+N).remove();var r=e.get("displayDaysInterval"),s=Math.min(r,o);e.tableRows.each(function(t,r){var o=i.add(n,i.DAY,s*r),u=i.add(o,i.DAY,s-1),a=e.buildEventsTable(o,u);r===0&&a.addClass(H),t.append(a)})},syncDaysHeaderUI:function(){var e=this,t=e.get("scheduler"),n=t.get("viewDate"),r=e.get("headerDateFormatter"),s=e._findFirstDayOfWeek(n);e.colHeaderDaysNode.all("div").each(function(t,n){var o=i.add(s,i.DAY,n);t.html(r.call(e,o))})},syncGridUI:function(){var e=this,t=e.get("scheduler"),n=t.get("todayDate");e.columnTableGrid.removeClass(d);var r=e._findCurrentIntervalStart(),s=e._findCurrentIntervalEnd();if(i.between(n,r,s)){var o=t.get("firstDayOfWeek"),u=e._findFirstDayOfWeek(n),a=i.getWeekNumber(n,o)-i.getWeekNumber(r,o),f=n.getDate()-u.getDate(),l=e._getCellIndex([f,a]),c=e.columnTableGrid.item(l);c&&c.addClass(d)}},syncStdContent:function(){var e=this;e.setStdModContent(s.BODY,e.rowsContainerNode.getDOM()),e.setStdModContent(s.HEADER,e.headerTableNode.getDOM())},_findCurrentIntervalEnd:function(){var e=this,t=e.get("scheduler"),n=t.get("viewDate"),r=e.get("displayDaysInterval");return i.add(n,i.DAY,r)},_findCurrentIntervalStart:function(){var e=this,t=e.get("scheduler");return t.get("viewDate")},_findFirstDayOfWeek:function(e){var t=this,n=t.get("scheduler"),r=n.get("firstDayOfWeek");return i.getFirstDayOfWeek(e,r)},_getCellIndex:function(e){return e[1]*o+e[0]},_getDisplayRowsCount:function(){var e=this,t=e.get("displayDaysInterval");return Math.ceil(t/o)},_getDisplayRowDaysCount:function(){var e=this,t=e.get("displayDaysInterval");return Math.min(t,o)},_getEvtLabel:function(e){var t=e.get("endDate"),n=e.get("startDate");return[n.getHours(),"-",t.getHours()," ",e.get("content")].join("")},_getEvtSplitInfo:function(e,t,n,r){var s=e.getClearStartDate(),o=e.getClearEndDate(),u=i.getDayOffset(r,t),a={colspan:Math.min(i.getDayOffset(o,t),u)+1,left:i.before(s,n),right:i.after(o,r)};return a},_getRenderableEvent:function(t,n,r,s){var o=this,u=String(s.getTime()),a;o.evtRenderedStack[u]||(o.evtRenderedStack[u]=[]);for(a=0;a<t.length;a++){var f=t[a],l=f.get("startDate"),c=i.after(s,l)&&!i.isDayOverlap(s,n),h=!i.isDayOverlap(l,s),p=e.Array.indexOf(o.evtRenderedStack[u],f)>-1;if(!p&&(h||c))return f}return null},_getTableGridNode:function(t){var n=this,r=n.get("displayDaysInterval"),i=n.tableGridNode.item(t),s=i.one("tr"),u;for(u=0;u<Math.min(r,o);u++){var a=e.Node.create(q);s.append(a),u===0&&a.addClass(p),n.columnTableGrid.push(a)}return i},_onClickMore:function(t){var n=this,r=t.target,i=r.getData("events"),s=e.NodeList.create();e.Array.each(i,function(e){var t=e.get("node").item(0).clone();t.setData("scheduler-event",e),t.setStyles({height:"auto",left:0,position:"relative",top:0,width:"auto"}),s.push(t)}),n.eventsOverlay.bodyNode.one("."+g).setContent(s),n.eventsOverlay.setAttrs({visible:!0,xy:r.getXY()})},_renderEventsOverlay:function(){var t=this,r=t.get("strings");t.eventsOverlay=new e.Overlay({align:{points:["tl","tl"]},bodyContent:n.sub(I,{label:r.close}),render:t.get("boundingBox"),visible:!1,width:250,zIndex:450}),t.eventsOverlay.bodyNode.delegate("click",e.bind(t.hideEventsOverlay,t),"."+y)},_syncEventNodeContainerUI:function(e,t,n){t.addClass(_),n.left&&t.addClass(D).prepend($),n.right&&t.addClass(P).append(J)},_syncEventNodeUI:function(e,t,n){var r=this,s=r.get("scheduler"),u=s.get("firstDayOfWeek"),a=e.get("node"),f=e.get("startDate"),l=i.clearTime(r._findCurrentIntervalStart()),c=i.getFirstDayOfWeek(new Date(Math.max(f,l)),u),h=Math.floor(i.getDayOffset(n,c)/o);a.size()<=h&&e.addPaddingNode(),a.size()<=h&&(h=a.size()-1);var p=a.item(h);p.setStyles({height:"auto",left:0,top:0,width:"auto"}),p.appendTo(t),e.syncUI()},_uiSetDate:function(){var e=this;e.syncDaysHeaderUI(),e.syncGridUI()},_valueColHeaderDaysNode:function(){var e=this,t=e.get("displayDaysInterval"),n=Math.min(t,o);return e._valueNodeList(n,R)},_valueTableGridNode:function(){var e=this,t=e.get("displayDaysInterval"),n=Math.min(t,o);return e._valueNodeList(n,V)},_valueNodeList:function(t,n){var r=[];while(t--)r.push(n);return e.NodeList.create(r.join(""))}}});e.SchedulerTableView=G},"3.0.0",{requires:["overlay","aui-scheduler-base"],skinnable:!0});