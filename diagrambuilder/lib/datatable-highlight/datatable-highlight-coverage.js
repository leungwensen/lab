if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/datatable-highlight/datatable-highlight.js']) {
   __coverage__['build/datatable-highlight/datatable-highlight.js'] = {"path":"build/datatable-highlight/datatable-highlight.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":50}}},"2":{"name":"Highlight","line":18,"loc":{"start":{"line":18,"column":0},"end":{"line":18,"column":21}}},"3":{"name":"(anonymous_3)","line":131,"loc":{"start":{"line":131,"column":23},"end":{"line":131,"column":38}}},"4":{"name":"(anonymous_4)","line":160,"loc":{"start":{"line":160,"column":23},"end":{"line":160,"column":38}}},"5":{"name":"(anonymous_5)","line":189,"loc":{"start":{"line":189,"column":24},"end":{"line":189,"column":39}}},"6":{"name":"(anonymous_6)","line":218,"loc":{"start":{"line":218,"column":19},"end":{"line":218,"column":32}}},"7":{"name":"(anonymous_7)","line":233,"loc":{"start":{"line":233,"column":19},"end":{"line":233,"column":31}}},"8":{"name":"(anonymous_8)","line":254,"loc":{"start":{"line":254,"column":20},"end":{"line":254,"column":32}}},"9":{"name":"(anonymous_9)","line":267,"loc":{"start":{"line":267,"column":23},"end":{"line":267,"column":35}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":282,"column":84}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":51}},"3":{"start":{"line":18,"column":0},"end":{"line":18,"column":23}},"4":{"start":{"line":20,"column":0},"end":{"line":62,"column":2}},"5":{"start":{"line":65,"column":0},"end":{"line":275,"column":2}},"6":{"start":{"line":132,"column":8},"end":{"line":132,"column":43}},"7":{"start":{"line":134,"column":8},"end":{"line":136,"column":9}},"8":{"start":{"line":135,"column":12},"end":{"line":135,"column":29}},"9":{"start":{"line":138,"column":8},"end":{"line":143,"column":9}},"10":{"start":{"line":139,"column":12},"end":{"line":142,"column":24}},"11":{"start":{"line":145,"column":8},"end":{"line":145,"column":19}},"12":{"start":{"line":161,"column":8},"end":{"line":161,"column":43}},"13":{"start":{"line":163,"column":8},"end":{"line":165,"column":9}},"14":{"start":{"line":164,"column":12},"end":{"line":164,"column":29}},"15":{"start":{"line":167,"column":8},"end":{"line":174,"column":9}},"16":{"start":{"line":168,"column":12},"end":{"line":168,"column":37}},"17":{"start":{"line":170,"column":12},"end":{"line":173,"column":21}},"18":{"start":{"line":190,"column":8},"end":{"line":190,"column":43}},"19":{"start":{"line":192,"column":8},"end":{"line":194,"column":9}},"20":{"start":{"line":193,"column":12},"end":{"line":193,"column":30}},"21":{"start":{"line":196,"column":8},"end":{"line":202,"column":9}},"22":{"start":{"line":198,"column":12},"end":{"line":201,"column":24}},"23":{"start":{"line":204,"column":8},"end":{"line":204,"column":19}},"24":{"start":{"line":219,"column":8},"end":{"line":219,"column":88}},"25":{"start":{"line":234,"column":8},"end":{"line":238,"column":15}},"26":{"start":{"line":240,"column":8},"end":{"line":240,"column":106}},"27":{"start":{"line":255,"column":8},"end":{"line":255,"column":89}},"28":{"start":{"line":268,"column":8},"end":{"line":269,"column":18}},"29":{"start":{"line":271,"column":8},"end":{"line":273,"column":9}},"30":{"start":{"line":272,"column":12},"end":{"line":272,"column":90}},"31":{"start":{"line":277,"column":0},"end":{"line":277,"column":34}},"32":{"start":{"line":279,"column":0},"end":{"line":279,"column":49}}},"branchMap":{"1":{"line":134,"type":"if","locations":[{"start":{"line":134,"column":8},"end":{"line":134,"column":8}},{"start":{"line":134,"column":8},"end":{"line":134,"column":8}}]},"2":{"line":138,"type":"if","locations":[{"start":{"line":138,"column":8},"end":{"line":138,"column":8}},{"start":{"line":138,"column":8},"end":{"line":138,"column":8}}]},"3":{"line":163,"type":"if","locations":[{"start":{"line":163,"column":8},"end":{"line":163,"column":8}},{"start":{"line":163,"column":8},"end":{"line":163,"column":8}}]},"4":{"line":167,"type":"if","locations":[{"start":{"line":167,"column":8},"end":{"line":167,"column":8}},{"start":{"line":167,"column":8},"end":{"line":167,"column":8}}]},"5":{"line":192,"type":"if","locations":[{"start":{"line":192,"column":8},"end":{"line":192,"column":8}},{"start":{"line":192,"column":8},"end":{"line":192,"column":8}}]},"6":{"line":196,"type":"if","locations":[{"start":{"line":196,"column":8},"end":{"line":196,"column":8}},{"start":{"line":196,"column":8},"end":{"line":196,"column":8}}]},"7":{"line":271,"type":"if","locations":[{"start":{"line":271,"column":8},"end":{"line":271,"column":8}},{"start":{"line":271,"column":8},"end":{"line":271,"column":8}}]}},"code":["(function () { YUI.add('datatable-highlight', function (Y, NAME) {","","/**"," Adds support for highlighting columns with the mouse in a DataTable",""," @module datatable"," @submodule datatable-highlight"," @since 3.13.0"," */","","","var getClassName = Y.ClassNameManager.getClassName;","","/**"," @class DataTable.Highlight"," @since 3.13.0"," */","function Highlight() {}","","Highlight.ATTRS = {","    /**","     Setting this to true will create a delegate on the DataTable adding the","     default classname to the row when the mouse is over the row.","","     @attribute highlightRows","     @default false","     @since 3.13.0","     */","    highlightRows: {","        value: false,","        setter: '_setHighlightRows',","        validator: Y.Lang.isBoolean","    },","","    /**","     Setting this to true will create a delegate on the DataTable adding the","     default classname to the column when the mouse is over the column.","","     @attribute highlightCols","     @default false","     @since 3.13.0","     */","    highlightCols: {","        value: false,","        setter: '_setHighlightCols',","        validator: Y.Lang.isBoolean","    },","","    /**","     Setting this to true will create a delegate on the DataTable adding the","     default classname to the cell when the mouse is over it.","","     @attribute highlightCells","     @default false","     @since 3.13.0","     */","    highlightCells: {","        value: false,","        setter: '_setHighlightCells',","        validator: Y.Lang.isBoolean","    }","};","","","Highlight.prototype = {","","    /**","     An object consisting of classnames for a `row`, a `col` and a `cell` to","     be applied to their respective objects when the user moves the mouse over","     the item and the attribute is set to true.","","     @public","     @property highlightClassNames","     @type Object","     @since 3.13.0","     */","    highlightClassNames: {","        row: getClassName(NAME, 'row'),","        col: getClassName(NAME, 'col'),","        cell: getClassName(NAME, 'cell')","    },","","    /**","     A string that is used to create a column selector when the column is has","     the mouse over it. Can contain the css prefix (`{prefix}`) and the column","     name (`{col}`). Further substitution will require `_highlightCol` to be","     overwritten.","","     @protected","     @property _colSelector","     @type String","     @since 3.13.0","     */","    _colSelector: '.{prefix}-data .{prefix}-col-{col}',","","    /**","     A string that will be used to create Regular Expression when column","     highlighting is set to true. Uses the css prefix (`{prefix}`) from the","     DataTable object to populate.","","     @protected","     @property _colNameRegex","     @type String","     @since 3.13.0","     */","    _colNameRegex: '{prefix}-col-(\\\\S*)',","","    /**","     This object will contain any delegates created when their feature is","     turned on.","","     @protected","     @property _highlightDelegates","     @type Object","     @since 3.13.0","     */","    _highlightDelegates: {},","","    /**","     Default setter method for row highlighting. If the value is true, a","     delegate is created and stored in `this._highlightDelegates.row`. This","     delegate will add/remove the row highlight classname to/from the row when","     the mouse enters/leaves a row on the `tbody`","","     @protected","     @method _setHighlightRows","     @param {Boolean} val","     @return val","     @since 3.13.0","     */","    _setHighlightRows: function (val) {","        var del = this._highlightDelegates;","","        if (del.row) {","            del.row.detach();","        }","","        if (val === true) {","            del.row = this.delegate('hover',","                Y.bind(this._highlightRow, this),","                Y.bind(this._highlightRow, this),","            \"tbody tr\");","        }","","        return val;","    },","","    /**","     Default setter method for column highlighting. If the value is true, a","     delegate is created and stored in `this._highlightDelegates.col`. This","     delegate will add/remove the column highlight classname to/from the","     column when the mouse enters/leaves a column on the `tbody`","","     @protected","     @method _setHighlightCols","     @param {Boolean} val","     @return val","     @since 3.13.0","     */","    _setHighlightCols: function (val) {","        var del = this._highlightDelegates;","","        if (del.col) {","            del.col.detach();","        }","","        if (val === true) {","            this._buildColSelRegex();","","            del.col = this.delegate('hover',","                Y.bind(this._highlightCol, this),","                Y.bind(this._highlightCol, this),","            \"tr td\");","        }","    },","","    /**","     Default setter method for cell highlighting. If the value is true, a","     delegate is created and stored in `this._highlightDelegates.cell`. This","     delegate will add/remove the cell highlight classname to/from the cell","     when the mouse enters/leaves a cell on the `tbody`","","     @protected","     @method _setHighlightCells","     @param {Boolean} val","     @return val","     @since 3.13.0","     */","    _setHighlightCells: function (val) {","        var del = this._highlightDelegates;","","        if (del.cell) {","            del.cell.detach();","        }","","        if (val === true) {","","            del.cell = this.delegate('hover',","                Y.bind(this._highlightCell, this),","                Y.bind(this._highlightCell, this),","            \"tbody td\");","        }","","        return val;","    },","","    /**","     Method called to turn on or off the row highlighting when the mouse","     enters or leaves the row. This is determined by the event phase of the","     hover event. Where `over` will turn on the highlighting and anything else","     will turn it off.","","     @protected","     @method _highlightRow","     @param {EventFacade} e Event from the hover event","     @since 3.13.0","     */","    _highlightRow: function (e) {","        e.currentTarget.toggleClass(this.highlightClassNames.row, (e.phase === 'over'));","    },","","    /**","     Method called to turn on or off the column highlighting when the mouse","     enters or leaves the column. This is determined by the event phase of the","     hover event. Where `over` will turn on the highlighting and anything else","     will turn it off.","","     @protected","     @method _highlightCol","     @param {EventFacade} e Event from the hover event","     @since 3.13.0","     */","    _highlightCol: function(e) {","        var colName = this._colNameRegex.exec(e.currentTarget.getAttribute('class')),","            selector = Y.Lang.sub(this._colSelector, {","                prefix: this._cssPrefix,","                col: colName[1]","            });","","        this.view.tableNode.all(selector).toggleClass(this.highlightClassNames.col, (e.phase === 'over'));","    },","","    /**","     Method called to turn on or off the cell highlighting when the mouse","     enters or leaves the cell. This is determined by the event phase of the","     hover event. Where `over` will turn on the highlighting and anything else","     will turn it off.","","     @protected","     @method _highlightCell","     @param {EventFacade} e Event from the hover event","     @since 3.13.0","     */","    _highlightCell: function(e) {","        e.currentTarget.toggleClass(this.highlightClassNames.cell, (e.phase === 'over'));","    },","","    /**","     Used to transform the `_colNameRegex` to a Regular Expression when the","     column highlighting is initially turned on. If `_colNameRegex` is not a","     string when this method is called, no action is taken.","","     @protected","     @method _buildColSelRegex","     @since 3.13.0","     */","    _buildColSelRegex: function () {","        var str = this._colNameRegex,","            regex;","","        if (typeof str === 'string') {","            this._colNameRegex = new RegExp(Y.Lang.sub(str, { prefix: this._cssPrefix }));","        }","    }","};","","Y.DataTable.Highlight = Highlight;","","Y.Base.mix(Y.DataTable, [Y.DataTable.Highlight]);","","","}, 'patched-v3.18.0', {\"requires\": [\"datatable-base\", \"event-hover\"], \"skinnable\": true});","","}());"]};
}
var __cov_Pw$toercDEQcrfmVsQxX3w = __coverage__['build/datatable-highlight/datatable-highlight.js'];
__cov_Pw$toercDEQcrfmVsQxX3w.s['1']++;YUI.add('datatable-highlight',function(Y,NAME){__cov_Pw$toercDEQcrfmVsQxX3w.f['1']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['2']++;var getClassName=Y.ClassNameManager.getClassName;__cov_Pw$toercDEQcrfmVsQxX3w.s['3']++;function Highlight(){__cov_Pw$toercDEQcrfmVsQxX3w.f['2']++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['4']++;Highlight.ATTRS={highlightRows:{value:false,setter:'_setHighlightRows',validator:Y.Lang.isBoolean},highlightCols:{value:false,setter:'_setHighlightCols',validator:Y.Lang.isBoolean},highlightCells:{value:false,setter:'_setHighlightCells',validator:Y.Lang.isBoolean}};__cov_Pw$toercDEQcrfmVsQxX3w.s['5']++;Highlight.prototype={highlightClassNames:{row:getClassName(NAME,'row'),col:getClassName(NAME,'col'),cell:getClassName(NAME,'cell')},_colSelector:'.{prefix}-data .{prefix}-col-{col}',_colNameRegex:'{prefix}-col-(\\S*)',_highlightDelegates:{},_setHighlightRows:function(val){__cov_Pw$toercDEQcrfmVsQxX3w.f['3']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['6']++;var del=this._highlightDelegates;__cov_Pw$toercDEQcrfmVsQxX3w.s['7']++;if(del.row){__cov_Pw$toercDEQcrfmVsQxX3w.b['1'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['8']++;del.row.detach();}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['1'][1]++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['9']++;if(val===true){__cov_Pw$toercDEQcrfmVsQxX3w.b['2'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['10']++;del.row=this.delegate('hover',Y.bind(this._highlightRow,this),Y.bind(this._highlightRow,this),'tbody tr');}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['2'][1]++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['11']++;return val;},_setHighlightCols:function(val){__cov_Pw$toercDEQcrfmVsQxX3w.f['4']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['12']++;var del=this._highlightDelegates;__cov_Pw$toercDEQcrfmVsQxX3w.s['13']++;if(del.col){__cov_Pw$toercDEQcrfmVsQxX3w.b['3'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['14']++;del.col.detach();}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['3'][1]++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['15']++;if(val===true){__cov_Pw$toercDEQcrfmVsQxX3w.b['4'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['16']++;this._buildColSelRegex();__cov_Pw$toercDEQcrfmVsQxX3w.s['17']++;del.col=this.delegate('hover',Y.bind(this._highlightCol,this),Y.bind(this._highlightCol,this),'tr td');}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['4'][1]++;}},_setHighlightCells:function(val){__cov_Pw$toercDEQcrfmVsQxX3w.f['5']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['18']++;var del=this._highlightDelegates;__cov_Pw$toercDEQcrfmVsQxX3w.s['19']++;if(del.cell){__cov_Pw$toercDEQcrfmVsQxX3w.b['5'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['20']++;del.cell.detach();}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['5'][1]++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['21']++;if(val===true){__cov_Pw$toercDEQcrfmVsQxX3w.b['6'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['22']++;del.cell=this.delegate('hover',Y.bind(this._highlightCell,this),Y.bind(this._highlightCell,this),'tbody td');}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['6'][1]++;}__cov_Pw$toercDEQcrfmVsQxX3w.s['23']++;return val;},_highlightRow:function(e){__cov_Pw$toercDEQcrfmVsQxX3w.f['6']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['24']++;e.currentTarget.toggleClass(this.highlightClassNames.row,e.phase==='over');},_highlightCol:function(e){__cov_Pw$toercDEQcrfmVsQxX3w.f['7']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['25']++;var colName=this._colNameRegex.exec(e.currentTarget.getAttribute('class')),selector=Y.Lang.sub(this._colSelector,{prefix:this._cssPrefix,col:colName[1]});__cov_Pw$toercDEQcrfmVsQxX3w.s['26']++;this.view.tableNode.all(selector).toggleClass(this.highlightClassNames.col,e.phase==='over');},_highlightCell:function(e){__cov_Pw$toercDEQcrfmVsQxX3w.f['8']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['27']++;e.currentTarget.toggleClass(this.highlightClassNames.cell,e.phase==='over');},_buildColSelRegex:function(){__cov_Pw$toercDEQcrfmVsQxX3w.f['9']++;__cov_Pw$toercDEQcrfmVsQxX3w.s['28']++;var str=this._colNameRegex,regex;__cov_Pw$toercDEQcrfmVsQxX3w.s['29']++;if(typeof str==='string'){__cov_Pw$toercDEQcrfmVsQxX3w.b['7'][0]++;__cov_Pw$toercDEQcrfmVsQxX3w.s['30']++;this._colNameRegex=new RegExp(Y.Lang.sub(str,{prefix:this._cssPrefix}));}else{__cov_Pw$toercDEQcrfmVsQxX3w.b['7'][1]++;}}};__cov_Pw$toercDEQcrfmVsQxX3w.s['31']++;Y.DataTable.Highlight=Highlight;__cov_Pw$toercDEQcrfmVsQxX3w.s['32']++;Y.Base.mix(Y.DataTable,[Y.DataTable.Highlight]);},'patched-v3.18.0',{'requires':['datatable-base','event-hover'],'skinnable':true});
