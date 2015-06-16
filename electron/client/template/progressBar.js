/* jshint ignore:start */
define(["pastry/pastry","pastry/html/escape"], function (helper) {return function(obj, ne){
var _e=ne?function(s){return s;}:helper.escape,print=function(s,e){_s+=e?(s==null?'':s):_e(s);};obj=obj||{};with(obj){_s='<span class="progress-bar" id="'+_e(id)+'"><span class="bar" style="width: '+_e(value)+'%;"></span><span class="slider" style="left: '+_e(value)+'%;"></span></span>';}return _s;
}});
/* jshint ignore:end */